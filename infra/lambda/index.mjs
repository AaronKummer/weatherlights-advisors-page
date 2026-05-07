import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, UpdateCommand, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminSetUserPasswordCommand,
  AdminAddUserToGroupCommand,
  AdminRemoveUserFromGroupCommand,
  AdminListGroupsForUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { randomUUID, randomBytes } from "node:crypto";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const cognito = new CognitoIdentityProviderClient({});
const USERS_TABLE = "weatherlight-users";
const CONTACTS_TABLE = "weatherlight-contacts";
const USER_POOL_ID = "us-east-1_tPZ876WGD";
const VALID_GROUPS = ["Admins", "Clients", "Reps"];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
};

const json = (status, body) => ({
  statusCode: status,
  headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  body: JSON.stringify(body),
});

const slugify = (s) =>
  (s || "user")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32) || "user";

const handleContact = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  if (!email || !message) return json(400, { error: "email and message required" });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { error: "invalid email" });
  if (message.length > 5000) return json(400, { error: "message too long" });

  const contactId = randomUUID();
  await ddb.send(new PutCommand({
    TableName: CONTACTS_TABLE,
    Item: {
      contactId,
      email,
      message,
      createdAt: new Date().toISOString(),
      sourceIp: event.requestContext?.http?.sourceIp || "unknown",
    },
  }));
  return json(200, { ok: true, contactId });
};

const getClaims = (event) => {
  const claims = event.requestContext?.authorizer?.jwt?.claims;
  if (!claims || !claims.sub) return null;
  return claims;
};

const ensureUser = async (claims) => {
  const userId = claims.sub;
  const existing = await ddb.send(new GetCommand({ TableName: USERS_TABLE, Key: { userId } }));
  if (existing.Item) return existing.Item;

  // Prefer human-readable signals over Cognito's internal sub UUID (which
  // is what cognito:username resolves to when the pool uses email as the
  // sign-in attribute and would produce an ugly handle).
  const emailPrefix = claims.email ? claims.email.split("@")[0] : "";
  const cognitoName = claims["cognito:username"] || "";
  const looksLikeUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cognitoName);
  const sourceName = claims.name || emailPrefix || (looksLikeUuid ? "user" : cognitoName) || "user";
  const suffix = randomBytes(2).toString("hex");
  const handle = `${slugify(sourceName)}-${suffix}`;
  const displayName = claims.name || emailPrefix || "user";
  const item = {
    userId,
    email: claims.email || null,
    handle,
    displayName,
    provider: claims["identities"]?.[0]?.providerName || "cognito",
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };
  await ddb.send(new PutCommand({ TableName: USERS_TABLE, Item: item }));
  return item;
};

const handleMe = async (event) => {
  const claims = getClaims(event);
  if (!claims) return json(401, { error: "unauthorized" });
  const user = await ensureUser(claims);
  await ddb.send(new UpdateCommand({
    TableName: USERS_TABLE,
    Key: { userId: claims.sub },
    UpdateExpression: "SET lastLoginAt = :now",
    ExpressionAttributeValues: { ":now": new Date().toISOString() },
  }));
  return json(200, { user });
};

const isAdminClaims = (claims) => {
  const email = (claims.email || "").toLowerCase();
  const username = (claims["cognito:username"] || "").toLowerCase();
  return email.startsWith("admin@") || username.startsWith("admin");
};

const requireAdmin = (event) => {
  const claims = getClaims(event);
  if (!claims) return { error: json(401, { error: "unauthorized" }) };
  if (!isAdminClaims(claims)) return { error: json(403, { error: "forbidden" }) };
  return { claims };
};

const cognitoAttr = (attrs, name) => attrs?.find((a) => a.Name === name)?.Value;

const handleListUsers = async (event) => {
  const guard = requireAdmin(event);
  if (guard.error) return guard.error;

  // Page through Cognito; small pools so we just collect everything.
  let users = [];
  let token;
  do {
    const r = await cognito.send(new ListUsersCommand({
      UserPoolId: USER_POOL_ID,
      PaginationToken: token,
      Limit: 60,
    }));
    users = users.concat(r.Users || []);
    token = r.PaginationToken;
  } while (token);

  // Look up groups per user (small N → fine).
  const enriched = await Promise.all(users.map(async (u) => {
    const sub = cognitoAttr(u.Attributes, "sub");
    const email = cognitoAttr(u.Attributes, "email");
    let groups = [];
    try {
      const g = await cognito.send(new AdminListGroupsForUserCommand({
        UserPoolId: USER_POOL_ID, Username: u.Username,
      }));
      groups = (g.Groups || []).map((x) => x.GroupName);
    } catch (_) {}
    let displayName = "";
    try {
      const r = await ddb.send(new GetCommand({ TableName: USERS_TABLE, Key: { userId: sub } }));
      displayName = r.Item?.displayName || r.Item?.handle || "";
    } catch (_) {}
    return {
      userId: sub,
      username: u.Username,
      email,
      displayName,
      enabled: u.Enabled,
      status: u.UserStatus,
      createdAt: u.UserCreateDate,
      lastModifiedAt: u.UserLastModifiedDate,
      groups,
      role: groups[0] || "",
    };
  }));

  return json(200, { users: enriched });
};

const handleCreateUser = async (event) => {
  const guard = requireAdmin(event);
  if (guard.error) return guard.error;

  const body = JSON.parse(event.body || "{}");
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";
  const role = body.role || "Clients";
  const displayName = body.displayName || (email ? email.split("@")[0] : "");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json(400, { error: "valid email required" });
  if (!password || password.length < 8)
    return json(400, { error: "password must be at least 8 characters" });
  if (!VALID_GROUPS.includes(role))
    return json(400, { error: `role must be one of ${VALID_GROUPS.join(", ")}` });

  // Cognito create + permanent password (skip the temp-password email flow).
  await cognito.send(new AdminCreateUserCommand({
    UserPoolId: USER_POOL_ID,
    Username: email,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "email_verified", Value: "true" },
      ...(displayName ? [{ Name: "name", Value: displayName }] : []),
    ],
    MessageAction: "SUPPRESS",
  }));
  await cognito.send(new AdminSetUserPasswordCommand({
    UserPoolId: USER_POOL_ID,
    Username: email,
    Password: password,
    Permanent: true,
  }));
  await cognito.send(new AdminAddUserToGroupCommand({
    UserPoolId: USER_POOL_ID,
    Username: email,
    GroupName: role,
  }));

  return json(200, { ok: true, email, role });
};

const handleUpdateUser = async (event) => {
  const guard = requireAdmin(event);
  if (guard.error) return guard.error;

  const username = decodeURIComponent(event.rawPath.split("/").pop());
  const body = JSON.parse(event.body || "{}");
  const role = body.role;

  if (role && !VALID_GROUPS.includes(role))
    return json(400, { error: `role must be one of ${VALID_GROUPS.join(", ")}` });

  if (role) {
    // Remove from any existing groups, then add to the requested one.
    const existing = await cognito.send(new AdminListGroupsForUserCommand({
      UserPoolId: USER_POOL_ID, Username: username,
    }));
    for (const g of existing.Groups || []) {
      if (g.GroupName !== role) {
        await cognito.send(new AdminRemoveUserFromGroupCommand({
          UserPoolId: USER_POOL_ID, Username: username, GroupName: g.GroupName,
        }));
      }
    }
    await cognito.send(new AdminAddUserToGroupCommand({
      UserPoolId: USER_POOL_ID, Username: username, GroupName: role,
    }));
  }

  if (body.password && body.password.length >= 8) {
    await cognito.send(new AdminSetUserPasswordCommand({
      UserPoolId: USER_POOL_ID, Username: username, Password: body.password, Permanent: true,
    }));
  }

  return json(200, { ok: true });
};

const handleDeleteUser = async (event) => {
  const guard = requireAdmin(event);
  if (guard.error) return guard.error;

  const username = decodeURIComponent(event.rawPath.split("/").pop());

  // Don't let an admin delete themselves accidentally.
  const callerEmail = (guard.claims.email || "").toLowerCase();
  if (callerEmail && callerEmail === username.toLowerCase())
    return json(400, { error: "cannot delete yourself" });

  await cognito.send(new AdminDeleteUserCommand({
    UserPoolId: USER_POOL_ID, Username: username,
  }));

  // Best-effort cleanup of the DynamoDB profile by email lookup.
  try {
    const scan = await ddb.send(new ScanCommand({
      TableName: USERS_TABLE,
      FilterExpression: "email = :e",
      ExpressionAttributeValues: { ":e": username },
      ProjectionExpression: "userId",
    }));
    for (const item of scan.Items || []) {
      await ddb.send(new DeleteCommand({ TableName: USERS_TABLE, Key: { userId: item.userId } }));
    }
  } catch (_) {}

  return json(200, { ok: true });
};

const handleAdminStats = async (event) => {
  const claims = getClaims(event);
  if (!claims) return json(401, { error: "unauthorized" });
  if (!isAdminClaims(claims)) return json(403, { error: "forbidden" });

  // Count rows in each table. With a small dataset this is fine; revisit
  // with a counters item if either table grows past a few thousand rows.
  const [contactsScan, usersScan] = await Promise.all([
    ddb.send(new ScanCommand({
      TableName: CONTACTS_TABLE,
      ProjectionExpression: "createdAt",
    })),
    ddb.send(new ScanCommand({
      TableName: USERS_TABLE,
      ProjectionExpression: "userId",
    })),
  ]);

  const contacts = contactsScan.Items || [];
  contacts.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  const lastContact = contacts[0]?.createdAt
    ? new Date(contacts[0].createdAt).toISOString().slice(0, 16).replace("T", " ") + " UTC"
    : "";

  return json(200, {
    contacts: contacts.length,
    users: (usersScan.Items || []).length,
    lastContact,
  });
};

export const handler = async (event) => {
  try {
    const method = event.requestContext?.http?.method || event.httpMethod;
    const path = event.rawPath || event.path || "";

    if (method === "OPTIONS") return { statusCode: 204, headers: CORS_HEADERS, body: "" };

    if (method === "POST" && path.endsWith("/contact")) return handleContact(event);
    if (method === "GET" && path.endsWith("/me")) return handleMe(event);
    if (method === "GET" && path.endsWith("/admin/stats")) return handleAdminStats(event);
    if (method === "GET" && path.endsWith("/admin/users")) return handleListUsers(event);
    if (method === "POST" && path.endsWith("/admin/users")) return handleCreateUser(event);
    if (method === "PATCH" && /\/admin\/users\/[^/]+$/.test(path)) return handleUpdateUser(event);
    if (method === "DELETE" && /\/admin\/users\/[^/]+$/.test(path)) return handleDeleteUser(event);

    return json(404, { error: "not found" });
  } catch (err) {
    console.error("handler error", err);
    return json(500, { error: "internal error" });
  }
};

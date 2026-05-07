import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID, randomBytes } from "node:crypto";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const USERS_TABLE = "weatherlight-users";
const CONTACTS_TABLE = "weatherlight-contacts";

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

  const googleName = claims.name || claims["cognito:username"] || (claims.email ? claims.email.split("@")[0] : "user");
  const suffix = randomBytes(2).toString("hex");
  const handle = `${slugify(googleName)}-${suffix}`;
  const item = {
    userId,
    email: claims.email || null,
    handle,
    displayName: googleName,
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

export const handler = async (event) => {
  try {
    const method = event.requestContext?.http?.method || event.httpMethod;
    const path = event.rawPath || event.path || "";

    if (method === "OPTIONS") return { statusCode: 204, headers: CORS_HEADERS, body: "" };

    if (method === "POST" && path.endsWith("/contact")) return handleContact(event);
    if (method === "GET" && path.endsWith("/me")) return handleMe(event);

    return json(404, { error: "not found" });
  } catch (err) {
    console.error("handler error", err);
    return json(500, { error: "internal error" });
  }
};

import { config } from "./config";

const TOKEN_KEY = "wl.tokens";
const PKCE_KEY = "wl.pkce";

const b64url = (buf) =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

async function pkcePair() {
  const verifierBytes = crypto.getRandomValues(new Uint8Array(64));
  const verifier = b64url(verifierBytes);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return { verifier, challenge: b64url(digest) };
}

const oauthBase = () => `https://${config.cognito.domain}`;

export async function startLogin({ provider } = {}) {
  const { verifier, challenge } = await pkcePair();
  sessionStorage.setItem(PKCE_KEY, verifier);

  const params = new URLSearchParams({
    client_id: config.cognito.clientId,
    response_type: "code",
    scope: config.cognito.scopes.join(" "),
    redirect_uri: config.redirectUri,
    code_challenge_method: "S256",
    code_challenge: challenge,
  });
  if (provider) params.set("identity_provider", provider);

  window.location.href = `${oauthBase()}/oauth2/authorize?${params.toString()}`;
}

export async function startSignup() {
  const { verifier, challenge } = await pkcePair();
  sessionStorage.setItem(PKCE_KEY, verifier);

  const params = new URLSearchParams({
    client_id: config.cognito.clientId,
    response_type: "code",
    scope: config.cognito.scopes.join(" "),
    redirect_uri: config.redirectUri,
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  window.location.href = `${oauthBase()}/signup?${params.toString()}`;
}

export async function exchangeCodeForTokens(code) {
  const verifier = sessionStorage.getItem(PKCE_KEY);
  if (!verifier) throw new Error("missing PKCE verifier");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: config.cognito.clientId,
    code,
    redirect_uri: config.redirectUri,
    code_verifier: verifier,
  });

  const res = await fetch(`${oauthBase()}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(`token exchange failed: ${res.status}`);
  const tokens = await res.json();
  tokens.expiresAt = Date.now() + tokens.expires_in * 1000;
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  // Bridge to vv-quiz / vv-wargame, which gate on this key
  localStorage.setItem("vv-token", tokens.id_token);
  sessionStorage.removeItem(PKCE_KEY);
  return tokens;
}

export function getTokens() {
  const raw = localStorage.getItem(TOKEN_KEY);
  if (!raw) return null;
  try {
    const tokens = JSON.parse(raw);
    if (tokens.expiresAt && tokens.expiresAt < Date.now()) return null;
    return tokens;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("vv-token");
  const params = new URLSearchParams({
    client_id: config.cognito.clientId,
    logout_uri: config.logoutUri,
  });
  window.location.href = `${oauthBase()}/logout?${params.toString()}`;
}

export function decodeIdToken(idToken) {
  if (!idToken) return null;
  try {
    const payload = idToken.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function fetchMe() {
  const tokens = getTokens();
  if (!tokens) return null;
  const res = await fetch(`${config.apiBase}/me`, {
    headers: { Authorization: `Bearer ${tokens.id_token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

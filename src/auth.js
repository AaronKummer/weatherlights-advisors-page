import { config } from "./config";
import * as cognito from "./cognito";

const TOKEN_KEY = "wl.tokens";

function storeTokens(authResult) {
  const tokens = {
    id_token: authResult.IdToken,
    access_token: authResult.AccessToken,
    refresh_token: authResult.RefreshToken,
    expires_in: authResult.ExpiresIn,
    expiresAt: Date.now() + authResult.ExpiresIn * 1000,
  };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  // Bridge to embedded apps (vv-quiz, vv-wargame) that gate on this key
  localStorage.setItem("vv-token", tokens.id_token);
  return tokens;
}

export async function loginWithPassword(email, password) {
  const result = await cognito.login({ email, password });
  if (!result.AuthenticationResult) {
    throw new Error("Unexpected challenge: " + (result.ChallengeName || "unknown"));
  }
  return storeTokens(result.AuthenticationResult);
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
  // Soft logout: just clear local state. No need to redirect to Cognito.
  window.location.reload();
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

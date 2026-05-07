const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

export const config = {
  apiBase: "https://6hy4d7i0dg.execute-api.us-east-1.amazonaws.com",
  cognito: {
    region: "us-east-1",
    userPoolId: "us-east-1_tPZ876WGD",
    clientId: "5auosabu4qlse976frr5vh7t4v",
    domain: "weatherlight-advisors.auth.us-east-1.amazoncognito.com",
    scopes: ["openid", "email", "profile"],
  },
  redirectUri: `${window.location.origin}/auth/callback`,
  logoutUri: `${window.location.origin}/`,
  isDev,
};

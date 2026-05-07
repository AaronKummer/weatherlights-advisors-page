// Direct Cognito User Pool API calls. No SDK needed — Cognito accepts
// plain JSON over HTTPS. Each operation is a POST with the AWS-flavored
// X-Amz-Target header naming the action.

import { config } from "./config";

const ENDPOINT = `https://cognito-idp.${config.cognito.region}.amazonaws.com/`;

async function call(operation, body) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": `AWSCognitoIdentityProviderService.${operation}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || data.__type || "Cognito error");
    err.code = data.__type;
    err.status = res.status;
    throw err;
  }
  return data;
}

export const signUp = ({ email, password }) =>
  call("SignUp", {
    ClientId: config.cognito.clientId,
    Username: email,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  });

export const confirmSignUp = ({ email, code }) =>
  call("ConfirmSignUp", {
    ClientId: config.cognito.clientId,
    Username: email,
    ConfirmationCode: code,
  });

export const resendCode = ({ email }) =>
  call("ResendConfirmationCode", {
    ClientId: config.cognito.clientId,
    Username: email,
  });

export const login = ({ email, password }) =>
  call("InitiateAuth", {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: config.cognito.clientId,
    AuthParameters: { USERNAME: email, PASSWORD: password },
  });

export const forgotPassword = ({ email }) =>
  call("ForgotPassword", {
    ClientId: config.cognito.clientId,
    Username: email,
  });

export const confirmForgotPassword = ({ email, code, password }) =>
  call("ConfirmForgotPassword", {
    ClientId: config.cognito.clientId,
    Username: email,
    ConfirmationCode: code,
    Password: password,
  });

// Convert Cognito API errors into short user-facing messages.
export function describeError(err) {
  const code = err?.code?.split("#").pop() || "";
  const known = {
    UsernameExistsException: "An account with that email already exists.",
    UserNotFoundException: "No account found for that email.",
    NotAuthorizedException: "Email or password is incorrect.",
    UserNotConfirmedException: "Email not verified yet — check your inbox for the code.",
    CodeMismatchException: "That verification code doesn't match. Try again.",
    ExpiredCodeException: "That code has expired. Request a new one.",
    InvalidPasswordException: "Password must be 8+ characters with letters and a number.",
    InvalidParameterException: err?.message || "One of the fields is invalid.",
    LimitExceededException: "Too many attempts. Wait a few minutes and try again.",
  };
  return known[code] || err?.message || "Something went wrong. Try again.";
}

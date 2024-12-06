const loginPath = "/login";

export function getFrontendUrl() {
  return process.env.FRONTEND_URL;
}

export function getLoginUrl() {
  return `${getFrontendUrl()}${loginPath}`;
}

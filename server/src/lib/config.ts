const loginPath = "/login";

export function getFrontendUrl() {
  return process.env.VITE_API_URL;
}

export function getLoginUrl() {
  return `${getFrontendUrl()}${loginPath}`;
}

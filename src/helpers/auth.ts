export const APP_AUTH_TOKEN = import.meta.env.VITE_APP_ID + "_auth";

export function getToken() {
  return localStorage.getItem(APP_AUTH_TOKEN);
}

export function removeToken() {
  return localStorage.removeItem(APP_AUTH_TOKEN);
}

export function saveToken(token: string) {
  return localStorage.setItem(APP_AUTH_TOKEN, token);
}

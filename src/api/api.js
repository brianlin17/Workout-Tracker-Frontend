import { getToken } from "../utils/auth";

export async function apiFetch(url, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("Unauthorized");
  }

  return res;
}

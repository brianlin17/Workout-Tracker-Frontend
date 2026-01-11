import { getToken } from "../utils/auth";

export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("jwt");

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
    // optional: auto-logout or redirect later
    throw new Error("Unauthorized");
  }

  return res;
}


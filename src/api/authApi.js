const API = import.meta.env.VITE_API_BASE_URL;

export async function login(username, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    throw new Error("Invalid login");
  }

  return res.text(); // JWT string
}

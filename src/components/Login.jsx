import { useState } from "react";
import { login, register } from "../api/authApi";
import { saveToken } from "../utils/auth";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        await register(username, password);
      }

      const token = await login(username, password);
      saveToken(token);
      onLogin();
      console.log("LOGIN RESPONSE:", token);
    } catch (err) {
      setError("Authentication failed");
    }
  }

  return (
    <div className="login-box">
      <h2>{isRegistering ? "Register" : "Login"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">
          {isRegistering ? "Create Account" : "Login"}
        </button>
      </form>

      <button
        style={{ marginTop: "1rem" }}
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering
          ? "Already have an account? Login"
          : "New user? Register"}
      </button>
    </div>
  );
}


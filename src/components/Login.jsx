import { useState } from "react";
import { login, register } from "../api/authApi";
import { saveToken } from "../utils/auth";
import "./Login.css";

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
    } catch (err) {
      if (isRegistering) {
        setError("Invalid username or password");
      } else {
        setError("Login failed");
      }
    }
  }


  return (
    <div className="login-page">
      <h1 className="login-title autour-one-regular">
        Brian&apos;s Workout Tracker
      </h1>

      <div className="login-box">
        <h2>{isRegistering ? "Create Account" : "Login"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit">
            {isRegistering ? "Create Account" : "Login"}
          </button>
        </form>

        <button
          className="login-toggle"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setUsername("");
            setPassword("");
            setError("");
          }}
        >
          {isRegistering ? "Back to Login" : "Create Account"}
        </button>
      </div>
    </div>
  );
}

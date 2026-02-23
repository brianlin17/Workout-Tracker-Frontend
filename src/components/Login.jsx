import { useState } from "react";
import { login, register } from "../api/authApi";
import { saveToken } from "../utils/auth";
import "./Login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

     if (!username && !password) {
        setError("Please enter username and password");
        return;
      }

      if (!username) {
        setError("Please enter username");
        return;
      }

      if (!password) {
        setError("Please enter password");
        return;
      }
    setLoading(true);

    try {
      if (isRegistering) {
        await register(username, password);
      }

      const token = await login(username, password);
      saveToken(token);
      onLogin();
    } catch (err) {
      setError(isRegistering ? "Invalid username or password" : "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="login-container">

      {/* LEFT SIDE FORM */}
      <div className="login-left">
          <div className="login-side-header">
              <h1>Brian's Workout Tracker</h1>
            </div>
        <h2 className="login-title">
          {isRegistering ? "Create Account" : "Log In"}
        </h2>

        <div className="login-box">

          <form onSubmit={handleSubmit} noValidate>
            <input
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={loading}
            />

            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "Loading..." : isRegistering ? "Create Account" : "Login"}
            </button>
          </form>

          <button
            className="login-toggle"
            disabled={loading}
            onClick={() => {
              setIsRegistering(!isRegistering);
              setUsername("");
              setPassword("");
              setError("");
            }}
          >
            {isRegistering ? "Back to Login" : "Create Account"}
          </button>

          {loading && <div className="spinner"></div>}
        </div>

      </div>
            {/* RIGHT SIDE IMAGE */}
            <div className="login-image">
            </div>
    </div>
  );
}
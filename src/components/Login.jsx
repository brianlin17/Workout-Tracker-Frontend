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
    setLoading(true);

    try {
      if (isRegistering) {
        await register(username, password);
      }

      const token = await login(username, password);
      saveToken(token);
      onLogin(); //switch to dashboard
    } catch (err) {
      if (isRegistering) {
        setError("Invalid username or password");
      } else {
        setError("Login failed");
      }
      setLoading(false); //stop spinner on error
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
            disabled={loading}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
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
  );
}

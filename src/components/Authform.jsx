import { useState } from "react";
import { login, register } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwt = isRegister
        ? await register({ username, password })
        : await login({ username, password });

      loginUser(jwt);
    } catch (err) {
      console.error("Auth error:", err);
      alert("Invalid credentials or username taken");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{isRegister ? "Register" : "Login"}</button>
      <button type="button" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account?" : "Create account"}
      </button>
    </form>
  );
}

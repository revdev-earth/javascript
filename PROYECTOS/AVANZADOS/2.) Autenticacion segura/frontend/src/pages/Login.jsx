import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("Logging in...");
    const res = await login(username, password);
    if (res.ok) setMsg("Logged in");
    else setMsg("Error: " + (res.error || "login failed"));
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
      <br />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <br />
      <button type="submit">Login</button>
      <div>{msg}</div>
    </form>
  );
}

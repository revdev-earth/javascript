import React, { useState } from "react";
import { postJSON } from "../services/api";

export default function Register() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("Registering...");
    const data = await postJSON("/auth/register", { username: u, password: p }, true);
    if (data.message) setMsg("Registered. Now login.");
    else setMsg("Error: " + (data.error || "unknown"));
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input value={u} onChange={(e) => setU(e.target.value)} placeholder="username" />
      <br />
      <input type="password" value={p} onChange={(e) => setP(e.target.value)} placeholder="password" />
      <br />
      <button type="submit">Register</button>
      <div>{msg}</div>
    </form>
  );
}

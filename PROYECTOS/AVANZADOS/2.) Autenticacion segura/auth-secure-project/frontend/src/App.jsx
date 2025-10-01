import React, { useState } from "react";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function AppInner() {
  const { user } = useAuth();
  const [page, setPage] = useState("login");

  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 10 }}>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("register")}>Register</button>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
      </nav>

      {user ? <p>Logged in as {user.username}</p> : <p>Not authenticated</p>}

      {page === "login" && <Login />}
      {page === "register" && <Register />}
      {page === "dashboard" && <Dashboard />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

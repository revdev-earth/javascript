import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { fetchWithAuth, logout } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const resp = await fetchWithAuth("http://localhost:4000/protected");
      if (resp.ok) {
        const data = await resp.json();
        setMessage(data.message);
      } else {
        setMessage("Not authorized");
      }
    })();
  }, [fetchWithAuth]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

import React, { useState } from "react";

export default function ContactForm({ onAdd }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return alert("Ingrese nombre");
    if (!phone.trim()) return alert("Ingrese teléfono");
    onAdd({ id: Date.now().toString(), name: name.trim(), phone: phone.trim() });
    setName("");
    setPhone("");
  }

  return (
    <form onSubmit={handleSubmit} className="card" aria-label="Agregar contacto">
      <div style={{ display: "grid", gap: 8 }}>
        <label>
          Nombre
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Teléfono
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" className="primary">Agregar</button>
        </div>
      </div>
    </form>
  );
}

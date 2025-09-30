import React, { useState } from "react";
import IssueList from "./IssueList2";
import { useA11yAudit } from "../hooks/useA11yAudit2";

export default function Panel() {
  const [url, setUrl] = useState("");
  const [issues, setIssues] = useState([]);
  const { analizarHtml } = useA11yAudit();

  const handleAnalizar = async () => {
    if (!url) return;
    try {
      const res = await fetch(
        `http://localhost:4000/proxy?url=${encodeURIComponent(url)}`
      );
      const html = await res.text();
      const resultados = analizarHtml(html);
      setIssues(resultados);
    } catch (err) {
      console.error("Error al analizar:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">🌐 Auditor de Accesibilidad</h1>

      <div className="flex gap-2 my-4">
        <input
          type="text"
          placeholder="Ingresa una URL (ej. https://example.com)"
          className="border p-2 flex-1"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleAnalizar}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Analizar
        </button>
      </div>

      <h2 className="mt-4 font-semibold">🔎 Resultados</h2>
      <IssueList issues={issues} />
    </div>
  );
}

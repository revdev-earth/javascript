import { useState, useEffect } from "react";

export default function OnlineOfflineSwitch() {
  // Estado real de conexión del navegador
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  console.log(":: online? :: ", isOnline);

  // Estado para forzar modo offline/manual
  const [forceOffline, setForceOffline] = useState(false);

  // Escuchar cambios reales del navegador (online/offline)
  useEffect(() => {
    function updateOnlineStatus() {
      setIsOnline(navigator.onLine); // Aquí la corrección
    }

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  // Estado efectivo: si está forzado offline, mostramos offline
  const effectiveOnline = !forceOffline && isOnline;

  return (
    <div className="p-4 border rounded max-w-sm mx-auto">
      <h2 className="mb-4 text-xl font-semibold">Estado de la conexión</h2>
      <p className={`mb-4 font-bold ${effectiveOnline ? "text-green-600" : "text-red-600"}`}>
        {effectiveOnline ? "🟢 Online" : "🔴 Offline"}
      </p>

      <label className="flex items-center space-x-3 cursor-pointer">
        <span>Forzar modo offline</span>
        <input
          type="checkbox"
          checked={forceOffline}
          onChange={() => setForceOffline(!forceOffline)}
          className="w-5 h-5"
        />
      </label>
    </div>
  );
}

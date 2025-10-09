import { useState } from "react";

export default function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada por este navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setError(null);
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setLocation(null);
        setError(`Error obteniendo ubicación: ${err.message}`);
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Obtener Ubicación</h1>

      <button
        onClick={handleGetLocation}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Obtener mi ubicación
      </button>

      {location && (
        <p className="mt-4 text-green-700">
          Latitud: {location.lat} <br />
          Longitud: {location.lon}
        </p>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}

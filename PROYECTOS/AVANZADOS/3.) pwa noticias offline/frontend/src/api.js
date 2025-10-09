// api.js
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://newsapi.org/v2/top-headlines"; // URL base de la API de noticias

// Función para obtener las noticias
export const fetchNews = async () => {
  try {
    const response = await fetch(`${BASE_URL}?country=us&apiKey=${API_KEY}`);

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("No se pudieron obtener las noticias.");
    }

    const data = await response.json();
    return data.articles; // Devuelve los artículos de las noticias
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    throw error; // Propaga el error para que lo maneje la función que llama a `fetchNews`
  }
};

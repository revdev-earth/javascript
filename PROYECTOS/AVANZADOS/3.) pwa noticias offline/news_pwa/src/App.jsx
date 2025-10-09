import { useEffect, useState } from "react";
import OfflineBanner from "./components/OfflineBanner";
import { getSavedNews, saveNews } from "./services/db";
import { fetchNews } from "./services/api";
import NewsList from "./components/NewList";
import Api from "./components/api";

function App() {
    const [news, setNews] = useState([]);
  const [online, setOnline] = useState(navigator.onLine);

    useEffect(() => {
    // Ejemplo: consumir API pública de noticias JSON
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => {
        // Normalizar datos para tu componente
        const formatted = data.map((item) => ({
          id: item.id,
          title: item.title,
          body: item.body,
        }));
        setNews(formatted);
      })
      .catch((err) => {
        console.error("Error cargando noticias:", err);
      });
  }, []);
  useEffect(() => {
    const loadNews = async () => {
      if (navigator.onLine) {
        const freshNews = await fetchNews();
        setNews(freshNews);
        freshNews.forEach((article) => saveNews(article));
      } else {
        const offlineNews = await getSavedNews();
        setNews(offlineNews);
      }
    };

    loadNews();
    window.addEventListener("online", () => setOnline(true));
    window.addEventListener("offline", () => setOnline(false));
  }, []);
  return (
    <div className="p-4">
      {!online && <OfflineBanner />}
      <h1 className="text-2xl font-bold mb-4">📰 Noticias</h1>
      <NewsList news={news} />
      <Api />
    </div>
  )
}

export default App

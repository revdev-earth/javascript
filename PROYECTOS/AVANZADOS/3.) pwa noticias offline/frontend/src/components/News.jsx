import { useEffect, useState } from 'react';
import { getSavedNews, saveNews } from '../db';
import { fetchNews } from '../api'; // Suponiendo que fetchNews obtiene los artículos desde la API de noticias

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    try {
      const news = await fetchNews();
      setArticles(news);
      saveNews(news); // Guardar en IndexedDB
    } catch (error) {
      console.error('Error al cargar noticias:', error);
      const savedNews = await getSavedNews();
      setArticles(savedNews); // Si hay un error, carga las noticias guardadas
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  if (loading) return <div>Cargando noticias...</div>;

  return (
    <div>
      <h1>Noticias</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default News;

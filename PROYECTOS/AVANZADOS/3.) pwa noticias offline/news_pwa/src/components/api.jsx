import React, { useEffect, useState } from 'react';


const Api = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cambia esto por tu clave real
  const API_KEY = import.meta.env.VITE_API_KEY;
  const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=col&apiKey=${API_KEY}`;


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(NEWS_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNews(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Cargando noticias...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Últimas Noticias</h1>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Leer más
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Api;

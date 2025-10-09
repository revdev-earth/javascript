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
      console.log(":: Notas guardadas :: ", savedNews)
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
      <ul className='flex flex-wrap gap-3 bg-amber-100 p-4 rounded-2xl'>
        {articles.map((article) => {

          return (
            <li key={article.publishedAt}  className=' flex flex-col gap-3 bg-amber-50 p-4 rounded-xl'>
              <h4 className='font-semibold line-clamp-1'>
              {article.title}
              </h4>
              <div className='flex items-center gap-3 bg-white p-3 rounded-2xl'>
                <img src={article.urlToImage} alt={`imagen ${article.title}`} />
                <div className='flex flex-col gap-2'>
                  <p className='line-clamp-3 text-[14px]'>
                    {article.description}
                  </p>
                  <a href={article.url}>leer mas...</a>
                </div>
              </div>
              </li>
          )
          }
        )}
      </ul>
    </div>
  );
};

export default News;

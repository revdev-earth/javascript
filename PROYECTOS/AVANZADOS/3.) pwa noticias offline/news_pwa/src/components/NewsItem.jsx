export default function NewsList({ news = [] }) { // valor por defecto
  return (
    <div>
      {news.length === 0 ? (
        <p>No hay noticias disponibles.</p>
      ) : (
        news.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))
      )}
    </div>
  );
}

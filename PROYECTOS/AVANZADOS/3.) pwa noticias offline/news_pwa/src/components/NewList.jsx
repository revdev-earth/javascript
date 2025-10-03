import NewsItem from './NewsItem'

export default function NewsList({ news }) {
  return (
    <div className="space-y-4">
      {news.map((item, i) => (
        <NewsItem key={i} article={item} />
      ))}
    </div>
  );
}

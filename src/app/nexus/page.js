'use client';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}&q=cryptocurrency&language=en&category=business`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch news data.');
        }
        const data = await res.json();
        setNews(data.results.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white px-6 py-24 pt-28">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        {/* <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-md">
          Crypto News Module
        </h1> */}

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Latest stories from the world of digital assets — powered by NewsData.io
        </p>

        <div className="space-y-8">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white/5 hover:bg-white/10 border border-blue-400/20 backdrop-blur-md rounded-2xl p-6 text-left transition-all duration-200 hover:shadow-blue-500/30"
            >
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 font-semibold text-xl hover:underline"
              >
                {article.title}
              </a>
              <p className="text-gray-400 text-sm mt-1">{article.pubDate}</p>
              <p className="text-gray-300 mt-2 line-clamp-3">{article.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

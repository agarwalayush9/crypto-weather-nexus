export const fetchCryptoNews = async () => {
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}&q=cryptocurrency&language=en`
    );
    const json = await res.json();
    return json.results.slice(0, 5);
  };
  
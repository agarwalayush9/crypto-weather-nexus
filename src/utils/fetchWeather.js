// src/utils/fetchWeather.js

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function fetchWeather(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error('Weather fetch failed');
  return res.json();
}

// Since OpenWeather's free tier doesn't support historical data,
// this mock function simulates the weather history for UI rendering.
export async function fetchWeatherHistory(lat, lon) {
  // Generate mock data for past 5 days
  const mockHistory = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (i + 1));

    return {
      date: date.toLocaleDateString(),
      temp: (Math.random() * 15 + 10).toFixed(1), // random temp between 10-25°C
      humidity: Math.floor(Math.random() * 40 + 40), // random humidity between 40-80%
    };
  });

  return mockHistory;
}

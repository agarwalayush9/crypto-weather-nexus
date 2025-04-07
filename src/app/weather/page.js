'use client';

import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import { fetchWeather } from '@/utils/fetchWeather';
import { useWeatherAlerts } from '@/hooks/useWeatherAlerts';
import Link from 'next/link';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Toronto', 'Dubai', 'Singapore', 'Mumbai'];

export default function WeatherPage() {
  const {
    cityFavorites,
    addCityFavorite,
    removeCityFavorite,
    fetchedData,
    setFetchedData,
    loading,
    setLoading,
    error,
    setError,
  } = useContext(GlobalContext);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchWeatherData() {
      setLoading(true);
      setError(null);
      try {
        const weatherData = await Promise.all(cities.map((city) => fetchWeather(city)));
        setFetchedData((prev) => ({ ...prev, weather: weatherData })); // Store globally
      } catch (err) {
        setError('Failed to fetch weather data.');
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherData();
  }, [setFetchedData, setLoading, setError]);

  // Handle weather alerts
  useWeatherAlerts((alert) => {
    setAlerts((prevAlerts) => [alert, ...prevAlerts.slice(0, 4)]); // Keep the last 5 alerts
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.slice(0, -1)); // Auto-dismiss after 5 seconds
    }, 5000);
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0d1a2d] via-[#0a1c2f] to-[#081c29] text-white px-6 py-16 pt-20">
      {/* Weather Alerts Section */}
      <div className="fixed top-4 right-4 space-y-4 z-50">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="bg-red-500/90 text-white rounded-lg shadow-lg p-4 w-80 relative animate-slide-in-right"
          >
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-300"
              onClick={() =>
                setAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index))
              }
            >
              ✕
            </button>
            <p className="font-semibold">{alert.message}</p>
            <p className="text-sm text-gray-200">{alert.timestamp}</p>
          </div>
        ))}
      </div>

      {/* Favorites Section */}
      {cityFavorites.length > 0 && (
        <div className="max-w-6xl mx-auto text-center mt-2 mb-10">
          <h2 className="text-3xl font-bold text-purple-300 mb-6">Your Favorite Cities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cityFavorites.map((city) => (
              <div
                key={city.name}
                className="relative bg-white/5 border border-cyan-400/20 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.03] transition duration-300 backdrop-blur-md cursor-pointer"
              >
                <button
                  onClick={() => removeCityFavorite(city.name)}
                  className="absolute top-3 right-3 text-lg text-yellow-400 hover:text-gray-300"
                >
                  ✕
                </button>
                <h2 className="text-2xl font-semibold text-cyan-200 mb-2">{city.name}</h2>
                <p className="text-lg text-white mb-1">
                  🌡 Temperature: <span className="text-cyan-300">{city.main.temp}°C</span>
                </p>
                <p className="text-white mb-1">
                  💧 Humidity: <span className="text-cyan-200">{city.main.humidity}%</span>
                </p>
                <p className="text-white mb-1 capitalize">
                  ⛅ Condition: <span className="text-blue-300">{city.weather[0].description}</span>
                </p>
                <Link
                  href={`/weather/${encodeURIComponent(city.name.toLowerCase())}`}
                  className="inline-block mt-4 px-4 py-2 text-sm font-medium text-purple-200 bg-purple-800/30 hover:bg-purple-700/40 rounded-xl transition-all"
                >
                  🔍 View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Weather Data */}
      <div className="max-w-6xl mx-auto text-center mt-2">
        <p className="text-lg text-purple-200 mb-10">
          Detailed view of current weather metrics powered by — OpenWeatherMap.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {fetchedData.weather?.map((city, i) => (
            <div
              key={i}
              className="relative bg-white/5 border border-cyan-400/20 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.03] transition duration-300 backdrop-blur-md cursor-pointer"
            >
              <button
                onClick={() => addCityFavorite(city)}
                className="absolute top-3 right-3 text-lg text-gray-400 hover:text-yellow-400"
              >
                ☆
              </button>
              <h2 className="text-2xl font-semibold text-cyan-200 mb-2">{city.name}</h2>
              <p className="text-lg text-white mb-1">
                🌡 Temperature: <span className="text-cyan-300">{city.main.temp}°C</span>
              </p>
              <p className="text-white mb-1">
                💧 Humidity: <span className="text-cyan-200">{city.main.humidity}%</span>
              </p>
              <p className="text-white mb-1 capitalize">
                ⛅ Condition: <span className="text-blue-300">{city.weather[0].description}</span>
              </p>
              <Link
                href={`/weather/${encodeURIComponent(city.name.toLowerCase())}`}
                className="inline-block mt-4 px-4 py-2 text-sm font-medium text-purple-200 bg-purple-800/30 hover:bg-purple-700/40 rounded-xl transition-all"
              >
                🔍 View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

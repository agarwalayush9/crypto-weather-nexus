'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchWeather, fetchWeatherHistory } from '@/utils/fetchWeather';

export default function CityWeatherDetail() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const current = await fetchWeather(city);
        setWeather(current);

        const hist = await fetchWeatherHistory(
          current.coord.lat,
          current.coord.lon
        );
        setHistory(hist);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, [city]);

  if (!weather) {
    return (
      <main className="pt-28 text-center text-white">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="pt-28 min-h-screen bg-gradient-to-br from-[#0d1a2d] via-[#0a1c2f] to-[#081c29] text-white px-6">
      <div className="max-w-5xl mx-auto text-center">
       

        <p className="text-lg md:text-xl  text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 drop-shadow mb-6">
        📍 Weather in {weather.name}, {weather.sys.country}
        </p>

        <div className="bg-white/10 border border-cyan-400/20 rounded-2xl p-6 shadow-lg backdrop-blur-md max-w-md mx-auto mb-12">
          <p className="text-white text-lg mb-2">
            🌡 Temperature: <span className="text-cyan-300">{weather.main.temp}°C</span>
          </p>
          <p className="text-white text-lg mb-2">
            💧 Humidity: <span className="text-cyan-200">{weather.main.humidity}%</span>
          </p>
          <p className="text-white text-lg mb-2 capitalize">
            ⛅ Condition: <span className="text-blue-300">{weather.weather[0].description}</span>
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-cyan-200 mb-4">📊 Weather History (Last 5 Days)</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-white border-collapse">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Temperature (°C)</th>
                  <th className="px-6 py-4 font-medium">Humidity (%)</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, index) => (
                  <tr
                    key={index}
                    className="even:bg-white/5 hover:bg-white/10 transition"
                  >
                    <td className="px-6 py-3">📅 {entry.date}</td>
                    <td className="px-6 py-3 text-cyan-300">🌡 {entry.temp}</td>
                    <td className="px-6 py-3 text-cyan-200">💧 {entry.humidity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

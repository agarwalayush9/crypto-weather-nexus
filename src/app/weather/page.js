'use client';

import { useEffect, useState } from 'react';
import { fetchWeather } from '@/utils/fetchWeather';
import Link from 'next/link';

const cities = ['New York', 'London', 'Tokyo','Paris', 'Sydney', 'Toronto', 'Dubai', 'Singapore', 'Mumbai'];

export default function WeatherPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.all(cities.map(city => fetchWeather(city)))
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <main className=" min-h-screen bg-gradient-to-br from-[#0d1a2d] via-[#0a1c2f] to-[#081c29] text-white px-6 py-16 pt-28">
      <div className="max-w-6xl mx-auto text-center">
        {/* <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 drop-shadow mb-10 text-center">
          🌦️ Global Weather Dashboard
        </h1> */}
         <p className="text-lg text-purple-200 mb-10">
          Detailed view of current weather metrics powered by — OpenWeatherMap.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {data.map((city, i) => (
            <Link href={`/weather/${encodeURIComponent(city.name.toLowerCase())}`} key={i}>
              <div
                className="relative bg-white/5 border border-cyan-400/20 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.03] transition duration-300 backdrop-blur-md cursor-pointer"
              >
                <div className="absolute top-3 right-3 text-cyan-400 text-sm font-medium bg-cyan-900/30 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {city.sys.country}
                </div>

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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

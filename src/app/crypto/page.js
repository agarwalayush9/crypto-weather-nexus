'use client';

import { useState, useEffect } from 'react';
import CryptoCard from '@/components/CryptoCard';
import Toast from '@/components/Toast';
import CryptoSocketUpdater from '@/components/CryptoSocketUpdater';

export default function CryptoPage() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial data from an API
  useEffect(() => {
    async function fetchCryptoData() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        const formattedData = data.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price,
          change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
          marketCap: `$${coin.market_cap.toLocaleString()}`,
        }));
        setCryptoData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch crypto data:', err);
        setError('Failed to load cryptocurrency data.');
        setLoading(false);
      }
    }

    fetchCryptoData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <main className="pt-28 min-h-screen bg-gradient-to-br from-[#0f051d] via-[#1a0e2a] to-[#2b0c3d] text-white px-6 py-16">
      <Toast />
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg text-purple-200 mb-10">
          Live updates, trends, and stats — all in a glowing cyberpunk style.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cryptoData.map((coin) => (
            <CryptoSocketUpdater
              key={coin.id}
              coin={coin}
              onPriceUpdate={(updatedPrice) => {
                setCryptoData((prevData) =>
                  prevData.map((item) =>
                    item.symbol === coin.symbol
                      ? { ...item, price: updatedPrice }
                      : item
                  )
                );
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

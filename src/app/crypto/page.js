'use client';

import { useState, useEffect, useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { GlobalContext } from '@/context/GlobalContext';
import CryptoCard from '@/components/CryptoCard';
import Toast from '@/components/Toast';
import CryptoSocketUpdater from '@/components/CryptoSocketUpdater';
import Loading from '@/components/Loading';

export default function CryptoPage() {
  const {
    cryptoFavorites,
    addCryptoFavorite,
    removeCryptoFavorite,
    fetchedData,
    setFetchedData,
    loading,
    setLoading,
    error,
    setError,
  } = useContext(GlobalContext);

  const [cryptoData, setCryptoData] = useState([]);
  const [priceAlerts, setPriceAlerts] = useState([]); // State for price alerts
  const [navigating, setNavigating] = useState(false); // State for spinner during navigation
  const [refreshCountdown, setRefreshCountdown] = useState(20); // Countdown timer for auto-refresh
  const router = useRouter();

  const handlePriceUpdate = useCallback((updatedPrice, coinId) => {
    setCryptoData((prevData) =>
      prevData.map((coin) =>
        coin.id === coinId ? { ...coin, price: updatedPrice } : coin
      )
    );

    // Trigger price alert if price crosses a threshold
    const coin = cryptoData.find((coin) => coin.id === coinId);
    if (coin && updatedPrice > coin.price * 1.1) {
      setPriceAlerts((prevAlerts) => [
        { id: coinId, message: `${coin.name} price increased by 10%!` },
        ...prevAlerts.slice(0, 4), // Keep the last 5 alerts
      ]);
    }
  }, [cryptoData]);

  useEffect(() => {
    async function fetchCryptoData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch cryptocurrency data. API limit might be hit.');
        }
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
        setFetchedData((prev) => ({ ...prev, crypto: formattedData }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCryptoData();
  }, [setFetchedData, setLoading, setError]);

  // Auto-refresh logic when there's an error
  useEffect(() => {
    if (error) {
      const interval = setInterval(() => {
        setRefreshCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setRefreshCountdown(15); // Reset countdown
            setError(null); // Clear error
            router.refresh(); // Refresh the page
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [error, router]);

  const handleViewDetails = (id) => {
    setNavigating(true); // Show spinner
    router.push(`/crypto/${id}`);
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-500/90 text-white rounded-lg shadow-lg p-6 w-96 text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-sm mb-4">{error}</p>
          <p className="text-sm">
            Retrying in <span className="font-bold">{refreshCountdown}</span> seconds...
          </p>
        </div>
      </div>
    );

  return (
    <main className="pt-20 min-h-screen bg-gradient-to-br from-[#0f051d] via-[#1a0e2a] to-[#2b0c3d] text-white px-6 py-16">
      {navigating && <Loading />} {/* Show spinner during navigation */}
      <Toast />

      {/* Price Alerts Section */}
      <div className="fixed top-4 right-4 space-y-4 z-50">
        {priceAlerts.map((alert, index) => (
          <div
            key={index}
            className="bg-green-500/90 text-white rounded-lg shadow-lg p-4 w-80 relative animate-slide-in-right"
          >
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-300"
              onClick={() =>
                setPriceAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index))
              }
            >
              ✕
            </button>
            <p className="font-semibold">{alert.message}</p>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Favorites Section */}
        {cryptoFavorites.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-purple-300 mb-6">Your Favorites</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cryptoFavorites.map((favorite) => (
                <CryptoCard
                  key={favorite.id}
                  id={favorite.id}
                  name={favorite.name}
                  symbol={favorite.symbol}
                  price={favorite.price}
                  change={favorite.change}
                  marketCap={favorite.marketCap}
                  onRemove={() => removeCryptoFavorite(favorite.id)}
                  onViewDetails={() => handleViewDetails(favorite.id)} // Pass handler for "View Details"
                />
              ))}
            </div>
          </div>
        )}

        {/* Main Cryptocurrency List */}
        <p className="text-lg text-purple-200 mb-10">
          Live updates, trends, and stats — all in a glowing cyberpunk style.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cryptoData.map((coin) => (
            <CryptoSocketUpdater
              key={coin.id}
              coin={coin}
              onPriceUpdate={(updatedPrice) => handlePriceUpdate(updatedPrice, coin.id)}
              onViewDetails={() => handleViewDetails(coin.id)} // Pass handler for "View Details"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

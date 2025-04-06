import Link from "next/link";
import { useContext, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";

export default function CryptoCard({ id, name, symbol, price, change, marketCap }) {
  const { cryptoFavorites, addCryptoFavorite, removeCryptoFavorite } = useContext(GlobalContext);
  const [isNavigating, setIsNavigating] = useState(false); // State to show spinner during navigation

  const isFavorite = cryptoFavorites.some((favorite) => favorite.id === id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeCryptoFavorite(id);
    } else {
      addCryptoFavorite({ id, name, symbol, price, change, marketCap });
    }
  };

  const handleViewDetails = () => {
    setIsNavigating(true); // Show spinner
  };

  return (
    <div className="bg-white/10 border border-purple-500/20 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-fuchsia-500/30 hover:scale-105 transition duration-200">
      <button
        onClick={handleFavoriteToggle}
        className={`absolute top-3 right-3 text-lg ${
          isFavorite ? "text-yellow-400" : "text-gray-400"
        } hover:text-yellow-300`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "★" : "☆"}
      </button>
      <h2 className="text-xl font-semibold text-fuchsia-300 mb-2">
        {name} ({symbol})
      </h2>
      <p className="text-purple-200 text-lg mb-1">💰 Price: {price}</p>
      <p
        className={`text-sm font-medium ${
          change.startsWith("-") ? "text-rose-400" : "text-emerald-400"
        }`}
      >
        24h Change: {change}
      </p>
      <p className="text-purple-100 mt-2 mb-4">📊 Market Cap: {marketCap}</p>

      <Link
        href={`/crypto/${id}`}
        onClick={handleViewDetails}
        className="inline-block mt-2 px-4 py-2 text-sm font-medium text-purple-200 bg-purple-800/30 hover:bg-purple-700/40 rounded-xl transition-all relative"
      >
        {isNavigating ? (
          <span className="absolute inset-0 flex justify-center items-center">
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
          </span>
        ) : (
          "🔍 View Details"
        )}
      </Link>
    </div>
  );
}

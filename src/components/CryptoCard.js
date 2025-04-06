import Link from "next/link";

export default function CryptoCard({ id, name, symbol, price, change, marketCap }) {
  return (
    <div className="bg-white/10 border border-purple-500/20 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-fuchsia-500/30 hover:scale-105 transition duration-200">
      <h2 className="text-xl font-semibold text-fuchsia-300 mb-2">
        {name} ({symbol})
      </h2>
      <p className="text-purple-200 text-lg mb-1">💰 Price: {price}</p>
      <p className={`text-sm font-medium ${change.startsWith("-") ? "text-rose-400" : "text-emerald-400"}`}>
        24h Change: {change}
      </p>
      <p className="text-purple-100 mt-2 mb-4">📊 Market Cap: {marketCap}</p>

      <Link
        href={`/crypto/${id}`}
        className="inline-block mt-2 px-4 py-2 text-sm font-medium text-purple-200 bg-purple-800/30 hover:bg-purple-700/40 rounded-xl transition-all"
      >
        🔍 View Details
      </Link>
    </div>
  );
}

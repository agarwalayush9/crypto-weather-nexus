"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from '@/components/Loading';
import { fetchCryptoDetails, fetchCryptoMarketChart } from "@/utils/fetchCrypto";

export default function CryptoDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [chart, setChart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const details = await fetchCryptoDetails(id);
        let chartData = [];
        try {
          chartData = await fetchCryptoMarketChart(id);
        } catch (err) {
          console.warn("Chart data unavailable:", err.message);
        }

        setData(details);
        setChart(chartData);
      } catch (err) {
        setError("Failed to load crypto details.");
        console.error(err);
      }
    }

    load();
  }, [id]);

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!data) return <Loading/>;

  return (
    <main className="pt-28 px-6 min-h-screen bg-gradient-to-br from-[#0f051d] via-[#1a0e2a] to-[#2b0c3d] text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex items-center gap-6">
          <img src={data.image} alt={data.name} className="w-16 h-16" />
          <div>
            <h1 className="text-3xl font-bold text-purple-300">{data.name} ({data.symbol})</h1>
            <p className="text-lg text-gray-400">Current Price: ${data.currentPrice}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-xl border border-purple-500/20">
          <div>Market Cap: ${data.marketCap.toLocaleString()}</div>
          <div>24h Change: {data.priceChange24h.toFixed(2)}%</div>
          <div>High 24h: ${data.high24h}</div>
          <div>Low 24h: ${data.low24h}</div>
          <div>Circulating Supply: {data.circulatingSupply.toLocaleString()}</div>
          <div>Total Supply: {data.totalSupply?.toLocaleString() ?? "N/A"}</div>
          <div>All-Time High: ${data.ath}</div>
          <div>All-Time Low: ${data.atl}</div>
        </div>

        {chart.length > 0 ? (
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1d] p-6 rounded-2xl shadow-md text-white max-w-xl mx-auto border border-violet-800/40">
            <h2 className="text-2xl font-semibold text-violet-400 mb-4">📈 5-Day Price History</h2>

            <div className="space-y-2">
              {chart.slice(-5).map(({ date, price }, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-white/5 hover:bg-white/10 transition rounded-md px-4 py-2"
                >
                  <span>{date}</span>
                  <span>${price}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Price chart data not available.</p>
        )}
      </div>
    </main>
  );
}

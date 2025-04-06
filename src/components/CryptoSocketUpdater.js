'use client';

import { useEffect, useState } from 'react';
import CryptoCard from '@/components/CryptoCard';

export default function CryptoSocketUpdater({ coin }) {
  // Local state for live values
  const [price, setPrice] = useState(coin.price);
  const [change, setChange] = useState(coin.change);
  const [marketCap, setMarketCap] = useState(coin.marketCap);

  useEffect(() => {
    if (!coin?.id) {
      console.error('Invalid coin ID');
      return;
    }

    const assetId = coin.id.toLowerCase();
    let retryTimeoutId = null;
    let intervalId = null;

    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${assetId}`);
        if (response.status === 429) {
          console.warn(`Rate limit hit for ${assetId}, retrying in 10 seconds...`);
          retryTimeoutId = setTimeout(fetchPrice, 10_000); // Retry after 10 seconds
          return;
        }
        if (!response.ok) {
          throw new Error(`Failed to fetch ${assetId}: ${response.status}`);
        }

        const json = await response.json();
        const data = json?.data;
        if (!data || !data.priceUsd) {
          console.warn(`No price data available for ${assetId}`);
          return;
        }

        // Batch state updates to avoid unnecessary re-renders
        setPrice(parseFloat(data.priceUsd).toFixed(2));
        setChange(`${parseFloat(data.changePercent24Hr).toFixed(2)}%`);
        setMarketCap(`$${Number(data.marketCapUsd).toLocaleString()}`);
      } catch (err) {
        console.error(`Error fetching data for ${assetId}:`, err);
      }
    };

    // Initial fetch and polling setup
    fetchPrice();
    intervalId = setInterval(fetchPrice, 60_000); // Poll every 60 seconds

    // Cleanup on unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (retryTimeoutId) clearTimeout(retryTimeoutId);
      console.log(`Stopped price updates for ${assetId}`);
    };
  }, [coin.id]);

  // Render the card with live data
  return (
    <CryptoCard
      id={coin.id}
      name={coin.name}
      symbol={coin.symbol}
      price={`$${price}`}
      change={change}
      marketCap={marketCap}
    />
  );
}

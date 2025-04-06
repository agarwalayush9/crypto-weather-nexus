// src/utils/fetchCrypto.js

const BASE_URL = 'https://api.coingecko.com/api/v3';

export async function fetchCryptoDetails(id) {
  const res = await fetch(`${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
  if (!res.ok) throw new Error('Failed to fetch crypto details');
  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    symbol: data.symbol.toUpperCase(),
    image: data.image.large,
    currentPrice: data.market_data.current_price.usd,
    marketCap: data.market_data.market_cap.usd,
    priceChange24h: data.market_data.price_change_percentage_24h,
    high24h: data.market_data.high_24h.usd,
    low24h: data.market_data.low_24h.usd,
    circulatingSupply: data.market_data.circulating_supply,
    totalSupply: data.market_data.total_supply,
    ath: data.market_data.ath.usd,
    atl: data.market_data.atl.usd,
  };
}

export async function fetchCryptoMarketChart(id) {
  const res = await fetch(`${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=5&interval=daily`);
  if (!res.ok) throw new Error('Failed to fetch crypto chart data');
  const data = await res.json();

  if (!data?.prices?.length) throw new Error('Invalid chart data');

  return data.prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    price: parseFloat(price.toFixed(2)),
  }));
}

// Add a default working WebSocket connector
export function createCryptoSocket(symbol = "btcusdt") {
  const url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`;
  const socket = new WebSocket(url);

  socket.onopen = () => console.log("WebSocket connected");
  socket.onerror = (e) => {
    console.error("WebSocket connection failed.");
    if (e instanceof Event) {
      console.error("Reason: Possibly an invalid or unreachable WebSocket URL.");
    } else {
      console.error("Error object:", e);
    }
  };

  return socket;
}

// Aliased export for use in hooks
export const connectCryptoSocket = createCryptoSocket;

export async function fetchTopCryptoMarkets() {
  try {
    const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Debugging log

    if (!Array.isArray(data)) {
      throw new Error("Unexpected API response format");
    }

    return data.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
      marketCap: `$${coin.market_cap.toLocaleString()}`,
    }));
  } catch (err) {
    console.error('Failed to fetch crypto data:', err);
    throw new Error('Failed to load cryptocurrency data.');
  }
}

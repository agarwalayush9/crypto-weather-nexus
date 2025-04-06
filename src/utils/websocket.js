export function createCryptoSocket(symbol = "btcusdt") {
  const url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`;
  console.log("Connecting to WebSocket URL:", url);

  try {
    const socket = new WebSocket(url);

    socket.onopen = () => console.log("✅ WebSocket connected");

    socket.onerror = (e) => {
      console.error("❌ WebSocket connection failed.");
      if (e instanceof Event) {
        console.error("Reason: Possibly an invalid or unreachable WebSocket URL.");
      } else {
        console.error("Error object:", e);
      }
    };

    socket.onclose = () => console.warn("🔌 WebSocket closed");

    return socket;
  } catch (err) {
    console.error("❌ WebSocket setup threw an error:", err);
    return null;
  }
}

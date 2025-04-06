import { useEffect } from 'react';
import { createCryptoSocket } from '@/utils/websocket';

export function useCryptoSocket(symbol, onPriceUpdate) {
  useEffect(() => {
    if (!symbol || typeof symbol !== 'string') {
      console.error("Valid symbol is required for useCryptoSocket.");
      return;
    }

    let socket;

    try {
      socket = createCryptoSocket(symbol.toLowerCase());
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      return;
    }

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && typeof data.c === 'string') {
          const price = parseFloat(data.c); // Current price from Binance ticker stream
          if (onPriceUpdate) {
            onPriceUpdate(price); // Call the callback with the updated price
          }
        } else {
          console.warn("Invalid data received from socket:", data);
        }
      } catch (error) {
        console.error("Error parsing socket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      if (socket) {
        socket.close();
        console.log("WebSocket connection cleaned up.");
      }
    };
  }, [symbol, onPriceUpdate]);
}

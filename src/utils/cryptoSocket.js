export const connectCryptoSocket = (onMessage) => {
    const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana');
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      onMessage(data);
    };
    return ws;
  };
  
import { useEffect } from 'react';

export function useWeatherAlerts(onAlert) {
  useEffect(() => {
    // Simulate a WebSocket connection
    const mockWebSocket = {
      listeners: [],
      sendAlert(alert) {
        this.listeners.forEach((listener) => listener(alert));
      },
      onMessage(listener) {
        this.listeners.push(listener);
      },
    };

    // Simulate periodic weather alerts
    const interval = setInterval(() => {
      const randomCity = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Toronto', 'Dubai', 'Singapore', 'Mumbai'][
        Math.floor(Math.random() * 9)
      ];
      const alert = {
        city: randomCity,
        message: `Severe weather alert in ${randomCity}! Stay safe.`,
        timestamp: new Date().toLocaleTimeString(),
      };
      mockWebSocket.sendAlert(alert);
    }, 10000); // Dispatch an alert every 10 seconds

    // Listen for alerts
    mockWebSocket.onMessage((alert) => {
      if (onAlert) {
        onAlert(alert);
      }
    });

    return () => {
      clearInterval(interval);
    };
  }, [onAlert]);
}
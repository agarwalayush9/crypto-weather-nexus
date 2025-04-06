import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prices: {},
  alerts: [], // { symbol, price, type }
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrice(state, action) {
      const { symbol, price } = action.payload;
      const oldPrice = state.prices[symbol];
      state.prices[symbol] = price;

      const percentChange = oldPrice
        ? ((price - oldPrice) / oldPrice) * 100
        : 0;

      if (Math.abs(percentChange) >= 2) {
        state.alerts.push({
          symbol,
          price,
          type: 'price_alert',
          timestamp: Date.now(),
        });
      }
    },
    clearOldAlerts(state) {
      const now = Date.now();
      state.alerts = state.alerts.filter((a) => now - a.timestamp < 10000); // 10s toast window
    },
  },
});

export const { updatePrice, clearOldAlerts } = cryptoSlice.actions;
export default cryptoSlice.reducer;

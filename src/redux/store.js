import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './slices/cryptoSlice';
// (Add more slices as needed later)

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

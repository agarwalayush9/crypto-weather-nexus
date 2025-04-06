'use client';

import { createContext, useState } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [cryptoFavorites, setCryptoFavorites] = useState([]); // Store favorite cryptocurrencies
  const [cityFavorites, setCityFavorites] = useState([]); // Store favorite cities
  const [fetchedData, setFetchedData] = useState({}); // Store all fetched data
  const [loading, setLoading] = useState(false); // Global loading state
  const [error, setError] = useState(null); // Global error state

  // Add a cryptocurrency to favorites
  const addCryptoFavorite = (crypto) => {
    setCryptoFavorites((prev) => [...prev, crypto]);
  };

  // Remove a cryptocurrency from favorites
  const removeCryptoFavorite = (cryptoId) => {
    setCryptoFavorites((prev) => prev.filter((crypto) => crypto.id !== cryptoId));
  };

  // Add a city to favorites
  const addCityFavorite = (city) => {
    setCityFavorites((prev) => [...prev, city]);
  };

  // Remove a city from favorites
  const removeCityFavorite = (cityName) => {
    setCityFavorites((prev) => prev.filter((city) => city.name !== cityName));
  };

  return (
    <GlobalContext.Provider
      value={{
        cryptoFavorites,
        addCryptoFavorite,
        removeCryptoFavorite,
        cityFavorites,
        addCityFavorite,
        removeCityFavorite,
        fetchedData,
        setFetchedData,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
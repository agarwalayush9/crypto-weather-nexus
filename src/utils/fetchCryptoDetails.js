export async function fetchCryptoDetails(id) {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true`);
    return res.json();
  }
  
  export async function fetchCryptoMarketChart(id) {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`);
    return res.json();
  }
  
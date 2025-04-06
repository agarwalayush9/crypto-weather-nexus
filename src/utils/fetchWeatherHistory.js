export async function fetchWeatherHistory(lat, lon) {
  const currentTime = Math.floor(Date.now() / 1000);
  const oneDay = 86400; // seconds in a day

  const history = await Promise.all(
    Array.from({ length: 5 }, (_, i) => {
      const timestamp = currentTime - (i + 1) * oneDay;
      return fetch(
        `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${API_KEY}&units=metric`
      )
        .then((res) => res.json())
        .catch((err) => {
          console.error("Fetch failed:", err);
          return null;
        });
    })
  );

  return history
    .filter((day) => day?.current) // 👈 Only include valid days
    .map((day) => ({
      date: new Date(day.current.dt * 1000).toLocaleDateString(),
      temp: day.current.temp,
      humidity: day.current.humidity,
    }));
}

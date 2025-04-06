CryptoWeather Nexus
CryptoWeather Nexus is a web application that combines cryptocurrency data, weather updates, and news into a single dashboard. It provides real-time updates, price alerts, and a responsive design for seamless user experience across devices.

Features
Weather Module: Displays weather data for multiple cities with real-time alerts.
Crypto Module: Shows cryptocurrency prices, market trends, and price alerts.
Nexus News: Fetches and displays the latest news related to cryptocurrency.
Responsive Design: Optimized for both desktop and mobile views.
Price Alerts: Notifies users when cryptocurrency prices cross a threshold.
Auto-Refresh: Automatically refreshes data when API limits are hit.

Setup Instructions
Prerequisites
Node.js: Ensure you have Node.js installed (v16 or higher recommended).
npm or yarn: Package manager for installing dependencies.
API Keys:
OpenWeatherMap API key for weather data.
CoinGecko API for cryptocurrency data.
NewsData.io API key for news.

Installation

1. Clone the repository:

git clone https://github.com/your-username/crypto-weather-nexus.git
cd crypto-weather-nexus

2. npm install

# or

yarn install

3. Create a .env file in the root directory and add your API keys:

NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_COINGECKO_API_KEY=your_coingecko_api_key
NEXT_PUBLIC_NEWSDATA_API_KEY=your_newsdata_api_key

4. Start the development server:
   npm run dev

# or

yarn dev

5. Open the app in your browser:
   http://localhost:3000

Design Decisions

1. Responsive Design
   Used Tailwind CSS for styling and responsiveness.
   Navbar collapses into a hamburger menu on mobile devices.
   Footer and other components adjust dynamically for smaller screens.
2. State Management
   Used React's useState and useContext for managing global states like loading, error, cryptoFavorites, and cityFavorites.
   Implemented GlobalContext to share state across modules.
3. Error Handling
   Displayed user-friendly error messages when API calls fail.
   Added auto-refresh functionality with a countdown timer to retry fetching data.
4. Real-Time Updates
   Integrated WebSocket-like functionality for real-time price updates in the Crypto module.
   Added weather and price alerts for better user engagement.
5. Code Structure
   Organized the project into modular components:
   Navbar.js: Handles navigation and responsiveness.
   CryptoCard.js: Displays individual cryptocurrency data.
   GlobalContext.js: Manages global state for favorites and fetched data.
   Loading.js and Error.js: Reusable components for loading spinners and error messages.

Future Enhancements
User Authentication: Allow users to save preferences and alerts across sessions.
Dark Mode: Add a toggle for light/dark themes.
Custom Alerts: Let users set custom thresholds for price and weather alerts.
Localization: Support multiple languages for a global audience.

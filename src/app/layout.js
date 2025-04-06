// app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";
import { ThemeWrapper } from "../components/ThemeWrapper";
import { Inter } from 'next/font/google';
import { ReduxProvider } from "@/providers/ReduxProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "CryptoWeather Nexus",
  description: "A dashboard combining weather, crypto, and real-time data.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       
          <Navbar />
          <ReduxProvider>
          {children}
          </ReduxProvider>
       
      </body>
    </html>
  );
}

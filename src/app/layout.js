// app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { GlobalProvider } from "@/context/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CryptoWeather Nexus",
  description: "A dashboard combining weather, crypto, and real-time data.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <GlobalProvider>
          <Navbar />
          <ReduxProvider>
            <main className="flex-grow">{children}</main>
          </ReduxProvider>
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}

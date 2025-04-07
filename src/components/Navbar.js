"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const modules = [
    {
      name: "Weather Module",
      icon: "⛅",
      href: "/weather",
      color: "from-sky-400 to-blue-500 border-sky-500",
      text: "text-sky-200",
    },
    {
      name: "Crypto Module",
      icon: "₿",
      href: "/crypto",
      color: "from-purple-400 to-pink-500 border-purple-500",
      text: "text-purple-200",
    },
    {
      name: "Nexus News",
      icon: "📰",
      href: "/nexus",
      color: "from-green-400 to-teal-500 border-green-500",
      text: "text-green-200",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Hide navbar when scrolling down
      } else {
        setIsVisible(true); // Show navbar when scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-transparent transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center px-4 py-3">
        {/* Mobile Header */}
        <div className="w-full flex justify-between items-center sm:hidden">
          <h1 className="text-lg font-bold text-white">CryptoWeather Nexus</h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex flex-wrap justify-center gap-6">
          {modules.map((mod) => {
            const isActive = pathname === mod.href;
            return (
              <Link
                key={mod.name}
                href={mod.href}
                className={`relative px-6 py-3 border rounded-xl font-semibold text-base bg-white/5 backdrop-blur-lg ${mod.color} ${mod.text} shadow-lg transition transform hover:scale-105 ${
                  isActive ? "ring-2 ring-offset-2 ring-white/20" : ""
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2 text-xl">{mod.icon}</span>
                {mod.name}
                {isActive && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-70"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="w-full sm:hidden bg-black/60 backdrop-blur-lg">
            <div className="flex flex-col items-center gap-4 py-4">
              {modules.map((mod) => {
                const isActive = pathname === mod.href;
                return (
                  <Link
                    key={mod.name}
                    href={mod.href}
                    className={`w-full text-center px-4 py-3 border rounded-xl font-semibold text-base bg-white/5 backdrop-blur-lg ${mod.color} ${mod.text} shadow-lg transition transform hover:scale-105 ${
                      isActive ? "ring-2 ring-offset-2 ring-white/20" : ""
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-2 text-xl">{mod.icon}</span>
                    {mod.name}
                    {isActive && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-70"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

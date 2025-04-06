"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex flex-wrap justify-center gap-6 bg-transparent px-6 py-4 rounded-xl shadow-md backdrop-blur-lg">
        {modules.map((mod) => {
          const isActive = pathname === mod.href;

          return (
            <Link
              key={mod.name}
              href={mod.href}
              className={`relative px-6 py-3 border rounded-xl font-semibold text-base backdrop-blur-lg bg-white/5 border-opacity-30 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-${mod.color.split(" ")[0]}/50 
                ${mod.color} ${mod.text} 
                ${isActive ? "ring-2 ring-offset-2 ring-white/20" : ""}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300`}
            >
              <span className="mr-2 text-xl">{mod.icon}</span>
              {mod.name}

              {/* Glowing indicator if active */}
              {isActive && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-70"></span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

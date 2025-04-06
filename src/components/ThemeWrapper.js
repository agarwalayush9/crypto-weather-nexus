'use client';

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const routeThemes = {
  "/": "bg-gradient-to-br from-gray-700 via-gray-900 to-black",
  "/crypto": "bg-gradient-to-br from-purple-600 via-pink-500 to-red-500",
  "/weather": "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]",
};

export function ThemeWrapper({ children }) {
  const pathname = usePathname();
  const theme = routeThemes[pathname] || routeThemes["/"];

  return (
    <motion.div
      className={`min-h-screen text-white transition-colors duration-500 ${theme}`}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

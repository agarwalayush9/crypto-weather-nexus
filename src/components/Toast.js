'use client';

import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

export default function Toast() {
  const alerts = useSelector((state) => state.crypto.alerts);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.symbol + alert.timestamp}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-cyan-500/10 border border-cyan-300 text-cyan-100 px-4 py-3 rounded-lg shadow"
          >
            🔔 {alert.symbol.toUpperCase()} price alert: ${alert.price.toFixed(2)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

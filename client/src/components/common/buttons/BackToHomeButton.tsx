'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function BackToHomeButton() {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="fixed bottom-8 left-8 z-[1000]"
    >
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.1, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-emerald-300/40 blur-3xl"
      />

      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 200%' }}
        className="absolute inset-0 rounded-full blur-lg opacity-40 bg-gradient-to-r from-emerald-300 via-pink-200 to-emerald-300"
      />

      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-gradient-to-br from-emerald-400 to-pink-300 text-white shadow-2xl"
          aria-label="Back to home"
        >
          <motion.div
            animate={{ y: [0, -2, 0, 2, 0], rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <Home size={24} />
          </motion.div>

          <div className="absolute inset-0 overflow-hidden rounded-full">
            <svg
              className="absolute bottom-0 left-0 h-full w-full opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 1200 120"
            >
              <path
                d="M321.39 56.44C186.45 35.59 79.15 66.6 0 93.68V0h1200v27.35c-110.46 41.42-241.55 73.24-378.61 54.09C643.06 62.7 456.33 77.29 321.39 56.44z"
                fill="url(#waveGradientHome)"
              />
              <defs>
                <linearGradient id="waveGradientHome" x1="0" y1="0" x2="1200" y2="0">
                  <stop offset="0%" stopColor="#ffffff55" />
                  <stop offset="100%" stopColor="#ffffff00" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.button>
      </Link>
    </motion.div>
  );
}
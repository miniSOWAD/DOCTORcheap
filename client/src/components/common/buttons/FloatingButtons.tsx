'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaAppleAlt, FaRegFlag } from 'react-icons/fa';
import AiDoctorModal from '../modals/AiDoctorModal';
import DietModal from '../modals/DietModal';
import ReportUsModal from '../modals/ReportUsModal';

type Ripple = { id: number };

interface FloatingButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  delay?: number;
  glowFrom: string;
  glowVia: string;
  glowTo: string;
  solidFrom: string;
  solidTo: string;
  tooltipText: string;
}

const FancyFloatingButton: React.FC<FloatingButtonProps> = ({
  icon,
  label,
  onClick,
  delay = 0,
  glowFrom,
  glowVia,
  glowTo,
  solidFrom,
  solidTo,
  tooltipText,
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleRipple = () => {
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 800);
  };

  return (
    <motion.div
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, delay }}
      className="relative group"
    >
      <motion.div
        animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0.1, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
        className={`absolute inset-0 rounded-full blur-3xl ${glowFrom}`}
      />

      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 200%' }}
        className={`absolute inset-0 rounded-full blur-lg opacity-50 bg-gradient-to-r ${glowFrom} ${glowVia} ${glowTo}`}
      />

      <motion.button
        onClick={() => {
          handleRipple();
          onClick();
        }}
        whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
        className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl bg-gradient-to-br ${solidFrom} ${solidTo} text-white overflow-hidden border border-white/40`}
        aria-label={label}
      >
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-white/40"
          />
        ))}

        <motion.div
          animate={{
            y: [0, -2, 0, 2, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-2xl relative z-10"
        >
          {icon}
        </motion.div>

        <div className="absolute inset-0 overflow-hidden rounded-full">
          <svg
            className="absolute bottom-0 left-0 w-full h-full opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M321.39 56.44C186.45 35.59 79.15 66.6 0 93.68V0h1200v27.35c-110.46 41.42-241.55 73.24-378.61 54.09C643.06 62.7 456.33 77.29 321.39 56.44z"
              fill="url(#waveGradient)"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="1200" y2="0">
                <stop offset="0%" stopColor="#ffffff55" />
                <stop offset="100%" stopColor="#ffffff00" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.button>

      <motion.span
        initial={{ opacity: 0, x: 8 }}
        whileHover={{ opacity: 1, x: -10 }}
        transition={{ type: 'tween', duration: 0.25 }}
        className="pointer-events-none absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white text-pink-600 font-semibold text-sm px-3 py-1 rounded-full shadow-md border border-pink-200 backdrop-blur-sm"
      >
        {tooltipText}
      </motion.span>
    </motion.div>
  );
};

export default function FloatingButtons() {
  const [openAi, setOpenAi] = useState(false);
  const [openDiet, setOpenDiet] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  return (
    <>
      <AnimatePresence>
        <div className="fixed bottom-8 right-8 z-[1000] flex flex-col items-end gap-4">
          <FancyFloatingButton
            icon={<FaAppleAlt />}
            label="Diet"
            tooltipText="Diet Suggestions"
            onClick={() => setOpenDiet(true)}
            delay={0}
            glowFrom="from-pink-300/50"
            glowVia="via-rose-200/50"
            glowTo="to-pink-300/50"
            solidFrom="from-pink-300"
            solidTo="to-rose-300"
          />

          <FancyFloatingButton
            icon={<FaRobot />}
            label="AI Doctor"
            tooltipText="Talk to AI Doctor"
            onClick={() => setOpenAi(true)}
            delay={0.1}
            glowFrom="from-pink-400/50"
            glowVia="via-fuchsia-200/50"
            glowTo="to-pink-300/50"
            solidFrom="from-pink-400"
            solidTo="to-fuchsia-300"
          />

          <FancyFloatingButton
            icon={<FaRegFlag />}
            label="Report Us"
            tooltipText="Send a Report"
            onClick={() => setOpenReport(true)}
            delay={0.2}
            glowFrom="from-rose-300/50"
            glowVia="via-pink-200/50"
            glowTo="to-rose-300/50"
            solidFrom="from-rose-300"
            solidTo="to-pink-400"
          />
        </div>
      </AnimatePresence>

      <AiDoctorModal open={openAi} onClose={() => setOpenAi(false)} />
      <DietModal open={openDiet} onClose={() => setOpenDiet(false)} />
      <ReportUsModal open={openReport} onClose={() => setOpenReport(false)} />
    </>
  );
}
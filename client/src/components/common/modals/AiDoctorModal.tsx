'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AiDoctorModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-md flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-3xl p-6 w-full max-w-lg border border-pink-200 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              AI Doctor Assistant
            </h2>

            <p className="text-gray-600 mb-6">
              Describe your symptoms and the AI will give basic guidance.
            </p>

            <textarea
              className="w-full border border-pink-200 rounded-xl p-3 outline-none"
              placeholder="Describe your symptoms..."
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-pink-300"
              >
                Cancel
              </button>

              <button className="px-4 py-2 rounded-lg bg-pink-500 text-white">
                Ask AI
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
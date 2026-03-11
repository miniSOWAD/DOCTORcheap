'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ReportUploadForm from '../forms/ReportUploadForm';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ReportUsModal({ open, onClose }: Props) {
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
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-pink-200 bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6 shadow-2xl"
          >
            <div className="sticky top-0 z-10 -mx-6 -mt-6 mb-6 rounded-t-3xl border-b border-pink-100 bg-white/80 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-pink-600">
                    Report an Issue
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Tell us about problems, bugs, complaints, or upload a report file.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-500 shadow-sm transition hover:bg-pink-50"
                  aria-label="Close report modal"
                >
                  ✕
                </motion.button>
              </div>
            </div>

            <div className="rounded-2xl border border-pink-100 bg-white/70 p-4 shadow-sm">
              <ReportUploadForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
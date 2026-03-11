'use client';

import ReportUploadForm from '../forms/ReportUploadForm';

export default function ReportUsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-purple-800">Report Us</h2>
          <button onClick={onClose} className="border px-4 py-2 rounded-xl">Close</button>
        </div>
        <ReportUploadForm />
      </div>
    </div>
  );
}
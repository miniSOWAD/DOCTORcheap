'use client';

export default function AiDoctorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-purple-800 mb-3">AI Doctor</h2>
        <p className="mb-4">This assistant can provide basic health guidance, but it is not a final diagnosis.</p>
        <textarea className="w-full border rounded-xl p-4 min-h-32" placeholder="Describe symptoms here..." />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded-xl">Close</button>
          <button className="px-4 py-2 bg-purple-700 text-white rounded-xl">Ask</button>
        </div>
      </div>
    </div>
  );
}
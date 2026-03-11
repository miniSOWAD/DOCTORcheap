'use client';

import { useState } from 'react';
import AiDoctorModal from '../modals/AiDoctorModal';
import DietModal from '../modals/DietModal';
import ReportUsModal from '../modals/ReportUsModal';

export default function FloatingButtons() {
  const [openAi, setOpenAi] = useState(false);
  const [openDiet, setOpenDiet] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button onClick={() => setOpenDiet(true)} className="bg-purple-700 text-white px-5 py-3 rounded-full shadow-lg">
          Diet
        </button>
        <button onClick={() => setOpenAi(true)} className="bg-black text-white px-5 py-3 rounded-full shadow-lg">
          AI Doctor
        </button>
        <button onClick={() => setOpenReport(true)} className="bg-pink-500 text-white px-5 py-3 rounded-full shadow-lg">
          Report Us
        </button>
      </div>

      <DietModal open={openDiet} onClose={() => setOpenDiet(false)} />
      <AiDoctorModal open={openAi} onClose={() => setOpenAi(false)} />
      <ReportUsModal open={openReport} onClose={() => setOpenReport(false)} />
    </>
  );
}
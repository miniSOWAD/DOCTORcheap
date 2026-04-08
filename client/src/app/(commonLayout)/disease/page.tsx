// client/src/app/disease/page.tsx

import { Zap, Activity } from 'lucide-react';
import type { Metadata } from 'next';
import DiseasePageClient from './DiseasePageClient';
import { getServerDiseases } from '@/services/disease.service';
import type { IDisease } from '@/types/disease';

export const metadata: Metadata = {
  title: 'Disease Database | Premium Health Guidance | DOCTORcheap',
  description:
    'Explore detailed information on major diseases worldwide. Get vetted symptoms, causes, cure guidance, prevention methods, and global health statistics.',
};

// --- DATA DEFINITION: The "First Static 10" ---
// We define them here with proper IDs and structure matching the backend schema
const STATIC_TOP_DISEASES: IDisease[] = [
  {
    _id: 'static-001-malaria', // Unique pseudo-IDs
    name: 'Malaria',
    photo: '/static/diseases/malaria.jpg', // Place images in client/public/static/diseases/
    description:
      'A life-threatening disease caused by parasites that are transmitted to people through the bites of infected female Anopheles mosquitoes.',
    seriousnessLevel: 'high',
    causes: [
      'Plasmodium parasites (P. falciparum most severe)',
      'Bite of infected Anopheles mosquito',
    ],
    symptoms: [
      'High Fever (cyclic)',
      'Chills & Shaking',
      'Headache',
      'Fatigue',
      'Muscle Aches',
    ],
    warningSymptoms: [
      'Severe Anemia',
      'Respiratory distress',
      'Coma/Unconsciousness (Cerebral Malaria)',
      'Organ failure',
    ],
    firstThingToDo:
      'Immediately seek medical attention if symptoms appear after travel to prevalent regions. Early diagnosis is key.',
    doctorTypes: ['Infectious Disease Specialist', 'General Physician'],
    howToCure:
      'Antimalarial medications prescribed by a doctor (combination therapy like ACTs are standard). Must complete full course.',
    howToAvoid:
      'Use insecticide-treated mosquito nets (LLINs), indoor residual spraying, wear protective clothing, use mosquito repellents, and consider antimalarial chemoprophylaxis when traveling.',
    prevalentRegions: ['Sub-Saharan Africa', 'Southeast Asia', 'Eastern Mediterranean', 'Western Pacific'],
    annualAffected: 247000000, // ~247 million cases globally (realistic stats)
    annualDeaths: 619000, // ~619,000 deaths (realistic stats)
  },
  // ADD 9 MORE STATIC DISEASES HERE (using exactly this structure)
  // ... (Tuberculosis, COVID-19, Influenza, Dengue, Diabetes Type 2, Hypertension, HIV/AIDS, Cholera, Asthma)
];

// Revalidation time for this specific page data (1 hour)
export const revalidate = 3600;

export default async function DiseasePage() {
  // 1. SERVER-SIDE FETCH: Fetch the *next* batch of diseases (after the top 10) from the DB.
  // We specify pagination to avoid duplicating the top data.
  const dbData = await getServerDiseases(1, 10); // Page 1 from DB (assuming the DB contains different data)

  // 2. Combine the lists
  // Important: We prepend the Static 10 as requested.
  const initialDiseases = [...STATIC_TOP_DISEASES, ...(dbData.data || [])];

  return (
    <div className="space-y-12">
      {/* PREMIUM HERO SECTION - Matches HomePage Style */}
      <section className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-pink-50 p-10 shadow-[0_20px_80px_rgba(16,185,129,0.10)]">
        <div className="absolute -left-12 top-0 h-44 w-44 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-pink-200/40 blur-3xl" />

        <div className="relative flex flex-col items-start gap-3">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
            <Zap size={16} />
            Global Medical Knowledge Graph
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Vetted information on{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-pink-400 bg-clip-text text-transparent">
              major diseases worldwide
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            Explore a comprehensive, structured database of medical conditions. Get symptoms, cause
            analysis, professional cure guidance, and prevention strategies validated by medical experts.
          </p>
        </div>
      </section>

      {/* RENDER DYNAMIC LIST (AFTER TOP 10) + LOAD MORE */}
      <DiseasePageClient
        initialDiseases={initialDiseases}
        initialCount={STATIC_TOP_DISEASES.length}
        dbTotalAvailable={dbData.total}
      />
    </div>
  );
}
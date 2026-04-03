// client/src/app/disease/DiseasePageClient.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, ShieldCheck, Apple, MapPin, Skull, PlusCircle, Target } from 'lucide-react';
import Image from 'next/image';
import { getDiseases } from '@/services/disease.service';
import type { IDoctor } from '@/types/doctor';
import type { IDisease, SeriousnessLevel } from '@/types/disease';

interface DiseasePageClientProps {
  initialDiseases: IDisease[]; // Combined list from Server
  initialCount: number; // Number of static diseases prepended
  dbTotalAvailable: number; // Total potential diseases in DB
}

// Framer Motion animation configuration for the cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger effect
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DiseasePageClient({
  initialDiseases,
  initialCount,
  dbTotalAvailable,
}: DiseasePageClientProps) {
  const [diseases, setDiseases] = useState<IDisease[]>(initialDiseases);
  const [loading, setLoading] = useState(false);
  
  // We start loading further diseases after the first static 10 + first DB page
  const [dbPage, setDbPage] = useState(2); 

  // Calculate if there is more data in the database *after* what we already loaded.
  const hasMoreInDb = dbTotalAvailable > diseases.length - initialCount;

  // --- "LOAD MORE" LOGIC (CLIENT SIDE FETCH) ---
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      // We explicitly fetch further pages from the DB.
      const nextPageData = await getDiseases(dbPage, 10);
      
      if (nextPageData.success && nextPageData.data.length > 0) {
        setDiseases((prev) => [...prev, ...nextPageData.data]);
        setDbPage((prev) => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Featured & Vetted Conditions</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Showing curated premium medical entries followed by the latest global updates.
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-pink-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          Showing {diseases.length} condition{diseases.length !== 1 ? 's' : ''} out of {initialCount + dbTotalAvailable} total
        </div>
      </div>

      {/* FRAMER MOTION CONTAINER: Staggered animation matching Home Page style */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-10 xl:grid-cols-2"
      >
        <AnimatePresence>
          {diseases.map((disease, index) => (
            <DiseaseCard
              key={disease._id}
              disease={disease}
              // Mark the first 10 differently in the UI
              isFeatured={index < initialCount}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* LOAD MORE BUTTON - CLIENT INTERACTION */}
      {(hasMoreInDb) && (
        <div className="mt-12 flex justify-center">
          <motion.button
            whileHover={{ y: -3 }}
            onClick={handleLoadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition disabled:opacity-60"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <PlusCircle size={20} />
            )}
            {loading ? 'Fetching Knowledge...' : 'Load Further Conditions from Database'}
          </motion.button>
        </div>
      )}
    </section>
  );
}

// --- SUB-COMPONENT: Disease Card ---
// Designed to match the premium rounded, glassmorphic look of Home Page.
// It creates a minimal appearance while harboring complex data via structured sections.
function DiseaseCard({ disease, isFeatured }: { disease: IDisease; isFeatured: boolean }) {
  const seriousnessMap: Record<SeriousnessLevel, string> = {
    low: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    critical: 'bg-red-100 text-red-700 border-red-200',
  };

  // Safely grab the level, default to 'low' if undefined in the database
  const currentLevel = (disease.seriousnessLevel as SeriousnessLevel) || 'low';
  const badgeStyle = seriousnessMap[currentLevel] || seriousnessMap['low'];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: '0 25px 60px rgba(16,185,129,0.15)' }}
      className={`relative overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-lg ${
        isFeatured ? 'border-amber-200 ring-2 ring-amber-100' : ''
      }`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute right-6 top-6 z-10 rounded-full bg-gradient-to-r from-amber-400 to-pink-300 px-3 py-1 text-xs font-bold text-white shadow">
          FEATURED KNOWLEDGE
        </div>
      )}

      {/* Background Gradient Blur Blob */}
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-pink-100/40 blur-3xl" />

      {/* Header with Photo & Basic Info */}
      <div className="relative flex flex-col gap-6 p-8 sm:flex-row sm:items-center">
        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-3xl border-4 border-white shadow-md">
          <Image
            // Fallback to your public logo if no photo is provided
            src={disease.photo || '/logo.png'} 
            alt={disease.name || 'Disease Photo'}
            fill
            className="object-cover"
            sizes="(max-width: 112px) 100vw, 112px"
          />
        </div>

        <div className="flex-grow">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-slate-900">{disease.name || 'Unknown Condition'}</h3>
            {disease.seriousnessLevel && (
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${badgeStyle}`}>
                {disease.seriousnessLevel}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-slate-500 uppercase font-semibold tracking-wide">
            Required Specialist:{' '}
            <span className="text-emerald-700 font-bold">
              {disease.doctorTypes?.join(', ') || 'General Physician'}
            </span>
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {disease.description || 'No detailed description available at this time.'}
          </p>
        </div>
      </div>

      {/* Detailed Data Sections - Grid matching HomePage pattern */}
      <div className="relative grid gap-4 border-t border-emerald-50 bg-emerald-50/50 p-8 sm:grid-cols-2">
        <DataPoint icon={Target} title="Reason to Happen" list={disease.causes || []} />
        <DataPoint icon={Stethoscope} title="Key Symptoms" list={disease.symptoms || []} />
        <DataPoint icon={ShieldCheck} title="How to Avoid" description={disease.howToAvoid || 'Consult a healthcare provider for prevention strategies.'} />
        <DataPoint icon={Apple} title="Diet & Care Approach" description={disease.howToCure || 'Treatment approach depends on specific patient evaluation.'} />
      </div>

      {/* Statistics & Prevalence Section - Colored block matching StatsCard look */}
      <div className="relative grid border-t border-emerald-50 bg-gradient-to-br from-emerald-50 to-pink-50/50 p-8 sm:grid-cols-2 lg:grid-cols-3">
        <StatBlock
          icon={MapPin}
          title="Most Prevalence Region"
          value={disease.prevalentRegions?.slice(0, 2).join(', ') || 'Worldwide'}
        />
        <StatBlock
          icon={Skull}
          title="Annual Deaths (Approx)"
          value={(disease.annualDeaths || 0).toLocaleString()}
          color="text-red-700"
        />
        <StatBlock
          icon={Skull} 
          title="Annual Affected (Approx)"
          value={(disease.annualAffected || 0).toLocaleString()}
          color="text-emerald-700"
          className="lg:col-span-1 lg:mt-0 sm:mt-6 sm:col-span-2"
        />
      </div>
    </motion.div>
  );
}

// Minimal Helper: List or Description Data Display
function DataPoint({
  icon: Icon,
  title,
  list,
  description,
}: {
  icon: React.ElementType;
  title: string;
  list?: string[];
  description?: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-emerald-50 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-pink-100 text-emerald-700 shadow-inner">
        <Icon size={20} />
      </div>
      <div className="flex-grow">
        <h4 className="font-semibold text-slate-900">{title}</h4>
        {list ? (
          <ul className="mt-1 list-disc list-inside text-sm text-slate-600 leading-6">
            {list.slice(0, 4).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-sm text-slate-600 leading-6">{description}</p>
        )}
      </div>
    </div>
  );
}

// Minimal Helper: Statistical Data Display
function StatBlock({
  icon: Icon,
  title,
  value,
  color = 'text-slate-900',
  className = '',
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="text-emerald-700 mt-1">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </p>
        <h5 className={`mt-1 text-lg font-bold ${color}`}>{value}</h5>
      </div>
    </div>
  );
}
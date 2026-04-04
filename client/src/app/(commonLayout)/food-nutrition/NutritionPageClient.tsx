// client/src/app/food-nutrition/NutritionPageClient.tsx

'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Activity, MapPin, Sparkles } from 'lucide-react';
import type { INutrition } from '@/types/nutrition';

interface Props {
  initialData: INutrition[];
  staticCount: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default function NutritionPageClient({ initialData, staticCount }: Props) {
  return (
    <section>
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900">Nutritional Database</h2>
        <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-pink-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          Showing {initialData.length} Items
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
      >
        {initialData.map((food, index) => (
          <NutritionCard 
            key={food._id || `food-${index}`} 
            food={food} 
            isStatic={index < staticCount} 
          />
        ))}
      </motion.div>
    </section>
  );
}

function NutritionCard({ food, isStatic }: { food: INutrition; isStatic: boolean }) {
  // Safely determine which image URL to use, falling back to a placeholder
  const displayImage = food.image || food.imageUrl || '/logo.png';

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(16,185,129,0.12)' }}
      className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-lg transition-all"
    >
      {/* Featured Badge for the Static First 6 */}
      {isStatic && (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur-md">
          Featured
        </div>
      )}

      {/* Food Image */}
      <div className="relative h-56 w-full flex-shrink-0 bg-emerald-50">
        <img
          src={displayImage}
          alt={food.name || 'Nutrition Item'}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-grow flex-col p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-slate-900">{food.name || 'Unknown Food'}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
            {food.benefits || 'General nutritional benefits.'}
          </p>
        </div>

        {/* Structured Data Grid */}
        <div className="mt-auto space-y-3 rounded-2xl bg-slate-50 p-4">
          <InfoRow 
            icon={Sparkles} 
            label="Ingredients" 
            value={food.ingredients?.join(', ') || 'Various nutrients'} 
          />
          <InfoRow 
            icon={MapPin} 
            label="Origin" 
            value={food.origin || 'Global'} 
          />
          <InfoRow 
            icon={Activity} 
            label="Popular In" 
            value={food.popularIn || 'Worldwide'} 
          />
          <InfoRow 
            icon={ShieldCheck} 
            label="Used For" 
            value={food.usedForDiseases?.join(', ') || 'General well-being'} 
            valueColor="text-emerald-700 font-semibold"
          />
        </div>
      </div>
    </motion.div>
  );
}

// Helper component for clean data rows
function InfoRow({ icon: Icon, label, value, valueColor = 'text-slate-800' }: { icon: React.ElementType, label: string, value: string, valueColor?: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <div className="mt-0.5 text-emerald-500">
        <Icon size={16} />
      </div>
      <div>
        <span className="font-semibold text-slate-500">{label}: </span>
        <span className={`${valueColor} line-clamp-1`}>{value}</span>
      </div>
    </div>
  );
}
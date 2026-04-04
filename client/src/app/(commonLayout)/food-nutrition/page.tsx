// client/src/app/food-nutrition/page.tsx

import { Apple } from 'lucide-react';
import type { Metadata } from 'next';
import NutritionPageClient from './NutritionPageClient';
import { getServerNutrition } from '@/services/nutrition.service';
import { INutrition } from '@/types/nutrition';

export const metadata: Metadata = {
  title: 'Food & Nutrition | DOCTORcheap',
  description: 'Explore dietary intelligence, healthy foods, and nutrition guidance.',
};

// Your original static 6 items, typed securely
const STATIC_FOODS: INutrition[] = [
  {
    _id: 'static-1',
    name: 'Salmon',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400',
    ingredients: ['Omega-3', 'Protein', 'Vitamin D'],
    benefits: 'Boosts brain and heart health',
    origin: 'North Atlantic',
    popularIn: 'Japan, Norway',
    usedForDiseases: ['Heart Disease', 'Depression'],
  },
  {
    _id: 'static-2',
    name: 'Avocado',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400',
    ingredients: ['Healthy Fats', 'Fiber', 'Potassium'],
    benefits: 'Improves digestion and skin',
    origin: 'Mexico',
    popularIn: 'USA, Latin America',
    usedForDiseases: ['Hypertension', 'Digestive Issues'],
  },
  {
    _id: 'static-3',
    name: 'Broccoli',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=400',
    ingredients: ['Vitamin C', 'Fiber', 'Antioxidants'],
    benefits: 'Boosts immunity',
    origin: 'Italy',
    popularIn: 'Worldwide',
    usedForDiseases: ['Cancer Prevention'],
  },
  {
    _id: 'static-4',
    name: 'Blueberries',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&q=80&w=400',
    ingredients: ['Antioxidants', 'Vitamin K'],
    benefits: 'Improves brain function',
    origin: 'North America',
    popularIn: 'USA, Canada',
    usedForDiseases: ['Aging', 'Memory Loss'],
  },
  {
    _id: 'static-5',
    name: 'Spinach',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400',
    ingredients: ['Iron', 'Magnesium'],
    benefits: 'Boosts energy',
    origin: 'Persia',
    popularIn: 'India, USA',
    usedForDiseases: ['Anemia'],
  },
  {
    _id: 'static-6',
    name: 'Almonds',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=400',
    ingredients: ['Vitamin E', 'Healthy Fats'],
    benefits: 'Supports heart health',
    origin: 'Middle East',
    popularIn: 'Worldwide',
    usedForDiseases: ['Cholesterol'],
  },
];

export default async function FoodNutritionPage() {
  // 1. Fetch fresh data from the database
  const dbData = await getServerNutrition();

  // 2. Combine static array with database array
  const combinedNutrition = [...STATIC_FOODS, ...dbData];

  return (
    <div className="space-y-12">
      {/* PREMIUM HERO SECTION */}
      <section className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-pink-50 p-10 shadow-[0_20px_80px_rgba(16,185,129,0.10)]">
        <div className="absolute -left-12 top-0 h-44 w-44 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-pink-200/40 blur-3xl" />

        <div className="relative flex flex-col items-start gap-3">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
            <Apple size={16} />
            Food & Nutrition Intelligence
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Dietary guidance for a{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-pink-400 bg-clip-text text-transparent">
              healthier lifestyle
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            Discover the ingredients, benefits, and medical applications of everyday foods. Optimize your diet based on condition-specific nutritional intelligence.
          </p>
        </div>
      </section>

      {/* PASS COMBINED DATA TO CLIENT */}
      <NutritionPageClient initialData={combinedNutrition} staticCount={STATIC_FOODS.length} />
    </div>
  );
}
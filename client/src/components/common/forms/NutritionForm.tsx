'use client';

import { useState } from 'react';
import { INutrition } from '@/types/nutrition';
import { splitCsvToArray } from '@/lib/utils';

export default function NutritionForm({ initialData, onSubmit }: { initialData?: INutrition | null; onSubmit: (payload: INutrition) => Promise<void> }) {
  const [form, setForm] = useState({
    // 1. Updated names to match INutrition interface
    // 2. Added ?. right before .join()
    name: initialData?.name || '',
    ingredients: initialData?.ingredients?.join(', ') || '',
    usedForDiseases: initialData?.usedForDiseases?.join(', ') || '',
    benefits: initialData?.benefits || '',
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          _id: initialData?._id,
          name: form.name,
          ingredients: splitCsvToArray(form.ingredients),
          usedForDiseases: splitCsvToArray(form.usedForDiseases),
          benefits: form.benefits,
        });
      }}
      className="space-y-3 bg-white p-5 rounded-2xl border"
    >
      <input 
        className="w-full border rounded-xl px-4 py-3" 
        placeholder="Food Name" 
        value={form.name} 
        onChange={(e) => setForm({ ...form, name: e.target.value })} 
      />
      <textarea 
        className="w-full border rounded-xl px-4 py-3" 
        placeholder="Ingredients comma separated" 
        value={form.ingredients} 
        onChange={(e) => setForm({ ...form, ingredients: e.target.value })} 
      />
      <textarea 
        className="w-full border rounded-xl px-4 py-3" 
        placeholder="Used for diseases comma separated" 
        value={form.usedForDiseases} 
        onChange={(e) => setForm({ ...form, usedForDiseases: e.target.value })} 
      />
      <textarea 
        className="w-full border rounded-xl px-4 py-3" 
        placeholder="Benefits" 
        value={form.benefits} 
        onChange={(e) => setForm({ ...form, benefits: e.target.value })} 
      />
      <button className="bg-purple-700 text-white px-5 py-3 rounded-xl">Save Nutrition</button>
    </form>
  );
}
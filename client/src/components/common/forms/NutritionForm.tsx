'use client';

import { useState } from 'react';
import { INutrition } from '@/types/nutrition';
import { splitCsvToArray } from '@/lib/utils';

export default function NutritionForm({ initialData, onSubmit }: { initialData?: INutrition | null; onSubmit: (payload: INutrition) => Promise<void> }) {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    recommendedFoods: initialData?.recommendedFoods.join(', ') || '',
    avoidedFoods: initialData?.avoidedFoods.join(', ') || '',
    notes: initialData?.notes || '',
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          _id: initialData?._id,
          title: form.title,
          recommendedFoods: splitCsvToArray(form.recommendedFoods),
          avoidedFoods: splitCsvToArray(form.avoidedFoods),
          notes: form.notes,
        });
      }}
      className="space-y-3 bg-white p-5 rounded-2xl border"
    >
      <input className="w-full border rounded-xl px-4 py-3" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea className="w-full border rounded-xl px-4 py-3" placeholder="Recommended foods comma separated" value={form.recommendedFoods} onChange={(e) => setForm({ ...form, recommendedFoods: e.target.value })} />
      <textarea className="w-full border rounded-xl px-4 py-3" placeholder="Avoided foods comma separated" value={form.avoidedFoods} onChange={(e) => setForm({ ...form, avoidedFoods: e.target.value })} />
      <textarea className="w-full border rounded-xl px-4 py-3" placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <button className="bg-purple-700 text-white px-5 py-3 rounded-xl">Save Nutrition</button>
    </form>
  );
}
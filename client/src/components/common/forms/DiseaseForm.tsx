'use client';

import { useState } from 'react';
import { IDisease } from '@/types/disease';
import { splitCsvToArray } from '@/lib/utils';

export default function DiseaseForm({ initialData, onSubmit }: { initialData?: IDisease | null; onSubmit: (payload: IDisease) => Promise<void> }) {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    symptoms: initialData?.symptoms.join(', ') || '',
    causes: initialData?.causes.join(', ') || '',
    precautions: initialData?.precautions.join(', ') || '',
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          _id: initialData?._id,
          name: form.name,
          symptoms: splitCsvToArray(form.symptoms),
          causes: splitCsvToArray(form.causes),
          precautions: splitCsvToArray(form.precautions),
        });
      }}
      className="space-y-3 bg-white p-5 rounded-2xl border"
    >
      <input className="w-full border rounded-xl px-4 py-3" placeholder="Disease name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <textarea className="w-full border rounded-xl px-4 py-3" placeholder="Symptoms comma separated" value={form.symptoms} onChange={(e) => setForm({ ...form, symptoms: e.target.value })} />
      <textarea className="w-full border rounded-xl px-4 py-3" placeholder="Causes comma separated" value={form.causes} onChange={(e) => setForm({ ...form, causes: e.target.value })} />
      <textarea className="w-full border rounded-xl px-4 py-3" placeholder="Precautions comma separated" value={form.precautions} onChange={(e) => setForm({ ...form, precautions: e.target.value })} />
      <button className="bg-purple-700 text-white px-5 py-3 rounded-xl">Save Disease</button>
    </form>
  );
}
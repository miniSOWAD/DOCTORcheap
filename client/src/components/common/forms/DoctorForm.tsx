'use client';

import { useState } from 'react';
import { IDoctor } from '@/types/doctor';

export default function DoctorForm({ initialData, onSubmit }: { initialData?: IDoctor | null; onSubmit: (payload: IDoctor) => Promise<void> }) {
  const [form, setForm] = useState<IDoctor>(
    initialData || {
      name: '',
      specialization: '',
      qualification: '',
      experience: 0,
      consultationFee: 0,
      about: '',
    },
  );

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-3 bg-white p-5 rounded-2xl border">
      <input className="w-full border rounded-xl px-4 py-3" placeholder="Doctor name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="w-full border rounded-xl px-4 py-3" placeholder="Specialization" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
      <input className="w-full border rounded-xl px-4 py-3" placeholder="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
      <input className="w-full border rounded-xl px-4 py-3" type="number" placeholder="Experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: Number(e.target.value) })} />
      <input className="w-full border rounded-xl px-4 py-3" type="number" placeholder="Consultation Fee" value={form.consultationFee} onChange={(e) => setForm({ ...form, consultationFee: Number(e.target.value) })} />
      <textarea className="w-full border rounded-xl px-4 py-3" placeholder="About" value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
      <button className="bg-purple-700 text-white px-5 py-3 rounded-xl">Save Doctor</button>
    </form>
  );
}
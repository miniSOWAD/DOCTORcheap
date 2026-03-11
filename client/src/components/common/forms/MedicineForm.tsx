'use client';

import { useState } from 'react';
import { IMedicine } from '@/types/medicine';
import { splitCsvToArray } from '@/lib/utils';
import { uploadFile } from '@/services/upload.service';

export default function MedicineForm({ initialData, onSubmit }: { initialData?: IMedicine | null; onSubmit: (payload: IMedicine) => Promise<void> }) {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    genericName: initialData?.genericName || '',
    brand: initialData?.brand || '',
    dosage: initialData?.dosage || '',
    price: initialData?.price || 0,
    usage: initialData?.usage || '',
    sideEffects: initialData?.sideEffects?.join(', ') || '',
    imageUrl: initialData?.imageUrl || '',
    pdfUrl: initialData?.pdfUrl || '',
  });

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>, field: 'imageUrl' | 'pdfUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const uploaded = await uploadFile(file);
    setForm((prev) => ({ ...prev, [field]: uploaded.secure_url }));
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          _id: initialData?._id,
          name: form.name,
          genericName: form.genericName,
          brand: form.brand,
          dosage: form.dosage,
          price: Number(form.price),
          usage: form.usage,
          sideEffects: splitCsvToArray(form.sideEffects),
          imageUrl: form.imageUrl,
          pdfUrl: form.pdfUrl,
        });
      }}
      className="space-y-3 bg-white p-5 rounded-2xl border"
    >
      <input className="w-full border rounded-xl px-4 py-3" placeholder="Medicine name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="w-full border rounded-xl px-4 py-3" placeholder="Generic name" value={form.genericName} onChange={(e) => setForm({ ...form, genericName: e.target.value })} />
      <input className="w-full border rounded-xl px-4 py-3" placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
      <input className="w-full border rounded-xl px-4 py-3" placeholder="Dosage" value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} />
      <input className="w-full border rounded-xl px-4 py-3" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
      <textarea className="w-full border rounded-xl px-4 py-3" placeholder="Usage" value={form.usage} onChange={(e) => setForm({ ...form, usage: e.target.value })} />
      <textarea className="w-full border rounded-xl px-4 py-3" placeholder="Side effects comma separated" value={form.sideEffects} onChange={(e) => setForm({ ...form, sideEffects: e.target.value })} />
      <div>
        <label className="block mb-2 font-semibold">Upload Image</label>
        <input type="file" accept="image/*" onChange={(e) => handleFile(e, 'imageUrl')} />
      </div>
      <div>
        <label className="block mb-2 font-semibold">Upload PDF</label>
        <input type="file" accept="application/pdf" onChange={(e) => handleFile(e, 'pdfUrl')} />
      </div>
      <button className="bg-purple-700 text-white px-5 py-3 rounded-xl">Save Medicine</button>
    </form>
  );
}
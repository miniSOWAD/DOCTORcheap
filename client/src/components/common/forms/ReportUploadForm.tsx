'use client';

import { useState } from 'react';
import { createReport } from '@/services/report.service';
import { uploadFile } from '@/services/upload.service';

export default function ReportUploadForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ userName: '', email: '', subject: '', message: '', fileUrl: '' });

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const uploaded = await uploadFile(file);
    setForm((prev) => ({ ...prev, fileUrl: uploaded.secure_url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createReport(form);
      alert('Report submitted');
      setForm({ userName: '', email: '', subject: '', message: '', fileUrl: '' });
    } catch {
      alert('Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="w-full border rounded-xl px-4 py-3" placeholder="Your name" value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })} />
      <input className="w-full border rounded-xl px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full border rounded-xl px-4 py-3" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
      <textarea className="w-full border rounded-xl px-4 py-3 min-h-32" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      <input type="file" onChange={handleFile} />
      <button className="bg-purple-700 text-white px-5 py-3 rounded-xl">{loading ? 'Submitting...' : 'Submit Report'}</button>
    </form>
  );
}
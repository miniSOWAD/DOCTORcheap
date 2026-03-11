'use client';

import { useState } from 'react';
import { createReport } from '@/services/report.service';
import { uploadFile } from '@/services/upload.service';

export default function ReportUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    userName: '',
    email: '',
    subject: '',
    message: '',
    fileUrl: '',
  });

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploaded = await uploadFile(file);
      setForm((prev) => ({ ...prev, fileUrl: uploaded.secure_url }));
    } catch (error) {
      console.error(error);
      alert('File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await createReport(form);
      alert('Report submitted successfully');
      setForm({
        userName: '',
        email: '',
        subject: '',
        message: '',
        fileUrl: '',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-pink-700">
            Your Name
          </label>
          <input
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            placeholder="Enter your name"
            value={form.userName}
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-pink-700">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-pink-700">
          Subject
        </label>
        <input
          className="w-full rounded-xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
          placeholder="Enter report subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-pink-700">
          Message
        </label>
        <textarea
          className="min-h-36 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
          placeholder="Describe the issue in detail..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-pink-700">
          Upload File
        </label>
        <input
          type="file"
          onChange={handleFile}
          className="block w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-pink-100 file:px-4 file:py-2 file:font-semibold file:text-pink-700 hover:file:bg-pink-200"
        />
        {uploading && (
          <p className="mt-2 text-sm text-pink-600">Uploading file...</p>
        )}
        {form.fileUrl && (
          <p className="mt-2 break-all text-sm text-green-600">
            File uploaded successfully
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || uploading}
          className="rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>
    </form>
  );
}
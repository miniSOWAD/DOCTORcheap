'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { forgotPassword } from '@/services/auth.service';

export default function ForgotPasswordPageClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    identifier: '',
    newPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await forgotPassword(form);
      alert('Password updated successfully');
      router.push('/login');
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.18),transparent_25%),linear-gradient(to_bottom_right,#ecfdf5,#ffffff,#fdf2f8)] px-6 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[32px] border border-white/30 bg-white/18 p-8 shadow-[0_20px_80px_rgba(16,185,129,0.14)] backdrop-blur-2xl md:p-10">
          <Link
            href="/login"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-pink-500"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>

          <div className="mb-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-pink-300 text-white shadow-md">
              <KeyRound size={24} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Reset password</h1>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Enter your email or ID and set a new password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Email or ID"
              value={form.identifier}
              onChange={(e) =>
                setForm({ ...form, identifier: e.target.value })
              }
              className="w-full rounded-2xl border border-white/40 bg-white/55 px-4 py-3 text-slate-900 outline-none shadow-sm backdrop-blur-md transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
              required
            />

            <input
              type="password"
              placeholder="New password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              className="w-full rounded-2xl border border-white/40 bg-white/55 px-4 py-3 text-slate-900 outline-none shadow-sm backdrop-blur-md transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition disabled:opacity-70"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
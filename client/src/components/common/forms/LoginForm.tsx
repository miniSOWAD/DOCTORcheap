'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { loginUser } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    identifier: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);
    const data = await loginUser(form);
    login(data.accessToken, data.user);

    const role = data.user?.role;

    if (role === 'superadmin') {
      router.push('/dashboard/superadmin');
    } else if (role === 'admin') {
      router.push('/dashboard/admin');
    } else if (role === 'doctor') {
      router.push('/dashboard/doctor');
    } else if (role === 'pharmacist') {
      router.push('/dashboard/pharmacist');
    } else if (role === 'seller') {
      router.push('/dashboard/seller');
    } else {
      router.push('/dashboard/user');
    }
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-xl"
    >
      <div className="rounded-[32px] border border-white/30 bg-white/18 p-8 shadow-[0_20px_80px_rgba(16,185,129,0.14)] backdrop-blur-2xl md:p-10">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-3 rounded-2xl border border-white/40 bg-white/30 px-4 py-3 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-pink-300 text-lg font-bold text-white shadow-md">
              D
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                <span className="text-emerald-700">DOCTOR</span>
                <span className="text-pink-400">cheap</span>
              </h1>
              <p className="text-sm text-slate-600">
                Futuristic healthcare access
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Log in with your email or account ID and continue to your medical dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email or ID
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
              />
              <input
                type="text"
                placeholder="Enter your email or ID"
                value={form.identifier}
                onChange={(e) =>
                  setForm({ ...form, identifier: e.target.value })
                }
                className="w-full rounded-2xl border border-white/40 bg-white/55 py-3 pl-11 pr-4 text-slate-900 outline-none shadow-sm backdrop-blur-md transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full rounded-2xl border border-white/40 bg-white/55 py-3 pl-11 pr-12 text-slate-900 outline-none shadow-sm backdrop-blur-md transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-emerald-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="accent-emerald-500" />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="font-semibold text-emerald-700 transition hover:text-pink-500"
            >
              Forgot password?
            </Link>
          </div>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Login'}
            {!loading && <ArrowRight size={16} />}
          </motion.button>

          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-semibold text-emerald-700 transition hover:text-pink-500"
            >
              Register now
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
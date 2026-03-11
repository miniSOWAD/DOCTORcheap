'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';
import SubmitButton from '../buttons/SubmitButton';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await loginUser(form);
      login(data.accessToken, data.user);
      router.push('/dashboard');
    } catch {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-3xl shadow-md max-w-md mx-auto w-full">
      <h2 className="text-2xl font-bold text-purple-800">Login</h2>
      <input type="email" placeholder="Email" className="w-full border rounded-xl px-4 py-3" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" className="w-full border rounded-xl px-4 py-3" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <SubmitButton loading={loading} text="Login" />
    </form>
  );
}
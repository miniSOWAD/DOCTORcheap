'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/auth.service';
import SubmitButton from '../buttons/SubmitButton';

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await registerUser(form);
      alert('Registration successful');
      router.push('/login');
    } catch {
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-3xl shadow-md max-w-md mx-auto w-full">
      <h2 className="text-2xl font-bold text-purple-800">Register</h2>
      <input type="text" placeholder="Name" className="w-full border rounded-xl px-4 py-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email" className="w-full border rounded-xl px-4 py-3" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" className="w-full border rounded-xl px-4 py-3" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select className="w-full border rounded-xl px-4 py-3" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="doctor">Doctor</option>
        <option value="pharmacist">Pharmacist</option>
        <option value="seller">Seller</option>
        <option value="admin">Admin</option>
      </select>
      <SubmitButton loading={loading} text="Register" />
    </form>
  );
}
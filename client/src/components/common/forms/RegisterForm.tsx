'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ShieldCheck, Upload } from 'lucide-react';
import { registerUser } from '@/services/auth.service';
import { uploadFile } from '@/services/upload.service';

const rolesNeedingApproval = ['doctor', 'pharmacist', 'seller', 'admin'];

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingNid, setUploadingNid] = useState(false);
  const [uploadingLicense, setUploadingLicense] = useState(false);

  const [form, setForm] = useState({
    name: '',
    userId: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
    nidImage: '',
    licenseImage: '',
  });

  const needsApproval = rolesNeedingApproval.includes(form.role);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'nidImage' | 'licenseImage',
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (field === 'nidImage') setUploadingNid(true);
      if (field === 'licenseImage') setUploadingLicense(true);

      const uploaded = await uploadFile(file);
      setForm((prev) => ({
        ...prev,
        [field]: uploaded.secure_url,
      }));
    } catch (error) {
      alert('File upload failed');
    } finally {
      if (field === 'nidImage') setUploadingNid(false);
      if (field === 'licenseImage') setUploadingLicense(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (needsApproval && (!form.nidImage || !form.licenseImage)) {
      alert('Please upload both NID and License images');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        userId: form.userId,
        email: form.email || undefined,
        phone: form.phone,
        password: form.password,
        role: form.role,
        nidImage: form.nidImage || undefined,
        licenseImage: form.licenseImage || undefined,
      };

      const data = await registerUser(payload);
      alert(data.message || 'Registration successful');
      router.push('/login');
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-2xl"
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
              <p className="text-sm text-slate-600">Create your account</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900">Register now</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Join the platform as a user, doctor, pharmacist, seller or admin.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Full Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Enter full name"
            />
            <Input
              label="User ID"
              value={form.userId}
              onChange={(v) => setForm({ ...form, userId: v })}
              placeholder="Enter user ID"
            />
            <Input
              label="Email (optional)"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="Enter email"
              type="email"
            />
            <Input
              label="Phone"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              placeholder="Enter phone"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Account Type
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-2xl border border-white/40 bg-white/55 px-4 py-3 text-slate-900 outline-none shadow-sm backdrop-blur-md transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
            >
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-2xl border border-white/40 bg-white/55 py-3 pl-4 pr-12 text-slate-900 outline-none shadow-sm backdrop-blur-md transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
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

          {needsApproval && (
            <div className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-pink-50 p-5">
              <div className="mb-4 flex items-center gap-2 text-emerald-700">
                <ShieldCheck size={18} />
                <p className="text-sm font-semibold">
                  Verification required for {form.role}
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <UploadField
                  label="NID Photo"
                  loading={uploadingNid}
                  uploaded={!!form.nidImage}
                  onChange={(e) => handleFileUpload(e, 'nidImage')}
                />

                <UploadField
                  label="License Photo"
                  loading={uploadingLicense}
                  uploaded={!!form.licenseImage}
                  onChange={(e) => handleFileUpload(e, 'licenseImage')}
                />
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Your account will remain pending to verify if someone else isn't imitating you for your own safety. Thank you for understanding.
              </p>
            </div>
          )}

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || uploadingNid || uploadingLicense}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition disabled:opacity-70"
          >
            {loading ? 'Registering...' : 'Create Account'}
            {!loading && <ArrowRight size={16} />}
          </motion.button>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-emerald-700 transition hover:text-pink-500"
            >
              Login now
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/40 bg-white/55 px-4 py-3 text-slate-900 outline-none shadow-sm backdrop-blur-md transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
        required={label !== 'Email (optional)'}
      />
    </div>
  );
}

function UploadField({
  label,
  loading,
  uploaded,
  onChange,
}: {
  label: string;
  loading: boolean;
  uploaded: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-emerald-200 bg-white/70 px-4 py-4 transition hover:bg-emerald-50">
        <Upload size={18} className="text-emerald-600" />
        <span className="text-sm text-slate-600">
          {loading
            ? 'Uploading...'
            : uploaded
            ? 'Uploaded successfully'
            : 'Choose file'}
        </span>
        <input type="file" className="hidden" onChange={onChange} />
      </label>
    </div>
  );
}
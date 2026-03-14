'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import useRoleGuard from '@/hooks/useRoleGuard';
import { useAuth } from '@/hooks/useAuth';
import { updateUser } from '@/services/user.service';
import { uploadFile } from '@/services/upload.service';

export default function DoctorProfilePage() {
  const { isReady, user } = useRoleGuard(['doctor']);
  const { user: authUser } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    profileImage: '',
  });

  useEffect(() => {
    if (!authUser) return;

    setForm({
      name: authUser.name || '',
      email: authUser.email || '',
      phone: authUser.phone || '',
      profileImage: authUser.profileImage || '',
    });
  }, [authUser]);

  if (!isReady || !user || !authUser?._id) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Update Doctor Profile"
        description="Update your doctor profile information."
      />

      <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />

          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />

          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />

          <div className="rounded-2xl border border-emerald-100 px-4 py-3">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Profile Image
            </label>
            <input
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const uploaded = await uploadFile(file);
                setForm({ ...form, profileImage: uploaded.secure_url });
              }}
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={async () => {
              try {
                await updateUser(authUser._id!, form);
                alert('Profile updated successfully');
              } catch (error: any) {
                alert(
                  error?.response?.data?.message || 'Failed to update profile',
                );
              }
            }}
            className="rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3 text-sm font-semibold text-white"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
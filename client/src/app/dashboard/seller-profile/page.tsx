'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import useRoleGuard from '@/hooks/useRoleGuard';
import { getMyProfile, updateMyProfile } from '@/services/user.service';
import { uploadFile } from '@/services/upload.service';

export default function SellerProfilePage() {
  const { isReady, user } = useRoleGuard(['seller']);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    profileImage: '',
    shopName: '',
    companyOrBrand: '',
    shopLocation: '',
    shopContactInfo: '',
  });

  useEffect(() => {
    if (!isReady || !user) return;

    const loadProfile = async () => {
      try {
        const data = await getMyProfile();
        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          profileImage: data.profileImage || '',
          shopName: data.shopName || '',
          companyOrBrand: data.companyOrBrand || '',
          shopLocation: data.shopLocation || '',
          shopContactInfo: data.shopContactInfo || '',
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, [isReady, user]);

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Update Seller Profile"
        description="Update your shop details, owner profile, and contact information."
      />

      <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Owner name"
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
            placeholder="Owner phone"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.shopName}
            onChange={(e) => setForm({ ...form, shopName: e.target.value })}
            placeholder="Shop name"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.companyOrBrand}
            onChange={(e) =>
              setForm({ ...form, companyOrBrand: e.target.value })
            }
            placeholder="Company / Brand name"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.shopLocation}
            onChange={(e) =>
              setForm({ ...form, shopLocation: e.target.value })
            }
            placeholder="Shop location"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.shopContactInfo}
            onChange={(e) =>
              setForm({ ...form, shopContactInfo: e.target.value })
            }
            placeholder="Shop contact info"
            className="rounded-2xl border border-emerald-100 px-4 py-3 md:col-span-2"
          />

          <div className="rounded-2xl border border-emerald-100 px-4 py-3 md:col-span-2">
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
                await updateMyProfile(form);
                alert('Seller profile updated successfully');
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
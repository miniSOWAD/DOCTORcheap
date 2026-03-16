'use client';

import { useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import useRoleGuard from '@/hooks/useRoleGuard';
import { createSellerIssue } from '@/services/report.service';
import { useAuth } from '@/hooks/useAuth';

export default function SellingIssuesPage() {
  const { isReady, user } = useRoleGuard(['seller']);
  const { user: authUser } = useAuth();

  const [form, setForm] = useState({
    subject: '',
    message: '',
  });

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Submit Selling Issue"
        description="Send selling-related issues directly to the superadmin."
      />

      <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
        <div className="grid gap-4">
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="Issue subject"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />

          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Describe your selling issue"
            rows={6}
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />

          <button
            onClick={async () => {
              try {
                await createSellerIssue({
                  subject: form.subject,
                  message: form.message,
                  sellerId: authUser?._id,
                  userName: authUser?.name,
                  type: 'selling-issue',
                });

                setForm({ subject: '', message: '' });
                alert('Issue submitted successfully');
              } catch (error: any) {
                alert(
                  error?.response?.data?.message ||
                    'Failed to submit issue',
                );
              }
            }}
            className="rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3 text-sm font-semibold text-white"
          >
            Submit Issue
          </button>
        </div>
      </div>
    </div>
  );
}
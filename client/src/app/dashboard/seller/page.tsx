'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import useRoleGuard from '@/hooks/useRoleGuard';
import { getMedicines } from '@/services/medicine.service';
import { getSellerIssues } from '@/services/report.service';
import { useAuth } from '@/hooks/useAuth';

export default function SellerDashboardPage() {
  const { isReady, user } = useRoleGuard(['seller']);
  const { user: authUser } = useAuth();

  const [stats, setStats] = useState({
    myMedicines: 0,
    issues: 0,
  });

  useEffect(() => {
    if (!isReady || !user || !authUser?._id) return;

    const loadData = async () => {
      try {
        const [medicines, issues] = await Promise.all([
          getMedicines().catch(() => []),
          getSellerIssues().catch(() => []),
        ]);

        setStats({
          myMedicines: Array.isArray(medicines)
            ? medicines.filter((m: any) => m.sellerId === authUser._id).length
            : 0,
          issues: Array.isArray(issues)
            ? issues.filter((r: any) => r.sellerId === authUser._id).length
            : 0,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [isReady, user, authUser]);

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Seller Dashboard"
        description="Manage your medicine listings, shop profile, and selling issues."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <StatCard title="My Medicine Listings" value={stats.myMedicines} />
        <StatCard title="Selling Issues Submitted" value={stats.issues} />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-[28px] border border-emerald-100 bg-white/85 p-6 shadow-md">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <h3 className="mt-3 text-4xl font-bold text-emerald-700">{value}</h3>
    </div>
  );
}
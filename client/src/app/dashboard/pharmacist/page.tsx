'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import useRoleGuard from '@/hooks/useRoleGuard';
import { getDiseases } from '@/services/disease.service';
import { getMedicines } from '@/services/medicine.service';
import { getUsers } from '@/services/user.service';

export default function PharmacistDashboardPage() {
  const { isReady, user } = useRoleGuard(['pharmacist']);

  const [stats, setStats] = useState({
    medicines: 0,
    diseases: 0,
    sellers: 0,
  });

  useEffect(() => {
    if (!isReady || !user) return;

    const loadData = async () => {
      try {
        const [medicines, diseases, users] = await Promise.all([
          getMedicines().catch(() => []),
          getDiseases().catch(() => []),
          getUsers().catch(() => []),
        ]);

        setStats({
          medicines: Array.isArray(medicines) ? medicines.length : 0,
          diseases: Array.isArray(diseases) ? diseases.length : 0,
          sellers: Array.isArray(users)
            ? users.filter((u: any) => u.role === 'seller').length
            : 0,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [isReady, user]);

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Pharmacist Dashboard"
        description="Manage medicines, disease data, sellers, and your pharmacist profile."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="Medicines" value={stats.medicines} />
        <StatCard title="Diseases" value={stats.diseases} />
        <StatCard title="Sellers" value={stats.sellers} />
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

'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import useRoleGuard from '@/hooks/useRoleGuard';
import { getDiseases } from '@/services/disease.service';
import { getNutrition } from '@/services/nutrition.service';
import { getMedicines } from '@/services/medicine.service';

export default function DoctorDashboardPage() {
  const { isReady, user } = useRoleGuard(['doctor']);

  const [stats, setStats] = useState({
    diseases: 0,
    nutrition: 0,
    medicines: 0,
  });

  useEffect(() => {
    if (!isReady || !user) return;

    const loadData = async () => {
      try {
        const [diseases, nutrition, medicines] = await Promise.all([
          getDiseases().catch(() => []),
          getNutrition().catch(() => []),
          getMedicines().catch(() => []),
        ]);

        setStats({
          diseases: Array.isArray(diseases) ? diseases.length : 0,
          nutrition: Array.isArray(nutrition) ? nutrition.length : 0,
          medicines: Array.isArray(medicines) ? medicines.length : 0,
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
        title="Doctor Dashboard"
        description="Manage your profile, disease data, nutrition guides and medicine usage information."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="Disease Records" value={stats.diseases} />
        <StatCard title="Nutrition Guides" value={stats.nutrition} />
        <StatCard title="Medicines" value={stats.medicines} />
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
'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import useRoleGuard from '@/hooks/useRoleGuard';
import { getAllUsersFromSuperadmin } from '@/services/superadmin.service';
import { getDiseases } from '@/services/disease.service';
import { getMedicines } from '@/services/medicine.service';
import { getNutrition } from '@/services/nutrition.service';

export default function AdminDashboardPage() {
  const { isReady, user } = useRoleGuard(['admin']);

  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    pharmacists: 0,
    diseases: 0,
    medicines: 0,
    nutrition: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady || !user) return;

    const loadData = async () => {
      try {
        setLoading(true);

        const [usersData, diseasesData, medicinesData, nutritionData] =
          await Promise.all([
            getAllUsersFromSuperadmin().catch(() => []),
            getDiseases().catch(() => []),
            getMedicines().catch(() => []),
            getNutrition().catch(() => []),
          ]);

        const users = Array.isArray(usersData) ? usersData : [];

        setStats({
          users: users.filter((u: any) => u.role === 'user').length,
          doctors: users.filter((u: any) => u.role === 'doctor').length,
          pharmacists: users.filter((u: any) => u.role === 'pharmacist').length,
          diseases: Array.isArray(diseasesData) ? diseasesData.length : 0,
          medicines: Array.isArray(medicinesData) ? medicinesData.length : 0,
          nutrition: Array.isArray(nutritionData) ? nutritionData.length : 0,
        });
      } catch (error) {
        console.error('Admin dashboard load failed:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isReady, user]);

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Admin Dashboard"
        description="Manage users, doctors, pharmacists, diseases, nutrition, and medicine data within admin permissions."
      />

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-[28px] border border-emerald-100 bg-white" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <StatCard title="Users" value={stats.users} />
          <StatCard title="Doctors" value={stats.doctors} />
          <StatCard title="Pharmacists" value={stats.pharmacists} />
          <StatCard title="Diseases" value={stats.diseases} />
          <StatCard title="Medicines" value={stats.medicines} />
          <StatCard title="Nutrition" value={stats.nutrition} />
        </div>
      )}
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
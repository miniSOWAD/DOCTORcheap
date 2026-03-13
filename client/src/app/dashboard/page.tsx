'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import useRoleGuard from '@/hooks/useRoleGuard';
import { getUsers } from '@/services/user.service';
import { getDoctors } from '@/services/doctor.service';
import { getDiseases } from '@/services/disease.service';
import { getMedicines } from '@/services/medicine.service';
import { getNutrition } from '@/services/nutrition.service';
import { getReports } from '@/services/report.service';

export default function DashboardHome() {
  const { isReady, user } = useRoleGuard([
    'admin',
    'superadmin',
    'doctor',
    'seller',
    'pharmacist',
    'user',
  ]);

  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    diseases: 0,
    medicines: 0,
    nutrition: 0,
    reports: 0,
  });

  useEffect(() => {
    if (!isReady || !user) return;

    const loadStats = async () => {
      try {
        const [
          users,
          doctors,
          diseases,
          medicines,
          nutrition,
          reports,
        ] = await Promise.all([
          ['admin', 'superadmin'].includes(user.role)
            ? getUsers().catch(() => [])
            : Promise.resolve([]),
          getDoctors().catch(() => []),
          getDiseases().catch(() => []),
          getMedicines().catch(() => []),
          getNutrition().catch(() => []),
          ['admin', 'superadmin'].includes(user.role)
            ? getReports().catch(() => [])
            : Promise.resolve([]),
        ]);

        setStats({
          users: Array.isArray(users) ? users.length : 0,
          doctors: Array.isArray(doctors) ? doctors.length : 0,
          diseases: Array.isArray(diseases) ? diseases.length : 0,
          medicines: Array.isArray(medicines) ? medicines.length : 0,
          nutrition: Array.isArray(nutrition) ? nutrition.length : 0,
          reports: Array.isArray(reports) ? reports.length : 0,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, [isReady, user]);

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Dashboard Overview"
        description="Monitor users, doctors, medicines, diseases, nutrition data, and report activity from one premium control panel."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Total Users" value={stats.users} />
        <StatCard title="Doctors" value={stats.doctors} />
        <StatCard title="Diseases" value={stats.diseases} />
        <StatCard title="Medicines" value={stats.medicines} />
        <StatCard title="Nutrition Guides" value={stats.nutrition} />
        <StatCard title="Reports" value={stats.reports} />
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
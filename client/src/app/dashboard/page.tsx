'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import useRoleGuard from '@/hooks/useRoleGuard';
import { getSystemStats, getAllUsersFromSuperadmin } from '@/services/superadmin.service';
import { getDiseases } from '@/services/disease.service';
import { getMedicines } from '@/services/medicine.service';
import { getNutrition } from '@/services/nutrition.service';
import { getReports } from '@/services/report.service';

type Stats = {
  totalUsers: number;
  doctors: number;
  pharmacists: number;
  sellers: number;
  admins: number;
  pendingUsers: number;
  diseases: number;
  medicines: number;
  nutrition: number;
  reports: number;
};

export default function DashboardHome() {
  const { isReady, user } = useRoleGuard([
    'admin',
    'superadmin',
    'doctor',
    'seller',
    'pharmacist',
    'user',
  ]);

  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    doctors: 0,
    pharmacists: 0,
    sellers: 0,
    admins: 0,
    pendingUsers: 0,
    diseases: 0,
    medicines: 0,
    nutrition: 0,
    reports: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady || !user) return;

    const loadStats = async () => {
      try {
        setLoading(true);

        let users: any[] = [];
        let statsData: any = {};
        let diseases: any[] = [];
        let medicines: any[] = [];
        let nutrition: any[] = [];
        let reports: any[] = [];

        if (['admin', 'superadmin'].includes(user.role)) {
          statsData = await getSystemStats().catch(() => ({}));
          users = await getAllUsersFromSuperadmin().catch(() => []);
          reports = await getReports().catch(() => []);
        }

        diseases = await getDiseases().catch(() => []);
        medicines = await getMedicines().catch(() => []);
        nutrition = await getNutrition().catch(() => []);

        setStats({
          totalUsers: statsData.totalUsers ?? users.length ?? 0,
          doctors:
            statsData.doctors ??
            users.filter((u: any) => u.role === 'doctor').length,
          pharmacists:
            statsData.pharmacists ??
            users.filter((u: any) => u.role === 'pharmacist').length,
          sellers: users.filter((u: any) => u.role === 'seller').length,
          admins: users.filter((u: any) => ['admin', 'superadmin'].includes(u.role)).length,
          pendingUsers:
            statsData.pendingUsers ??
            users.filter((u: any) => u.approvalStatus === 'pending').length,
          diseases: Array.isArray(diseases) ? diseases.length : 0,
          medicines: Array.isArray(medicines) ? medicines.length : 0,
          nutrition: Array.isArray(nutrition) ? nutrition.length : 0,
          reports: Array.isArray(reports) ? reports.length : 0,
        });
      } catch (error) {
        console.error('Dashboard overview fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [isReady, user]);

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Dashboard Overview"
        description="Live platform statistics from your database."
      />

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-[28px] border border-emerald-100 bg-white"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          <StatCard title="Total Users" value={stats.totalUsers} />
          <StatCard title="Doctors" value={stats.doctors} />
          <StatCard title="Pharmacists" value={stats.pharmacists} />
          <StatCard title="Sellers" value={stats.sellers} />
          <StatCard title="Admins" value={stats.admins} />
          <StatCard title="Pending Users" value={stats.pendingUsers} />
          <StatCard title="Diseases" value={stats.diseases} />
          <StatCard title="Medicines" value={stats.medicines} />
          <StatCard title="Nutrition Guides" value={stats.nutrition} />
          <StatCard title="Reports" value={stats.reports} />
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
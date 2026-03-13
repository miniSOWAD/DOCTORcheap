'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import TableShell from '@/components/common/tables/TableShell';
import useRoleGuard from '@/hooks/useRoleGuard';
import {
  approveUser,
  getPendingUsers,
  getSystemStats,
  rejectUser,
} from '@/services/superadmin.service';

export default function SuperAdminDashboardPage() {
  const { isReady, user } = useRoleGuard(['superadmin']);
  const [stats, setStats] = useState<any>({});
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, pendingData] = await Promise.all([
        getSystemStats(),
        getPendingUsers(),
      ]);

      setStats(statsData || {});
      setPending(Array.isArray(pendingData) ? pendingData : []);
    } catch (error) {
      console.error(error);
      setStats({});
      setPending([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isReady || !user) return;
    loadData();
  }, [isReady, user]);

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="SuperAdmin Control Center"
        description="Supreme control over users, role approvals, and top-level platform administration."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Users" value={stats.totalUsers || 0} />
        <StatCard title="Pending Users" value={stats.pendingUsers || 0} />
        <StatCard title="Doctors" value={stats.doctors || 0} />
        <StatCard title="Pharmacists" value={stats.pharmacists || 0} />
      </div>

      <TableShell
        title="Pending Approvals"
        subtitle="Approve or reject doctor, pharmacist, seller, and admin requests"
      >
        {loading ? (
          <div className="p-6 text-slate-500">Loading pending requests...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-emerald-50 text-sm text-slate-700">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">NID</th>
                <th className="px-6 py-4">License</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((item) => (
                <tr key={item._id} className="border-t border-emerald-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                  <td className="px-6 py-4 capitalize text-slate-600">{item.role}</td>
                  <td className="px-6 py-4 text-slate-600">{item.email || 'N/A'}</td>
                  <td className="px-6 py-4">
                    {item.nidImage ? (
                      <a href={item.nidImage} target="_blank" rel="noreferrer" className="text-sm font-semibold text-emerald-700">
                        View NID
                      </a>
                    ) : (
                      <span className="text-slate-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.licenseImage ? (
                      <a href={item.licenseImage} target="_blank" rel="noreferrer" className="text-sm font-semibold text-emerald-700">
                        View License
                      </a>
                    ) : (
                      <span className="text-slate-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          await approveUser(item._id);
                          loadData();
                        }}
                        className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={async () => {
                          await rejectUser(item._id);
                          loadData();
                        }}
                        className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </TableShell>
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
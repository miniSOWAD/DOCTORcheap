'use client';

import { useEffect, useState } from 'react';
import {
  getSystemStats,
  getPendingUsers,
  approveUser,
  rejectUser,
} from '@/services/superadmin.service';

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState<any>({});
  const [pending, setPending] = useState<any[]>([]);

  const loadData = async () => {
    const statsData = await getSystemStats();
    const pendingData = await getPendingUsers();

    setStats(statsData);
    setPending(pendingData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id: string) => {
    await approveUser(id);
    loadData();
  };

  const handleReject = async (id: string) => {
    await rejectUser(id);
    loadData();
  };

  return (
    <div className="p-10 space-y-10">
      <h1 className="text-3xl font-bold">SuperAdmin Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <Stat title="Total Users" value={stats.totalUsers} />
        <Stat title="Pending Users" value={stats.pendingUsers} />
        <Stat title="Doctors" value={stats.doctors} />
        <Stat title="Pharmacists" value={stats.pharmacists} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Pending Approvals</h2>

        <div className="space-y-4">
          {pending.map((user) => (
            <div
              key={user._id}
              className="flex justify-between p-4 bg-white rounded-xl shadow"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm">{user.role}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(user._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(user._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
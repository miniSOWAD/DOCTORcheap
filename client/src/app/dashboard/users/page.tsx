'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import TableShell from '@/components/common/tables/TableShell';
import useRoleGuard from '@/hooks/useRoleGuard';
import { deleteUser, getUsers, updateUserRole } from '@/services/user.service';
import { IUser } from '@/types/user';

export default function DashboardUsersPage() {
  const { isReady, user } = useRoleGuard(['admin', 'superadmin']);
  const [items, setItems] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isReady || !user) return;
    loadUsers();
  }, [isReady, user]);

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Manage Users"
        description="View platform users, update roles, and remove accounts when necessary."
      />

      <TableShell title="Users List" subtitle="All registered users in the system">
        {loading ? (
          <div className="p-6 text-slate-500">Loading users...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-emerald-50 text-sm text-slate-700">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-emerald-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.email || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <select
                      defaultValue={item.role}
                      onChange={async (e) => {
                        if (!item._id) return;
                        await updateUserRole(item._id, e.target.value);
                        loadUsers();
                      }}
                      className="rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm"
                    >
                      <option value="user">user</option>
                      <option value="doctor">doctor</option>
                      <option value="pharmacist">pharmacist</option>
                      <option value="seller">seller</option>
                      <option value="admin">admin</option>
                      <option value="superadmin">superadmin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={async () => {
                        if (!item._id) return;
                        await deleteUser(item._id);
                        loadUsers();
                      }}
                      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Delete
                    </button>
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
'use client';

import { useEffect, useMemo, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import TableShell from '@/components/common/tables/TableShell';
import useRoleGuard from '@/hooks/useRoleGuard';
import {
  createUser,
  deleteUser,
  getUsers,
  updateApprovalStatus,
  updateUser,
} from '@/services/user.service';
import { uploadFile } from '@/services/upload.service';
import { useAuth } from '@/hooks/useAuth';
import { IUser } from '@/types/user';

export default function DashboardSellersPage() {
  const { isReady, user } = useRoleGuard(['superadmin', 'pharmacist']);
  const { user: authUser } = useAuth();

  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    userId: '',
    email: '',
    phone: '',
    password: '',
    role: 'seller',
    approvalStatus: 'pending' as 'approved' | 'pending' | 'rejected',
    nidImage: '',
    licenseImage: '',
  });

  const items = useMemo(
    () => allUsers.filter((u) => u.role === 'seller'),
    [allUsers],
  );

  const isSuperAdmin = authUser?.role === 'superadmin';
  const isPharmacist = authUser?.role === 'pharmacist';

  const canAdd = isSuperAdmin || isPharmacist;
  const canEdit = isSuperAdmin || isPharmacist;
  const canDelete = isSuperAdmin;
  const canChangeApproval = isSuperAdmin;

  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const data = await getUsers();
      setAllUsers(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error('Seller fetch failed:', error);
      setAllUsers([]);
      setErrorMessage(
        error?.response?.data?.message || 'Failed to fetch seller data',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isReady || !user) return;
    loadData();
  }, [isReady, user]);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: '',
      userId: '',
      email: '',
      phone: '',
      password: '',
      role: 'seller',
      approvalStatus: 'pending',
      nidImage: '',
      licenseImage: '',
    });
  };

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Manage Sellers"
        description="Manage seller accounts and their approval status (Limited access to pharmacists, for help call page contact no.)."
      />

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      {canAdd && (
        <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            {editingId ? 'Edit Seller' : 'Add Seller'}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
              placeholder="User ID"
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder={editingId ? 'New password (optional)' : 'Password'}
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />

            {canChangeApproval ? (
              <select
                value={form.approvalStatus}
                onChange={(e) =>
                  setForm({
                    ...form,
                    approvalStatus: e.target.value as
                      | 'approved'
                      | 'pending'
                      | 'rejected',
                  })
                }
                className="rounded-2xl border border-emerald-100 px-4 py-3"
              >
                <option value="approved">approved</option>
                <option value="pending">pending</option>
                <option value="rejected">rejected</option>
              </select>
            ) : (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Seller will be created or updated with pending approval.
              </div>
            )}

            <div className="rounded-2xl border border-emerald-100 px-4 py-3">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                NID Image
              </label>
              <input
                type="file"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const uploaded = await uploadFile(file);
                  setForm({ ...form, nidImage: uploaded.secure_url });
                }}
              />
            </div>

            <div className="rounded-2xl border border-emerald-100 px-4 py-3">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                License Image
              </label>
              <input
                type="file"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const uploaded = await uploadFile(file);
                  setForm({ ...form, licenseImage: uploaded.secure_url });
                }}
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={async () => {
                try {
                  const payload: any = {
                    ...form,
                    role: 'seller',
                    approvalStatus: isSuperAdmin
                      ? form.approvalStatus
                      : 'pending',
                  };

                  if (editingId) {
                    if (!payload.password) delete payload.password;
                    await updateUser(editingId, payload);
                  } else {
                    await createUser(payload);
                  }

                  resetForm();
                  loadData();
                } catch (error: any) {
                  alert(
                    error?.response?.data?.message ||
                      'Failed to save seller data',
                  );
                }
              }}
              className="rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3 text-sm font-semibold text-white"
            >
              {editingId ? 'Update Seller' : 'Add Seller'}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="rounded-2xl border border-emerald-100 px-5 py-3 text-sm font-semibold text-emerald-700"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      <TableShell
        title="Seller Records"
        subtitle="Manage seller accounts from the database"
      >
        {loading ? (
          <div className="p-6 text-slate-500">Loading seller data...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-emerald-50 text-sm text-slate-700">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Approval</th>
                <th className="px-6 py-4">NID</th>
                <th className="px-6 py-4">License</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-emerald-50">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.userId || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.phone || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    {canChangeApproval ? (
                      <select
                        value={item.approvalStatus || 'pending'}
                        onChange={async (e) => {
                          if (!item._id) return;
                          await updateApprovalStatus(
                            item._id,
                            e.target.value as
                              | 'approved'
                              | 'pending'
                              | 'rejected',
                          );
                          loadData();
                        }}
                        className="rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm"
                      >
                        <option value="approved">approved</option>
                        <option value="pending">pending</option>
                        <option value="rejected">rejected</option>
                      </select>
                    ) : (
                      <span className="capitalize text-slate-600">
                        {item.approvalStatus || 'pending'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.nidImage ? (
                      <a
                        href={item.nidImage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-emerald-700"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-slate-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.licenseImage ? (
                      <a
                        href={item.licenseImage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-emerald-700"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-slate-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {canEdit && (
                        <button
                          onClick={() => {
                            setEditingId(item._id || null);
                            setForm({
                              name: item.name || '',
                              userId: item.userId || '',
                              email: item.email || '',
                              phone: item.phone || '',
                              password: '',
                              role: 'seller',
                              approvalStatus: item.approvalStatus || 'pending',
                              nidImage: item.nidImage || '',
                              licenseImage: item.licenseImage || '',
                            });
                          }}
                          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
                        >
                          Edit
                        </button>
                      )}

                      {canDelete && (
                        <button
                          onClick={async () => {
                            if (!item._id) return;
                            await deleteUser(item._id);
                            loadData();
                          }}
                          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                        >
                          Delete
                        </button>
                      )}
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

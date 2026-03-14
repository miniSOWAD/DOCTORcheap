'use client';

import { useEffect, useMemo, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import TableShell from '@/components/common/tables/TableShell';
import {
  createUser,
  deleteUser,
  getUsers,
  updateApprovalStatus,
  updateUser,
} from '@/services/user.service';
import { uploadFile } from '@/services/upload.service';
import { IUser, UserRole } from '@/types/user';

export default function RoleManagementPage({
  pageTitle,
  description,
  role,
}: {
  pageTitle: string;
  description: string;
  role: UserRole;
}) {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [form, setForm] = useState<{
    name: string;
    userId: string;
    email: string;
    phone: string;
    password: string;
    role: UserRole;
    approvalStatus: 'approved' | 'pending' | 'rejected';
    nidImage: string;
    licenseImage: string;
  }>({
    name: '',
    userId: '',
    email: '',
    phone: '',
    password: '',
    role,
    approvalStatus: role === 'user' ? 'approved' : 'pending',
    nidImage: '',
    licenseImage: '',
  });

  const items = useMemo(
    () => allUsers.filter((u) => u.role === role),
    [allUsers, role],
  );

  const needsDocuments = ['doctor', 'pharmacist', 'seller', 'admin'].includes(
    role,
  );

  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const data = await getUsers();
      setAllUsers(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error(`${role} fetch failed:`, error);
      setAllUsers([]);
      setErrorMessage(
        error?.response?.data?.message || `Failed to fetch ${role} data`,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: '',
      userId: '',
      email: '',
      phone: '',
      password: '',
      role,
      approvalStatus: role === 'user' ? 'approved' : 'pending',
      nidImage: '',
      licenseImage: '',
    });
  };

  return (
    <div className="space-y-6">
      <DashboardHero title={pageTitle} description={description} />

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          {editingId ? `Edit ${role}` : `Add ${role}`}
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

          {needsDocuments && (
            <>
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
            </>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={async () => {
              try {
                const payload = {
                  ...form,
                  role,
                };

                if (editingId) {
                  if (!payload.password) delete (payload as any).password;
                  await updateUser(editingId, payload);
                } else {
                  await createUser(payload);
                }

                resetForm();
                loadData();
              } catch (error: any) {
                alert(
                  error?.response?.data?.message ||
                    `Failed to save ${role} data`,
                );
              }
            }}
            className="rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3 text-sm font-semibold text-white"
          >
            {editingId ? `Update ${role}` : `Add ${role}`}
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

      <TableShell
        title={`${pageTitle} Records`}
        subtitle={`Manage all ${role} accounts from the database`}
      >
        {loading ? (
          <div className="p-6 text-slate-500">Loading {role} data...</div>
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
                      <button
                        onClick={() => {
                          setEditingId(item._id || null);
                          setForm({
                            name: item.name || '',
                            userId: item.userId || '',
                            email: item.email || '',
                            phone: item.phone || '',
                            password: '',
                            role,
                            approvalStatus: item.approvalStatus || 'pending',
                            nidImage: item.nidImage || '',
                            licenseImage: item.licenseImage || '',
                          });
                        }}
                        className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Edit
                      </button>
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
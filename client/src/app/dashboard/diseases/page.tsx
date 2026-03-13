'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import TableShell from '@/components/common/tables/TableShell';
import useRoleGuard from '@/hooks/useRoleGuard';
import { createDisease, deleteDisease, getDiseases, updateDisease } from '@/services/disease.service';
import { IDisease } from '@/types/disease';

export default function DashboardDiseasesPage() {
  const { isReady, user } = useRoleGuard(['admin', 'superadmin', 'doctor']);
  const [items, setItems] = useState<IDisease[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    symptoms: '',
    causes: '',
    precautions: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getDiseases();
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
    loadData();
  }, [isReady, user]);

  const resetForm = () => {
    setForm({ name: '', symptoms: '', causes: '', precautions: '' });
    setEditingId(null);
  };

  const toArray = (value: string) =>
    value.split(',').map((v) => v.trim()).filter(Boolean);

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Manage Diseases"
        description="Create, update, and organize disease information for users and doctors."
      />

      <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          {editingId ? 'Edit Disease' : 'Add Disease'}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Disease name"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.symptoms}
            onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
            placeholder="Symptoms (comma separated)"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.causes}
            onChange={(e) => setForm({ ...form, causes: e.target.value })}
            placeholder="Causes (comma separated)"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.precautions}
            onChange={(e) => setForm({ ...form, precautions: e.target.value })}
            placeholder="Precautions (comma separated)"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={async () => {
              const payload = {
                name: form.name,
                symptoms: toArray(form.symptoms),
                causes: toArray(form.causes),
                precautions: toArray(form.precautions),
              };

              if (editingId) await updateDisease(editingId, payload as any);
              else await createDisease(payload as any);

              resetForm();
              loadData();
            }}
            className="rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3 text-sm font-semibold text-white"
          >
            {editingId ? 'Update Disease' : 'Add Disease'}
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

      <TableShell title="Disease Records" subtitle="Current disease entries in database">
        {loading ? (
          <div className="p-6 text-slate-500">Loading diseases...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-emerald-50 text-sm text-slate-700">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Symptoms</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-emerald-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.symptoms?.join(', ')}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(item._id || null);
                          setForm({
                            name: item.name || '',
                            symptoms: item.symptoms?.join(', ') || '',
                            causes: item.causes?.join(', ') || '',
                            precautions: item.precautions?.join(', ') || '',
                          });
                        }}
                        className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (!item._id) return;
                          await deleteDisease(item._id);
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
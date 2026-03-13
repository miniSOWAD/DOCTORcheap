'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import TableShell from '@/components/common/tables/TableShell';
import useRoleGuard from '@/hooks/useRoleGuard';
import { createNutrition, deleteNutrition, getNutrition, updateNutrition } from '@/services/nutrition.service';
import { INutrition } from '@/types/nutrition';

export default function DashboardNutritionPage() {
  const { isReady, user } = useRoleGuard(['admin', 'superadmin', 'doctor']);
  const [items, setItems] = useState<INutrition[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    recommendedFoods: '',
    avoidedFoods: '',
    notes: '',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getNutrition();
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
    setEditingId(null);
    setForm({
      title: '',
      recommendedFoods: '',
      avoidedFoods: '',
      notes: '',
    });
  };

  const toArray = (value: string) =>
    value.split(',').map((v) => v.trim()).filter(Boolean);

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Manage Nutrition"
        description="Create and maintain food and nutrition guides linked to health conditions."
      />

      <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          {editingId ? 'Edit Nutrition Guide' : 'Add Nutrition Guide'}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Notes"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.recommendedFoods}
            onChange={(e) => setForm({ ...form, recommendedFoods: e.target.value })}
            placeholder="Recommended foods (comma separated)"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.avoidedFoods}
            onChange={(e) => setForm({ ...form, avoidedFoods: e.target.value })}
            placeholder="Avoided foods (comma separated)"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={async () => {
              const payload = {
                title: form.title,
                recommendedFoods: toArray(form.recommendedFoods),
                avoidedFoods: toArray(form.avoidedFoods),
                notes: form.notes,
              };

              if (editingId) await updateNutrition(editingId, payload as any);
              else await createNutrition(payload as any);

              resetForm();
              loadData();
            }}
            className="rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3 text-sm font-semibold text-white"
          >
            {editingId ? 'Update Guide' : 'Add Guide'}
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

      <TableShell title="Nutrition Records" subtitle="Current nutrition guides in database">
        {loading ? (
          <div className="p-6 text-slate-500">Loading nutrition guides...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-emerald-50 text-sm text-slate-700">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Recommended</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-emerald-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.title}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.recommendedFoods?.join(', ')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(item._id || null);
                          setForm({
                            title: item.title || '',
                            recommendedFoods: item.recommendedFoods?.join(', ') || '',
                            avoidedFoods: item.avoidedFoods?.join(', ') || '',
                            notes: item.notes || '',
                          });
                        }}
                        className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (!item._id) return;
                          await deleteNutrition(item._id);
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
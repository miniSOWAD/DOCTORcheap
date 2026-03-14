'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import TableShell from '@/components/common/tables/TableShell';
import useRoleGuard from '@/hooks/useRoleGuard';
import {
  bulkImportNutrition,
  createNutrition,
  deleteNutrition,
  getNutrition,
  updateNutrition,
} from '@/services/nutrition.service';
import { INutrition } from '@/types/nutrition';

export default function DashboardNutritionPage() {
  const { isReady, user } = useRoleGuard(['admin', 'superadmin', 'doctor']);
  const [items, setItems] = useState<INutrition[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    foodLine1: '',
    foodLine2: '',
    foodLine3: '',
    foodLine4: '',
    diseaseUsedFor: '',
    precautions: '',
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
      foodLine1: '',
      foodLine2: '',
      foodLine3: '',
      foodLine4: '',
      diseaseUsedFor: '',
      precautions: '',
    });
  };

  const parseNutritionTxt = async (file: File): Promise<INutrition[]> => {
    const text = await file.text();
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line !== '');

    if (lines.length % 6 !== 0) {
      throw new Error(
        'Invalid nutrition TXT format. Total non-empty lines must be divisible by 6.',
      );
    }

    const nutritionItems: INutrition[] = [];

    for (let i = 0; i < lines.length; i += 6) {
      nutritionItems.push({
        title: `Diet for ${lines[i + 4]}`,
        foodLines: [lines[i], lines[i + 1], lines[i + 2], lines[i + 3]],
        diseaseUsedFor: lines[i + 4],
        precautions: lines[i + 5],
      });
    }

    return nutritionItems;
  };

  const handleTxtImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImporting(true);
      const nutrition = await parseNutritionTxt(file);
      const result = await bulkImportNutrition({ nutrition });
      alert(result.message || 'Nutrition imported successfully');
      loadData();
    } catch (error: any) {
      alert(error?.response?.data?.message || error?.message || 'Import failed');
    } finally {
      setImporting(false);
      e.target.value = '';
    }
  };

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Manage Nutrition"
        description="Create, edit, delete, and bulk import nutrition guides."
      />

      <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
        <h2 className="mb-3 text-xl font-semibold text-slate-900">
          Bulk Import Nutrition from TXT
        </h2>
        <p className="mb-4 text-sm leading-7 text-slate-600">
          1-4 lines: necessary foods and amounts
          <br />
          5th line: disease used for
          <br />
          6th line: precautions
        </p>
        <input
          type="file"
          accept=".txt"
          onChange={handleTxtImport}
          className="block w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3"
        />
        {importing && (
          <p className="mt-3 text-sm font-medium text-emerald-700">
            Importing nutrition guides...
          </p>
        )}
      </div>

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
            value={form.foodLine1}
            onChange={(e) => setForm({ ...form, foodLine1: e.target.value })}
            placeholder="Food line 1"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.foodLine2}
            onChange={(e) => setForm({ ...form, foodLine2: e.target.value })}
            placeholder="Food line 2"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.foodLine3}
            onChange={(e) => setForm({ ...form, foodLine3: e.target.value })}
            placeholder="Food line 3"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.foodLine4}
            onChange={(e) => setForm({ ...form, foodLine4: e.target.value })}
            placeholder="Food line 4"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.diseaseUsedFor}
            onChange={(e) =>
              setForm({ ...form, diseaseUsedFor: e.target.value })
            }
            placeholder="Disease used for"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.precautions}
            onChange={(e) => setForm({ ...form, precautions: e.target.value })}
            placeholder="Precautions"
            className="rounded-2xl border border-emerald-100 px-4 py-3 md:col-span-2"
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={async () => {
              const payload = {
                title: form.title,
                foodLines: [
                  form.foodLine1,
                  form.foodLine2,
                  form.foodLine3,
                  form.foodLine4,
                ].filter(Boolean),
                diseaseUsedFor: form.diseaseUsedFor,
                precautions: form.precautions,
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

      <TableShell title="Nutrition Records" subtitle="Current nutrition guides">
        {loading ? (
          <div className="p-6 text-slate-500">Loading nutrition guides...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-emerald-50 text-sm text-slate-700">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Disease Used For</th>
                <th className="px-6 py-4">Precautions</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-emerald-50">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.diseaseUsedFor || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.precautions || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(item._id || null);
                          setForm({
                            title: item.title || '',
                            foodLine1: item.foodLines?.[0] || '',
                            foodLine2: item.foodLines?.[1] || '',
                            foodLine3: item.foodLines?.[2] || '',
                            foodLine4: item.foodLines?.[3] || '',
                            diseaseUsedFor: item.diseaseUsedFor || '',
                            precautions: item.precautions || '',
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
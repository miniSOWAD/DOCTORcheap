'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import TableShell from '@/components/common/tables/TableShell';
import useRoleGuard from '@/hooks/useRoleGuard';
import {
  createDisease,
  deleteDisease,
  getDiseases,
  updateDisease,
  bulkImportDiseases,
} from '@/services/disease.service';
import { IDisease } from '@/types/disease';

export default function DashboardDiseasesPage() {
  const { isReady, user } = useRoleGuard(['admin', 'superadmin', 'doctor']);
  const [items, setItems] = useState<IDisease[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    seriousnessLevel: '',
    symptoms: '',
    warningSymptoms: '',
    firstThingToDo: '',
    doctorTypes: '',
    nutritionLink: '',
  });

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
    setEditingId(null);
    setForm({
      name: '',
      seriousnessLevel: '',
      symptoms: '',
      warningSymptoms: '',
      firstThingToDo: '',
      doctorTypes: '',
      nutritionLink: '',
    });
  };

  const toArray = (value: string) =>
    value.split(',').map((v) => v.trim()).filter(Boolean);

  const parseDiseaseTxt = async (file: File): Promise<IDisease[]> => {
    const text = await file.text();
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line !== '');

    if (lines.length % 7 !== 0) {
      throw new Error(
        'Invalid disease TXT format. Total non-empty lines must be divisible by 7.',
      );
    }

    const diseases: IDisease[] = [];

    for (let i = 0; i < lines.length; i += 7) {
      diseases.push({
        name: lines[i],
        seriousnessLevel: lines[i + 1],
        symptoms: toArray(lines[i + 2]),
        warningSymptoms: toArray(lines[i + 3]),
        firstThingToDo: lines[i + 4],
        doctorTypes: toArray(lines[i + 5]),
        nutritionLink: lines[i + 6],
      });
    }

    return diseases;
  };

  const handleTxtImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImporting(true);
      const diseases = await parseDiseaseTxt(file);
      const result = await bulkImportDiseases({ diseases });
      alert(result.message || 'Diseases imported successfully');
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
        title="Manage Diseases"
        description="Create, edit, delete, and bulk import disease records."
      />

      <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
        <h2 className="mb-3 text-xl font-semibold text-slate-900">
          Bulk Import Diseases from TXT
        </h2>
        <p className="mb-4 text-sm leading-7 text-slate-600">
          1. Name
          <br />
          2. Seriousness level
          <br />
          3. Symptom
          <br />
          4. Warning symptom
          <br />
          5. First thing to do
          <br />
          6. What type of doctors cure it
          <br />
          7. Nutrition link
        </p>
        <input
          type="file"
          accept=".txt"
          onChange={handleTxtImport}
          className="block w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3"
        />
        {importing && (
          <p className="mt-3 text-sm font-medium text-emerald-700">
            Importing diseases...
          </p>
        )}
      </div>

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
            value={form.seriousnessLevel}
            onChange={(e) =>
              setForm({ ...form, seriousnessLevel: e.target.value })
            }
            placeholder="Seriousness level"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.symptoms}
            onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
            placeholder="Symptoms (comma separated)"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.warningSymptoms}
            onChange={(e) =>
              setForm({ ...form, warningSymptoms: e.target.value })
            }
            placeholder="Warning symptoms (comma separated)"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.firstThingToDo}
            onChange={(e) =>
              setForm({ ...form, firstThingToDo: e.target.value })
            }
            placeholder="First thing to do"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.doctorTypes}
            onChange={(e) => setForm({ ...form, doctorTypes: e.target.value })}
            placeholder="Doctor types (comma separated)"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.nutritionLink}
            onChange={(e) =>
              setForm({ ...form, nutritionLink: e.target.value })
            }
            placeholder="Nutrition link"
            className="rounded-2xl border border-emerald-100 px-4 py-3 md:col-span-2"
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={async () => {
              const payload = {
                name: form.name,
                seriousnessLevel: form.seriousnessLevel,
                symptoms: toArray(form.symptoms),
                warningSymptoms: toArray(form.warningSymptoms),
                firstThingToDo: form.firstThingToDo,
                doctorTypes: toArray(form.doctorTypes),
                nutritionLink: form.nutritionLink,
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

      <TableShell title="Disease Records" subtitle="Current disease entries">
        {loading ? (
          <div className="p-6 text-slate-500">Loading diseases...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-emerald-50 text-sm text-slate-700">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Seriousness</th>
                <th className="px-6 py-4">Doctor Types</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-emerald-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.seriousnessLevel || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.doctorTypes?.join(', ') || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(item._id || null);
                          setForm({
                            name: item.name || '',
                            seriousnessLevel: item.seriousnessLevel || '',
                            symptoms: item.symptoms?.join(', ') || '',
                            warningSymptoms: item.warningSymptoms?.join(', ') || '',
                            firstThingToDo: item.firstThingToDo || '',
                            doctorTypes: item.doctorTypes?.join(', ') || '',
                            nutritionLink: item.nutritionLink || '',
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
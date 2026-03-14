'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import TableShell from '@/components/common/tables/TableShell';
import useRoleGuard from '@/hooks/useRoleGuard';
import {
  bulkImportMedicines,
  createMedicine,
  deleteMedicine,
  getMedicines,
  updateMedicine,
} from '@/services/medicine.service';
import { uploadFile } from '@/services/upload.service';
import { IMedicine } from '@/types/medicine';

export default function DashboardMedicinesPage() {
  const { isReady, user } = useRoleGuard([
    'admin',
    'superadmin',
    'seller',
    'pharmacist',
  ]);

  const [items, setItems] = useState<IMedicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  const [form, setForm] = useState<IMedicine>({
    name: '',
    genericName: '',
    brand: '',
    dosage: '',
    price: 0,
    unitPrice: 0,
    ingredients: '',
    usage: '',
    usedFor: [],
    sideEffects: [],
    imageUrl: '',
    pdfUrl: '',
  });

  const canManualCreate = user?.role === 'superadmin';
  const canEdit = ['admin', 'superadmin', 'seller', 'pharmacist'].includes(
    user?.role || '',
  );
  const canDelete = user?.role === 'superadmin';
  const canBulkImport = ['admin', 'seller', 'pharmacist', 'superadmin'].includes(
    user?.role || '',
  );

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getMedicines();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Medicine fetch failed:', error);
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
      genericName: '',
      brand: '',
      dosage: '',
      price: 0,
      unitPrice: 0,
      ingredients: '',
      usage: '',
      usedFor: [],
      sideEffects: [],
      imageUrl: '',
      pdfUrl: '',
    });
  };

  const parseMedicineTxt = async (file: File): Promise<IMedicine[]> => {
    const text = await file.text();

    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line !== '');

    if (lines.length % 6 !== 0) {
      throw new Error(
        'Invalid TXT format. Total non-empty lines must be divisible by 6.',
      );
    }

    const medicines: IMedicine[] = [];

    for (let i = 0; i < lines.length; i += 6) {
      const name = lines[i];
      const pricePerPiece = Number(lines[i + 1]) || 0;
      const pricePerUnit = Number(lines[i + 2]) || 0;
      const ingredients = lines[i + 3];
      const usedForRaw = lines[i + 4];
      const sideEffectsRaw = lines[i + 5];

      medicines.push({
        name,
        price: pricePerPiece,
        unitPrice: pricePerUnit,
        ingredients,
        usage: ingredients,
        usedFor: usedForRaw
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean),
        sideEffects: sideEffectsRaw
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean),
      });
    }

    return medicines;
  };

  const handleTxtImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.txt')) {
      alert('Please upload a .txt file only');
      return;
    }

    try {
      setImporting(true);
      const medicines = await parseMedicineTxt(file);
      const result = await bulkImportMedicines({ medicines });
      alert(result.message || 'Medicines imported successfully');
      loadData();
    } catch (error: any) {
      console.error(error);
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
        title="Manage Medicines"
        description="Edit medicine records, and upload bulk medicine data through TXT files using your 6-line format."
      />

      {canBulkImport && (
        <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            Bulk Import Medicines from TXT
          </h2>
          <p className="mb-4 text-sm leading-7 text-slate-600">
            TXT format must follow 6 lines per medicine:
            <br />
            1. Medicine name
            <br />
            2. Price per piece
            <br />
            3. Price per unit
            <br />
            4. Ingredients / what is used inside it
            <br />
            5. Used for which disease/problem
            <br />
            6. Side effects
          </p>

          <input
            type="file"
            accept=".txt"
            onChange={handleTxtImport}
            className="block w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3"
          />

          {importing && (
            <p className="mt-3 text-sm font-medium text-emerald-700">
              Importing medicines...
            </p>
          )}
        </div>
      )}

      {canManualCreate && (
        <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            {editingId ? 'Edit Medicine' : 'Add Medicine'}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Medicine name"
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              value={form.genericName || ''}
              onChange={(e) => setForm({ ...form, genericName: e.target.value })}
              placeholder="Generic name"
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              value={form.brand || ''}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              placeholder="Brand"
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              value={form.dosage || ''}
              onChange={(e) => setForm({ ...form, dosage: e.target.value })}
              placeholder="Dosage"
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              placeholder="Price per piece"
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              type="number"
              value={form.unitPrice || 0}
              onChange={(e) =>
                setForm({ ...form, unitPrice: Number(e.target.value) })
              }
              placeholder="Price per unit"
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              value={form.ingredients || ''}
              onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
              placeholder="Ingredients"
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              value={form.usage || ''}
              onChange={(e) => setForm({ ...form, usage: e.target.value })}
              placeholder="Usage"
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              placeholder="Used for (comma separated)"
              value={form.usedFor?.join(', ') || ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  usedFor: e.target.value
                    .split(',')
                    .map((v) => v.trim())
                    .filter(Boolean),
                })
              }
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />
            <input
              placeholder="Side effects (comma separated)"
              value={form.sideEffects?.join(', ') || ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  sideEffects: e.target.value
                    .split(',')
                    .map((v) => v.trim())
                    .filter(Boolean),
                })
              }
              className="rounded-2xl border border-emerald-100 px-4 py-3"
            />

            <div className="rounded-2xl border border-emerald-100 px-4 py-3">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Medicine Image
              </label>
              <input
                type="file"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const uploaded = await uploadFile(file);
                  setForm({ ...form, imageUrl: uploaded.secure_url });
                }}
              />
            </div>

            <div className="rounded-2xl border border-emerald-100 px-4 py-3">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Medicine PDF
              </label>
              <input
                type="file"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const uploaded = await uploadFile(file);
                  setForm({ ...form, pdfUrl: uploaded.secure_url });
                }}
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={async () => {
                if (editingId) await updateMedicine(editingId, form);
                else await createMedicine(form);

                resetForm();
                loadData();
              }}
              className="rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3 text-sm font-semibold text-white"
            >
              {editingId ? 'Update Medicine' : 'Add Medicine'}
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
        title="Medicine Records"
        subtitle="Current medicine entries in database"
      >
        {loading ? (
          <div className="p-6 text-slate-500">Loading medicines...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-emerald-50 text-sm text-slate-700">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Piece Price</th>
                <th className="px-6 py-4">Unit Price</th>
                <th className="px-6 py-4">Used For</th>
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
                    {item.brand || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-slate-600">৳{item.price}</td>
                  <td className="px-6 py-4 text-slate-600">
                    ৳{item.unitPrice || 0}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.usedFor?.join(', ') || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {canEdit && (
                        <button
                          onClick={() => {
                            setEditingId(item._id || null);
                            setForm(item);
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
                            await deleteMedicine(item._id);
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
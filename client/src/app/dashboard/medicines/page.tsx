'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import TableShell from '@/components/common/tables/TableShell';
import useRoleGuard from '@/hooks/useRoleGuard';
import { createMedicine, deleteMedicine, getMedicines, updateMedicine } from '@/services/medicine.service';
import { uploadFile } from '@/services/upload.service';
import { IMedicine } from '@/types/medicine';

export default function DashboardMedicinesPage() {
  const { isReady, user } = useRoleGuard(['admin', 'superadmin', 'seller', 'pharmacist']);
  const [items, setItems] = useState<IMedicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<IMedicine>({
    name: '',
    genericName: '',
    brand: '',
    dosage: '',
    price: 0,
    usage: '',
    sideEffects: [],
    imageUrl: '',
    pdfUrl: '',
  });
  
  const canCreateOrDelete = user?.role === 'superadmin';
  const canEdit = ['admin', 'superadmin', 'seller', 'pharmacist'].includes(user?.role || '');

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getMedicines();
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
      genericName: '',
      brand: '',
      dosage: '',
      price: 0,
      usage: '',
      sideEffects: [],
      imageUrl: '',
      pdfUrl: '',
    });
  };

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Manage Medicines"
        description="Maintain medicine entries, upload documents, and manage product details."
      />

    {canCreateOrDelete && (
      <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          {editingId ? 'Edit Medicine' : 'Add Medicine'}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Medicine name" className="rounded-2xl border border-emerald-100 px-4 py-3" />
          <input value={form.genericName} onChange={(e) => setForm({ ...form, genericName: e.target.value })} placeholder="Generic name" className="rounded-2xl border border-emerald-100 px-4 py-3" />
          <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Brand" className="rounded-2xl border border-emerald-100 px-4 py-3" />
          <input value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} placeholder="Dosage" className="rounded-2xl border border-emerald-100 px-4 py-3" />
          <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="Price" className="rounded-2xl border border-emerald-100 px-4 py-3" />
          <input value={form.usage || ''} onChange={(e) => setForm({ ...form, usage: e.target.value })} placeholder="Usage" className="rounded-2xl border border-emerald-100 px-4 py-3" />
          <input
            placeholder="Side effects (comma separated)"
            value={form.sideEffects?.join(', ') || ''}
            onChange={(e) =>
              setForm({
                ...form,
                sideEffects: e.target.value.split(',').map((v) => v.trim()).filter(Boolean),
              })
            }
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <div className="rounded-2xl border border-emerald-100 px-4 py-3">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Medicine Image</label>
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
          <div className="rounded-2xl border border-emerald-100 px-4 py-3 md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Medicine PDF</label>
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

      <TableShell title="Medicine Records" subtitle="Current medicine entries in database">
        {loading ? (
          <div className="p-6 text-slate-500">Loading medicines...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-emerald-50 text-sm text-slate-700">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-emerald-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.brand}</td>
                  <td className="px-6 py-4 text-slate-600">৳{item.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(item._id || null);
                          setForm(item);
                        }}
                        className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Edit
                      </button>
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

                      {canCreateOrDelete && (
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
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
import { getMyProfile } from '@/services/user.service';

export default function DashboardMedicinesPage() {
  const { isReady, user } = useRoleGuard([
    'admin',
    'superadmin',
    'seller',
    'pharmacist',
    'doctor',
  ]);

  const [items, setItems] = useState<IMedicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [myProfile, setMyProfile] = useState<any>(null);

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

  const isSuperAdmin = user?.role === 'superadmin';
  const isPharmacist = user?.role === 'pharmacist';
  const isSeller = user?.role === 'seller';
  const isDoctor = user?.role === 'doctor';
  const isAdmin = user?.role === 'admin';

  const canManualCreate = isSuperAdmin || isPharmacist || isSeller;
  const canDelete = isSuperAdmin || isPharmacist || isSeller;
  const canBulkImport = isSuperAdmin || isAdmin || isPharmacist || isSeller;
  const canEdit = isSuperAdmin || isAdmin || isPharmacist || isSeller || isDoctor;
  const doctorEditOnlyUsedFor = isDoctor;

  const loadData = async () => {
    try {
      setLoading(true);

      const [medicines, profile] = await Promise.all([
        getMedicines(),
        ['seller'].includes(user?.role || '') ? getMyProfile().catch(() => null) : Promise.resolve(null),
      ]);

      let data = Array.isArray(medicines) ? medicines : [];

      if (isSeller && profile?._id) {
        data = data.filter((item: any) => item.sellerId === profile._id);
      }

      setItems(data);
      setMyProfile(profile);
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
      medicines.push({
        name: lines[i],
        price: Number(lines[i + 1]) || 0,
        unitPrice: Number(lines[i + 2]) || 0,
        ingredients: lines[i + 3],
        usage: lines[i + 3],
        usedFor: lines[i + 4]
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean),
        sideEffects: lines[i + 5]
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean),
      });
    }

    return medicines;
  };

  const attachSellerInfo = (payload: IMedicine): IMedicine => {
    if (!isSeller || !myProfile) return payload;

    return {
      ...payload,
      sellerId: myProfile._id,
      sellerName: myProfile.name,
      sellerUserId: myProfile.userId,
      sellerPhone: myProfile.phone,
      shopName: myProfile.shopName,
      companyOrBrand: myProfile.companyOrBrand,
      shopLocation: myProfile.shopLocation,
      shopContactInfo: myProfile.shopContactInfo,
    };
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
      let medicines = await parseMedicineTxt(file);

      if (isSeller && myProfile) {
        medicines = medicines.map((m) => attachSellerInfo(m));
      }

      const result = await bulkImportMedicines({ medicines });
      alert(result.message || 'Medicines imported successfully');
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
        title="Manage Medicines"
        description="Manage medicine records and bulk import listings."
      />

      {canBulkImport && (
        <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            Bulk Import Medicines from TXT
          </h2>
          <p className="mb-4 text-sm leading-7 text-slate-600">
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

      {canManualCreate && !doctorEditOnlyUsedFor && (
        <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            {editingId ? 'Edit Medicine' : 'Add Medicine'}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Medicine name" className="rounded-2xl border border-emerald-100 px-4 py-3" />
            <input value={form.genericName || ''} onChange={(e) => setForm({ ...form, genericName: e.target.value })} placeholder="Generic name" className="rounded-2xl border border-emerald-100 px-4 py-3" />
            <input value={form.brand || ''} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Brand" className="rounded-2xl border border-emerald-100 px-4 py-3" />
            <input value={form.dosage || ''} onChange={(e) => setForm({ ...form, dosage: e.target.value })} placeholder="Dosage" className="rounded-2xl border border-emerald-100 px-4 py-3" />
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="Price per piece" className="rounded-2xl border border-emerald-100 px-4 py-3" />
            <input type="number" value={form.unitPrice || 0} onChange={(e) => setForm({ ...form, unitPrice: Number(e.target.value) })} placeholder="Price per unit" className="rounded-2xl border border-emerald-100 px-4 py-3" />
            <input value={form.ingredients || ''} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} placeholder="Ingredients" className="rounded-2xl border border-emerald-100 px-4 py-3" />
            <input value={form.usage || ''} onChange={(e) => setForm({ ...form, usage: e.target.value })} placeholder="Usage" className="rounded-2xl border border-emerald-100 px-4 py-3" />
            <input
              placeholder="Used for (comma separated)"
              value={form.usedFor?.join(', ') || ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  usedFor: e.target.value.split(',').map((v) => v.trim()).filter(Boolean),
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

            <div className="rounded-2xl border border-emerald-100 px-4 py-3">
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
                let payload = { ...form };

                if (isSeller) {
                  payload = attachSellerInfo(payload);
                }

                if (editingId) await updateMedicine(editingId, payload);
                else await createMedicine(payload);

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

      {doctorEditOnlyUsedFor && (
        <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Edit Medicine Usage
          </h2>

          <input
            placeholder="Used for (comma separated)"
            value={form.usedFor?.join(', ') || ''}
            onChange={(e) =>
              setForm({
                ...form,
                usedFor: e.target.value.split(',').map((v) => v.trim()).filter(Boolean),
              })
            }
            className="w-full rounded-2xl border border-emerald-100 px-4 py-3"
          />

          <div className="mt-4 flex gap-3">
            <button
              onClick={async () => {
                if (!editingId) return;
                await updateMedicine(editingId, { usedFor: form.usedFor });
                resetForm();
                loadData();
              }}
              className="rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3 text-sm font-semibold text-white"
            >
              Update Used For
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
                <th className="px-6 py-4">Shop</th>
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
                  <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.shopName || 'N/A'}</td>
                  <td className="px-6 py-4 text-slate-600">{item.brand || 'N/A'}</td>
                  <td className="px-6 py-4 text-slate-600">৳{item.price}</td>
                  <td className="px-6 py-4 text-slate-600">৳{item.unitPrice || 0}</td>
                  <td className="px-6 py-4 text-slate-600">{item.usedFor?.join(', ') || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {canEdit && (
                        <button
                          onClick={() => {
                            if (doctorEditOnlyUsedFor) {
                              setEditingId(item._id || null);
                              setForm({
                                ...form,
                                usedFor: item.usedFor || [],
                              });
                            } else {
                              setEditingId(item._id || null);
                              setForm(item);
                            }
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
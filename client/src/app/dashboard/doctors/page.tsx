'use client';

import { useEffect, useState } from 'react';
import DashboardHero from '@/components/common/sections/DashboardHero';
import TableShell from '@/components/common/tables/TableShell';
import useRoleGuard from '@/hooks/useRoleGuard';
import { createDoctor, deleteDoctor, getDoctors, updateDoctor } from '@/services/doctor.service';
import { IDoctor } from '@/types/doctor';

export default function DashboardDoctorsPage() {
  const { isReady, user } = useRoleGuard(['admin', 'superadmin']);
  const [items, setItems] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<IDoctor>({
    name: '',
    specialization: '',
    qualification: '',
    experience: 0,
    consultationFee: 0,
    about: '',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getDoctors();
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
      specialization: '',
      qualification: '',
      experience: 0,
      consultationFee: 0,
      about: '',
    });
  };

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Manage Doctors"
        description="Add, update, and maintain doctor profiles for the platform."
      />

      <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          {editingId ? 'Edit Doctor' : 'Add Doctor'}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Doctor name"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.specialization}
            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
            placeholder="Specialization"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.qualification}
            onChange={(e) => setForm({ ...form, qualification: e.target.value })}
            placeholder="Qualification"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            type="number"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: Number(e.target.value) })}
            placeholder="Experience"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            type="number"
            value={form.consultationFee}
            onChange={(e) => setForm({ ...form, consultationFee: Number(e.target.value) })}
            placeholder="Consultation Fee"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
          <input
            value={form.about || ''}
            onChange={(e) => setForm({ ...form, about: e.target.value })}
            placeholder="About"
            className="rounded-2xl border border-emerald-100 px-4 py-3"
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={async () => {
              if (editingId) await updateDoctor(editingId, form);
              else await createDoctor(form);

              resetForm();
              loadData();
            }}
            className="rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3 text-sm font-semibold text-white"
          >
            {editingId ? 'Update Doctor' : 'Add Doctor'}
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

      <TableShell title="Doctor Records" subtitle="Current doctor profiles in database">
        {loading ? (
          <div className="p-6 text-slate-500">Loading doctors...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-emerald-50 text-sm text-slate-700">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Specialization</th>
                <th className="px-6 py-4">Qualification</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-emerald-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.specialization}</td>
                  <td className="px-6 py-4 text-slate-600">{item.qualification}</td>
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
                          await deleteDoctor(item._id);
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
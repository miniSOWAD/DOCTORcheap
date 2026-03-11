'use client';

import { useEffect, useState } from 'react';
import DoctorForm from '@/components/common/forms/DoctorForm';
import DoctorTable from '@/components/common/tables/DoctorTable';
import DashboardHero from '@/components/common/sections/DashboardHero';
import { createDoctor, deleteDoctor, getDoctors, updateDoctor } from '@/services/doctor.service';
import { IDoctor } from '@/types/doctor';
import useRoleGuard from '@/hooks/useRoleGuard';

export default function DashboardDoctorsPage() {
  useRoleGuard(['admin', 'superadmin']);
  const [items, setItems] = useState<IDoctor[]>([]);
  const [editing, setEditing] = useState<IDoctor | null>(null);

  const load = async () => setItems(await getDoctors());
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <DashboardHero title="Manage Doctors" description="Create, update and delete doctor data." />
      <DoctorForm
        initialData={editing}
        onSubmit={async (payload) => {
          if (payload._id) await updateDoctor(payload._id, payload);
          else await createDoctor(payload);
          setEditing(null);
          load();
        }}
      />
      <DoctorTable items={items} onEdit={setEditing} onDelete={async (id) => { await deleteDoctor(id); load(); }} />
    </div>
  );
}
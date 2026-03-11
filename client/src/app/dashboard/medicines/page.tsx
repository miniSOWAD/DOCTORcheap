'use client';

import { useEffect, useState } from 'react';
import MedicineForm from '@/components/common/forms/MedicineForm';
import MedicineTable from '@/components/common/tables/MedicineTable';
import DashboardHero from '@/components/common/sections/DashboardHero';
import { createMedicine, deleteMedicine, getMedicines, updateMedicine } from '@/services/medicine.service';
import { IMedicine } from '@/types/medicine';
import useRoleGuard from '@/hooks/useRoleGuard';

export default function DashboardMedicinesPage() {
  useRoleGuard(['admin', 'superadmin', 'seller', 'pharmacist']);
  const [items, setItems] = useState<IMedicine[]>([]);
  const [editing, setEditing] = useState<IMedicine | null>(null);

  const load = async () => setItems(await getMedicines());
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <DashboardHero title="Manage Medicines" description="Create, update and delete medicine data." />
      <MedicineForm
        initialData={editing}
        onSubmit={async (payload) => {
          if (payload._id) await updateMedicine(payload._id, payload);
          else await createMedicine(payload);
          setEditing(null);
          load();
        }}
      />
      <MedicineTable items={items} onEdit={setEditing} onDelete={async (id) => { await deleteMedicine(id); load(); }} />
    </div>
  );
}
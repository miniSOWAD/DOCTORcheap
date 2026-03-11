'use client';

import { useEffect, useState } from 'react';
import DiseaseForm from '@/components/common/forms/DiseaseForm';
import DiseaseTable from '@/components/common/tables/DiseaseTable';
import DashboardHero from '@/components/common/sections/DashboardHero';
import { createDisease, deleteDisease, getDiseases, updateDisease } from '@/services/disease.service';
import { IDisease } from '@/types/disease';
import useRoleGuard from '@/hooks/useRoleGuard';

export default function DashboardDiseasesPage() {
  useRoleGuard(['admin', 'superadmin', 'doctor']);
  const [items, setItems] = useState<IDisease[]>([]);
  const [editing, setEditing] = useState<IDisease | null>(null);

  const load = async () => setItems(await getDiseases());
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <DashboardHero title="Manage Diseases" description="Create, update and delete disease data." />
      <DiseaseForm
        initialData={editing}
        onSubmit={async (payload) => {
          if (payload._id) await updateDisease(payload._id, payload);
          else await createDisease(payload);
          setEditing(null);
          load();
        }}
      />
      <DiseaseTable items={items} onEdit={setEditing} onDelete={async (id) => { await deleteDisease(id); load(); }} />
    </div>
  );
}
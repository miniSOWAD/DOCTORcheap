'use client';

import { useEffect, useState } from 'react';
import NutritionForm from '@/components/common/forms/NutritionForm';
import NutritionTable from '@/components/common/tables/NutritionTable';
import DashboardHero from '@/components/common/sections/DashboardHero';
import { createNutrition, deleteNutrition, getNutrition, updateNutrition } from '@/services/nutrition.service';
import { INutrition } from '@/types/nutrition';
import useRoleGuard from '@/hooks/useRoleGuard';

export default function DashboardNutritionPage() {
  useRoleGuard(['admin', 'superadmin', 'doctor']);
  const [items, setItems] = useState<INutrition[]>([]);
  const [editing, setEditing] = useState<INutrition | null>(null);

  const load = async () => setItems(await getNutrition());
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <DashboardHero title="Manage Nutrition" description="Create, update and delete nutrition data." />
      <NutritionForm
        initialData={editing}
        onSubmit={async (payload) => {
          if (payload._id) await updateNutrition(payload._id, payload);
          else await createNutrition(payload);
          setEditing(null);
          load();
        }}
      />
      <NutritionTable items={items} onEdit={setEditing} onDelete={async (id) => { await deleteNutrition(id); load(); }} />
    </div>
  );
}
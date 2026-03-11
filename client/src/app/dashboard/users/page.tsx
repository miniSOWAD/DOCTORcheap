'use client';

import { useEffect, useState } from 'react';
import UserTable from '@/components/common/tables/UserTable';
import DashboardHero from '@/components/common/sections/DashboardHero';
import { getUsers, updateUserRole, deleteUser } from '@/services/user.service';
import { IUser } from '@/types/user';
import useRoleGuard from '@/hooks/useRoleGuard';

export default function DashboardUsersPage() {
  useRoleGuard(['admin', 'superadmin']);
  const [items, setItems] = useState<IUser[]>([]);

  const load = async () => setItems(await getUsers());
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <DashboardHero title="Manage Users" description="Update roles and remove users." />
      <UserTable
        items={items}
        onDelete={async (id) => { await deleteUser(id); load(); }}
        onRoleChange={async (id, role) => { await updateUserRole(id, role); load(); }}
      />
    </div>
  );
}
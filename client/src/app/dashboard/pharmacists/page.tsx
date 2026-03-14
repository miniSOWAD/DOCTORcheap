'use client';

import useRoleGuard from '@/hooks/useRoleGuard';
import RoleManagementPage from '@/components/common/sections/RoleManagementPage';

export default function DashboardPharmacistsPage() {
  const { isReady, user } = useRoleGuard(['admin', 'superadmin']);

  if (!isReady || !user) return <div className="p-6">Loading...</div>;

  return (
    <RoleManagementPage
      pageTitle="Manage Pharmacists"
      description="Admin can add, edit, and remove pharmacist accounts."
      role="pharmacist"
    />
  );
}
'use client';

import DashboardHero from '@/components/common/sections/DashboardHero';
import useRoleGuard from '@/hooks/useRoleGuard';

export default function DashboardHome() {
  useRoleGuard(['user', 'doctor', 'pharmacist', 'seller', 'admin', 'superadmin']);

  return <DashboardHero title="Dashboard Overview" description="Manage platform data, uploads, reports and users from here." />;
}
'use client';

import { useEffect, useState } from 'react';
import ReportTable from '@/components/common/tables/ReportTable';
import DashboardHero from '@/components/common/sections/DashboardHero';
import { deleteReport, getReports } from '@/services/report.service';
import { IReport } from '@/types/report';
import useRoleGuard from '@/hooks/useRoleGuard';

export default function DashboardReportsPage() {
  useRoleGuard(['admin', 'superadmin']);
  const [items, setItems] = useState<IReport[]>([]);
  const load = async () => setItems(await getReports());
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <DashboardHero title="Manage Reports" description="Review and delete submitted reports." />
      <ReportTable items={items} onDelete={async (id) => { await deleteReport(id); load(); }} />
    </div>
  );
}
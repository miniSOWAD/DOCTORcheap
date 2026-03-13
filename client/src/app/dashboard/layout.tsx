import { ReactNode } from 'react';
import DashboardLayout from '@/components/shared/layout/DashboardLayout';

export default function DashboardRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
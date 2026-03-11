import { ReactNode } from 'react';
import DashboardSidebar from '../sidebar/DashboardSidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-pink-50">
      <DashboardSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
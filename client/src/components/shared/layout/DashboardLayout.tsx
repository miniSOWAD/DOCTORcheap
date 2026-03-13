import { ReactNode } from 'react';
import DashboardSidebar from '../sidebar/DashboardSidebar';
import TopNavbar from '../navbar/TopNavbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.10),transparent_22%),linear-gradient(to_bottom_right,#ecfdf5,#ffffff,#fdf2f8)]">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <TopNavbar />
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
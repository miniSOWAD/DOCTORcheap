'use client';

import Link from 'next/link';
import { dashboardNavItems } from '@/constants/dashboardNavItems';

export default function DashboardSidebar() {
  return (
    <aside className="w-72 min-h-screen bg-purple-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <div className="space-y-2">
        {dashboardNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-700 transition">
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
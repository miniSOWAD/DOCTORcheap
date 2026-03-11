'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { navItems } from '@/constants/navItems';
import { useSidebar } from '@/hooks/useSidebar';

export default function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside className={`h-screen sticky top-0 bg-purple-800 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-purple-600">
        {!isCollapsed && <h2 className="text-lg font-bold">DOCTORcheap</h2>}
        <button onClick={toggleSidebar} className="p-2 rounded hover:bg-purple-700"><Menu size={20} /></button>
      </div>
      <nav className="p-3 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-purple-700 transition">
              <Icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
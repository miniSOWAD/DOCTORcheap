'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Menu,
  ShieldCheck,
  Crown,
  Sparkles,
} from 'lucide-react';
import { dashboardNavItems } from '@/constants/dashboardNavItems';
import { useSidebar } from '@/hooks/useSidebar';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { user } = useAuth();

  const role = user?.role || 'user';

  const dashboardTitleMap: Record<string, string> = {
  superadmin: 'SuperAdmin Panel',
  admin: 'Admin Dashboard',
  doctor: 'Doctor Dashboard',
  pharmacist: 'Pharmacist Dashboard',
  seller: 'Seller Dashboard',
  user: 'User Dashboard',
};

const dashboardSubtitleMap: Record<string, string> = {
  superadmin: 'Supreme Access Control',
  admin: 'Administrative Access Control',
  doctor: 'Doctor Access Control',
  pharmacist: 'Pharmacist Access Control',
  seller: 'Seller Access Control',
  user: 'User Access Control',
};

const dashboardTitle = dashboardTitleMap[role] || 'Dashboard';
const dashboardSubtitle = dashboardSubtitleMap[role] || 'Access Control';


  const filteredItems = dashboardNavItems.filter((item) => {
    if (!item.roles || item.roles.length === 0) return true;
    return item.roles.includes(role);
  });

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 96 : 300 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 h-screen shrink-0 overflow-hidden border-r border-emerald-100/80 bg-gradient-to-b from-emerald-50 via-white to-pink-50 shadow-[0_10px_40px_rgba(16,185,129,0.10)] backdrop-blur-xl"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-5">
          <motion.div
            animate={{
              opacity: isCollapsed ? 0 : 1,
              x: isCollapsed ? -10 : 0,
            }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none"
          >
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-pink-300 text-white shadow-md">
                  {role === 'superadmin' ? <Crown size={22} /> : <ShieldCheck size={22} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    {dashboardTitle}
                  </p>
                  <p className="text-xs capitalize text-slate-500">
                    {dashboardSubtitle}
                  </p>

                </div>
              </div>
            )}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white/80 text-emerald-700 shadow-sm transition hover:bg-emerald-50"
            aria-label="Toggle dashboard sidebar"
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </motion.button>
        </div>

        <div className="px-3 pb-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
        </div>

        <nav className="flex-1 space-y-2 px-3 py-2">
          {filteredItems.map((item, index) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04, duration: 0.25 }}
              >
                <Link
                  href={item.href}
                  className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r from-emerald-400 to-pink-300 text-white shadow-[0_10px_30px_rgba(16,185,129,0.22)]'
                      : 'text-slate-700 hover:bg-white/85 hover:shadow-md'
                  }`}
                >
                  {!active && (
                    <span className="absolute inset-y-0 left-0 w-0 rounded-r-full bg-gradient-to-b from-emerald-300 to-pink-200 transition-all duration-300 group-hover:w-1.5" />
                  )}

                  <motion.div
                    whileHover={{ rotate: active ? 0 : [0, -6, 6, 0], scale: 1.06 }}
                    transition={{ duration: 0.35 }}
                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-gradient-to-br from-emerald-100 to-pink-100 text-emerald-700'
                    }`}
                  >
                    <Icon size={20} />
                  </motion.div>

                  <motion.div
                    animate={{
                      opacity: isCollapsed ? 0 : 1,
                      x: isCollapsed ? -8 : 0,
                    }}
                    transition={{ duration: 0.22 }}
                    className="min-w-0"
                  >
                    {!isCollapsed && (
                      <>
                        <p
                          className={`truncate text-sm font-semibold ${
                            active ? 'text-white' : 'text-slate-800'
                          }`}
                        >
                          {item.label}
                        </p>
                        <p
                          className={`truncate text-xs ${
                            active ? 'text-white/80' : 'text-slate-400'
                          }`}
                        >
                          {item.description || 'Manage section'}
                        </p>
                      </>
                    )}
                  </motion.div>

                  {isCollapsed && (
                    <span className="pointer-events-none absolute left-[78px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-full border border-emerald-100 bg-white px-3 py-1 text-xs font-semibold text-emerald-700 opacity-0 shadow-lg transition-all duration-200 group-hover:left-[86px] group-hover:opacity-100">
                      {item.label}
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="p-3">
          <div className="rounded-3xl border border-emerald-100 bg-white/70 p-3 shadow-sm">
            <motion.div
              animate={{
                opacity: isCollapsed ? 0 : 1,
                y: isCollapsed ? 8 : 0,
              }}
              transition={{ duration: 0.22 }}
            >
              {!isCollapsed ? (
                <div className="rounded-2xl bg-gradient-to-r from-emerald-100 via-white to-pink-100 p-4">
                  <div className="mb-2 flex items-center gap-2 text-emerald-700">
                    <Sparkles size={16} />
                    <p className="text-sm font-semibold">Control Center</p>
                  </div>
                  <p className="text-xs leading-6 text-slate-500">
                    Smooth, premium and role-aware dashboard navigation for DOCTORcheap.
                  </p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-200 to-pink-200" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
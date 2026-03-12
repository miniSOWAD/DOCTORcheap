'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, Bell, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import { useAuth } from '@/hooks/useAuth';

export default function TopNavbar() {
  const { toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-4 lg:gap-6">
          <Link href="/" className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-pink-300 text-lg font-bold text-white shadow-md">
                D
              </div>

              <div className="leading-tight">
                <h1 className="text-xl font-bold tracking-wide">
                  <span className="text-emerald-600">DOCTOR</span>
                  <span className="text-pink-400">cheap</span>
                </h1>
                <p className="hidden text-xs text-slate-500 sm:block">
                  Online Doctor & Medicine Solution
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="hidden flex-1 justify-center px-4 lg:flex">
          <div className="relative w-full max-w-2xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search diseases, medicines, doctors, nutrition..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-emerald-100 bg-white py-3 pl-11 pr-4 outline-none shadow-sm transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:bg-emerald-50 md:flex"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-emerald-700" />
          </motion.button>

          {user ? (
            <>
              <div className="hidden items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-3 py-2 shadow-sm md:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-300 to-pink-300 text-white shadow-sm">
                  <User size={18} />
                </div>
                <div className="max-w-[140px]">
                  <p className="truncate text-sm font-semibold text-slate-800">{user.name}</p>
                  <p className="truncate text-xs capitalize text-slate-500">{user.role}</p>
                </div>
              </div>

              <Link
                href="/dashboard"
                className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-emerald-300/40 sm:flex"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-2xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="px-6 pb-4 lg:hidden">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search doctors, medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-emerald-100 bg-white py-3 pl-11 pr-4 outline-none shadow-sm transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>
    </header>
  );
}
'use client';

import Link from 'next/link';
import SearchBar from '@/components/common/forms/SearchBar';
import { useAuth } from '@/hooks/useAuth';

export default function TopNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-pink-100 border-b border-pink-200 px-6 py-4 flex items-center justify-between gap-4">
      <div className="flex-1 max-w-2xl"><SearchBar /></div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link href="/dashboard" className="bg-purple-700 text-white px-4 py-2 rounded-full">Dashboard</Link>
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm">{user.name}</div>
            <button onClick={logout} className="border border-black px-4 py-2 rounded-full">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="bg-purple-700 text-white px-4 py-2 rounded-full">Login</Link>
            <Link href="/register" className="border border-black px-4 py-2 rounded-full">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
'use client';
import useRoleGuard from '@/hooks/useRoleGuard';
export default function AdminDashboard() { useRoleGuard(['admin', 'superadmin']); return <div className="text-2xl font-bold">Admin Dashboard</div>; }
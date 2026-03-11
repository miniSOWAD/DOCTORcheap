'use client';
import useRoleGuard from '@/hooks/useRoleGuard';
export default function UserDashboard() { useRoleGuard(['user']); return <div className="text-2xl font-bold">User Dashboard</div>; }
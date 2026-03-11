'use client';
import useRoleGuard from '@/hooks/useRoleGuard';
export default function DoctorDashboard() { useRoleGuard(['doctor']); return <div className="text-2xl font-bold">Doctor Dashboard</div>; }
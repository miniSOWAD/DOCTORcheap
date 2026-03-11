'use client';
import useRoleGuard from '@/hooks/useRoleGuard';
export default function SellerDashboard() { useRoleGuard(['seller']); return <div className="text-2xl font-bold">Seller Dashboard</div>; }
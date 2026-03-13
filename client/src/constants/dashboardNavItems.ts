import { LayoutDashboard, Users, FileText, ShieldCheck,Stethoscope, Pill, Apple, ShieldAlert } from 'lucide-react';

export const dashboardNavItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Users', href: '/dashboard/users', icon: Users },
  { label: 'Diseases', href: '/dashboard/diseases', icon: FileText },
  { label: 'Doctors', href: '/dashboard/doctors', icon: Stethoscope },
  { label: 'Medicines', href: '/dashboard/medicines', icon: Pill },
  { label: 'Nutrition', href: '/dashboard/nutrition', icon: Apple },
  { label: 'Reports', href: '/dashboard/reports', icon: ShieldAlert },
  { label: 'SuperAdmin', href: '/dashboard/superadmin', icon: ShieldCheck },
];
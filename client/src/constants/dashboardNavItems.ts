import {
  LayoutDashboard,
  Users,
  FileText,
  Stethoscope,
  Pill,
  Apple,
  ShieldCheck,
  ClipboardList,
} from 'lucide-react';

export const dashboardNavItems = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Dashboard summary',
    roles: ['admin', 'superadmin', 'doctor', 'seller', 'pharmacist', 'user'],
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: Users,
    description: 'Manage users',
    roles: ['admin', 'superadmin'],
  },
  {
    label: 'Diseases',
    href: '/dashboard/diseases',
    icon: FileText,
    description: 'Disease records',
    roles: ['admin', 'superadmin', 'doctor'],
  },
  {
    label: 'Doctors',
    href: '/dashboard/doctors',
    icon: Stethoscope,
    description: 'Doctor directory',
    roles: ['admin', 'superadmin'],
  },
  {
    label: 'Medicines',
    href: '/dashboard/medicines',
    icon: Pill,
    description: 'Medicine records',
    roles: ['admin', 'superadmin', 'seller', 'pharmacist'],
  },
  {
    label: 'Nutrition',
    href: '/dashboard/nutrition',
    icon: Apple,
    description: 'Nutrition guides',
    roles: ['admin', 'superadmin', 'doctor'],
  },
  {
    label: 'Reports',
    href: '/dashboard/reports',
    icon: ClipboardList,
    description: 'Submitted reports',
    roles: ['admin', 'superadmin'],
  },
  {
    label: 'SuperAdmin',
    href: '/dashboard/superadmin',
    icon: ShieldCheck,
    description: 'Supreme control',
    roles: ['superadmin'],
  },
];
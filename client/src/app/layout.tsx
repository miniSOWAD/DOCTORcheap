import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { SidebarProvider } from '@/context/SidebarContext';

export const metadata: Metadata = {
  title: {
    default: 'DOCTORcheap — Online Doctor & Pharmacist Platform',
    template: '%s | DOCTORcheap',
  },
  description:
    'Search doctors, diseases, medicines, nutrition guidance, and manage reports from one modern healthcare platform.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
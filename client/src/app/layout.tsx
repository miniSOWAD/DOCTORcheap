import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { SidebarProvider } from '@/context/SidebarContext';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'DOCTORcheap — Online Doctor & Pharmacist Platform',
    template: '%s | DOCTORcheap',
  },
  description:
    'Search doctors, diseases, medicines, nutrition guidance, and manage reports from one modern healthcare platform.',
  applicationName: 'DOCTORcheap',
  keywords: [
    'DOCTORcheap',
    'online doctor',
    'medicine platform',
    'nutrition guide',
    'pharmacist platform',
    'medical reports',
  ],
  authors: [{ name: 'DOCTORcheap' }],
  creator: 'DOCTORcheap',
  publisher: 'DOCTORcheap',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'DOCTORcheap — Online Doctor & Pharmacist Platform',
    description:
      'Search doctors, diseases, medicines, nutrition guidance, and manage reports from one modern healthcare platform.',
    siteName: 'DOCTORcheap',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'DOCTORcheap Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'DOCTORcheap — Online Doctor & Pharmacist Platform',
    description:
      'Search doctors, diseases, medicines, nutrition guidance, and manage reports from one modern healthcare platform.',
    images: ['/logo.png'],
  },
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
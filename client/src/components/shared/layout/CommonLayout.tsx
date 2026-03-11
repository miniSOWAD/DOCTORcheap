import { ReactNode } from 'react';
import Sidebar from '@/components/shared/sidebar/Sidebar';
import TopNavbar from '@/components/shared/navbar/TopNavbar';
import Footer from '@/components/shared/footer/Footer';
import FloatingButtons from '@/components/common/buttons/FloatingButtons';

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-pink-50 text-black">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        <main className="flex-1 p-6">{children}</main>
        <Footer />
        <FloatingButtons />
      </div>
    </div>
  );
}
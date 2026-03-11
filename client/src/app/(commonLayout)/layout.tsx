import { ReactNode } from 'react';
import CommonLayout from '@/components/shared/layout/CommonLayout';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <CommonLayout>{children}</CommonLayout>;
}
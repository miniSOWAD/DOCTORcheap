// client/src/app/doctor/page.tsx

import { Stethoscope } from 'lucide-react';
import type { Metadata } from 'next';
import DoctorPageClient from './DoctorPageClient';
import { getServerDoctors } from '@/services/doctor.service';

export const metadata: Metadata = {
  title: 'Our Specialists | DOCTORcheap',
  description: 'Find and consult with top medical professionals.',
};

export default async function DoctorPage() {
  // Fetch fresh data directly from the database
  const doctors = await getServerDoctors();

  return (
    <div className="space-y-12">
      {/* PREMIUM HERO SECTION */}
      <section className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-pink-50 p-10 shadow-[0_20px_80px_rgba(16,185,129,0.10)]">
        <div className="absolute -left-12 top-0 h-44 w-44 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-pink-200/40 blur-3xl" />

        <div className="relative flex flex-col items-start gap-3">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
            <Stethoscope size={16} />
            Verified Medical Professionals
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Expert care from{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-pink-400 bg-clip-text text-transparent">
              top specialists
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            Browse our network of qualified doctors. View their experience, consultation fees, and specialties to find the right healthcare partner for your needs.
          </p>
        </div>
      </section>

      {/* PASS DATA TO CLIENT COMPONENT */}
      <DoctorPageClient initialDoctors={doctors} />
    </div>
  );
}
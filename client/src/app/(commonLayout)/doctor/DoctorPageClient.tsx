// client/src/app/doctor/DoctorPageClient.tsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Banknote, BriefcaseMedical } from 'lucide-react';
import type { IDoctor } from '@/types/doctor';

// Framer Motion animation setup
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DoctorPageClient({ initialDoctors }: { initialDoctors: IDoctor[] }) {
  return (
    <section>
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900">Available Doctors</h2>
        <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-pink-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {initialDoctors.length} Specialists Found
        </div>
      </div>

      {initialDoctors.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/50 p-10 text-center">
          <p className="text-lg font-semibold text-slate-800">No doctors found.</p>
          <p className="mt-2 text-sm text-slate-500">New doctors added to the system will appear here automatically.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {initialDoctors.map((doctor) => (
            <DoctorCard key={doctor._id || Math.random().toString()} doctor={doctor} />
          ))}
        </motion.div>
      )}
    </section>
  );
}

function DoctorCard({ doctor }: { doctor: IDoctor }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(16,185,129,0.12)' }}
      className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-white p-6 shadow-lg transition-all"
    >
      {/* Glassmorphic Background Effect */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-100/40 blur-3xl" />

      {/* Doctor Photo & Basic Info */}
      <div className="flex items-start gap-5">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-emerald-50 shadow-sm">
          <Image
            // Using your exact doc.jpg from the public folder as a strict fallback!
            src={doctor.photo || '/doc.jpg'}
            alt={doctor.name || 'Doctor'}
            fill
            className="object-cover"
            sizes="(max-width: 96px) 100vw, 96px"
          />
        </div>

        <div className="flex flex-col justify-center pt-2">
          <h3 className="text-xl font-bold text-slate-900 line-clamp-1">
            {doctor.name || 'Unknown Doctor'}
          </h3>
          <p className="mt-1 font-semibold text-emerald-600 line-clamp-1">
            {doctor.specialization || 'General Practice'}
          </p>
        </div>
      </div>

      <hr className="my-5 border-emerald-50" />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <StatItem 
          icon={Award} 
          title="Experience" 
          value={`${doctor.experience || 0} Years`} 
        />
        <StatItem 
          icon={BriefcaseMedical} 
          title="Qualification" 
          value={doctor.qualification || 'Certified'} 
        />
        <StatItem 
          icon={Banknote} 
          title="Consultation Fee" 
          value={doctor.consultationFee ? `৳${doctor.consultationFee}` : 'N/A'} 
          className="col-span-2"
        />
      </div>

      {/* About Section */}
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-sm leading-6 text-slate-600 line-clamp-3">
          {doctor.about || 'This professional has not provided a description yet. Please contact support for more details.'}
        </p>
      </div>
    </motion.div>
  );
}

function StatItem({ icon: Icon, title, value, className = '' }: { icon: React.ElementType, title: string, value: string, className?: string }) {
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <div className="mt-0.5 text-emerald-500">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{title}</p>
        <p className="text-sm font-semibold text-slate-800 line-clamp-1">{value}</p>
      </div>
    </div>
  );
}
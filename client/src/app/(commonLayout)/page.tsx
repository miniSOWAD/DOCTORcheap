'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Stethoscope,
  Pill,
  Apple,
  Activity,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  FileUp,
  HeartPulse,
} from 'lucide-react';

import { getDoctors } from '@/services/doctor.service';
import { getDiseases } from '@/services/disease.service';
import { getMedicines } from '@/services/medicine.service';
import { getNutrition } from '@/services/nutrition.service';

import type { IDoctor } from '@/types/doctor';
import type { IDisease } from '@/types/disease';
import type { IMedicine } from '@/types/medicine';
import type { INutrition } from '@/types/nutrition';

type SearchTab = 'all' | 'doctors' | 'diseases' | 'medicines' | 'nutrition';

export default function HomePage() {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [diseases, setDiseases] = useState<IDisease[]>([]);
  const [medicines, setMedicines] = useState<IMedicine[]>([]);
  const [nutrition, setNutrition] = useState<INutrition[]>([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<SearchTab>('all');

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const [doctorData, diseaseData, medicineData, nutritionData] =
          await Promise.all([
            getDoctors().catch(() => []),
            getDiseases().catch(() => []),
            getMedicines().catch(() => []),
            getNutrition().catch(() => []),
          ]);

        setDoctors(Array.isArray(doctorData) ? doctorData : []);
        setDiseases(Array.isArray(diseaseData) ? diseaseData : []);
        setMedicines(Array.isArray(medicineData) ? medicineData : []);
        setNutrition(Array.isArray(nutritionData) ? nutritionData : []);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredDoctors = useMemo(() => {
    if (!normalizedSearch) return doctors.slice(0, 6);
    return doctors
      .filter(
        (item) =>
          item.name?.toLowerCase().includes(normalizedSearch) ||
          item.specialization?.toLowerCase().includes(normalizedSearch) ||
          item.qualification?.toLowerCase().includes(normalizedSearch),
      )
      .slice(0, 6);
  }, [doctors, normalizedSearch]);

  const filteredDiseases = useMemo(() => {
    if (!normalizedSearch) return diseases.slice(0, 6);
    return diseases
      .filter(
        (item) =>
          item.name?.toLowerCase().includes(normalizedSearch) ||
          item.symptoms?.some((s) => s.toLowerCase().includes(normalizedSearch)) ||
          item.causes?.some((c) => c.toLowerCase().includes(normalizedSearch)),
      )
      .slice(0, 6);
  }, [diseases, normalizedSearch]);

  const filteredMedicines = useMemo(() => {
    if (!normalizedSearch) return medicines.slice(0, 6);
    return medicines
      .filter(
        (item) =>
          item.name?.toLowerCase().includes(normalizedSearch) ||
          item.genericName?.toLowerCase().includes(normalizedSearch) ||
          item.brand?.toLowerCase().includes(normalizedSearch),
      )
      .slice(0, 6);
  }, [medicines, normalizedSearch]);

  const filteredNutrition = useMemo(() => {
    if (!normalizedSearch) return nutrition.slice(0, 6);
    return nutrition
      .filter(
        (item) =>
          item.title?.toLowerCase().includes(normalizedSearch) ||
          item.recommendedFoods?.some((f) => f.toLowerCase().includes(normalizedSearch)) ||
          item.avoidedFoods?.some((f) => f.toLowerCase().includes(normalizedSearch)),
      )
      .slice(0, 6);
  }, [nutrition, normalizedSearch]);

  const visibleResults = {
    doctors: tab === 'all' || tab === 'doctors' ? filteredDoctors : [],
    diseases: tab === 'all' || tab === 'diseases' ? filteredDiseases : [],
    medicines: tab === 'all' || tab === 'medicines' ? filteredMedicines : [],
    nutrition: tab === 'all' || tab === 'nutrition' ? filteredNutrition : [],
  };

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-pink-50 p-6 shadow-[0_20px_80px_rgba(16,185,129,0.10)] md:p-10">
        <div className="absolute -left-12 top-0 h-44 w-44 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-pink-200/40 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
                <Sparkles size={16} />
                Premium digital healthcare experience
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                Better care starts with smarter access to{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-pink-400 bg-clip-text text-transparent">
                  doctors, medicines, reports, and nutrition
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                Search diseases, discover doctors, explore medicine details,
                get food guidance, and upload medical reports from one clean,
                modern platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-8 rounded-[28px] border border-emerald-100 bg-white/85 p-4 shadow-lg backdrop-blur-md"
            >
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search doctors, diseases, medicines, nutrition..."
                    className="w-full rounded-2xl border border-emerald-100 bg-white py-3 pl-11 pr-4 outline-none shadow-sm transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {(['all', 'doctors', 'diseases', 'medicines', 'nutrition'] as SearchTab[]).map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() => setTab(item)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                          tab === item
                            ? 'bg-gradient-to-r from-emerald-400 to-pink-300 text-white shadow-md'
                            : 'border border-emerald-100 bg-white text-slate-600 hover:bg-emerald-50'
                        }`}
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href="/doctor"
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
                  >
                    Explore Doctors
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/upload-report"
                    className="inline-flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
                  >
                    <FileUp size={16} />
                    Upload Report
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard
              title="Doctors"
              value={loading ? '...' : String(doctors.length)}
              icon={Stethoscope}
              subtitle="Available specialists"
            />
            <StatCard
              title="Diseases"
              value={loading ? '...' : String(diseases.length)}
              icon={Activity}
              subtitle="Health topics listed"
            />
            <StatCard
              title="Medicines"
              value={loading ? '...' : String(medicines.length)}
              icon={Pill}
              subtitle="Medicine entries stored"
            />
            <StatCard
              title="Nutrition"
              value={loading ? '...' : String(nutrition.length)}
              icon={Apple}
              subtitle="Food & diet guides"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <FeatureCard
          icon={ShieldCheck}
          title="Trusted Health Access"
          description="Get organized disease, doctor, medicine, and nutrition data from one structured platform."
        />
        <FeatureCard
          icon={HeartPulse}
          title="Patient-Friendly Experience"
          description="A clean interface designed for easy browsing, fast searching, and clear medical information."
        />
        <FeatureCard
          icon={FileUp}
          title="Report Upload Ready"
          description="Users can upload reports and documents with a smooth workflow for modern digital care."
        />
      </section>

      <SearchResultsSection
        title="Live Search Results"
        subtitle={
          normalizedSearch
            ? `Showing dynamic matches for "${search}"`
            : 'Showing latest available items from your system'
        }
        doctors={visibleResults.doctors}
        diseases={visibleResults.diseases}
        medicines={visibleResults.medicines}
        nutrition={visibleResults.nutrition}
        loading={loading}
        hasSearch={!!normalizedSearch}
      />

      <section className="grid gap-6 xl:grid-cols-2">
        <InfoPanel
          title="AI Doctor Support"
          description="Use the floating AI Doctor button for quick symptom guidance. It helps users get basic direction before consulting a professional."
          href="#"
          buttonText="Use AI Doctor"
        />
        <InfoPanel
          title="Diet & Nutrition Guidance"
          description="Use the Diet feature to discover food suggestions and health-friendly eating guidance linked to conditions and recovery."
          href="/food-nutrition"
          buttonText="Explore Nutrition"
        />
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-[28px] border border-emerald-100 bg-white/85 p-6 shadow-lg backdrop-blur-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>
          <h3 className="mt-3 text-4xl font-bold text-slate-900">{value}</h3>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200 to-pink-200 text-emerald-700 shadow-md">
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md transition"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-pink-100 text-emerald-700 shadow-sm">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </motion.div>
  );
}

function SearchResultsSection({
  title,
  subtitle,
  doctors,
  diseases,
  medicines,
  nutrition,
  loading,
  hasSearch,
}: {
  title: string;
  subtitle: string;
  doctors: IDoctor[];
  diseases: IDisease[];
  medicines: IMedicine[];
  nutrition: INutrition[];
  loading: boolean;
  hasSearch: boolean;
}) {
  const total =
    doctors.length + diseases.length + medicines.length + nutrition.length;

  return (
    <section className="rounded-[32px] border border-emerald-100 bg-white p-6 shadow-md md:p-8">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">{subtitle}</p>
        </div>

        {!loading && (
          <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-pink-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {total} result{total !== 1 ? 's' : ''} found
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-3xl border border-emerald-100 bg-emerald-50/60"
            />
          ))}
        </div>
      ) : total === 0 ? (
        <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/50 p-10 text-center">
          <p className="text-lg font-semibold text-slate-800">
            No matching results found
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Try a different keyword to search doctors, diseases, medicines, or nutrition.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {(doctors.length > 0 || !hasSearch) && (
            <ResultGroup
              title="Doctors"
              href="/doctor"
              items={doctors.map((item) => ({
                title: item.name,
                subtitle: item.specialization || 'Doctor',
                meta: item.qualification || 'Medical professional',
              }))}
            />
          )}

          {(diseases.length > 0 || !hasSearch) && (
            <ResultGroup
              title="Diseases"
              href="/disease"
              items={diseases.map((item) => ({
                title: item.name,
                subtitle: item.symptoms?.slice(0, 2).join(', ') || 'Symptoms listed',
                meta: item.causes?.slice(0, 2).join(', ') || 'Causes listed',
              }))}
            />
          )}

          {(medicines.length > 0 || !hasSearch) && (
            <ResultGroup
              title="Medicines"
              href="/medicine"
              items={medicines.map((item) => ({
                title: item.name,
                subtitle: item.genericName || 'Generic medicine',
                meta: item.brand || `৳${item.price}`,
              }))}
            />
          )}

          {(nutrition.length > 0 || !hasSearch) && (
            <ResultGroup
              title="Nutrition"
              href="/food-nutrition"
              items={nutrition.map((item) => ({
                title: item.title,
                subtitle:
                  item.recommendedFoods?.slice(0, 2).join(', ') || 'Recommended foods',
                meta: item.avoidedFoods?.slice(0, 2).join(', ') || 'Avoided foods',
              }))}
            />
          )}
        </div>
      )}
    </section>
  );
}

function ResultGroup({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: { title: string; subtitle: string; meta: string }[];
}) {
  return (
    <div className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-white to-pink-50/40 p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <Link
          href={href}
          className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-500"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {items.slice(0, 4).map((item, index) => (
          <div
            key={`${title}-${index}`}
            className="rounded-2xl border border-emerald-50 bg-white p-4 shadow-sm"
          >
            <h4 className="font-semibold text-slate-900">{item.title}</h4>
            <p className="mt-1 text-sm text-slate-600">{item.subtitle}</p>
            <p className="mt-1 text-xs text-slate-400">{item.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoPanel({
  title,
  description,
  href,
  buttonText,
}: {
  title: string;
  description: string;
  href: string;
  buttonText: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-[32px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-pink-50 p-8 shadow-md"
    >
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      <p className="mt-4 text-sm leading-8 text-slate-600">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-pink-300 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
      >
        {buttonText}
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}
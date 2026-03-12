'use client';

import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  ChevronUp,
  Stethoscope,
  BookOpen,
  Link2,
  FileText,
  HeartPulse,
} from 'lucide-react';

const exploreLinks = [
  { label: 'Find Doctors', href: '/doctor' },
  { label: 'Diseases', href: '/disease' },
  { label: 'Medicines', href: '/medicine' },
  { label: 'Nutrition', href: '/food-nutrition' },
];

const resourceLinks = [
  { label: 'Health Articles', href: '/about-us' },
  { label: 'Medical Reports', href: '/upload-report' },
  { label: 'Prescriptions', href: '/medicine' },
  { label: 'Support Center', href: '/contact-us' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Dashboard', href: '/dashboard' },
];

const articleLinks = [
  { label: 'How to choose the right doctor', href: '/doctor' },
  { label: 'Medicine safety basics', href: '/medicine' },
  { label: 'Healthy diet for daily life', href: '/food-nutrition' },
  { label: 'Understanding common symptoms', href: '/disease' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Send, href: '#', label: 'Telegram' },
];

function FooterColumn({
  icon: Icon,
  title,
  links,
}: {
  icon: React.ElementType;
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200 to-pink-200 text-emerald-700 shadow-md">
          <Icon size={20} />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      <div className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block text-sm text-slate-300 transition hover:translate-x-1 hover:text-emerald-300"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-14 overflow-hidden border-t border-emerald-300/20 bg-gradient-to-r from-[#1f2328] via-[#262b30] to-[#1f2328] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_28%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.10),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-10 lg:px-10">
        <div className="mb-10 rounded-[28px] border border-white/10 bg-white/5 px-6 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-md">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="text-center lg:text-left">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Smart Medical Platform
              </p>
              <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                Care <span className="text-emerald-300">→</span> Guidance <span className="text-emerald-300">→</span> Better Health
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Explore doctors, diseases, medicines and food guidance from one modern healthcare platform built for speed, clarity, and trust.
              </p>
            </div>

            <Link
              href="/register"
              className="rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-400/30"
            >
              Join Now
            </Link>
          </div>
        </div>

        <div className="grid gap-10 pb-12 md:grid-cols-2 xl:grid-cols-5">
          <FooterColumn icon={Stethoscope} title="Explore" links={exploreLinks} />
          <FooterColumn icon={BookOpen} title="Resources" links={resourceLinks} />
          <FooterColumn icon={Link2} title="Quick Links" links={quickLinks} />
          <FooterColumn icon={FileText} title="Articles" links={articleLinks} />

          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-200 to-pink-200 text-emerald-700 shadow-md">
                <HeartPulse size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">Why Us</h3>
            </div>

            <div className="space-y-2 text-sm leading-7 text-slate-300">
              <p>Trusted health information</p>
              <p>Smart doctor and medicine search</p>
              <p>Clean and modern user experience</p>
              <p>Fast support and easy navigation</p>
              <p>Helpful nutrition and report tools</p>
              <p>Built for users, doctors and pharmacists</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
              <Link href="#" className="transition hover:text-emerald-300">
                Privacy
              </Link>
              <span className="text-slate-500">|</span>
              <Link href="#" className="transition hover:text-emerald-300">
                Terms of Service
              </Link>
              <span className="text-slate-500">|</span>
              <Link href="/contact-us" className="transition hover:text-emerald-300">
                Contact Us
              </Link>
              <span className="text-slate-500">|</span>
              <Link href="/about-us" className="transition hover:text-emerald-300">
                Meet Our Team
              </Link>
            </div>

            <p className="text-sm text-slate-400">
              © 2026 Online Doctor Solution. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-emerald-400/90 to-pink-300/90 text-white shadow-md transition hover:-translate-y-1 hover:scale-105"
                >
                  <Icon size={18} />
                </a>
              );
            })}

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="ml-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-transparent text-white shadow-md transition hover:border-emerald-300 hover:bg-emerald-400/10"
            >
              <ChevronUp size={22} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
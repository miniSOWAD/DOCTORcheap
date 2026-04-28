// client/src/app/contact-us/page.tsx

import type { Metadata } from 'next';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactFormClient from './ContactFormClient';

export const metadata: Metadata = {
  title: 'Contact Us | DOCTORcheap',
  description: 'Get in touch with our medical support and partnership team.',
};

export default function ContactUsPage() {
  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-[40px] border border-emerald-100 bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-800 p-12 text-center shadow-2xl">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-[80px]" />
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-pink-500/20 blur-[80px]" />
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-md">
            Home <span className="mx-1 text-emerald-500/50">»</span> Contact
          </div>
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">Contact Us</h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-300">
            Have a medical inquiry, need platform support, or want to partner with DOCTORcheap? Reach out to our dedicated 24/7 team.
          </p>
        </div>
      </section>

      {/* THREE INFO CARDS (Matching your image layout) */}
      <section className="grid gap-8 md:grid-cols-3">
        <InfoCard 
          icon={Phone} 
          title="Phone:" 
          line1="+880 1977 987420" 
          line2="+880 1829 494993" 
        />
        <InfoCard 
          icon={Mail} 
          title="Email:" 
          line1="support@doctorcheap.com" 
          line2="baisakh2015@gmail.com" 
        />
        <InfoCard 
          icon={MapPin} 
          title="Location:" 
          line1="Bijoy Sarak, Dhanmondi 32" 
          line2="Dhaka, Bangladesh" 
        />
      </section>

      {/* INTERACTIVE FORM SECTION */}
      <section className="mx-auto max-w-5xl rounded-[32px] border border-emerald-100 bg-white p-8 shadow-[0_20px_80px_rgba(16,185,129,0.08)] md:p-12">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">Get Started Now</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Send us a Message</h2>
        </div>
        
        <ContactFormClient />
      </section>
    </div>
  );
}

// Helper component for the 3 top cards
function InfoCard({ icon: Icon, title, line1, line2 }: { icon: React.ElementType, title: string, line1: string, line2: string }) {
  return (
    <div className="relative flex flex-col items-center rounded-3xl border border-emerald-50 bg-white p-8 text-center shadow-lg transition-transform hover:-translate-y-2">
      <div className="absolute -top-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-xl">
        <Icon size={28} />
      </div>
      <div className="mt-8">
        <h3 className="mb-3 text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{line1}</p>
        <p className="mt-1 text-sm text-slate-600">{line2}</p>
      </div>
    </div>
  );
}
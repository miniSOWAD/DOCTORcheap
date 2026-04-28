// client/src/app/about-us/AboutUsClient.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Database, Pill, HeartHandshake, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// --- DATA: Timeline Portal ---
const timelineItems = [
  {
    year: '2021',
    title: 'The Accessible Info Gap',
    quote: '"Medical clarity should not be a premium."',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
  },
  {
    year: '2023',
    title: 'SuperAdmin Verification Core',
    quote: '"Verified nodes build trusted networks."',
    image: 'https://images.unsplash.com/photo-1551076805-e18690c5e561?auto=format&fit=crop&q=80&w=800',
  },
  {
    year: '2025',
    title: 'DOCTORcheap v1 Launch',
    quote: '"A unified ecosystem for modern health."',
    image: 'https://images.unsplash.com/photo-1584931423298-c576fda54bd2?auto=format&fit=crop&q=80&w=800',
  },
];

// --- DATA: Narrative Portal ---
const features = [
  { icon: Database, title: 'Interconnected Database', desc: 'Symptom, disease, and nutrition intelligence.' },
  { icon: ShieldCheck, title: 'Strict Verification', desc: 'Every doctor is vetted by SuperAdmins.' },
  { icon: Pill, title: 'Pharmacy Distribution', desc: 'Direct medicine supply via bulk import.' },
];

export default function AboutUsClient() {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => setSlideIndex((prev) => (prev === timelineItems.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setSlideIndex((prev) => (prev === 0 ? timelineItems.length - 1 : prev - 1));

  return (
    // Deep background matching your premium theme
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 pb-20 pt-10">
      
      {/* Giant Background Watermark */}
      <div className="pointer-events-none absolute bottom-[-5%] left-0 w-full text-center">
        <h1 className="text-[15vw] font-black tracking-tighter text-white/5 select-none">ABOUT US</h1>
      </div>

      {/* Decorative Glow Blobs */}
      <div className="absolute left-[10%] top-[20%] h-96 w-96 rounded-full bg-emerald-500/20 blur-[120px]" />
      <div className="absolute right-[10%] top-[40%] h-96 w-96 rounded-full bg-pink-500/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* ========================================== */}
          {/* PORTAL 1: The Timeline Slider (Left Side)  */}
          {/* ========================================== */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 lg:sticky lg:top-24"
          >
            <BrowserWindow>
              <div className="relative flex h-[500px] flex-col overflow-hidden bg-white p-8">
                
                {/* Large Background Year Watermark */}
                <div className="absolute bottom-4 right-8 text-8xl font-black text-slate-100 select-none">
                  {timelineItems[slideIndex].year}
                </div>

                {/* Slider Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slideIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex h-full flex-col md:flex-row md:items-center gap-8"
                  >
                    {/* Left: Image Box */}
                    <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl shadow-xl md:h-64 md:w-64 border-4 border-white">
                      <Image 
                        src={timelineItems[slideIndex].image} 
                        alt="Timeline Event" 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    
                    {/* Right: Text Box */}
                    <div className="flex flex-col justify-center bg-slate-900 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                      {/* Accent Line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-pink-500" />
                      
                      <span className="text-5xl font-serif text-emerald-400 leading-none">“</span>
                      <p className="mt-2 text-xl font-bold text-white leading-snug">
                        {timelineItems[slideIndex].quote}
                      </p>
                      <span className="mt-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
                        — {timelineItems[slideIndex].title}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="absolute bottom-8 left-8 flex gap-3 z-20">
                  <button onClick={prevSlide} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-600">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextSlide} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-600">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </BrowserWindow>
          </motion.div>


          {/* ========================================== */}
          {/* PORTAL 2: The Narrative Page (Right Side) */}
          {/* ========================================== */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5"
          >
            <BrowserWindow>
              {/* Note: max-h limits height, overflow-y-auto creates the internal scrollbar exactly like the reference */}
              <div className="h-[700px] overflow-y-auto bg-slate-50 overflow-x-hidden custom-scrollbar">
                
                {/* Internal Page Header */}
                <div className="bg-emerald-100 p-8 text-center border-b border-emerald-200 relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 text-emerald-500/20"><HeartHandshake size={150} /></div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-700 relative z-10">Our Story</h2>
                  <h3 className="mt-2 text-3xl font-black text-slate-900 relative z-10">DOCTORcheap</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700 relative z-10">
                    Bridging the gap between specialized medical intelligence and everyday patient accessibility.
                  </p>
                </div>

                {/* Internal Content Body */}
                <div className="p-8 space-y-12">
                  
                  {/* Section: The Mission */}
                  <section>
                    <h4 className="text-xl font-bold text-slate-900 border-b-2 border-emerald-500 pb-2 inline-block mb-4">The Mission</h4>
                    <p className="text-sm leading-relaxed text-slate-600 mb-6">
                      Creating an interconnected database of verified medical professionals and simplified knowledge. Verified nodes ensure absolute accuracy, meaning every piece of nutritional advice and disease symptom logic is vetted.
                    </p>
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-md">
                       <Image src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800" alt="Medical Team" fill className="object-cover" />
                    </div>
                  </section>

                  {/* Section: Our Features */}
                  <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <h4 className="text-xl font-bold text-slate-900 mb-6 text-center">Ecosystem Features</h4>
                    <div className="space-y-4">
                      {features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 transition hover:bg-emerald-50">
                          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <feat.icon size={18} />
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-900">{feat.title}</h5>
                            <p className="text-xs text-slate-500 mt-1">{feat.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Section: The Promise */}
                  <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white text-center shadow-2xl">
                     <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
                     
                     <div className="relative z-10">
                        <h4 className="text-2xl font-black text-pink-400 mb-2">OUR PROMISE</h4>
                        <p className="text-sm text-slate-300 leading-relaxed max-w-xs mx-auto">
                          Affordable access. Absolute data accuracy. Empowered medical distribution. No compromises.
                        </p>
                     </div>
                  </section>

                </div>
              </div>
            </BrowserWindow>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: The macOS style Browser Window Wrapper ---
function BrowserWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-white shadow-2xl backdrop-blur-xl">
      {/* Browser Header Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-400 shadow-sm" />
        <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-sm" />
        <div className="h-3 w-3 rounded-full bg-green-400 shadow-sm" />
      </div>
      {/* Browser Content Window */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
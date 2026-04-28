// client/src/app/contact-us/ContactFormClient.tsx

'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactMessage } from '@/services/contact.service';

export default function ContactFormClient() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Fire the payload to the database via our service
      await submitContactMessage(form);
      
      setStatus('success');
      setForm({ name: '', phone: '', email: '', message: '' }); // Clear form
      
      // Reset back to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 3-Column Grid for basic info */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Name:</label>
          <input 
            required
            type="text" 
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-2xl border border-emerald-100 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Phone:</label>
          <input 
            required
            type="tel" 
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-2xl border border-emerald-100 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email:</label>
          <input 
            required
            type="email" 
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-2xl border border-emerald-100 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>
      </div>

      {/* Full-width Textarea for message */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Message:</label>
        <textarea 
          required
          rows={6}
          placeholder="How can we help you today?"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded-2xl border border-emerald-100 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-center gap-3 rounded-2xl bg-green-50 px-5 py-4 text-green-700 border border-green-200">
          <CheckCircle2 size={20} />
          <p className="font-medium">Your message has been sent successfully! Our team will contact you soon.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-3 rounded-2xl bg-red-50 px-5 py-4 text-red-700 border border-red-200">
          <AlertCircle size={20} />
          <p className="font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:shadow-emerald-500/25 disabled:opacity-70"
        >
          {status === 'loading' ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              Submit Now <Send size={18} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
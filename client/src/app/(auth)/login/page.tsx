import type { Metadata } from 'next';
import Image from 'next/image';
import LoginForm from '@/components/common/forms/LoginForm';
import BackToHomeButton from '@/components/common/buttons/BackToHomeButton';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.18),transparent_25%),linear-gradient(to_bottom_right,#ecfdf5,#ffffff,#fdf2f8)] px-6 py-8">
      <BackToHomeButton />

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 lg:grid-cols-2">
        <div className="relative hidden h-[720px] overflow-hidden rounded-[36px] border border-white/30 shadow-[0_30px_120px_rgba(16,185,129,0.18)] lg:block">
          <Image
            src="/doc.jpg"
            alt="Doctor"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/45 via-emerald-700/20 to-pink-400/20" />

          <div className="absolute inset-0 p-10">
            <div className="flex h-full flex-col justify-between">
              <div className="rounded-[28px] border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-100">
                  DOCTORcheap
                </p>
                <h2 className="text-4xl font-bold leading-tight">
                  Smarter healthcare,
                  <br />
                  cleaner access,
                  <br />
                  faster support.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/85">
                  A modern platform for doctors, medicines, nutrition, disease guidance
                  and digital medical report access.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-3xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md">
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="mt-1 text-sm text-white/80">Guidance ready</p>
                </div>
                <div className="rounded-3xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md">
                  <p className="text-2xl font-bold">Fast</p>
                  <p className="mt-1 text-sm text-white/80">Doctor discovery</p>
                </div>
                <div className="rounded-3xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md">
                  <p className="text-2xl font-bold">Safe</p>
                  <p className="mt-1 text-sm text-white/80">Report handling</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
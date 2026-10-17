'use client';

/**
 * @file app/login/page.tsx
 * @description Customer and administrator sign-in portal for OX Shoes.
 * Supports email/password credentials, demo auto-fill for testing, and redirect to dashboard.
 * Strict TypeScript: ZERO `any`.
 */

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Footer } from '@/components/layout/Footer';
import { Logo } from '@/components/layout/Logo';
import { loginUser, loginWithGoogleFallback } from '@/actions/auth.actions';
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle2, ShieldCheck, Chrome } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg(null);

    const res = await loginUser({ email, password });
    setLoading(false);

    if (res.success) {
      setSuccessMsg(`Welcome back, ${res.data.name}! Redirecting...`);
      setTimeout(() => {
        if (res.data.role === 'admin' || res.data.role === 'super_admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard/profile');
        }
      }, 1000);
    } else {
      setErrorMsg(res.error || 'Invalid email or password.');
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    const res = await loginWithGoogleFallback();
    setLoading(false);
    if (res.success) {
      setSuccessMsg(`Google Authentication successful! Welcome, ${res.data.name}.`);
      setTimeout(() => {
        router.push('/dashboard/profile');
      }, 1000);
    } else {
      setErrorMsg(res.error || 'Failed to authenticate with Google.');
    }
  };

  const handleFillDemo = (role: 'customer' | 'admin') => {
    if (role === 'customer') {
      setEmail('customer@oxshoes.pk');
      setPassword('Customer@OX2026!');
    } else {
      setEmail('manager@oxshoes.pk');
      setPassword('Admin@OX2026!');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col justify-between selection:bg-neutral-950 selection:text-white">
      <AnnouncementBar />
      <Header onOpenSearch={() => {}} />

      <main className="max-w-md mx-auto my-auto p-6 sm:p-8 w-full space-y-6">
        <div className="text-center space-y-3">
          <Logo size="lg" />
          <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-950">
            Sign In to OX Shoes
          </h1>
          <p className="text-xs text-neutral-500">
            Access your orders, track consignments, and manage delivery addresses
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
              <input
                type="email"
                required
                placeholder="customer@oxshoes.pk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-950"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-700">Password</label>
              <Link
                href="/forgot-password"
                className="text-[11px] font-bold text-amber-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-950"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="relative my-3 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <span className="relative bg-white px-2 text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Or Continue With
            </span>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="w-full py-3 rounded-full border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Chrome className="h-4 w-4 text-amber-600" />
            <span>Continue with Google</span>
          </button>

          {/* Quick Demo Autofill */}
          <div className="pt-4 border-t border-neutral-100 text-center space-y-2">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
              Quick Demo Fill:
            </span>
            <div className="flex items-center justify-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleFillDemo('customer')}
                className="px-3 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-[11px]"
              >
                Customer Account
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="px-3 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px]"
              >
                Admin / Manager
              </button>
            </div>
          </div>
        </form>

        <div className="text-center text-xs text-neutral-500">
          Don&apos;t have an account yet?{' '}
          <Link href="/signup" className="font-bold text-neutral-950 hover:underline">
            Create an Account (Get 10% Off)
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

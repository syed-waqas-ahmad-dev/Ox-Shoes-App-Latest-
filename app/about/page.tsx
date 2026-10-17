'use client';

/**
 * @file app/about/page.tsx
 * @description Heritage & Master Craftsman Story page for OX Shoes Pakistan.
 * Details full-grain bovine hides, Charsadda & Lahore atelier traditions, and master shoemaking.
 * Strict TypeScript: ZERO `any`.
 */

import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppWidget } from '@/components/layout/WhatsAppWidget';
import { ShieldCheck, Sparkles, Award, MapPin, Truck, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col justify-between selection:bg-neutral-950 selection:text-white">
      <AnnouncementBar />
      <Header onOpenSearch={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full inline-block">
            Est. 2018 • Lahore & Charsadda Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-950">
            Crafting Pakistan’s Finest Footwear Heritage
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            At OX Shoes, we fuse centuries of traditional Pakistani artisan leathercraft with modern ergonomic precision. Every pair represents the pinnacle of indigenous shoemaking.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base uppercase text-neutral-950">100% Full-Grain Cowhide</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We exclusively use locally-tanned, uncorrected full-grain bovine and calf leathers from premier Kasur and Sialkot tanneries. The leather molds to your foot and develops a lustrous patina over time.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base uppercase text-neutral-950">Master Artisan Guild</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every Kaptaan, Shikari, and Norozi chappal is cut, shaped, and hand-stitched by multi-generational cobbler families from Khyber Pakhtunkhwa and Punjab using durable waxed heavy thread.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base uppercase text-neutral-950">Unmatched Durability</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Traditional recycled aircraft and high-density vehicle tyre outsoles provide exceptional traction and endure years of demanding daily wear across Pakistani terrain.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-14 space-y-6">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Our Headquarters & Flagship Atelier
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Our flagship atelier is located on MM Alam Road in Gulberg III, Lahore, with regional fulfillment hubs in Karachi, Islamabad, and Faisalabad. We proudly deliver across 200+ cities and tehsils in Pakistan with doorstep Cash on Delivery.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-neutral-400">
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                FBR NTN: 8241920-4
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                STRN: 3277876123456
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                TCS & Leopards Official Partner
              </span>
            </div>
          </div>
        </div>
      </main>

      <WhatsAppWidget />
      <Footer />
    </div>
  );
}

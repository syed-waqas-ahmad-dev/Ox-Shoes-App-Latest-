'use client';

/**
 * @file app/compare/page.tsx
 * @description Side-by-side footwear comparison page for Pakistani buyers.
 * Evaluates leather types, tyre sole grips, weights, ratings, and PKR pricing.
 * Strict TypeScript: ZERO `any`.
 */

import Link from 'next/link';
import Image from 'next/image';
import { useCompareStore } from '@/lib/store/compare';
import { useCartStore } from '@/lib/store/cart';
import { useLocale } from '@/lib/store/locale';
import { useHydrated } from '@/lib/hooks/useHydrated';
import { Header } from '@/components/layout/Header';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppWidget } from '@/components/layout/WhatsAppWidget';
import { formatPKR } from '@/lib/formatters/currency';
import {
  Scale,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Star,
  Check,
  ShieldCheck,
} from 'lucide-react';

export default function ComparePage() {
  const { items, removeItem, clearCompare } = useCompareStore();
  const { addItem } = useCartStore();
  const { isUrdu } = useLocale();
  const isHydrated = useHydrated();

  const handleAddToCart = (item: (typeof items)[0]) => {
    addItem({
      productId: item.productId,
      name: item.name,
      nameUr: item.nameUr || item.name,
      image: item.image,
      size: '41',
      color: 'Standard',
      price: item.price,
      originalPrice: item.originalPrice,
      sku: `OX-${item.productId.slice(-4)}`,
      weight: item.weight || 750,
      quantity: 1,
    });
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col justify-between selection:bg-neutral-950 selection:text-white">
        <AnnouncementBar />
        <Header onOpenSearch={() => {}} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-neutral-200 rounded w-48" />
            <div className="h-4 bg-neutral-200 rounded w-72" />
            <div className="h-96 bg-neutral-200 rounded-2xl mt-8" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col justify-between selection:bg-neutral-950 selection:text-white">
      <AnnouncementBar />
      <Header onOpenSearch={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-5 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
              {isUrdu ? 'جوتے کا موازنہ' : `Compare Footwear (${items.length} of 4)`}
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Side-by-side comparison of leather quality, craftsmanship sole, and price
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs font-bold text-neutral-500 hover:text-red-600 transition-colors"
            >
              Clear Comparison Table
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="h-16 w-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto text-neutral-500">
              <Scale className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-950">
              No Shoes in Comparison
            </h2>
            <p className="text-xs text-neutral-500">
              Select &quot;Compare&quot; on any product card in the catalog to compare up to 4 models side-by-side.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 rounded-full bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider"
            >
              Explore Shoes & Chappals
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto pb-6">
            <div className="min-w-[640px] bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-100/60">
                    <th className="p-4 w-44 font-black uppercase text-[11px] text-neutral-500">Feature</th>
                    {items.map((item) => (
                      <th key={item.productId} className="p-4 min-w-[200px] align-top">
                        <div className="relative aspect-square w-full rounded-xl bg-neutral-100 overflow-hidden mb-3 border border-neutral-200">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              referrerPolicy="no-referrer"
                              className="object-cover"
                              sizes="200px"
                            />
                          )}
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-neutral-700 shadow-sm"
                            title="Remove from comparison"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <h3 className="font-bold text-sm text-neutral-950 line-clamp-1">{item.name}</h3>
                        <div className="font-black text-sm text-neutral-950 mt-1">
                          {formatPKR(item.price)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="p-4 font-bold text-neutral-600 bg-neutral-50/50">Category</td>
                    {items.map((item) => (
                      <td key={item.productId} className="p-4 font-semibold text-neutral-900">
                        {item.subCategory}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-neutral-600 bg-neutral-50/50">Brand Origin</td>
                    {items.map((item) => (
                      <td key={item.productId} className="p-4 font-semibold text-neutral-900">
                        {item.brand} (Pakistani Crafts)
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-neutral-600 bg-neutral-50/50">Customer Rating</td>
                    {items.map((item) => (
                      <td key={item.productId} className="p-4 font-bold text-neutral-900 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span>{item.rating || 4.8} / 5.0</span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-neutral-600 bg-neutral-50/50">Weight (Pair)</td>
                    {items.map((item) => (
                      <td key={item.productId} className="p-4 text-neutral-700">
                        {item.weight || 750} grams
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-neutral-600 bg-neutral-50/50">Cash on Delivery</td>
                    {items.map((item) => (
                      <td key={item.productId} className="p-4 text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" />
                        <span>Available Nationwide</span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-neutral-600 bg-neutral-50/50">Action</td>
                    {items.map((item) => (
                      <td key={item.productId} className="p-4">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full py-2.5 px-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          <span>Add to Bag</span>
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <WhatsAppWidget />
      <Footer />
    </div>
  );
}

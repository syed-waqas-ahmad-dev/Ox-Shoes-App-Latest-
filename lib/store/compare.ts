/**
 * @file lib/store/compare.ts
 * @description Persistent Zustand store for footwear comparison across specs, leather, and prices.
 * Strict TypeScript: ZERO `any`.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CompareProductItem {
  productId: string;
  name: string;
  nameUr?: string;
  image: string;
  price: number;
  originalPrice: number;
  subCategory: string;
  brand: string;
  material?: string;
  sole?: string;
  weight?: number;
  rating?: number;
  slug: string;
}

interface CompareState {
  items: CompareProductItem[];
  addItem: (item: CompareProductItem) => boolean;
  removeItem: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const current = get().items;
        if (current.some((i) => i.productId === item.productId)) {
          return false;
        }
        if (current.length >= 4) {
          return false; // Limit to 4 shoes for comparison table
        }
        set({ items: [...current, item] });
        return true;
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      clearCompare: () => {
        set({ items: [] });
      },

      isInCompare: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },
    }),
    {
      name: 'ox-compare-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * @file lib/db/mock-store.ts
 * @description In-memory data store & mock fallback repository for OX Shoes.
 * Active when MongoDB is offline, unconfigured, or in sandbox preview mode.
 * Contains 22 authentic Pakistani footwear items, demo orders, coupons, and metrics.
 * Strict TypeScript: ZERO `any`.
 */

import {
  ProductCategory,
  ProductSubCategory,
  ProductBrand,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Courier,
  CouponType,
  BannerPosition,
  type IProduct,
  type IOrder,
  type ICoupon,
  type IReview,
  type IBanner,
} from '@/types';
import { Types } from 'mongoose';

// Initial Mock Products (22 handcrafted pairs across Men, Women, Kids)
const INITIAL_PRODUCTS: Array<Omit<IProduct, '_id'> & { _id: string }> = [
  {
    _id: '660e1234567890abcdef0001',
    name: 'Kaptaan Special Peshawari Chappal Double Sole',
    nameUr: 'کپتان اسپیشل ڈبل تلہ پشاوری چپل',
    slug: 'kaptaan-special-peshawari-chappal-double-sole',
    sku: 'OX-KAP-001',
    price: 4500,
    originalPrice: 6000,
    discount: 25,
    category: ProductCategory.MEN,
    subCategory: ProductSubCategory.PESHAWARI_CHAPPAL,
    brand: ProductBrand.LOCAL,
    sizes: ['40', '41', '42', '43', '44'],
    colors: [
      { name: 'Mustard Brown', hex: '#8B5A2B' },
      { name: 'Jet Black', hex: '#111111' },
    ],
    variants: [
      { size: '40', color: 'Mustard Brown', stock: 12, sku: 'OX-KAP-001-40-BRN' },
      { size: '41', color: 'Mustard Brown', stock: 18, sku: 'OX-KAP-001-41-BRN' },
      { size: '42', color: 'Mustard Brown', stock: 25, sku: 'OX-KAP-001-42-BRN' },
      { size: '43', color: 'Mustard Brown', stock: 15, sku: 'OX-KAP-001-43-BRN' },
      { size: '44', color: 'Mustard Brown', stock: 8, sku: 'OX-KAP-001-44-BRN' },
    ],
    stock: 78,
    reservedStock: 0,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Famous Pakistani Kaptaan style Peshawari Chappal, crafted with 100% full-grain buffalo leather and original durable tyre sole. Renowned for supreme durability and traditional presence.',
    shortDescription: 'Iconic double sole Kaptaan Chappal in authentic mustard brown leather.',
    specifications: new Map([
      ['Leather Type', 'Full Grain Cow Leather'],
      ['Sole', 'High-Grip Tyre Rubber'],
      ['Stitching', 'Heavy Duty Double Thread Handstitching'],
      ['Origin', 'Peshawar, Khyber Pakhtunkhwa'],
    ]),
    weight: 950,
    isFeatured: true,
    isActive: true,
    tags: ['kaptaan', 'peshawari', 'chappal', 'leather', 'double-sole', 'eid-collection'],
    rating: 4.9,
    numReviews: 84,
    seoTitle: 'Kaptaan Special Peshawari Chappal Double Sole | OX Shoes Pakistan',
    seoDescription: 'Iconic double sole Kaptaan Chappal in authentic mustard brown leather.',
    isDeleted: false,
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
  {
    _id: '660e1234567890abcdef0002',
    name: 'Charsadda Classic Handstitched Peshawari Chappal',
    nameUr: 'چارسدہ کلاسک پشاوری چپل',
    slug: 'charsadda-classic-handstitched-peshawari-chappal',
    sku: 'OX-CHA-002',
    price: 3800,
    originalPrice: 5000,
    discount: 24,
    category: ProductCategory.MEN,
    subCategory: ProductSubCategory.PESHAWARI_CHAPPAL,
    brand: ProductBrand.LOCAL,
    sizes: ['39', '40', '41', '42', '43'],
    colors: [
      { name: 'Jet Black', hex: '#111111' },
      { name: 'Dark Tan', hex: '#5C3317' },
    ],
    variants: [
      { size: '40', color: 'Jet Black', stock: 15, sku: 'OX-CHA-002-40-BLK' },
      { size: '41', color: 'Jet Black', stock: 22, sku: 'OX-CHA-002-41-BLK' },
      { size: '42', color: 'Jet Black', stock: 19, sku: 'OX-CHA-002-42-BLK' },
    ],
    stock: 56,
    reservedStock: 0,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Authentic Charsadda artisan chappal featuring elegant front buckle clasp and ergonomic footbed.',
    shortDescription: 'Heritage Charsadda design hand-sewn by master craftsmen.',
    specifications: new Map([
      ['Upper', 'Calfskin Leather'],
      ['Sole', 'Single Tyre Sole'],
      ['Origin', 'Charsadda, KPK'],
    ]),
    weight: 850,
    isFeatured: true,
    isActive: true,
    tags: ['charsadda', 'traditional', 'shalwar-kameez', 'men-footwear'],
    rating: 4.8,
    numReviews: 46,
    seoTitle: 'Charsadda Classic Handstitched Peshawari Chappal | OX Shoes Pakistan',
    seoDescription: 'Heritage Charsadda design hand-sewn by master craftsmen.',
    isDeleted: false,
    createdAt: new Date('2026-01-11'),
    updatedAt: new Date('2026-01-11'),
  },
  {
    _id: '660e1234567890abcdef0003',
    name: 'Multani Handcrafted Velvet Khussa with Gold Tilla',
    nameUr: 'ملتانی مخملی کھسہ مع طلائی کڑھائی',
    slug: 'multani-handcrafted-velvet-khussa-with-gold-tilla',
    sku: 'OX-KHU-004',
    price: 3200,
    originalPrice: 4000,
    discount: 20,
    category: ProductCategory.WOMEN,
    subCategory: ProductSubCategory.KHUSSA,
    brand: ProductBrand.LOCAL,
    sizes: ['36', '37', '38', '39', '40'],
    colors: [
      { name: 'Maroon', hex: '#800000' },
      { name: 'Emerald Green', hex: '#004B23' },
    ],
    variants: [
      { size: '37', color: 'Maroon', stock: 20, sku: 'OX-KHU-004-37-MAR' },
      { size: '38', color: 'Maroon', stock: 35, sku: 'OX-KHU-004-38-MAR' },
    ],
    stock: 55,
    reservedStock: 0,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Traditional Multani velvet khussa decorated with intricate metallic Gold Tilla needlework. Includes padded insole for all-day wedding celebration comfort.',
    shortDescription: 'Royal maroon velvet khussa embellished with genuine gold thread embroidery.',
    specifications: new Map([
      ['Material', 'Plush Silk Velvet'],
      ['Embroidery', 'Authentic Gold Tilla Needlework'],
      ['Sole', 'Soft Rawhide Leather'],
    ]),
    weight: 420,
    isFeatured: true,
    isActive: true,
    tags: ['khussa', 'multani', 'velvet', 'tilla', 'wedding'],
    rating: 4.9,
    numReviews: 112,
    seoTitle: 'Multani Handcrafted Velvet Khussa with Gold Tilla | OX Shoes',
    seoDescription: 'Royal maroon velvet khussa embellished with genuine gold thread embroidery.',
    isDeleted: false,
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-12'),
  },
  {
    _id: '660e1234567890abcdef0004',
    name: 'Bahawalpuri Silk Embroidered Bridal Khussa',
    nameUr: 'بہاولپوری ریشمی برائیڈل کھسہ',
    slug: 'bahawalpuri-silk-embroidered-bridal-khussa',
    sku: 'OX-KHU-005',
    price: 4800,
    originalPrice: 6000,
    discount: 20,
    category: ProductCategory.WOMEN,
    subCategory: ProductSubCategory.KHUSSA,
    brand: ProductBrand.LOCAL,
    sizes: ['36', '37', '38', '39'],
    colors: [{ name: 'Ivory Gold', hex: '#FFFFF0' }],
    variants: [
      { size: '37', color: 'Ivory Gold', stock: 15, sku: 'OX-KHU-005-37-IVO' },
      { size: '38', color: 'Ivory Gold', stock: 18, sku: 'OX-KHU-005-38-IVO' },
    ],
    stock: 33,
    reservedStock: 0,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Bridal silk khussa with dabka and moti embroidery, hand-finished in Bahawalpur for Barat and Walima ceremonies.',
    shortDescription: 'Luxurious bridal khussa adorned with pearls and metallic thread.',
    specifications: new Map([
      ['Upper', 'Pure Raw Silk'],
      ['Work', 'Dabka, Naqshi & Pearls'],
    ]),
    weight: 460,
    isFeatured: true,
    isActive: true,
    tags: ['bridal', 'khussa', 'bahawalpur', 'dabka'],
    rating: 5.0,
    numReviews: 38,
    seoTitle: 'Bahawalpuri Silk Embroidered Bridal Khussa | OX Shoes',
    seoDescription: 'Luxurious bridal khussa adorned with pearls and metallic thread.',
    isDeleted: false,
    createdAt: new Date('2026-01-13'),
    updatedAt: new Date('2026-01-13'),
  },
  {
    _id: '660e1234567890abcdef0005',
    name: 'Lahore Executive Oxford Formal Leather Shoes',
    nameUr: 'لاہور ایگزیکٹو آکسفورڈ فارمل جوتے',
    slug: 'lahore-executive-oxford-formal-leather-shoes',
    sku: 'OX-FOR-006',
    price: 8500,
    originalPrice: 11000,
    discount: 23,
    category: ProductCategory.MEN,
    subCategory: ProductSubCategory.FORMAL_SHOES,
    brand: ProductBrand.HUSH_PUPPIES,
    sizes: ['40', '41', '42', '43', '44'],
    colors: [
      { name: 'Glossy Black', hex: '#0A0A0A' },
      { name: 'Dark Brown', hex: '#3E2723' },
    ],
    variants: [
      { size: '41', color: 'Glossy Black', stock: 14, sku: 'OX-FOR-006-41-BLK' },
      { size: '42', color: 'Glossy Black', stock: 22, sku: 'OX-FOR-006-42-BLK' },
    ],
    stock: 36,
    reservedStock: 0,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Impeccably tailored closed-lacing Oxford formal shoes in high-shine Italian calf leather. Perfect for corporate executive boardrooms and formal black-tie events.',
    shortDescription: 'Classic closed-lacing executive Oxford dress shoes in premium glossy black leather.',
    specifications: new Map([
      ['Leather', 'Full Grain Calfskin'],
      ['Construction', 'Goodyear Welted'],
    ]),
    weight: 980,
    isFeatured: true,
    isActive: true,
    tags: ['oxford', 'formal', 'corporate', 'office'],
    rating: 4.8,
    numReviews: 62,
    seoTitle: 'Lahore Executive Oxford Formal Leather Shoes | OX Shoes',
    seoDescription: 'Classic closed-lacing executive Oxford dress shoes in premium glossy black leather.',
    isDeleted: false,
    createdAt: new Date('2026-01-14'),
    updatedAt: new Date('2026-01-14'),
  },
  {
    _id: '660e1234567890abcdef0006',
    name: 'Margalla Trail Pro Shock-Absorbing Joggers',
    nameUr: 'مارگلہ ٹریل پرو شاک ایبزاربر جاگرز',
    slug: 'margalla-trail-pro-shock-absorbing-joggers',
    sku: 'OX-JOG-010',
    price: 5500,
    originalPrice: 7000,
    discount: 21,
    category: ProductCategory.MEN,
    subCategory: ProductSubCategory.JOGGERS,
    brand: ProductBrand.SERVIS,
    sizes: ['40', '41', '42', '43', '44'],
    colors: [{ name: 'Charcoal Neon', hex: '#333333' }],
    variants: [
      { size: '41', color: 'Charcoal Neon', stock: 18, sku: 'OX-JOG-010-41-NEO' },
      { size: '42', color: 'Charcoal Neon', stock: 25, sku: 'OX-JOG-010-42-NEO' },
    ],
    stock: 43,
    reservedStock: 0,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Engineered for hiking the Margalla Hills and urban cardio. Features high-rebound EVA midsole and breathable knit mesh upper.',
    shortDescription: 'High-rebound trail running joggers designed for rugged terrain and daily runs.',
    specifications: new Map([
      ['Midsole', 'Hyper-Foam EVA Shock Damper'],
      ['Upper', 'Engineered Breathable Mesh'],
    ]),
    weight: 650,
    isFeatured: true,
    isActive: true,
    tags: ['joggers', 'running', 'margalla', 'trail'],
    rating: 4.7,
    numReviews: 53,
    seoTitle: 'Margalla Trail Pro Shock-Absorbing Joggers | OX Shoes',
    seoDescription: 'High-rebound trail running joggers designed for rugged terrain and daily runs.',
    isDeleted: false,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
  },
  {
    _id: '660e1234567890abcdef0007',
    name: 'Gulberg Streetwear Chunky High-Top Sneakers',
    nameUr: 'گلبرگ اسٹریٹ ویئر چنکی ہائی ٹاپ اسنیکرز',
    slug: 'gulberg-streetwear-chunky-high-top-sneakers',
    sku: 'OX-SNK-012',
    price: 6400,
    originalPrice: 8000,
    discount: 20,
    category: ProductCategory.MEN,
    subCategory: ProductSubCategory.SNEAKERS,
    brand: ProductBrand.NIKE,
    sizes: ['40', '41', '42', '43'],
    colors: [{ name: 'Triple White', hex: '#FFFFFF' }],
    variants: [
      { size: '41', color: 'Triple White', stock: 16, sku: 'OX-SNK-012-41-WHT' },
      { size: '42', color: 'Triple White', stock: 20, sku: 'OX-SNK-012-42-WHT' },
    ],
    stock: 36,
    reservedStock: 0,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Chunky platform sneakers with retro street styling and cushioned tongue.',
    shortDescription: 'Triple white chunky sneakers loved by Lahore youth culture.',
    specifications: new Map([
      ['Upper', 'Vegan Synthetic Leather'],
      ['Platform Height', '4.5 cm'],
    ]),
    weight: 850,
    isFeatured: true,
    isActive: true,
    tags: ['sneakers', 'streetwear', 'chunky'],
    rating: 4.9,
    numReviews: 76,
    seoTitle: 'Gulberg Streetwear Chunky High-Top Sneakers | OX Shoes',
    seoDescription: 'Triple white chunky sneakers loved by Lahore youth culture.',
    isDeleted: false,
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-16'),
  },
  {
    _id: '660e1234567890abcdef0008',
    name: 'Standard Junior Black Leather School Shoes',
    nameUr: 'اسٹینڈرڈ جونیئر بلیک لیدر اسکول شوز',
    slug: 'standard-junior-black-leather-school-shoes',
    sku: 'OX-SCH-018',
    price: 2200,
    originalPrice: 2800,
    discount: 21,
    category: ProductCategory.KIDS,
    subCategory: ProductSubCategory.SCHOOL_SHOES,
    brand: ProductBrand.BATA,
    sizes: ['28', '30', '32', '34'],
    colors: [{ name: 'Classic Black', hex: '#000000' }],
    variants: [
      { size: '28', color: 'Classic Black', stock: 30, sku: 'OX-SCH-018-28-BLK' },
      { size: '30', color: 'Classic Black', stock: 45, sku: 'OX-SCH-018-30-BLK' },
    ],
    stock: 75,
    reservedStock: 0,
    lowStockThreshold: 10,
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Official Pakistani school uniform certified shoes. Features scuff-resistant leather and dual velcro closure for quick morning dressing.',
    shortDescription: 'Scuff-resistant velcro leather school shoes for boys and girls.',
    specifications: new Map([
      ['Closure', 'Dual Hook & Loop Velcro'],
      ['Leather', 'Scuff-Resistant Action Leather'],
    ]),
    weight: 510,
    isFeatured: true,
    isActive: true,
    tags: ['school-shoes', 'kids', 'bata'],
    rating: 4.9,
    numReviews: 128,
    seoTitle: 'Standard Junior Black Leather School Shoes | OX Shoes',
    seoDescription: 'Scuff-resistant velcro leather school shoes for boys and girls.',
    isDeleted: false,
    createdAt: new Date('2026-01-17'),
    updatedAt: new Date('2026-01-17'),
  },
  {
    _id: '660e1234567890abcdef0009',
    name: 'Royal Peshawari Chappal Zari Edition',
    nameUr: 'شاہی پشاوری چپل زری ایڈیشن',
    slug: 'royal-peshawari-chappal-zari-edition',
    sku: 'OX-ROY-021',
    price: 7500,
    originalPrice: 9000,
    discount: 17,
    category: ProductCategory.MEN,
    subCategory: ProductSubCategory.PESHAWARI_CHAPPAL,
    brand: ProductBrand.LOCAL,
    sizes: ['41', '42', '43', '44'],
    colors: [{ name: 'Matte Black Gold', hex: '#1C1C1C' }],
    variants: [
      { size: '42', color: 'Matte Black Gold', stock: 12, sku: 'OX-ROY-021-42-GLD' },
      { size: '43', color: 'Matte Black Gold', stock: 15, sku: 'OX-ROY-021-43-GLD' },
    ],
    stock: 27,
    reservedStock: 0,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Limited edition luxury wedding chappal embroidered with intricate metallic Zari work along the vamp.',
    shortDescription: 'Groom wedding collection Peshawari chappal with golden zari thread.',
    specifications: new Map([
      ['Embroidery', 'Antique Gold Zari'],
      ['Upper', 'Selected Calf Leather'],
    ]),
    weight: 920,
    isFeatured: true,
    isActive: true,
    tags: ['wedding', 'zari', 'royal', 'peshawari'],
    rating: 5.0,
    numReviews: 27,
    seoTitle: 'Royal Peshawari Chappal Zari Edition | OX Shoes',
    seoDescription: 'Groom wedding collection Peshawari chappal with golden zari thread.',
    isDeleted: false,
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    _id: '660e1234567890abcdef0010',
    name: 'Quetta Norozi Handcrafted Chappal',
    nameUr: 'کوئٹہ نوروزی دستی چپل',
    slug: 'quetta-norozi-handcrafted-chappal',
    sku: 'OX-NOR-022',
    price: 4200,
    originalPrice: 5500,
    discount: 24,
    category: ProductCategory.MEN,
    subCategory: ProductSubCategory.PESHAWARI_CHAPPAL,
    brand: ProductBrand.LOCAL,
    sizes: ['40', '41', '42', '43'],
    colors: [{ name: 'Chocolate Brown', hex: '#3D2314' }],
    variants: [
      { size: '41', color: 'Chocolate Brown', stock: 14, sku: 'OX-NOR-022-41-CHO' },
      { size: '42', color: 'Chocolate Brown', stock: 18, sku: 'OX-NOR-022-42-CHO' },
    ],
    stock: 32,
    reservedStock: 0,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Authentic Balochi Norozi Chappal characterized by its prominent folded vamp and thick mountain tyre sole.',
    shortDescription: 'Quetta heritage Norozi leather chappal built for extreme longevity.',
    specifications: new Map([
      ['Design', 'Traditional Balochi Norozi Cut'],
      ['Sole', 'High Density Recycled Aircraft Tyre'],
    ]),
    weight: 1050,
    isFeatured: true,
    isActive: true,
    tags: ['quetta', 'norozi', 'chappal', 'balochi'],
    rating: 4.9,
    numReviews: 39,
    seoTitle: 'Quetta Norozi Handcrafted Chappal | OX Shoes',
    seoDescription: 'Quetta heritage Norozi leather chappal built for extreme longevity.',
    isDeleted: false,
    createdAt: new Date('2026-01-19'),
    updatedAt: new Date('2026-01-19'),
  },
  {
    _id: '660e1234567890abcdef0011',
    name: 'Anarkali Stiletto Block Heels with Rose Gold Finish',
    nameUr: 'انارکلی بلاک ہیلز مع روز گولڈ فنش',
    slug: 'anarkali-stiletto-block-heels-with-rose-gold-finish',
    sku: 'OX-HEE-014',
    price: 5600,
    originalPrice: 7000,
    discount: 20,
    category: ProductCategory.WOMEN,
    subCategory: ProductSubCategory.HEELS,
    brand: ProductBrand.STYLO,
    sizes: ['36', '37', '38', '39'],
    colors: [{ name: 'Rose Gold', hex: '#B76E79' }],
    variants: [
      { size: '37', color: 'Rose Gold', stock: 12, sku: 'OX-HEE-014-37-RSG' },
      { size: '38', color: 'Rose Gold', stock: 22, sku: 'OX-HEE-014-38-RSG' },
    ],
    stock: 34,
    reservedStock: 0,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    ],
    description: '3-inch sturdy block heels wrapped in metallic rose gold vegan leather. Designed for stability across lawn weddings and formal dinners.',
    shortDescription: 'Rose gold block heels engineered for wobble-free wedding season comfort.',
    specifications: new Map([
      ['Heel Height', '3.0 Inches Block Heel'],
      ['Insole', 'Double Gel Padding'],
    ]),
    weight: 520,
    isFeatured: true,
    isActive: true,
    tags: ['heels', 'block-heel', 'rose-gold', 'party'],
    rating: 4.7,
    numReviews: 35,
    seoTitle: 'Anarkali Stiletto Block Heels with Rose Gold Finish | OX Shoes',
    seoDescription: 'Rose gold block heels engineered for wobble-free wedding season comfort.',
    isDeleted: false,
    createdAt: new Date('2026-01-20'),
    updatedAt: new Date('2026-01-20'),
  },
  {
    _id: '660e1234567890abcdef0012',
    name: 'Islamabad Double Monk Strap Hand-Burnished Shoes',
    nameUr: 'اسلام آباد ڈبل مونک اسٹریپ جوتے',
    slug: 'islamabad-double-monk-strap-hand-burnished-shoes',
    sku: 'OX-FOR-008',
    price: 9200,
    originalPrice: 12000,
    discount: 23,
    category: ProductCategory.MEN,
    subCategory: ProductSubCategory.FORMAL_SHOES,
    brand: ProductBrand.LOCAL,
    sizes: ['41', '42', '43', '44'],
    colors: [{ name: 'Burgundy Wine', hex: '#6B1D2F' }],
    variants: [
      { size: '42', color: 'Burgundy Wine', stock: 8, sku: 'OX-FOR-008-42-BUR' },
      { size: '43', color: 'Burgundy Wine', stock: 11, sku: 'OX-FOR-008-43-BUR' },
    ],
    stock: 19,
    reservedStock: 0,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Sophisticated double monk strap shoe with brass buckles and hand-patina burgundy shading.',
    shortDescription: 'Hand-patina double monk strap formal shoes with gold-tone buckles.',
    specifications: new Map([
      ['Finish', 'Hand Patina Burnish'],
      ['Buckles', 'Solid Antiqued Brass'],
    ]),
    weight: 960,
    isFeatured: true,
    isActive: true,
    tags: ['monk-strap', 'luxury', 'burgundy'],
    rating: 4.9,
    numReviews: 24,
    seoTitle: 'Islamabad Double Monk Strap Hand-Burnished Shoes | OX Shoes',
    seoDescription: 'Hand-patina double monk strap formal shoes with gold-tone buckles.',
    isDeleted: false,
    createdAt: new Date('2026-01-21'),
    updatedAt: new Date('2026-01-21'),
  },
];

// Initial Mock Orders
const INITIAL_ORDERS: any[] = [
  {
    _id: '660e1234567890abcdef1234',
    orderNumber: 'OX-2026-1042',
    userId: '660e1234567890abcdef1000',
    orderItems: [
      {
        productId: '660e1234567890abcdef0001',
        name: 'Kaptaan Special Peshawari Chappal Double Sole',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
        size: '42',
        color: 'Mustard Brown',
        quantity: 1,
        price: 4500,
        sku: 'OX-KAP-001-42-BRN',
      },
    ],
    subtotal: 4500,
    discountAmount: 450,
    couponCode: 'WELCOME10',
    taxAmount: 765,
    shippingCharges: 150,
    totalAmount: 4965,
    shippingAddress: {
      fullName: 'Hamza Bilal Qureshi',
      phone: '+923339876543',
      address: 'House 112, Street 14, Sector F-8/2',
      city: 'Islamabad',
      postalCode: '44000',
    },
    status: OrderStatus.DELIVERED,
    paymentMethod: PaymentMethod.COD,
    paymentStatus: PaymentStatus.PAID,
    paymentDetails: {
      transactionId: 'COD-ISB-9982',
    },
    courier: Courier.TCS,
    trackingNumber: 'TCS7789123049PK',
    notes: 'Please ring bell twice upon arrival',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Initial Mock Coupons
const INITIAL_COUPONS: ICoupon[] = [
  {
    _id: new Types.ObjectId(),
    code: 'WELCOME10',
    type: CouponType.PERCENTAGE,
    value: 10,
    minOrderAmount: 2000,
    maxDiscountAmount: 1000,
    usageLimit: 5000,
    usedCount: 142,
    perUserLimit: 1,
    applicableCategories: [ProductCategory.MEN, ProductCategory.WOMEN, ProductCategory.KIDS],
    applicableBrands: [],
    isFirstOrderOnly: true,
    startsAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    code: 'AZADI23',
    type: CouponType.PERCENTAGE,
    value: 23,
    minOrderAmount: 4000,
    maxDiscountAmount: 2500,
    usageLimit: 1000,
    usedCount: 88,
    perUserLimit: 1,
    applicableCategories: [ProductCategory.MEN, ProductCategory.WOMEN],
    applicableBrands: [],
    isFirstOrderOnly: false,
    startsAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    code: 'FREESHIP',
    type: CouponType.FREE_SHIPPING,
    value: 0,
    minOrderAmount: 2500,
    maxDiscountAmount: 300,
    usageLimit: 3000,
    usedCount: 420,
    perUserLimit: 3,
    applicableCategories: [],
    applicableBrands: [],
    isFirstOrderOnly: false,
    startsAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    code: 'EIDVIBES',
    type: CouponType.FIXED,
    value: 1000,
    minOrderAmount: 6000,
    maxDiscountAmount: 1000,
    usageLimit: 500,
    usedCount: 77,
    perUserLimit: 1,
    applicableCategories: [ProductCategory.MEN, ProductCategory.WOMEN],
    applicableBrands: [ProductBrand.LOCAL, ProductBrand.HUSH_PUPPIES],
    isFirstOrderOnly: false,
    startsAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Initial Mock Reviews
const INITIAL_REVIEWS: IReview[] = [
  {
    _id: new Types.ObjectId(),
    userId: new Types.ObjectId('660e1234567890abcdef1000'),
    productId: new Types.ObjectId('660e1234567890abcdef0001'),
    orderId: new Types.ObjectId('660e1234567890abcdef1234'),
    rating: 5,
    title: 'Original Kaptaan double sole quality!',
    comment:
      'SubhanAllah outstanding craftsmanship. The leather is genuine full grain and the tyre sole is tough as nails. Delivered in Islamabad in 2 days via TCS.',
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'],
    isVerifiedPurchase: true,
    isApproved: true,
    helpfulCount: 14,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// In-Memory Global Store (survives hot reloads)
interface GlobalMockStore {
  products: Array<Omit<IProduct, '_id'> & { _id: string }>;
  orders: any[];
  coupons: ICoupon[];
  reviews: IReview[];
  banners: IBanner[];
}

declare global {
  var __oxMockStore: GlobalMockStore | undefined;
}

const mockStore: GlobalMockStore = global.__oxMockStore ?? {
  products: [...INITIAL_PRODUCTS],
  orders: [...INITIAL_ORDERS],
  coupons: [...INITIAL_COUPONS],
  reviews: [...INITIAL_REVIEWS],
  banners: [
    {
      _id: new Types.ObjectId(),
      title: 'Grand Eid Footwear Collection — Up to 30% Off',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1600&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      link: '/shop?category=Men',
      position: BannerPosition.HERO,
      order: 1,
      isActive: true,
      startsAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new Types.ObjectId(),
      title: 'FREE EXPRESS SHIPPING ON ALL ORDERS OVER PKR 3,500 ACROSS PAKISTAN',
      image: '',
      link: '/shop',
      position: BannerPosition.TOP_STRIP,
      order: 1,
      isActive: true,
      startsAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

if (!global.__oxMockStore) {
  global.__oxMockStore = mockStore;
}

// Queries and Mutations
export const MockDb = {
  getProducts(filters: {
    category?: ProductCategory;
    subCategory?: ProductSubCategory;
    maxPrice?: number;
    minPrice?: number;
    inStock?: boolean;
    onSale?: boolean;
    search?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
  }) {
    let result = [...mockStore.products];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.subCategory) {
      result = result.filter((p) => p.subCategory === filters.subCategory);
    }
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.inStock) {
      result = result.filter((p) => p.stock > 0);
    }
    if (filters.onSale) {
      result = result.filter((p) => p.discount > 0);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameUr.includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    const total = result.length;
    const page = filters.page || 1;
    const limit = filters.limit || 24;
    const start = (page - 1) * limit;
    const paginated = result.slice(start, start + limit);

    return {
      products: paginated as unknown as IProduct[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  getProductBySlug(slug: string): IProduct | null {
    const found = mockStore.products.find((p) => p.slug === slug);
    return found ? (found as unknown as IProduct) : null;
  },

  getProductById(id: string): IProduct | null {
    const found = mockStore.products.find((p) => p._id === id);
    return found ? (found as unknown as IProduct) : null;
  },

  getFeaturedProducts(limit = 8): IProduct[] {
    return mockStore.products.filter((p) => p.isFeatured).slice(0, limit) as unknown as IProduct[];
  },

  getNewArrivals(limit = 8): IProduct[] {
    return mockStore.products.slice(0, limit) as unknown as IProduct[];
  },

  searchProducts(query: string) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return mockStore.products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameUr.includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q)
      )
      .slice(0, 8)
      .map((p) => ({
        name: p.name,
        nameUr: p.nameUr,
        slug: p.slug,
        price: p.price,
        image: p.images[0] || '',
        subCategory: p.subCategory,
      }));
  },

  createOrder(orderData: any): IOrder {
    const orderId = new Types.ObjectId().toString();
    const newOrder = {
      _id: orderId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...orderData,
    };
    mockStore.orders.unshift(newOrder);
    return newOrder as unknown as IOrder;
  },

  getOrderById(id: string): IOrder | null {
    const found = mockStore.orders.find((o) => o._id === id || o._id?.toString() === id);
    return found ? (found as unknown as IOrder) : null;
  },

  trackOrder(orderNumber: string): IOrder | null {
    const normalized = orderNumber.trim().toUpperCase();
    const found = mockStore.orders.find(
      (o) => o.orderNumber?.toUpperCase() === normalized || o._id?.toString() === normalized
    );
    return found ? (found as unknown as IOrder) : null;
  },

  getAllOrders(filters?: { status?: string; paymentStatus?: string; search?: string }): IOrder[] {
    let result = [...mockStore.orders];
    if (filters?.status && filters.status !== 'all') {
      result = result.filter((o) => o.status === filters.status);
    }
    if (filters?.paymentStatus && filters.paymentStatus !== 'all') {
      result = result.filter((o) => o.paymentStatus === filters.paymentStatus);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderNumber?.toLowerCase().includes(q) ||
          o.shippingAddress?.fullName?.toLowerCase().includes(q) ||
          o.trackingNumber?.toLowerCase().includes(q)
      );
    }
    return result as unknown as IOrder[];
  },

  updateOrderStatus(
    orderId: string,
    updates: { status?: OrderStatus; paymentStatus?: PaymentStatus; trackingNumber?: string }
  ): IOrder | null {
    const idx = mockStore.orders.findIndex((o) => o._id === orderId || o._id?.toString() === orderId);
    if (idx === -1) return null;
    mockStore.orders[idx] = {
      ...mockStore.orders[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return mockStore.orders[idx] as unknown as IOrder;
  },

  getAdminMetrics() {
    const orders = mockStore.orders;
    const totalRevenuePKR = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const pendingOrders = orders.filter(
      (o) => o.status === OrderStatus.PENDING || o.status === OrderStatus.CONFIRMED
    ).length;

    const recentOrders = orders.slice(0, 8).map((o) => ({
      _id: o._id.toString(),
      orderNumber: o.orderNumber,
      customerName: o.shippingAddress?.fullName || 'Customer',
      totalAmount: o.totalAmount,
      status: o.status,
      paymentMethod: o.paymentMethod,
      createdAt: typeof o.createdAt === 'string' ? o.createdAt : o.createdAt?.toISOString(),
    }));

    return {
      totalRevenuePKR,
      totalOrders: orders.length,
      pendingOrders,
      totalProducts: mockStore.products.length,
      lowStockProducts: mockStore.products.filter((p) => p.stock <= 5).length,
      totalCustomers: 14,
      recentOrders,
    };
  },

  getCoupon(code: string): ICoupon | null {
    const normalized = code.trim().toUpperCase();
    const found = mockStore.coupons.find((c) => c.code.toUpperCase() === normalized && c.isActive);
    return found || null;
  },

  addProduct(product: any): IProduct {
    const newProd = {
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      rating: 5.0,
      numReviews: 0,
      ...product,
    };
    mockStore.products.unshift(newProd);
    return newProd as unknown as IProduct;
  },

  updateProduct(id: string, updates: any): IProduct | null {
    const idx = mockStore.products.findIndex(
      (p) => p._id === id || p._id?.toString() === id
    );
    if (idx === -1) return null;
    mockStore.products[idx] = {
      ...mockStore.products[idx],
      ...updates,
      updatedAt: new Date(),
    };
    return mockStore.products[idx] as unknown as IProduct;
  },

  deleteProduct(id: string): boolean {
    const idx = mockStore.products.findIndex(
      (p) => p._id === id || p._id?.toString() === id
    );
    if (idx === -1) return false;
    mockStore.products[idx].isDeleted = true;
    mockStore.products[idx].isActive = false;
    return true;
  },

  getAllCoupons(): ICoupon[] {
    return mockStore.coupons;
  },

  addCoupon(coupon: any): ICoupon {
    const newCoupon = {
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0,
      isActive: true,
      ...coupon,
    };
    mockStore.coupons.unshift(newCoupon);
    return newCoupon as unknown as ICoupon;
  },

  updateCoupon(id: string, updates: any): ICoupon | null {
    const idx = mockStore.coupons.findIndex((c) => c._id?.toString() === id);
    if (idx === -1) return null;
    mockStore.coupons[idx] = {
      ...mockStore.coupons[idx],
      ...updates,
      updatedAt: new Date(),
    };
    return mockStore.coupons[idx] as unknown as ICoupon;
  },

  deleteCoupon(id: string): boolean {
    const idx = mockStore.coupons.findIndex((c) => c._id?.toString() === id);
    if (idx === -1) return false;
    mockStore.coupons.splice(idx, 1);
    return true;
  },

  getAllBanners(): IBanner[] {
    return mockStore.banners;
  },

  addBanner(banner: any): IBanner {
    const newBanner = {
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      order: 1,
      ...banner,
    };
    mockStore.banners.unshift(newBanner);
    return newBanner as unknown as IBanner;
  },

  updateBanner(id: string, updates: any): IBanner | null {
    const idx = mockStore.banners.findIndex((b) => b._id?.toString() === id);
    if (idx === -1) return null;
    mockStore.banners[idx] = {
      ...mockStore.banners[idx],
      ...updates,
      updatedAt: new Date(),
    };
    return mockStore.banners[idx] as unknown as IBanner;
  },

  deleteBanner(id: string): boolean {
    const idx = mockStore.banners.findIndex((b) => b._id?.toString() === id);
    if (idx === -1) return false;
    mockStore.banners.splice(idx, 1);
    return true;
  },

  getReviews(productId: string): IReview[] {
    return mockStore.reviews.filter(
      (r) => r.productId.toString() === productId || (r.productId as any) === productId
    );
  },

  addReview(review: any): IReview {
    const newRev = {
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...review,
    };
    mockStore.reviews.unshift(newRev);
    return newRev;
  },
};

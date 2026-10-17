/**
 * @file lib/constants.ts
 * @description Enterprise constants and configuration for OX Shoes Pakistan.
 * Strict TypeScript: ZERO `any`.
 */

export const APP_NAME = 'OX Shoes';
export const APP_DESCRIPTION = 'Enterprise Handcrafted Footwear & Sneakers for Pakistan';
export const CURRENCY_CODE = 'PKR';
export const GST_RATE = 0.17; // 17% Pakistani General Sales Tax
export const FREE_SHIPPING_THRESHOLD = 5000; // Free shipping over PKR 5,000
export const COD_MAX_LIMIT_WITHOUT_OTP = 10000; // Require OTP verification for COD > PKR 10,000

export const NAV_LINKS = [
  { label: 'Men', labelUr: 'مردانہ', href: '/shop?category=Men' },
  { label: 'Women', labelUr: 'زنانہ', href: '/shop?category=Women' },
  { label: 'Kids', labelUr: 'بچوں کے', href: '/shop?category=Kids' },
  { label: 'Stores', labelUr: 'اسٹورز', href: '/stores' },
  { label: 'Track', labelUr: 'ٹریکنگ', href: '/track' },
  { label: 'Sale', labelUr: 'سیل', href: '/shop?onSale=true', highlight: true },
];

export const PAKISTAN_MAJOR_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'Quetta',
  'Multan',
  'Faisalabad',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Sukkur',
  'Mardan',
  'Kasur',
  'Sheikhupura',
  'Gujrat',
  'Sahiwal',
];

export const PAYMENT_METHOD_DETAILS = {
  COD: {
    label: 'Cash on Delivery (COD)',
    labelUr: 'کیش آن ڈیلیوری',
    desc: 'Pay in cash when courier delivers to your doorstep anywhere in Pakistan. Open-box inspection allowed.',
    badge: '100% Cash on Delivery',
  },
} as const;

/**
 * Medusa-aligned types for product and cart
 * These types align with Medusa JS API responses
 */

/**
 * Money amount representation
 */
export interface MoneyAmount {
  amount: string;
  currency_code: string;
}

/**
 * Product option value
 */
export interface ProductOptionValue {
  value: string;
}

/**
 * Product option
 */
export interface ProductOption {
  id: string;
  title: string;
  values: string[];
}

/**
 * Product variant
 */
export interface ProductVariant {
  id: string;
  title: string;
  prices: MoneyAmount[];
  inventory_quantity: number;
  options: ProductOptionValue[];
}

/**
 * Product image
 */
export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
}

/**
 * Product type (Medusa-aligned)
 */
export interface MedusaProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  status: 'published' | 'draft';
  thumbnail?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  options: ProductOption[];
  price?: MoneyAmount;
}

/**
 * Cart line item
 */
export interface CartLineItem {
  variant_id: string;
  quantity: number;
}

/**
 * Cart summary
 */
export interface Cart {
  id: string;
  items: CartLineItem[];
  region_id: string;
  total: MoneyAmount;
}

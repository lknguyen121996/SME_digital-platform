/**
 * Medusa-aligned types for product and cart
 * These types align with Medusa JS API responses
 */

/**
 * Calculated price from Medusa (for store products)
 */
export interface CalculatedPrice {
  calculated_amount: number | null;
  original_amount: number | null;
  currency_code: string | null;
}

/**
 * Money amount representation (legacy/cart use)
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
  prices?: MoneyAmount[]; // legacy format
  calculated_price?: CalculatedPrice; // Medusa store API format
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
 * Cart line item - for adding/updating items
 */
export interface CartLineItem {
  variant_id: string;
  quantity: number;
}

/**
 * Cart line item response (from Medusa API)
 */
export interface CartLineItemResponse {
  id: string;
  variant_id: string;
  quantity: number;
}

/**
 * Cart summary - Medusa API response format
 */
export interface Cart {
  id: string;
  items: CartLineItemResponse[];
  region_id: string;
  currency_code: string; // For formatting prices
  total: number;
}

'use client';

import { sdk } from '@/lib/sdk';
import type { CheckoutAddress, ShippingOption, CompleteCartResponse, Cart } from '@/types/medusa';

/**
 * Update cart email and billing address
 */
export async function updateCartAddress(
  cartId: string,
  data: {
    email?: string;
    billingAddress?: CheckoutAddress;
    shippingAddress?: CheckoutAddress;
  }
): Promise<Cart | null> {
  try {
    const updates: Record<string, unknown> = {};

    if (data.email) {
      updates.email = data.email;
    }

    if (data.billingAddress) {
      updates.billing_address = data.billingAddress;
    }

    if (data.shippingAddress) {
      updates.shipping_address = data.shippingAddress;
    }

    if (Object.keys(updates).length === 0) {
      return null;
    }

    console.log('updateCartAddress updates:', updates);
    const response = await sdk.store.cart.update(cartId, updates);
    return (response.cart as unknown as Cart) || null;
  } catch (error) {
    console.error('Failed to update cart address:', error);
    return null;
  }
}

/**
 * Update cart shipping address (if different from billing)
 */
export async function updateShippingAddress(
  cartId: string,
  address: CheckoutAddress
): Promise<Cart | null> {
  try {
    const response = await sdk.store.cart.update(cartId, {
      shipping_address: address,
    });
    return (response.cart as unknown as Cart) || null;
  } catch (error) {
    console.error('Failed to update shipping address:', error);
    return null;
  }
}

/**
 * Get available shipping options for cart using direct fetch
 */
export async function getShippingOptions(cartId: string): Promise<ShippingOption[]> {
  if (!cartId) {
    console.log('getShippingOptions: no cartId provided');
    return [];
  }
  try {
    const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
    const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

    console.log('Fetching shipping options from:', `${MEDUSA_BACKEND_URL}/store/shipping-options?cart_id=${cartId}`);

    const response = await fetch(
      `${MEDUSA_BACKEND_URL}/store/shipping-options?cart_id=${cartId}`,
      {
        headers: {
          'x-publishable-api-key': PUBLISHABLE_KEY,
        },
      }
    );

    const data = await response.json();
    console.log('Direct fetch shipping options response:', data);

    if (!data.shipping_options) {
      return [];
    }

    return data.shipping_options.map((option: Record<string, unknown>) => ({
      id: option.id as string,
      name: option.name as string,
      description: (option.type as Record<string, unknown>)?.description as string || '',
      amount: option.amount as number || 0,
    }));
  } catch (error) {
    console.error('Failed to get shipping options:', error);
    return [];
  }
}

/**
 * Add shipping method to cart
 */
export async function addShippingMethod(
  cartId: string,
  shippingOptionId: string
): Promise<Cart | null> {
  try {
    console.log('Adding shipping method:', { cartId, shippingOptionId });
    const response = await sdk.store.cart.addShippingMethod(cartId, {
      option_id: shippingOptionId,
    });
    console.log('Add shipping method response:', response);
    return (response.cart as unknown as Cart) || null;
  } catch (error) {
    console.error('Failed to add shipping method:', error);
    return null;
  }
}

/**
 * Complete cart (place order)
 */
export async function completeCheckout(
  cartId: string
): Promise<CompleteCartResponse | null> {
  try {
    const response = await sdk.store.cart.complete(cartId);

    if (response.type === 'order') {
      return response as unknown as CompleteCartResponse;
    }

    console.warn('Cart completion returned non-order response:', response);
    return null;
  } catch (error) {
    console.error('Failed to complete cart:', error);
    return null;
  }
}

/**
 * Apply coupon/discount code to cart
 */
export async function applyCouponCode(
  cartId: string,
  couponCode: string
): Promise<Cart | null> {
  try {
    const response = await sdk.store.cart.update(cartId, {
      discounts: [
        {
          code: couponCode,
        },
      ],
    } as unknown as Record<string, unknown>);
    return (response.cart as unknown as Cart) || null;
  } catch (error) {
    console.error('Failed to apply coupon:', error);
    return null;
  }
}

'use client';

import { useState, useCallback } from 'react';
import { useCart } from '@/providers/MedusaProvider';
import {
  updateCartAddress,
  updateShippingAddress,
  getShippingOptions,
  addShippingMethod,
  completeCheckout,
  applyCouponCode,
} from '@/api/checkout';
import type { CheckoutAddress, ShippingOption } from '@/types/medusa';

type CheckoutStep = 'address' | 'shipping' | 'payment' | 'complete';

interface UseCheckoutReturn {
  // State
  step: CheckoutStep;
  isLoading: boolean;
  error: string | null;

  // Form data
  email: string;
  billingAddress: CheckoutAddress;
  shipToDifferentAddress: boolean;
  shippingAddress: CheckoutAddress | null;
  selectedShippingMethodId: string | null;
  selectedPaymentProviderId: string | null;

  // Shipping options
  shippingOptions: ShippingOption[];

  // Cart
  subtotal: number;
  shippingCost: number;
  total: number;

  // Actions
  setEmail: (email: string) => void;
  setBillingAddress: (address: CheckoutAddress) => void;
  setShippingAddress: (address: CheckoutAddress | null) => void;
  setShipToDifferentAddress: (value: boolean) => void;
  setShippingMethod: (methodId: string) => void;
  setPaymentProvider: (providerId: string) => void;

  // Async actions
  updateAddress: () => Promise<boolean>;
  loadShippingOptions: () => Promise<void>;
  selectShippingMethod: (methodId: string) => Promise<boolean>;
  applyCoupon: (code: string) => Promise<boolean>;
  placeOrder: () => Promise<{ success: boolean; orderId?: string; error?: string }>;

  // Helpers
  formatPrice: (amount: number) => string;
}

export function useCheckout(): UseCheckoutReturn {
  const { cart, cartId, isLoading: isCartLoading } = useCart();

  // Checkout step
  const [step, setStep] = useState<CheckoutStep>('address');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [email, setEmail] = useState('');
  const [billingAddress, setBillingAddress] = useState<CheckoutAddress>({
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    country_code: 'VN',
    postal_code: '',
    phone: '',
  });
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<CheckoutAddress | null>(null);
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<string | null>(null);
  const [selectedPaymentProviderId, setPaymentProvider] = useState<string | null>('vnpay');

  // Shipping options
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);

  // Calculate costs
  const subtotal = cart?.total || 0;
  const selectedOption = shippingOptions.find(o => o.id === selectedShippingMethodId);
  const shippingCost = selectedOption?.amount || 0;
  const total = subtotal + shippingCost;

  // Format price
  const formatPrice = useCallback((amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  }, []);

  // Update billing address
  const updateAddress = useCallback(async (): Promise<boolean> => {
    if (!cartId) {
      setError('No cart found');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      const result = await updateCartAddress(cartId, {
        email,
        billingAddress,
      });

      if (result) {
        setStep('shipping');
        return true;
      } else {
        setError('Failed to update address');
        return false;
      }
    } catch {
      setError('Failed to update address');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [cartId, email, billingAddress]);

  // Load shipping options
  const loadShippingOptions = useCallback(async () => {
    if (!cartId) {
      console.log('loadShippingOptions: no cartId');
      return;
    }

    console.log('=== loadShippingOptions called ===');
    console.log('cartId:', cartId);

    try {
      setIsLoading(true);
      const options = await getShippingOptions(cartId);
      console.log('Loaded options:', options);
      setShippingOptions(options);

      // Auto-select free shipping if available, otherwise first option
      if (options.length > 0) {
        const freeOption = options.find(o => o.amount === 0);
        if (freeOption) {
          setSelectedShippingMethodId(freeOption.id);
        } else {
          setSelectedShippingMethodId(options[0].id);
        }
      }
    } catch {
      setError('Failed to load shipping options');
    } finally {
      setIsLoading(false);
    }
  }, [cartId, cart]);

  // Select shipping method
  const selectShippingMethod = useCallback(async (methodId: string): Promise<boolean> => {
    if (!cartId) return false;

    try {
      setIsLoading(true);
      setError(null);

      console.log('useCheckout selectShippingMethod:', { cartId, methodId, shipToDifferentAddress });

      // If ship to different address, update shipping address first
      if (shipToDifferentAddress && shippingAddress) {
        console.log('Updating shipping address first...');
        await updateShippingAddress(cartId, shippingAddress);
      }

      console.log('Calling addShippingMethod...');
      const result = await addShippingMethod(cartId, methodId);
      console.log('addShippingMethod result:', result);

      if (result) {
        setSelectedShippingMethodId(methodId);
        setStep('payment');
        return true;
      } else {
        setError('Failed to select shipping method');
        return false;
      }
    } catch {
      setError('Failed to select shipping method');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [cartId, shipToDifferentAddress, shippingAddress]);

  // Apply coupon
  const applyCoupon = useCallback(async (code: string): Promise<boolean> => {
    if (!cartId) return false;

    try {
      setIsLoading(true);
      setError(null);

      const result = await applyCouponCode(cartId, code);

      if (!result) {
        setError('Invalid coupon code');
        return false;
      }
      return true;
    } catch {
      setError('Failed to apply coupon');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  // Place order
  const placeOrder = useCallback(async (): Promise<{ success: boolean; orderId?: string; error?: string }> => {
    if (!cartId) {
      return { success: false, error: 'No cart found' };
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await completeCheckout(cartId);

      if (response && response.type === 'order') {
        setStep('complete');
        return { success: true, orderId: response.order.id };
      } else {
        return { success: false, error: 'Failed to complete order' };
      }
    } catch {
      const errorMessage = 'Failed to place order';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  return {
    step,
    isLoading: isLoading || isCartLoading,
    error,
    email,
    billingAddress,
    shipToDifferentAddress,
    shippingAddress,
    selectedShippingMethodId,
    selectedPaymentProviderId,
    shippingOptions,
    subtotal,
    shippingCost,
    total,
    setEmail,
    setBillingAddress,
    setShippingAddress,
    setShipToDifferentAddress,
    setShippingMethod: setSelectedShippingMethodId,
    setPaymentProvider,
    updateAddress,
    loadShippingOptions,
    selectShippingMethod,
    applyCoupon,
    placeOrder,
    formatPrice,
  };
}

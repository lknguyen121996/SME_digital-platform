'use client';

import { useCart } from '@/providers/MedusaProvider';
import { ShopNavbar } from '@/components/layout/ShopNavbar';
import { ReactNode } from 'react';

interface CartBubbleProviderProps {
  children: ReactNode;
}

export function CartBubbleProvider({ children }: CartBubbleProviderProps) {
  const { cart } = useCart();
  const cartItemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <>
      <ShopNavbar cartItemCount={cartItemCount} />
      {children}
    </>
  );
}
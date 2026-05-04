'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/providers/MedusaProvider';
import imgCartIcon from '@/features/landing/assets/Cart.png';

interface CartIconProps {
  className?: string;
  iconSize?: number;
  bubbleSize?: 'sm' | 'md';
  variant?: 'light' | 'dark'; // light = dark icon on light bg, dark = white icon on dark bg
}

export function CartIcon({ className = '', iconSize = 24, bubbleSize = 'md', variant = 'dark' }: CartIconProps) {
  const { cart } = useCart();
  const cartItemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const bubbleClasses = bubbleSize === 'sm'
    ? 'w-4 h-4 text-[10px]'
    : 'w-5 h-5 text-xs';

  const iconClass = variant === 'dark' ? 'brightness-0 invert' : '';

  return (
    <Link
      href="/cart"
      className={`relative p-2 hover:bg-white/10 rounded-full transition-colors ${className}`}
    >
      <Image
        src={imgCartIcon}
        alt="Cart"
        width={iconSize}
        height={iconSize}
        className={`w-6 h-6 ${iconClass}`}
      />
      {cartItemCount > 0 && (
        <span className={`absolute -top-1 -right-1 ${bubbleClasses} bg-[#8B4513] text-white font-bold rounded-full flex items-center justify-center`}>
          {cartItemCount > 9 ? '9+' : cartItemCount}
        </span>
      )}
    </Link>
  );
}
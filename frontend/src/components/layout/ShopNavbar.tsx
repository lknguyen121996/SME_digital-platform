'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import logo_main from '@/features/landing/assets/logo_main.svg';
import logo_title from '@/features/landing/assets/logo_title.svg';
import logo_slogan from '@/features/landing/assets/logo_slogan.svg';
import imgUserIcon from '@/features/landing/assets/user-icon.png';
import imgCartIcon from '@/features/landing/assets/Cart.png';

interface ShopNavbarProps {
  cartItemCount?: number;
  className?: string;
}

export function ShopNavbar({ cartItemCount = 0, className }: ShopNavbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <header
      className={cn(
        'w-full bg-[#701620] sticky top-0 z-40',
        className
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={logo_main.src}
              alt="NhoNho"
              className="w-8 h-10 object-contain brightness-0 invert"
            />
            <div className="flex flex-col">
              <img
                src={logo_title.src}
                alt=""
                className="h-2 w-14 object-contain brightness-0 invert"
              />
              <img
                src={logo_slogan.src}
                alt=""
                className="h-0.5 w-20 object-contain brightness-0 invert"
              />
            </div>
          </Link>

          {/* Center: Navigation options */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/shop"
              className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Danh mục rượu
            </Link>
            <Link
              href="/shop?collection=featured"
              className="text-white/80 text-sm hover:text-white transition-colors"
            >
              Bộ sưu tập
            </Link>
            <Link
              href="/shop?category=accessories"
              className="text-white/80 text-sm hover:text-white transition-colors"
            >
              Phụ kiện
            </Link>
            <Link
              href="/shop?category=gifts"
              className="text-white/80 text-sm hover:text-white transition-colors"
            >
              Qùa tặng
            </Link>
          </nav>

          {/* Right: User & Cart icons */}
          <div className="flex items-center gap-4">
            <Link
              href="/account"
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Image
                src={imgUserIcon}
                alt="User"
                width={24}
                height={24}
                className="w-6 h-6 brightness-0 invert"
              />
            </Link>
            <Link
              href="/cart"
              className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
            >
              <Image
                src={imgCartIcon}
                alt="Cart"
                width={24}
                height={24}
                className="w-6 h-6 brightness-0 invert"
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ffc107] text-[#701620] text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function FrontstoreNavFoot() {
  const pathname = usePathname();
  const isShopPage = pathname.startsWith('/shop');

  return (
    <>
      {!isShopPage && <Navigation />}
      <Footer />
    </>
  );
}
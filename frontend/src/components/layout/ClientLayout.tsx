'use client';

import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ClientLayoutProps {
  children: ReactNode;
  shopNavbar?: ReactNode;
}

export default function ClientLayout({ children, shopNavbar }: ClientLayoutProps) {
  const pathname = usePathname();
  const isShopPage = pathname.startsWith('/shop');

  return (
    <>
      {isShopPage && shopNavbar}
      {!isShopPage && <Navigation />}
      {children}
      <Footer />
    </>
  );
}
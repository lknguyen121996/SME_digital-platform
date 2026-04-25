import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'NhoNho - Ngôi nhà của rượu vang hảo hạng',
  description: 'NhoNho – Ngôi nhà của rượu vang hảo hạng, được tuyển chọn dành cho người có gu.',
};

export default function FrontstoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-white">
      {children}
    </div>
  );
}

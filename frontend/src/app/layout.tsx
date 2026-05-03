import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NhoNho - Ngôi nhà của rượu vang hảo hạng',
  description: 'NhoNho – Ngôi nhà của rượu vang hảo hạng, được tuyển chọn dành cho người có gu.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

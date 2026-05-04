import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { MedusaProvider } from '@/providers/MedusaProvider';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MedusaProvider>
      <Navigation />
      {children}
      <Footer />
    </MedusaProvider>
  );
}

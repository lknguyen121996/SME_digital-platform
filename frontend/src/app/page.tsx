import Hero from '@/features/landing/components/hero/Hero';
import AboutUs from '@/features/landing/components/about-us/AboutUs';
import Bestsellers from '@/features/landing/components/bestsellers/Bestsellers';
import Story from '@/features/landing/components/story/Story';

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <Hero />
      <AboutUs />
      <Bestsellers />
      <Story />
    </main>
  );
}

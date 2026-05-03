import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import imgWine from '@/features/landing/assets/hero/wine.png';
import logo_title from '@/features/landing/assets/logo_title.svg';
import imgCoGu from '@/features/landing/assets/hero/CoGu.svg';
import imgThuongVang from '@/features/landing/assets/hero/ThuongVang.svg';
import imgArrow from '@/features/landing/assets/arrow.svg';
import imgBottom from '@/features/landing/assets/hero/bottom_vector.svg';

function Hero() {
  return (
    <div className="relative w-full min-h-screen md:h-[955px] mx-auto overflow-hidden hero-container flex items-center justify-center bg-[#fffcf7]">
      {/* Bottom Vector - centered, 50% width in middle-bottom of hero */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-[1] w-[50%]">
        <img
          src={imgBottom.src}
          alt=""
          className="w-full object-contain object-bottom"
        />
      </div>

      {/* Wine Bottle - Responsive with clamp */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 hero-wine z-[25] w-[clamp(120px,25vw,276px)] h-[clamp(400px,85vw,955px)]">
        <Image
          src={imgWine}
          alt="Wine bottle"
          fill
          className="object-contain hero-wine-pour"
          sizes="(max-width: 768px) 25vw, 276px"
        />
      </div>

      {/* Text Content - Left Side: Logo + Title stacked */}
      <div className="absolute left-4 md:left-[100px] top-[80px] md:top-[106px] flex flex-col gap-[16px] md:gap-[32px] z-20">
        {/* Logo - Responsive width */}
        <div className="h-[6vw] md:h-[4vw] w-[18vw] md:w-[18vw] hero-logo">
          <Image
            src={logo_title}
            alt="NhoNho Logo"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 18vw, 18vw"
          />
        </div>

        {/* Title block: Thưởng vang + Có gu */}
        <div className="relative w-[74vw] md:w-[88vw]">
          {/* Thưởng vang */}
          <div className="h-[14vw] md:h-[14vw] w-full max-w-full hero-title">
            <Image
              src={imgThuongVang}
              alt="Thưởng vang"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 72vw, 85vw"
            />
          </div>

          {/* Có gu - 4% larger */}
          <div className="absolute left-0 top-[14vw] md:top-[14vw] h-[14.5vw] md:h-[14.5vw] w-full hero-title">
            <Image
              src={imgCoGu}
              alt="Có gu"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 72vw, 85vw"
            />
          </div>
        </div>
      </div>

      {/* CTA Content - Bottom Right with hover effects */}
      <div className="absolute z-50 right-[5vw] md:right-[100px] bottom-[8%] md:bottom-[16%] flex flex-col gap-[1vw] md:gap-[23px] items-end hero-cta">
        <p className="text-right text-[1.75vw] md:text-[1.4vw] text-[#701620] w-[35vw] md:w-[21vw] font-['Myriad_Pro'] leading-relaxed">
          NhoNho – Ngôi nhà của rượu vang hảo hạng, được tuyển chọn dành cho người có gu.
        </p>

        <Link
          href="/shop"
          className="flex items-center gap-[1vw] md:gap-[1.2vh] group hero-cta-link"
        >
          <span className="text-[1.5vw] md:text-[1.6vh] text-[#701620] font-bold uppercase tracking-wider hover:tracking-widest transition-all duration-300">
            Khám Phá Ngay
          </span>
          <div className="relative w-[5vh] h-[1vh] overflow-hidden">
            <Image
              src={imgArrow}
              alt=""
              fill
              className="object-contain group-hover:translate-x-2 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}

export default Hero;
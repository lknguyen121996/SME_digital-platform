'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import imgArrow from '@/features/landing/assets/arrow.svg';
import { Footer } from '@/components/layout';
import { Gallery } from '@/features/landing/components/gallery';
import { Blog } from '@/features/landing/components/blog';
import { EventsSection } from '@/features/landing/components/events';

import vineyard from '@/features/landing/assets/story/vineyard.png';
import wine from '@/features/landing/assets/story/wine.png';
import review_icon from '@/features/landing/assets/story/review_icon.svg';
import star_icon from '@/features/landing/assets/story/star_icon.png';
import money_icon from '@/features/landing/assets/story/money_icon.svg';
import wine_icon from '@/features/landing/assets/story/wine_icon.svg';

function Story() {
  const { ref: sectionRef, isVisible, isFadingOut } = useIntersectionObserver();
  const { ref: bgRef, isVisible: isBgVisible, isFadingOut: isBgFadingOut } = useIntersectionObserver();
  const { ref: wineRef, isVisible: isWineVisible, isFadingOut: isWineFadingOut } = useIntersectionObserver();

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="relative w-full flex flex-col items-center">
      <div className="relative w-full max-w-[200vh] mx-auto py-[10vh]">
        {/* Background Image */}
        <div
          ref={bgRef as React.RefObject<HTMLDivElement>}
          className={`relative w-full h-[90vh] transition-all duration-[2000ms] ${isBgVisible && !isBgFadingOut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <img src={vineyard.src} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Wine Bottle - Centered */}
        <div
          ref={wineRef as React.RefObject<HTMLDivElement>}
          className={`absolute left-1/2 -translate-x-1/2 top-[65vh] z-20 w-[100vh] h-[150vh] transition-all duration-[1350ms] ${isWineVisible && !isWineFadingOut ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
        >
          <img src={wine.src} alt="" className="w-full h-full object-contain object-center scale-[0.58]" />
        </div>

        {/* 2-Column Table */}
        <div className={`relative w-full max-w-[150vh] mx-auto z-10 transition-all duration-[1350ms] delay-200 ${isVisible && !isFadingOut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-start justify-between w-full">
            {/* Left Column */}
            <div className="flex flex-col gap-[8vh] w-[30vh]">
              <div className="flex flex-col gap-[1vh]">
                <div className="w-[4vh] h-[4vh]">
                  <img src={wine_icon.src} alt="" className="w-full h-full object-contain" />
                </div>
                <p className="font-['Myriad_Pro:Bold'] text-[3vh] text-[#701620] leading-[1.5]">AOP Corbières, Pháp</p>
              </div>

              <div className="flex flex-col gap-[3vh]">
                <div className="w-[4vh] h-[4vh]">
                  <img src={review_icon.src} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="flex gap-[1.5vh]">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-[1.5vh] h-[1.5vh]">
                      <img src={star_icon.src} alt="" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
                <p className="font-['Myriad_Pro:Bold'] text-[3vh] text-[#701620] leading-none">4.9 sao</p>
              </div>

              <div className="flex flex-col gap-[0.5vh]">
                <div className="w-[4vh] h-[4vh]">
                  <img src={money_icon.src} alt="" className="w-full h-full object-contain" />
                </div>
                <p className="font-['Myriad_Pro:Bold'] text-[3vh] text-[#701620] leading-normal">1,450,000 VNĐ</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-[2vh] w-[50vh]">
              <div className="flex flex-col gap-[1.5vh] items-end text-right">
                <h2 className="font-['Beautique_Display:Bold'] text-[10vh] text-[#701620] leading-[1.5]">Triple Oak 36 Mois</h2>
                <div className="font-['Beautique_Display:Medium'] text-[4vh] text-[#701620] leading-[1.5]">
                  <p>Ba mươi sáu tháng</p>
                  <p>cho một khoảnh khắc hoàn hảo</p>
                </div>
                <div className="flex flex-col gap-[1vh] w-full text-[2vh]">
                  <p className="font-['Myriad_Pro:Regular'] text-[#69624a] leading-[1.5] text-justify w-full">
                    Ba mươi sáu tháng trong thùng gỗ sồi – đủ dài để vang chín muồi, đủ ngắn để giữ trọn rung cảm của trái nho.
                  </p>
                  <p className="font-['Myriad_Pro:Regular'] text-[#69624a] leading-[1.5] text-justify w-full">
                    Từ vùng Corbières nước Pháp, Triple Oak 36 Mois mang hương quả đen chín, gỗ nướng và cacao hòa quyện, cùng tannin mềm như nhung.
                  </p>
                </div>
              </div>

              <div className="flex gap-[2vh]">
                <div className="flex flex-col gap-[2vh] w-full">
                  <div className="flex gap-[2vh]">
                    <p className="font-bold font-['Myriad_Pro'] text-[1.5vh] text-[#4f4a3a] leading-normal w-[12vh]">Loại vang:</p>
                    <p className="font-['Myriad_Pro:Regular'] text-[1.5vh] text-[#69624a] leading-normal">Vang đỏ chát (Dry Red Wine)</p>
                  </div>
                  <div className="flex gap-[2vh]">
                    <p className="font-bold font-['Myriad_Pro'] text-[1.5vh] text-[#4f4a3a] leading-normal w-[12vh]">Hương vị chính:</p>
                    <p className="font-['Myriad_Pro:Regular'] text-[1.5vh] text-[#69624a] leading-normal">Quả đen chín, gỗ nướng, cacao.</p>
                  </div>
                  <div className="flex gap-[2vh]">
                    <p className="font-bold font-['Myriad_Pro'] text-[1.5vh] text-[#4f4a3a] leading-normal w-[12vh]">Cảm nhận (Vị):</p>
                    <p className="font-['Myriad_Pro:Regular'] text-[1.5vh] text-[#69624a] leading-normal">Tannin mềm như nhung, hậu vị kéo dài và cân bằng.</p>
                  </div>
                  <div className="flex gap-[2vh]">
                    <p className="font-bold font-['Myriad_Pro'] text-[1.5vh] text-[#4f4a3a] leading-normal w-[16vh]">Kết hợp lý tưởng:</p>
                    <p className="font-['Myriad_Pro:Regular'] text-[1.5vh] text-[#69624a] leading-normal">Bò hầm rượu vang, thịt cừu nướng rosemary, phô mai cứng hoặc chocolate đen.</p>
                  </div>
                </div>
              </div>

              <a href="/shop" className="relative z-30 flex items-center justify-end gap-[1vh] group">
                <span className="font-['Lato:Bold'] text-[2vh] text-[#701620] text-center uppercase">KHÁM PHÁ</span>
                <div className="relative w-[5vh] h-[1vh] overflow-hidden">
                  <Image src={imgArrow} alt="" fill className="object-contain group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-[15vh]">
          <EventsSection />
        </div>

        <Gallery />

        <Blog />
      </div>

      <Footer />
    </section>
  );
}

export default Story;

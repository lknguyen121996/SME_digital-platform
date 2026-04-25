'use client';

import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// About Us Assets - from Figma
const imgGrape = 'https://www.figma.com/api/mcp/asset/3879e84a-ecc6-4106-9c0f-4a70798de87d';
const imgGroup = 'https://www.figma.com/api/mcp/asset/61e522a0-ec75-4381-a980-1b8a8ab73502';

function AboutUs() {
  const { ref: sectionRef, isVisible, isFadingOut } = useIntersectionObserver();
  const { ref: aboutSectionRef, isVisible: isAboutVisible, isFadingOut: isAboutFadingOut } = useIntersectionObserver();

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="relative w-full bg-[#701620] py-[6vh] md:py-[10vh] px-[2.4vw] md:px-[10vw]">
      <div className="relative w-full max-w-[245vh] mx-auto">
        <h2 className={`font-['Beautique_Display:Bold'] text-[3.2vh] md:text-[6.4vh] text-white leading-[1.5] text-center mb-[8vh] md:mb-[6vh] transition-all duration-1000 ${isVisible && !isFadingOut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="block">Nhonho – Ngôi nhà</span>
          <span className="block">của những tâm hồn sành vang</span>
        </h2>

        <div className={`hidden lg:block absolute left-1/2 top-[14vh] -translate-x-1/2 w-[60vh] h-[65.8vh] transition-all duration-1000 delay-200 ${isVisible && !isFadingOut ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
          <img src={imgGrape} alt="" className="absolute inset-0 w-full h-full object-contain" />
          <div className="absolute bottom-[14.4vh] left-[20.3vh] w-[26.3vh] h-[1.6vh]">
            <img src={imgGroup} alt="" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className={`relative flex flex-col md:flex-row items-start md:items-center justify-between gap-[4vh] md:gap-[6vh] mt-[6vh] md:mt-[11.4vh] transition-all duration-1000 delay-400 ${isVisible && !isFadingOut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-['Beautique_Display:Medium'] text-[2vh] md:text-[3vh] text-[#fff5f5] leading-[1.5] w-full md:w-[27.2vh]">
            <span className="block">Chúng tôi không chỉ</span>
            <span className="block">bán vang– chúng tôi</span>
            <span className="block">chia sẻ một gu sống.</span>
          </h3>
          <p className="font-['Myriad_Pro:Regular'] text-[1.4vh] md:text-[2vh] text-[#fff5f5] leading-[1.5] text-left md:text-right w-full md:w-[28.3vh]">
            NhoNho - ngôi nhà của những người có gu, nơi bạn tìm thấy không chỉ chai vang hợp vị, mà còn là niềm vui trọn vẹn trong từng khoảnh khắc thưởng thức.
          </p>
        </div>

        <div ref={aboutSectionRef as React.RefObject<HTMLDivElement>} className={`relative flex flex-col md:flex-row items-start justify-between gap-[4vh] md:gap-0 mt-[50vh] transition-all duration-600 delay-400 ${isAboutVisible && !isAboutFadingOut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col gap-[2vh] w-full md:w-[31.8vh] transition-all duration-600 delay-500">
            <h3 className="font-['Beautique_Display:Medium'] text-[2vh] md:text-[3vh] text-[#fff5f5] leading-[1.5]">
              <span className="block">Từng giọt vang,</span>
              <span className="block">đong đầy lòng tin</span>
            </h3>
          </div>

          <div className="flex flex-col gap-[6vh] md:gap-[11.4vh] w-full md:w-[28.3vh] text-left md:text-right">
            <div className="flex flex-col gap-[2vh] transition-all duration-600 delay-600">
              <h4 className="font-['Myriad_Pro:Semibold'] text-[1.6vh] md:text-[2vh] text-[#fff5f5] leading-normal">
                Tận tâm và minh bạch – nền tảng của niềm tin
              </h4>
              <p className="font-['Myriad_Pro:Regular'] text-[1.4vh] md:text-[1.9vh] text-[#fff5f5] leading-[1.5]">
                Mỗi chai vang tại NhoNho đều được xác thực qua Vivino và tuân thủ triết lý "Giao vang như giao vàng" – bảo chứng cho chất lượng và sự tin cậy.
              </p>
            </div>

            <div className="flex flex-col gap-[2vh] transition-all duration-600 delay-700">
              <h4 className="font-['Myriad_Pro:Semibold'] text-[1.4vh] md:text-[2vh] text-[#fff5f5] leading-normal">
                Tuyển chọn chuẩn chuyên gia
              </h4>
              <p className="font-['Myriad_Pro:Regular'] text-[1.4vh] md:text-[1.9vh] text-[#fff5f5] leading-[1.5]">
                Hơn 300 nhãn vang được chọn lọc từ các vùng vang danh tiếng, mang đến hương vị và câu chuyện riêng cho trải nghiệm thưởng vang tinh tế.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

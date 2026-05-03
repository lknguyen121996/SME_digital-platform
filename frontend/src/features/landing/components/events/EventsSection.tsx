'use client';

import Image from 'next/image';
import imgArrow from '@/features/landing/assets/arrow.svg';
import type { Event } from '@/types';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant2 = 'https://www.figma.com/api/mcp/asset/dd5316cb-b3eb-4446-a3c8-bd9fe0af33aa';
const imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant4 = 'https://www.figma.com/api/mcp/asset/a1e20b7d-eded-4ad1-9742-200a3dee47ee';
const imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant6 = 'https://www.figma.com/api/mcp/asset/db9fa9a3-8849-47e0-b1f9-502b5259148c';
const imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant8 = 'https://www.figma.com/api/mcp/asset/54d57f13-63a1-453a-bf06-e71c7b104255';
const imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant1 = 'https://www.figma.com/api/mcp/asset/67f3d634-17cc-45b1-bb22-23f317246093';
const imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant3 = 'https://www.figma.com/api/mcp/asset/db37923e-41f9-4d5a-bc37-2f7e23c33f53';
const imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant5 = 'https://www.figma.com/api/mcp/asset/8196e7e8-444a-4839-8d58-5e82c8c65125';
const imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant7 = 'https://www.figma.com/api/mcp/asset/f6c1755d-b4e9-4ca3-b5b0-ac0c968107b6';
import clock_icon from '@/features/landing/assets/event_section/clock_icon.svg';
import calendar_icon from '@/features/landing/assets/calendar_icon.png';
import tag_icon from '@/features/landing/assets/event_section/tag_icon.png';
import map_icon from '@/features/landing/assets/event_section/map_icon.png';
import logo_right from '@/features/landing/assets/logo_main.svg';

const events: Event[] = [
  {
    id: 1,
    title: 'CHAMPAGNE SALON 2015 | HÀNH TRÌNH TRỞ VỀ NGUỒN CỘI',
    time: '18:00 – 21:00',
    date: 'Th 6  18/07/2025',
    price: '2.500.000 VNĐ/người',
    location: 'Lotte Hotel Saigon',
    image: imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant2,
    imageMask: imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant1,
  },
  {
    id: 2,
    title: 'CHAMPAGNE SALON 2015 | HÀNH TRÌNH TRỞ VỀ NGUỒN CỘI',
    time: '18:00 – 21:00',
    date: 'Th 6  18/07/2025',
    price: '2.500.000 VNĐ/người',
    location: 'Lotte Hotel Saigon',
    image: imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant4,
    imageMask: imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant3,
  },
  {
    id: 3,
    title: 'CHAMPAGNE SALON 2015 | HÀNH TRÌNH TRỞ VỀ NGUỒN CỘI',
    time: '18:00 – 21:00',
    date: 'Th 6  18/07/2025',
    price: '2.500.000 VNĐ/người',
    location: 'Lotte Hotel Saigon',
    image: imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant6,
    imageMask: imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant5,
  },
  {
    id: 4,
    title: 'CHAMPAGNE SALON 2015 | HÀNH TRÌNH TRỞ VỀ NGUỒN CỘI',
    time: '18:00 – 21:00',
    date: 'Th 6  18/07/2025',
    price: '2.500.000 VNĐ/người',
    location: 'Lotte Hotel Saigon',
    image: imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant8,
    imageMask: imgCloseUpYoungCoupleToastingWithGlassesRedWineRestaurant7,
  },
];

function EventCard({ event }: { event: Event }) {
  return (
    <div className="relative w-full h-[35vh]">
      <div className="absolute inset-0">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
      <div className="absolute inset-0 flex flex-col justify-between p-[2vh]">
        <p className="font-['Myriad_Pro:Semibold'] text-[2.4vh] text-white leading-[1.5]">
          {event.title}
        </p>
        <div className="flex flex-col gap-[0.8vh]">
          <div className="bg-[rgba(0,0,0,0.51)] flex flex-col gap-[0.8vh] p-[1.6vh]">
            <div className="flex gap-[0.8vh] items-center">
              <div className="w-[2.4vh] h-[2.4vh]">
                <img src={clock_icon.src} alt="" className="w-full h-full object-contain" />
              </div>
              <p className="font-['Myriad_Pro:Regular'] text-[1.6vh] text-white">{event.time}</p>
            </div>
            <div className="flex gap-[0.8vh] items-center">
              <div className="w-[2.4vh] h-[2.4vh]">
                <img src={calendar_icon.src} alt="" className="w-full h-full object-contain" />
              </div>
              <p className="font-['Myriad_Pro:Regular'] text-[1.6vh] text-white">{event.date}</p>
            </div>
            <div className="flex gap-[0.8vh] items-center">
              <div className="w-[2.4vh] h-[2.4vh]">
                <img src={tag_icon.src} alt="" className="w-full h-full object-contain" />
              </div>
              <p className="font-['Myriad_Pro:Regular'] text-[1.6vh] text-white">{event.price}</p>
            </div>
            <div className="flex gap-[0.8vh] items-center">
              <div className="w-[2.4vh] h-[2.4vh]">
                <img src={map_icon.src} alt="" className="w-full h-full object-contain" />
              </div>
              <p className="font-['Myriad_Pro:Regular'] text-[1.6vh] text-white">{event.location}</p>
            </div>
            {/* CTA Button */}
            <div className="flex justify-end">
              <a href="/events" className="flex items-center gap-[0.8vh] bg-[#5a1118] px-[1.6vh] py-[1.2vh] rounded-[0.4vh] group">
                <span className="font-['Myriad_Pro:Regular'] text-[1.6vh] text-white uppercase">Tham gia ngay</span>
                <div className="relative w-[4vh] h-[1.5vh] overflow-hidden">
                  <Image
                    src={imgArrow}
                    alt=""
                    fill
                    className="object-contain brightness-0 invert group-hover:translate-x-2 transition-transform duration-300"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventsSection() {
  const { ref, isVisible, isFadingOut } = useIntersectionObserver();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`relative w-full bg-[#69624a] py-[10vh] flex flex-col items-center transition-all duration-1000 ${isVisible && !isFadingOut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="relative w-full max-w-[140vh] mx-auto flex flex-col gap-[5vh]">
        {/* Header */}
        <div className="flex flex-col gap-[3vh] items-center">
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="font-['Beautique_Display:Regular'] text-[4vh] text-white leading-[1.5]">
                Khi vang "kết nối"
              </p>
            </div>
            <div>
              <p className="font-['Beautique_Display:Bold'] text-[13vh] text-white text-right leading-normal">
                Thưởng Vang
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full h-[0.2vh] bg-white" />
          </div>
        </div>

        {/* Events Grid */}
        <div className="flex flex-col gap-[3.2vh]">
          {/* Row 1: 6/4 ratio */}
          <div className="flex gap-[3.2vh] items-stretch" style={{ height: '35vh' }}>
            <div className="flex-[6]">
              <EventCard event={events[0]} />
            </div>
            <div className="flex-[4]">
              <EventCard event={events[1]} />
            </div>
          </div>

          {/* Row 2: 3:5:2 ratio */}
          <div className="flex gap-[3.2vh] items-stretch" style={{ height: '35vh' }}>
            <div className="flex-[3]">
              <EventCard event={events[2]} />
            </div>
            <div className="flex-[5]">
              <EventCard event={events[3]} />
            </div>
            {/* View More Card */}
            <div className="relative flex-[2] aspect-[326/383] bg-[#736c4e] flex flex-col items-center justify-center gap-[1.6vh] p-[1.6vh]">
              <div className="absolute bottom-0 right-0 w-full h-full opacity-30 overflow-hidden">
                <img src={logo_right.src} alt="" className="w-full h-full object-contain translate-x-[25%] translate-y-[25%]" />
              </div>
              <a href="/events" className="absolute inset-0 flex items-center justify-center gap-[1vh] group p-[1.6vh]">
                <span className="font-['Lato:Bold'] text-[2vh] text-white uppercase">Xem thêm</span>
                <div className="relative w-[5vh] h-[1vh] overflow-hidden">
                  <Image
                    src={imgArrow}
                    alt=""
                    fill
                    className="object-contain group-hover:translate-x-2 transition-transform duration-300 brightness-0 invert"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventsSection;

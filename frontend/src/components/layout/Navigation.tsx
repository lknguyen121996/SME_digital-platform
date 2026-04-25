'use client';

import Image from 'next/image';

const imgUserIcon = 'https://www.figma.com/api/mcp/asset/53e9ddfd-7714-4ba0-a4d0-e0888b532e88';
const imgBagIcon = 'https://www.figma.com/api/mcp/asset/31fcc6a3-21f5-49eb-9fdf-c46adfeb0dde';

function Navigation() {
  return (
    <header className="fixed left-0 top-0 w-full h-[10vw] md:h-[103px] flex items-center justify-center z-50 bg-[#f5f0e6]/50 backdrop-blur-sm">
      {/* 9-column grid layout */}
      <div className="w-[90vw] md:w-[90vw] h-full grid grid-cols-9 items-center">
        {/* Left Navigation - Columns 1-4 with 7.5% left padding */}
        <nav className="col-span-4 pl-[7.5vw] flex gap-[3vw] items-center">
          <a href="/" className="text-[1.2vw] md:text-[1vw] text-[#701620] hover:text-[#901825] transition-colors duration-300">Trang Chủ</a>
          <a href="/about" className="text-[1.2vw] md:text-[1vw] text-[#2c2c2c] hover:text-[#701620] transition-colors duration-300">Về chúng tôi</a>
          <a href="/shop" className="text-[1.2vw] md:text-[1vw] text-[#2c2c2c] hover:text-[#701620] transition-colors duration-300">Cửa hàng</a>
        </nav>

        {/* Center Logo - Column 5 (middle) */}
        <div className="col-span-1 flex justify-center">
          <div className="relative w-[5vw] h-[6vw] md:w-[3vw] md:h-[4vw]">
            <Image src="/logo.svg" alt="NhoNho Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Right Navigation - Columns 6-8 with 7.5% right padding */}
        <nav className="col-span-4 flex justify-end items-center pr-[7.5vw] gap-[2vw]">
          <div className="flex gap-[2vw]">
            <a href="/membership" className="text-[1.2vw] md:text-[1vw] text-[#2c2c2c] hover:text-[#701620] transition-colors duration-300">Membership</a>
            <a href="/events" className="text-[1.2vw] md:text-[1vw] text-[#2c2c2c] hover:text-[#701620] transition-colors duration-300">Sự kiện</a>
            <a href="/blog" className="text-[1.2vw] md:text-[1vw] text-[#2c2c2c] hover:text-[#701620] transition-colors duration-300">Bài viết</a>
          </div>
          <div className="flex items-center gap-[1vw]">
            <a href="/account" className="p-[1vh] hover:scale-110 transition-transform duration-300">
              <Image src={imgUserIcon} alt="User" width={40} height={40} className="w-[2.5vh] h-[2.5vh]" />
            </a>
            <a href="/cart" className="p-[1vh] hover:scale-110 transition-transform duration-300">
              <Image src={imgBagIcon} alt="Cart" width={40} height={40} className="w-[2.5vh] h-[2.5vh]" />
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden absolute left-[4vw] p-[2vw]" aria-label="Menu">
        <svg className="w-[6vw] h-[6vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Cart */}
      <div className="flex gap-[4vw] items-center md:hidden absolute right-[4vw]">
        <button aria-label="User profile" className="hover:opacity-70 transition-opacity duration-300">
          <Image src={imgUserIcon} alt="User" width={24} height={24} />
        </button>
        <button aria-label="Shopping cart" className="hover:opacity-70 transition-opacity duration-300">
          <Image src={imgBagIcon} alt="Cart" width={24} height={24} />
        </button>
      </div>
    </header>
  );
}

export default Navigation;

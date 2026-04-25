'use client';

import Link from 'next/link';

const imgMastercardLogo1 = 'https://www.figma.com/api/mcp/asset/6e481f55-4ba5-46be-97cb-9206f874ca6c';
const imgMastercardLogo2 = 'https://www.figma.com/api/mcp/asset/0f6ce967-8842-434e-9ead-f8cae97de3ae';
const imgLogoDaThongBaoBoCongThuongMauXanh1 = 'https://www.figma.com/api/mcp/asset/d2c0346c-69a4-4409-85d3-22dfd153c9ba';
const imgGroup = 'https://www.figma.com/api/mcp/asset/7078fb0c-4bcd-4e73-8277-966d545b6e23';
const imgGroup1 = 'https://www.figma.com/api/mcp/asset/b4e3d574-4b86-40c3-9dba-67ccfe101124';
const imgGroup2 = 'https://www.figma.com/api/mcp/asset/65fb7f7e-c41e-4666-ad72-9a059ddd835a';
const imgIcBaselineTiktok = 'https://www.figma.com/api/mcp/asset/9422cb21-7f78-4550-934e-9e21fe63f2a7';
const imgStreamlineLogosFacebookLogo2Solid = 'https://www.figma.com/api/mcp/asset/afb13de6-9f34-4b39-a82a-3cb913609c20';
const imgItem = 'https://www.figma.com/api/mcp/asset/5207803f-c74b-40a8-96fd-a06235d2447e';
const imgLayer1 = 'https://www.figma.com/api/mcp/asset/ece06f57-44b1-430a-b820-5cbab176b9bc';
const imgLogoPrimary1 = 'https://www.figma.com/api/mcp/asset/9863d6fb-c343-4e96-8170-2b313f8e4d60';
const imgVector12 = 'https://www.figma.com/api/mcp/asset/fb0cec3c-c035-4e98-89ad-05dcdbe3d6be';

function Footer() {
  return (
    <footer className="relative w-full bg-[#701620] flex flex-col items-center pb-[5vh] pt-[10vh] px-[26vh]">
      <div className="flex gap-[7.8vh] items-start w-full max-w-[140vh]">
        {/* Company Section */}
        <div className="flex flex-col gap-[6vh] w-[28.6vh] items-center">
          <div className="flex flex-col items-center gap-[0.5vh]">
            <div className="relative w-[6vh] h-[10vh]">
              <img src={imgGroup1} alt="SC ATM" className="w-full h-full" />
            </div>
            <div className="relative w-[10vh] h-[2vh]">
              <img src={imgGroup} alt="NhoNho Logo" className="w-full h-full" />
            </div>
            <div className="relative w-[15vh] h-[1vh]">
              <img src={imgGroup2} alt="" className="w-full h-full" />
            </div>
          </div>

          <div className="flex flex-col gap-[1.6vh]">
            <p className="font-['Myriad_Pro:Semibold'] text-[1.6vh] text-white">Kết nối với chúng tôi</p>
            <div className="flex gap-[1vh]">
              <div className="bg-white rounded-full w-[4vh] h-[4vh] flex items-center justify-center">
                <img src={imgIcBaselineTiktok} alt="TikTok" className="w-[2.4vh] h-[2.4vh] object-contain" />
              </div>
              <div className="bg-white rounded-full w-[4vh] h-[4vh] flex items-center justify-center">
                <img src={imgStreamlineLogosFacebookLogo2Solid} alt="Facebook" className="w-[2.4vh] h-[2.4vh] object-contain" />
              </div>
              <div className="w-[4vh] h-[4vh]">
                <img src={imgItem} alt="Instagram" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Section */}
        <div className="flex flex-col gap-[3vh] w-[25.7vh]">
          <p className="font-['Myriad_Pro:Semibold'] text-[1.8vh] text-white">Khám phá</p>
          <div className="flex flex-col gap-[2.8vh] font-['Myriad_Pro:Regular'] text-[1.6vh] text-white">
            <Link href="/" className="hover:text-gray-200 transition-colors">Trang chủ</Link>
            <Link href="/about" className="hover:text-gray-200 transition-colors">Về chúng tôi</Link>
            <Link href="/shop" className="hover:text-gray-200 transition-colors">Cửa hàng</Link>
            <Link href="/membership" className="hover:text-gray-200 transition-colors">Membership</Link>
            <Link href="/events" className="hover:text-gray-200 transition-colors">Sự kiện</Link>
            <Link href="/blog" className="hover:text-gray-200 transition-colors">Bài viết</Link>
          </div>
        </div>

        {/* Product Section */}
        <div className="flex flex-col gap-[3vh] w-[28vh]">
          <p className="font-['Myriad_Pro:Semibold'] text-[1.8vh] text-white">Hỗ trợ khách hàng</p>
          <div className="flex flex-col gap-[2.8vh] font-['Myriad_Pro:Regular'] text-[1.6vh] text-white">
            <Link href="/policies/shipping" className="hover:text-gray-200 transition-colors">Chính sách giao hàng / kiểm hàng</Link>
            <Link href="/policies/privacy" className="hover:text-gray-200 transition-colors">Chính sách bảo mật</Link>
            <Link href="/policies/terms" className="hover:text-gray-200 transition-colors">Điều khoản dịch vụ</Link>
            <Link href="/policies/return" className="hover:text-gray-200 transition-colors">Chính sách bán hàng / thanh toán / đổi trả</Link>
            <Link href="/faq" className="hover:text-gray-200 transition-colors">FAQ</Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-[3vh] w-[34.3vh]">
          <p className="font-['Myriad_Pro:Semibold'] text-[1.8vh] text-white">Liên hệ</p>
          <div className="flex flex-col gap-[2.8vh]">
            <div className="font-['Myriad_Pro:Regular'] text-[1.6vh] text-white">
              <p className="font-['Myriad_Pro:Semibold'] leading-[1.5]">Email</p>
              <p className="leading-[1.5]">xinchao@nhonho.vn</p>
            </div>
            <div className="font-['Myriad_Pro:Regular'] text-[1.6vh] text-white">
              <p className="font-['Myriad_Pro:Semibold'] leading-[1.5]">Điện thoại</p>
              <p className="leading-[1.5]">(+84) 1234 6789</p>
            </div>
            <div className="font-['Myriad_Pro:Regular'] text-[1.6vh] text-white">
              <p className="font-['Myriad_Pro:Semibold'] leading-[1.5]">Địa chỉ</p>
              <p className="leading-[1.5]">184 Nguyễn Văn Trỗi, Phường Phú Nhuận, TP. Hồ Chí Minh</p>
            </div>

            <div className="flex gap-[1.2vh]">
              <div className="bg-white rounded-[0.6vh] px-[1.2vh] py-[0.8vh] w-[5.6vh] h-[3.7vh] flex items-center">
                <img src={imgMastercardLogo1} alt="Mastercard" className="w-[3.6vh] h-[2vh] object-contain" />
              </div>
              <div className="bg-white rounded-[0.6vh] px-[1.2vh] py-[0.8vh] w-[5.6vh] h-[3.7vh] flex items-center justify-center">
                <img src={imgLayer1} alt="Visa" className="w-[3.6vh] h-[1.2vh] object-contain" />
              </div>
              <div className="bg-white rounded-[0.6vh] px-[1.2vh] py-[0.8vh] w-[5.6vh] h-[3.7vh] flex items-center justify-center overflow-hidden">
                <img src={imgMastercardLogo2} alt="Card" className="w-[3.6vh] h-[1.4vh] object-contain" />
              </div>
              <div className="bg-white rounded-[0.6vh] px-[1.2vh] py-[0.8vh] w-[5.6vh] h-[3.7vh] flex items-center justify-center">
                <img src={imgLogoPrimary1} alt="VNPay" className="w-[3.6vh] h-[1.1vh] object-contain" />
              </div>
            </div>

            <div className="w-[18.9vh] h-[7.2vh]">
              <img src={imgLogoDaThongBaoBoCongThuongMauXanh1} alt="Bo Cong Thuong" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[124vh] h-[0.1vh] mt-[3vh]">
        <img src={imgVector12} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="flex flex-col gap-[0.8vh] items-center mt-[3vh]">
        <p className="font-['Myriad_Pro:Bold'] text-[1.6vh] text-white">CÔNG TY TNHH NHONHO</p>
        <p className="font-['Myriad_Pro:Light'] text-[1.4vh] text-white text-center max-w-[75vh]">
          Giấy chứng nhận đăng ký kinh doanh số 0318322866 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu ngày 29/02/2024, đăng ký thay đổi lần thứ 1 ngày 16/05/2024
        </p>
        <p className="font-['Myriad_Pro:Light'] text-[1.4vh] text-white">
          Giấy phép bán lẻ rượu số 313/GPR-PKT do Phòng Kinh Tế Quận Phú Nhuận cấp ngày 18/07/2024
        </p>
      </div>

      <div className="w-full max-w-[124vh] h-[0.1vh] mt-[3vh]">
        <img src={imgVector12} alt="" className="w-full h-full object-contain" />
      </div>

      <p className="font-['Myriad_Pro:Regular'] text-[1.4vh] text-white mt-[2vh]">
        © 2025 — Copyright All Rights reserved
      </p>
    </footer>
  );
}

export default Footer;

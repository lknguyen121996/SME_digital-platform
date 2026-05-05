'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const displayId = searchParams.get('display_id');

  return (
    <main className="min-h-screen w-full bg-[#fffcf7] pt-[10vw] md:pt-[103px]">
      <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-[#701620] rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#701620] mb-4">
          Đặt hàng thành công!
        </h1>

        {/* Message */}
        <p className="text-[#69624a] text-lg mb-6">
          Cảm ơn bạn đã đặt hàng. Chúng tôi đã nhận được đơn hàng của bạn và sẽ xử lý trong thời gian sớm nhất.
        </p>

        {/* Order ID */}
        {orderId && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-[#69624a] text-sm mb-1">Mã đơn hàng</p>
            <p className="text-xl font-bold text-[#2c2c2c]">
              #{displayId || orderId.slice(-8)}
            </p>
          </div>
        )}

        {/* Info */}
        <div className="text-left bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="font-semibold text-[#2c2c2c] mb-4">Thông tin đơn hàng</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#69624a]">Email:</span>
              <span className="text-[#2c2c2c]">Bạn sẽ nhận email xác nhận</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#69624a]">Thời gian giao hàng:</span>
              <span className="text-[#2c2c2c]">3-5 ngày làm việc</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#69624a]">Thanh toán:</span>
              <span className="text-[#2c2c2c]">VNPAY-QR</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="flex-1 bg-[#701620] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#901825] transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
          <Link
            href="/account/orders"
            className="flex-1 border border-[#701620] text-[#701620] px-8 py-3 rounded-md font-semibold hover:bg-[#701620] hover:text-white transition-colors"
          >
            Xem đơn hàng
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen w-full bg-[#fffcf7] pt-[10vw] md:pt-[103px]">
          <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
            <div className="animate-pulse">
              <div className="w-20 h-20 bg-[#f3f1eb] rounded-full mx-auto mb-8"></div>
              <div className="h-8 bg-[#f3f1eb] rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-[#f3f1eb] rounded w-96 mx-auto"></div>
            </div>
          </div>
        </main>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}

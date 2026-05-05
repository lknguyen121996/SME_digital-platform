'use client';

import { useCart } from '@/providers/MedusaProvider';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCheckout } from '@/hooks/useCheckout';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const { cart, cartId, isLoading } = useCart();
  const checkout = useCheckout();

  // Load shipping options when cart is available
  useEffect(() => {
    if (cartId && cart) {
      checkout.loadShippingOptions();
    }
  }, [cartId, cart, checkout.loadShippingOptions]);

  // Redirect to cart if no cart exists
  if (!cartId || !cart) {
    return (
      <main className="min-h-screen w-full bg-[#fffcf7] pt-[10vw] md:pt-[103px]">
        <div className="max-w-[1200px] mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold text-[#701620] mb-8">Thanh toán</h1>
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <p className="text-[#69624a] text-lg">Giỏ hàng trống</p>
            <Link
              href="/shop"
              className="bg-[#701620] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#901825] transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Show order confirmation if step is complete
  if (checkout.step === 'complete') {
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

          <h1 className="text-3xl font-bold text-[#701620] mb-4">
            Đặt hàng thành công!
          </h1>
          <p className="text-[#69624a] text-lg mb-8">
            Cảm ơn bạn đã đặt hàng. Chúng tôi đã nhận được đơn hàng của bạn.
          </p>

          <Link
            href="/shop"
            className="inline-block bg-[#701620] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#901825] transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#fffcf7] pt-[10vw] md:pt-[103px]">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#701620] mb-8">Thanh toán</h1>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-[#69624a]">Đang tải...</p>
          </div>
        )}

        {!isLoading && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Checkout Form */}
            <div className="flex-1">
              <CheckoutForm cart={cart} checkoutHook={checkout} />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:w-[400px]">
              <OrderSummary cart={cart} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

'use client';

import Link from 'next/link';
import { useCart } from '@/providers/MedusaProvider';
import type { CartLineItemResponse } from '@/types/medusa';

function formatPrice(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function CartPage() {
  const { cart, cartId, isLoading, updateItem, removeItem, deleteCart } = useCart();

  const handleUpdateQuantity = async (lineItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(lineItemId);
    } else {
      await updateItem(lineItemId, newQuantity);
    }
  };

  const handleRemoveItem = async (lineItemId: string) => {
    await removeItem(lineItemId);
  };

  const handleClearCart = async () => {
    await deleteCart();
  };

  if (!cartId || !cart) {
    return (
      <main className="min-h-screen w-full bg-[#fffcf7] pt-[10vw] md:pt-[103px]">
        <div className="max-w-[1400px] mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold text-[#701620] mb-8">Giỏ hàng</h1>
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

  return (
    <main className="min-h-screen w-full bg-[#fffcf7] pt-[10vw] md:pt-[103px]">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#701620]">Giỏ hàng</h1>
          <button
            onClick={handleClearCart}
            className="text-[#69624a] hover:text-red-600 transition-colors"
          >
            Xóa tất cả
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-[#69624a]">Đang tải...</p>
          </div>
        )}

        {!isLoading && cart.items && cart.items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <p className="text-[#69624a] text-lg">Giỏ hàng trống</p>
            <Link
              href="/shop"
              className="bg-[#701620] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#901825] transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        )}

        {!isLoading && cart.items && cart.items.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-6 p-4 border-b border-[#d4cfc4] last:border-b-0"
                  >
                    {/* Product Image Placeholder */}
                    <div className="w-24 h-24 bg-[#f3f1eb] rounded-md flex items-center justify-center">
                      <span className="text-[#69624a] text-sm">Hình ảnh</span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <p className="font-semibold text-[#2c2c2c]">Sản phẩm #{item.variant_id.slice(-8)}</p>
                      <p className="text-[#69624a] text-sm mt-1">SKU: {item.variant_id}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-[#d4cfc4] rounded-md flex items-center justify-center hover:bg-[#f3f1eb] transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-[#d4cfc4] rounded-md flex items-center justify-center hover:bg-[#f3f1eb] transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-[#69624a] hover:text-red-600 transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Link
                  href="/shop"
                  className="text-[#701620] hover:underline flex items-center gap-2"
                >
                  ← Tiếp tục mua sắm
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-[400px]">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-[120px]">
                <h2 className="text-xl font-bold text-[#701620] mb-6">Tổng cộng</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#69624a]">Tạm tính</span>
                    <span className="font-semibold">
                      {cart.total > 0
                        ? formatPrice(cart.total, cart.currency_code)
                        : '0 ₫'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#69624a]">Phí vận chuyển</span>
                    <span className="text-[#69624a]">Tính khi checkout</span>
                  </div>
                  <div className="border-t border-[#d4cfc4] pt-4 flex justify-between">
                    <span className="font-semibold text-[#2c2c2c]">Tổng cộng</span>
                    <span className="font-bold text-[#701620] text-xl">
                      {cart.total > 0
                        ? formatPrice(cart.total, cart.currency_code)
                        : '0 ₫'}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-[#701620] text-white py-4 rounded-md font-semibold hover:bg-[#901825] transition-colors">
                  Tiến hành thanh toán
                </button>

                <p className="text-[#69624a] text-sm text-center mt-4">
                  Giá đã bao gồm VAT
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
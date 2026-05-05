'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useCheckout } from '@/hooks/useCheckout';
import type { Cart } from '@/types/medusa';

interface OrderSummaryProps {
  cart: Cart;
}

export function OrderSummary({ cart }: OrderSummaryProps) {
  const { applyCoupon, formatPrice, shippingCost } = useCheckout();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setCouponError(null);
    setCouponSuccess(null);

    const success = await applyCoupon(couponCode);
    if (success) {
      setCouponSuccess(`Áp dụng mã "${couponCode}" thành công!`);
      setCouponCode('');
    } else {
      setCouponError('Mã coupon không hợp lệ hoặc đã hết hạn');
    }
  };

  // Calculate totals
  const subtotal = cart.total || 0;
  const total = subtotal + shippingCost;


  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-[120px]">
      <h2 className="text-xl font-bold text-[#701620] mb-6">Đơn hàng của bạn</h2>

      {/* Product List */}
      <div className="space-y-4 mb-6">
        {cart.items && cart.items.length > 0 ? (
          cart.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              {/* Product Image Placeholder */}
              <div className="w-16 h-16 bg-[#f3f1eb] rounded-md flex items-center justify-center shrink-0">
                <span className="text-[#69624a] text-xs">Hình ảnh</span>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2c2c2c] truncate">
                  Sản phẩm #{item.variant_id.slice(-8)}
                </p>
                <p className="text-xs text-[#69624a]">SKU: {item.variant_id}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#69624a]">x{item.quantity}</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-sm font-semibold text-[#2c2c2c]">
                {formatPrice(subtotal / (cart.items?.length || 1))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#69624a] text-sm">Không có sản phẩm</p>
        )}
      </div>

      {/* Coupon Code */}
      <div className="border-t border-[#d4cfc4] pt-4 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value);
              setCouponError(null);
              setCouponSuccess(null);
            }}
            placeholder="Coupon Code"
            className="flex-1 px-4 py-2 border border-[#d4cfc4] rounded-md focus:outline-none focus:border-[#701620] focus:ring-1 focus:ring-[#701620] text-sm"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim()}
            className={cn(
              'px-4 py-2 border border-[#701620] text-[#701620] rounded-md text-sm font-medium transition-colors',
              !couponCode.trim()
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#701620] hover:text-white'
            )}
          >
            Apply
          </button>
        </div>
        {couponError && (
          <p className="text-red-500 text-sm mt-2">{couponError}</p>
        )}
        {couponSuccess && (
          <p className="text-green-600 text-sm mt-2">{couponSuccess}</p>
        )}
      </div>

      {/* Totals */}
      <div className="border-t border-[#d4cfc4] pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#69624a]">Tạm tính</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-[#69624a]">Vận chuyển</span>
          <span className="text-[#69624a]">
            {shippingCost === 0 ? 'Miễn phí' : formatPrice(shippingCost)}
          </span>
        </div>

        <div className="flex justify-between border-t border-[#d4cfc4] pt-3">
          <span className="font-semibold text-[#2c2c2c]">Tổng cộng</span>
          <span className="font-bold text-[#701620] text-lg">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}

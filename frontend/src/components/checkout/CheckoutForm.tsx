'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Cart } from '@/types/medusa';

type UseCheckoutReturn = ReturnType<typeof import('@/hooks/useCheckout').useCheckout>;

interface CheckoutFormProps {
  cart: Cart;
  checkoutHook: UseCheckoutReturn;
}

export function CheckoutForm({ cart, checkoutHook }: CheckoutFormProps) {
  const router = useRouter();
  const {
    email,
    setEmail,
    billingAddress,
    setBillingAddress,
    shipToDifferentAddress,
    setShipToDifferentAddress,
    shippingAddress,
    setShippingAddress,
    selectedShippingMethodId,
    setShippingMethod,
    updateAddress,
    selectShippingMethod,
    placeOrder,
    formatPrice,
    shippingOptions,
    loadShippingOptions,
  } = checkoutHook;

  // Local form state for controlled inputs
  const [formData, setFormData] = useState({
    email,
    firstName: billingAddress.first_name,
    lastName: billingAddress.last_name,
    address: billingAddress.address_1,
    apartment: billingAddress.address_2 || '',
    city: billingAddress.city,
    postalCode: billingAddress.postal_code,
    phone: billingAddress.phone || '',
  });
  const [localShipToDifferent, setLocalShipToDifferent] = useState(shipToDifferentAddress);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Sync with useCheckout
    if (name === 'email') setEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate
    if (!formData.email || !formData.firstName || !formData.lastName ||
        !formData.address || !formData.city || !formData.phone) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);

    try {
      // Sync billing address to useCheckout
      setBillingAddress({
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        address_2: formData.apartment,
        city: formData.city,
        country_code: 'VN',
        postal_code: formData.postalCode,
        phone: formData.phone,
      });
      setEmail(formData.email);
      setShipToDifferentAddress(localShipToDifferent);

      if (localShipToDifferent) {
        // Set shipping address same as billing for now (could be separate form)
        setShippingAddress({
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          address_2: formData.apartment,
          city: formData.city,
          country_code: 'VN',
          postal_code: formData.postalCode,
          phone: formData.phone,
        });
      }

      // Step 1: Update address
      const addressUpdated = await updateAddress();
      if (!addressUpdated) {
        setError('Không thể cập nhật địa chỉ. Vui lòng thử lại.');
        setIsSubmitting(false);
        return;
      }

      // Reload shipping options after address update (Medusa needs address to calculate shipping)
      console.log('Reloading shipping options after address update...');
      await loadShippingOptions();
      console.log('Shipping options after reload:', shippingOptions);

      // Step 2: Select shipping method
      if (!selectedShippingMethodId) {
        setError('Vui lòng chọn phương thức vận chuyển.');
        setIsSubmitting(false);
        return;
      }

      console.log('Selected shipping method:', selectedShippingMethodId);
      const shippingSelected = await selectShippingMethod(selectedShippingMethodId);
      console.log('Shipping selection result:', shippingSelected);
      if (!shippingSelected) {
        setError('Không thể chọn phương thức vận chuyển. Vui lòng thử lại.');
        setIsSubmitting(false);
        return;
      }

      // Step 3: Place order
      const result = await placeOrder();
      if (result.success && result.orderId) {
        router.push(`/order-confirmation?order_id=${result.orderId}`);
      } else {
        setError(result.error || 'Đặt hàng thất bại. Vui lòng thử lại.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Section */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-[#701620] mb-4">Liên hệ</h2>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#69624a] mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-[#d4cfc4] rounded-md focus:outline-none focus:border-[#701620] focus:ring-1 focus:ring-[#701620] transition-colors"
          />
        </div>
      </section>

      {/* Billing Info Section */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-[#701620] mb-4">Thông tin thanh toán</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-[#69624a] mb-1">
              Tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Tên *"
              className="w-full px-4 py-3 border border-[#d4cfc4] rounded-md focus:outline-none focus:border-[#701620] focus:ring-1 focus:ring-[#701620] transition-colors"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-[#69624a] mb-1">
              Họ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Họ *"
              className="w-full px-4 py-3 border border-[#d4cfc4] rounded-md focus:outline-none focus:border-[#701620] focus:ring-1 focus:ring-[#701620] transition-colors"
            />
          </div>
        </div>

        {/* Country */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-[#69624a] mb-1">
            Quốc gia/Khu vực <span className="text-red-500">*</span>
          </label>
          <div className="px-4 py-3 border border-[#d4cfc4] rounded-md bg-[#f9f9f9] text-[#2c2c2c]">
            <strong>Việt Nam</strong>
          </div>
        </div>

        {/* Address */}
        <div className="mt-4">
          <label htmlFor="address" className="block text-sm font-medium text-[#69624a] mb-1">
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Địa chỉ *"
            className="w-full px-4 py-3 border border-[#d4cfc4] rounded-md focus:outline-none focus:border-[#701620] focus:ring-1 focus:ring-[#701620] transition-colors"
          />
        </div>

        {/* Apartment */}
        <div className="mt-4">
          <label htmlFor="apartment" className="block text-sm font-medium text-[#69624a] mb-1">
            Căn hộ, dãy phòng, đơn vị, v.v. (tuỳ chọn)
          </label>
          <input
            type="text"
            id="apartment"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            placeholder="Căn hộ, dãy phòng, đơn vị... (không bắt buộc)"
            className="w-full px-4 py-3 border border-[#d4cfc4] rounded-md focus:outline-none focus:border-[#701620] focus:ring-1 focus:ring-[#701620] transition-colors"
          />
        </div>

        {/* City & Postal Code */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-[#69624a] mb-1">
              Mã bưu điện
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Mã bưu điện"
              className="w-full px-4 py-3 border border-[#d4cfc4] rounded-md focus:outline-none focus:border-[#701620] focus:ring-1 focus:ring-[#701620] transition-colors"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-[#69624a] mb-1">
              Thị trấn / Thành phố <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Thị trấn / Thành phố *"
              className="w-full px-4 py-3 border border-[#d4cfc4] rounded-md focus:outline-none focus:border-[#701620] focus:ring-1 focus:ring-[#701620] transition-colors"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="mt-4">
          <label htmlFor="phone" className="block text-sm font-medium text-[#69624a] mb-1">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Số điện thoại *"
            className="w-full px-4 py-3 border border-[#d4cfc4] rounded-md focus:outline-none focus:border-[#701620] focus:ring-1 focus:ring-[#701620] transition-colors"
          />
        </div>
      </section>

      {/* Ship to Different Address */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="shipToDifferentAddress"
            name="shipToDifferentAddress"
            checked={localShipToDifferent}
            onChange={(e) => setLocalShipToDifferent(e.target.checked)}
            className="w-5 h-5 accent-[#701620]"
          />
          <label htmlFor="shipToDifferentAddress" className="text-sm font-medium text-[#2c2c2c]">
            Giao hàng đến một địa chỉ khác?
          </label>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-[#701620] mb-4">Vận chuyển</h2>

        <div className="space-y-3">
          {shippingOptions.length === 0 && (
            <p className="text-[#69624a] text-sm">Đang tải phương thức vận chuyển...</p>
          )}
          {shippingOptions.map((option) => (
            <label
              key={option.id}
              className={cn(
                'flex items-center gap-3 p-4 border rounded-md cursor-pointer transition-colors',
                selectedShippingMethodId === option.id
                  ? 'border-[#701620] bg-[#fff5f5]'
                  : 'border-[#d4cfc4] hover:border-[#701620]'
              )}
            >
              <input
                type="radio"
                name="shippingMethod"
                value={option.id}
                checked={selectedShippingMethodId === option.id}
                onChange={() => setShippingMethod(option.id)}
                className="accent-[#701620]"
              />
              <span className="flex-1">{option.name}</span>
              {option.amount === 0 ? (
                <span className="font-semibold">Miễn phí</span>
              ) : (
                <span className="font-semibold">{formatPrice(option.amount)}</span>
              )}
            </label>
          ))}
        </div>
      </section>

      {/* Payment */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-[#701620] mb-4">Thanh toán</h2>

        <label
          className={cn(
            'flex items-start gap-3 p-4 border rounded-md cursor-pointer transition-colors border-[#701620] bg-[#fff5f5]'
          )}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="vnpay"
            defaultChecked={true}
            readOnly
            className="mt-1 accent-[#701620]"
          />
          <div>
            <span className="font-medium">Cổng thanh toán VNPAY-QR</span>
            <p className="text-sm text-[#69624a] mt-1">
              Thanh toán bằng các hình thức quét mã VNPAYQR, nhập thẻ ATM, tài khoản ngân hàng nội địa hoặc thẻ thanh toán quốc tế
            </p>
          </div>
        </label>
      </section>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Privacy Notice */}
      <p className="text-sm text-[#69624a]">
        Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, hỗ trợ trải nghiệm của bạn trên toàn bộ trang web này và cho các mục đích khác được mô tả trong{' '}
        <a href="/chinh-sach-bao-mat" className="text-[#701620] hover:underline">
          chính sách riêng tư
        </a>
        .
      </p>

      {/* Place Order Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'w-full py-4 rounded-md font-semibold text-white transition-colors',
          isSubmitting
            ? 'bg-[#69624a] cursor-not-allowed'
            : 'bg-[#701620] hover:bg-[#901825]'
        )}
      >
        {isSubmitting ? 'Đang xử lý...' : `Đặt hàng  ${formatPrice(cart.total)}`}
      </button>
    </form>
  );
}
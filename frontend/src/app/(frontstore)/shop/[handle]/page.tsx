'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { sdk } from '@/lib/sdk';
import { useCart } from '@/providers/MedusaProvider';
import type { MedusaProduct } from '@/types/medusa';

function formatPrice(amount: string, currencyCode: string): string {
  const num = parseInt(amount, 10);
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(num);
}

export default function ProductDetailPage() {
  const params = useParams();
  const handle = params.handle as string;
  const [product, setProduct] = useState<MedusaProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const response = await sdk.store.product.list({ handle });
        if (response.products && response.products.length > 0) {
          setProduct(response.products[0] as unknown as MedusaProduct);
        } else {
          setError('Không tìm thấy sản phẩm');
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Không thể tải sản phẩm');
      } finally {
        setIsLoading(false);
      }
    }

    if (handle) {
      fetchProduct();
    }
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product || product.variants.length === 0) return;

    setIsAdding(true);
    try {
      await addItem({
        variant_id: product.variants[0].id,
        quantity: selectedQuantity,
      });
      alert('Đã thêm vào giỏ hàng!');
    } catch (err) {
      console.error('Failed to add to cart:', err);
      alert('Không thể thêm vào giỏ hàng');
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-[#fffcf7] pt-[10vw] md:pt-[103px]">
        <div className="max-w-[1400px] mx-auto px-4 py-20">
          <p className="text-center text-[#69624a]">Đang tải sản phẩm...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen w-full bg-[#fffcf7] pt-[10vw] md:pt-[103px]">
        <div className="max-w-[1400px] mx-auto px-4 py-20">
          <p className="text-center text-red-600">{error || 'Không tìm thấy sản phẩm'}</p>
          <div className="text-center mt-4">
            <Link href="/shop" className="text-[#701620] underline">Quay lại cửa hàng</Link>
          </div>
        </div>
      </main>
    );
  }

  const thumbnail = product.thumbnail || product.images?.[0]?.url || '';
  const defaultVariant = product.variants?.[0];
  const price = defaultVariant?.prices?.[0];

  return (
    <main className="min-h-screen w-full bg-[#fffcf7] pt-[10vw] md:pt-[103px]">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <Link href="/shop" className="text-[#701620] mb-4 inline-block">← Quay lại cửa hàng</Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
          {/* Product Image */}
          <div className="relative aspect-square bg-[#f3f1eb] rounded-lg overflow-hidden">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={product.title}
                fill
                className="object-contain p-8"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-[#69624a]">
                Không có hình ảnh
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-[#701620]">{product.title}</h1>

            {price && (
              <p className="text-2xl font-semibold text-[#69624a]">
                {formatPrice(price.amount, price.currency_code)}
              </p>
            )}

            {product.description && (
              <p className="text-[#69624a] leading-relaxed">{product.description}</p>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-[#69624a]">Số lượng:</label>
              <select
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(parseInt(e.target.value, 10))}
                className="border border-[#d4cfc4] rounded-md px-4 py-2 bg-white text-[#2c2c2c]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="bg-[#701620] text-white px-8 py-4 rounded-md font-semibold hover:bg-[#901825] transition-colors disabled:opacity-50"
            >
              {isAdding ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
            </button>

            {/* Product Details */}
            <div className="mt-8 border-t border-[#d4cfc4] pt-6">
              <h3 className="text-lg font-semibold text-[#701620] mb-4">Thông tin sản phẩm</h3>
              <div className="space-y-2 text-[#69624a]">
                <p><span className="font-semibold">Trạng thái:</span> {product.status === 'published' ? 'Còn hàng' : 'Hết hàng'}</p>
                {defaultVariant && (
                  <p><span className="font-semibold">Tồn kho:</span> {defaultVariant.inventory_quantity}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
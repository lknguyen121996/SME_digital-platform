'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@/lib/sdk';
import { ProductGrid } from '@/features/shop/components/ProductGrid';
import { ProductCard } from '@/features/shop/components/ProductCard';
import type { MedusaProduct } from '@/types/medusa';

export default function ShopPage() {
  const [products, setProducts] = useState<MedusaProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const response = await sdk.store.product.list({
          limit: 20,
        });
        setProducts((response.products || []) as unknown as MedusaProduct[]);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Không thể tải sản phẩm');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#fffcf7] pt-[10vw] md:pt-[103px]">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#701620] mb-8">Cửa hàng</h1>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-[#69624a]">Đang tải sản phẩm...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-20">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <p className="text-[#69624a]">Chưa có sản phẩm nào</p>
          </div>
        )}

        {!isLoading && products.length > 0 && (
          <ProductGrid columns={4}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        )}
      </div>
    </main>
  );
}
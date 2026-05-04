'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { sdk } from '@/lib/sdk';
import { ProductGrid } from '@/features/shop/components/ProductGrid';
import { ProductCard } from '@/features/shop/components/ProductCard';
import type { MedusaProduct } from '@/types/medusa';
import { FilterPanel } from '@/components/shop/FilterPanel';
import shopTitle from '@/features/shop/assets/title.png';
import { MOCK_PRODUCTS } from '@/api/medusa/client';

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name_asc';

interface ShopPageContentProps {
  searchQuery: string;
  sortOption: SortOption;
  category: string;
}

function ShopPageContent({ searchQuery, sortOption, category }: ShopPageContentProps) {
  const router = useRouter();
  const [products, setProducts] = useState<MedusaProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const params: Record<string, unknown> = {
          limit: 20,
          fields: '+variants.calculated_price',
        };

        // Add search query
        if (searchQuery) {
          params.q = searchQuery;
        }

        // Add category filter
        if (category && category !== 'all') {
          params.category = category;
        }

        // Add sorting - only use valid Medusa fields
        switch (sortOption) {
          case 'newest':
            // Medusa doesn't support created_at ordering directly, skip sorting
            break;
          case 'price_asc':
            params.order = 'price:asc';
            break;
          case 'price_desc':
            params.order = 'price:desc';
            break;
          case 'name_asc':
            params.order = 'title:asc';
            break;
        }

        // Try API first, fallback to mock data
        try {
          const regionId = process.env.NEXT_PUBLIC_MEDUSA_DEFAULT_REGION_ID;

          const response = await sdk.store.product.list({
            ...params,
            ...(regionId && { region_id: regionId }),
          });
          setProducts((response.products || []) as unknown as MedusaProduct[]);
        } catch (apiError) {
          console.warn('API fetch failed, using mock products:', apiError);
          setProducts(MOCK_PRODUCTS);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setProducts(MOCK_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [searchQuery, sortOption, category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (localSearch) {
      params.set('q', localSearch);
    }
    if (category && category !== 'all') {
      params.set('category', category);
    }
    if (sortOption !== 'newest') {
      params.set('sort', sortOption);
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <main className="min-h-screen w-full bg-[#fffcf7]">
      {/* Sticky Header with Title + Search */}
      <div className="sticky top-16 bg-[#fffcf7] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="border-b border-[#e8e0d5] py-4">
            <div className="flex items-center justify-between gap-4 lg:gap-6">
              {/* Left: Title */}
              <h1 className="text-xl font-semibold text-[#701620] shrink-0">
                {category === 'all' || !category
                  ? <img src={shopTitle.src} alt="All Wine" className="h-12 w-auto" />
                  : getCategoryName(category)}
              </h1>

              {/* Right: Search */}
              <form onSubmit={handleSearch} className="max-w-md flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full px-4 py-2 pr-10 bg-white border border-[#e8e0d5] rounded-lg text-sm text-[#2c2c2c] placeholder:text-[#69624a]/60 focus:outline-none focus:border-[#701620] focus:ring-1 focus:ring-[#701620] transition-colors duration-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#69624a] hover:text-[#701620] transition-colors duration-300 p-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Sidebar + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-8">
        <div className="flex gap-6">
          {/* Filter Sidebar - Left - Sticky */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-36 self-start">
            <FilterPanel isOpen={true} onClose={() => {}} />
          </aside>

          {/* Product Grid - Right */}
          <div className="flex-1">
            {/* Loading */}
            {isLoading && (
              <div className="flex items-center justify-center py-12 lg:py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-[#701620] border-t-transparent rounded-full animate-spin" />
                  <p className="text-[#69624a]">Đang tải sản phẩm...</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 lg:py-20">
                <svg
                  className="w-16 h-16 text-[#69624a]/40 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-[#69624a] text-lg mb-2">Không tìm thấy sản phẩm nào</p>
                <p className="text-[#69624a]/70 text-sm">
                  Hãy thử tìm kiếm với từ khóa khác
                </p>
              </div>
            )}

            {/* Products */}
            {!isLoading && products.length > 0 && (
              <ProductGrid columns={3}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductGrid>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function getCategoryName(category: string): string {
  const categoryMap: Record<string, string> = {
    'red-wine': 'Rượu vang đỏ',
    'white-wine': 'Rượu vang trắng',
    'rose-wine': 'Rượu vang hồng',
    'champagne': 'Champagne',
  };
  return categoryMap[category] || category;
}

function ShopPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen w-full bg-[#fffcf7]">
          <div className="h-16" />
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center py-12 lg:py-20">
              <div className="w-8 h-8 border-4 border-[#701620] border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        </main>
      }
    >
      <ShopPageInner />
    </Suspense>
  );
}

function ShopPageInner() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const sortParam = searchParams.get('sort') as SortOption | null;
  const sortOption: SortOption = sortParam || 'newest';
  const category = searchParams.get('category') || 'all';

  return (
    <ShopPageContent
      searchQuery={searchQuery}
      sortOption={sortOption}
      category={category}
    />
  );
}

export default ShopPage;

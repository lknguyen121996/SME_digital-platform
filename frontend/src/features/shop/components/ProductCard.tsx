'use client';

import { useState } from 'react';
import { MedusaProduct } from '@/types/medusa';
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useCart } from '@/providers/MedusaProvider';

interface ProductCardProps {
  product: MedusaProduct;
  className?: string;
  variant?: 'default' | 'compact';
}

/**
 * Get all prices from all variants - returns array for finding min price
 */
function getAllVariantPrices(product: MedusaProduct) {
  const prices: { amount: string; currencyCode: string; variantId: string }[] = [];

  for (const variant of product.variants || []) {
    if (variant.calculated_price?.calculated_amount != null) {
      prices.push({
        amount: variant.calculated_price.calculated_amount.toString(),
        currencyCode: variant.calculated_price.currency_code || 'VND',
        variantId: variant.id,
      });
    } else if (variant.prices?.[0]) {
      prices.push({
        amount: variant.prices[0].amount,
        currencyCode: variant.prices[0].currency_code,
        variantId: variant.id,
      });
    }
  }

  return prices;
}

/**
 * Get lowest price from all variants
 */
function getLowestPriceInfo(product: MedusaProduct) {
  const allPrices = getAllVariantPrices(product);

  if (allPrices.length === 0) return null;

  // Sort by amount ascending and get the lowest
  const lowest = allPrices.sort((a, b) =>
    parseInt(a.amount, 10) - parseInt(b.amount, 10)
  )[0];

  // Return lowest price with all variant IDs for cart
  return {
    amount: lowest.amount,
    currencyCode: lowest.currencyCode,
    variantId: lowest.variantId,
    hasMultipleVariants: allPrices.length > 1,
  };
}

/**
 * Product card component using Medusa types
 * Includes add-to-cart functionality with loading and success states
 */
export function ProductCard({ product, className, variant = 'default' }: ProductCardProps) {
  const { cart, addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const thumbnail = product.thumbnail || product.images?.[0]?.url || '/placeholder.png';
  const priceInfo = getLowestPriceInfo(product);

  // Check if this variant is already in cart
  const isInCart = cart?.items?.some((item) => item.variant_id === priceInfo?.variantId);

  const handleAddToCart = async () => {
    if (!priceInfo || isAdding || justAdded) return;

    try {
      setIsAdding(true);
      await addItem({ variant_id: priceInfo.variantId, quantity: 1 });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (err) {
      console.error('Failed to add item:', err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className={cn('group cursor-pointer', justAdded && 'ring-2 ring-[#701620]', className)}>
      <CardImage
        src={thumbnail}
        alt={product.title}
        className={cn(
          'aspect-[3/4] transition-transform duration-300 group-hover:scale-105',
          variant === 'compact' && 'aspect-square'
        )}
      />
      <CardContent className={variant === 'compact' ? 'p-2' : 'p-4'}>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className={variant === 'compact' ? 'text-sm' : 'text-base'}>
            {product.title}
          </CardTitle>
          {product.status === 'published' && (
            <Badge variant="success" size="sm">
              Còn hàng
            </Badge>
          )}
        </div>
        {product.description && (
          <CardDescription className={variant === 'compact' ? 'line-clamp-1' : 'line-clamp-2'}>
            {product.description}
          </CardDescription>
        )}
        {priceInfo && (
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className={cn('font-semibold text-[#701620]', variant === 'compact' ? 'text-sm' : 'text-lg')}>
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: priceInfo.currencyCode.toUpperCase(),
                minimumFractionDigits: 0,
              }).format(parseInt(priceInfo.amount, 10))}
            </p>
            <Button
              variant={justAdded ? 'secondary' : 'primary'}
              size="sm"
              onClick={handleAddToCart}
              disabled={isAdding}
              className="shrink-0"
            >
              {isAdding ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : justAdded ? (
                'Đã thêm ✓'
              ) : isInCart ? (
                '+1'
              ) : (
                'Thêm vào giỏ'
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

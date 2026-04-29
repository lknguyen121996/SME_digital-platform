import { MedusaProduct } from '@/types/medusa';
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: MedusaProduct;
  className?: string;
  variant?: 'default' | 'compact';
}

/**
 * Format price from amount string
 */
function formatPrice(amount: string, currencyCode: string): string {
  const num = parseInt(amount, 10);
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(num);
}

/**
 * Product card component using Medusa types
 * Works with both static mock data and future Medusa API data
 */
export function ProductCard({ product, className, variant = 'default' }: ProductCardProps) {
  const thumbnail = product.thumbnail || product.images?.[0]?.url || '/placeholder.png';
  const defaultVariant = product.variants?.[0];
  const price = defaultVariant?.prices?.[0];

  return (
    <Card className={cn('group cursor-pointer', className)}>
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
        {price && (
          <p className={cn('mt-2 font-semibold text-[#701620]', variant === 'compact' ? 'text-sm' : 'text-lg')}>
            {formatPrice(price.amount, price.currency_code)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

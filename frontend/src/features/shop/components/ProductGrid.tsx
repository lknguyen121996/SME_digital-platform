import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ProductGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
}

const columnClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

/**
 * Responsive product grid layout
 */
export function ProductGrid({
  className,
  columns = 3,
  children,
  ...props
}: ProductGridProps) {
  return (
    <div
      className={cn(
        'grid gap-6',
        columnClasses[columns],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

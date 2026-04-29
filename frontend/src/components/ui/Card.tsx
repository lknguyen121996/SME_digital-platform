import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg overflow-hidden',
          variant === 'default' && 'bg-white shadow-sm',
          variant === 'elevated' && 'bg-white shadow-lg',
          variant === 'outlined' && 'border border-gray-200 bg-transparent',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, src, alt, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }
);

CardImage.displayName = 'CardImage';

type CardContentProps = HTMLAttributes<HTMLDivElement>;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-4', className)}
        {...props}
      />
    );
  }
);

CardContent.displayName = 'CardContent';

type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('font-semibold text-lg', className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-gray-600 mt-1', className)}
        {...props}
      />
    );
  }
);

CardDescription.displayName = 'CardDescription';

export { Card, CardImage, CardContent, CardTitle, CardDescription };
export type { CardProps };

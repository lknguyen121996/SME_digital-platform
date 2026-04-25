# Naming Conventions

## File Naming

| Type | Pattern | Example |
|------|---------|---------|
| Pages | `page.tsx` | `app/shop/page.tsx` |
| Layouts | `layout.tsx` | `app/layout.tsx` |
| Components | `PascalCase.tsx` | `ProductCard.tsx` |
| Hooks | `useCamelCase.ts` | `useCart.ts` |
| API clients | `camelCase.ts` | `medusa.ts` |
| Stores | `camelCase.ts` | `cartStore.ts` |
| Types | `index.ts` or `*.types.ts` | `types/index.ts` |
| Utils | `camelCase.ts` | `price.ts` |
| Constants | `UPPER_SNAKE_CASE.ts` | `constants.ts` |
| Config | `camelCase.config.ts` | `next.config.ts` |

## TypeScript Naming

### Variables and Functions

```typescript
// Variables: camelCase
const productPrice = 150000;
const isLoading = false;
const userCart = [];

// Functions: camelCase, verb prefix
function getProductById(id: string): Promise<Product> { }
function calculateTotal(items: CartItem[]): number { }
function handleFormSubmit(event: FormEvent): void { }

// Boolean variables: is, has, can, should prefix
const isActive = true;
const hasPermission = false;
const canCheckout = true;
const shouldRedirect = false;
```

### Classes and Types

```typescript
// Interfaces: PascalCase, no "I" prefix
interface Product {
  id: string;
  title: string;
  price: number;
}

// Types: PascalCase
type CartItem = {
  product_id: string;
  quantity: number;
};

// Enums: PascalCase, UPPER_SNAKE_CASE members
enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

// Constants: UPPER_SNAKE_CASE
const MAX_QUANTITY_PER_ITEM = 99;
const FREE_SHIPPING_THRESHOLD = 500000;
```

### React Components

```typescript
// Component files: Pascal case, named export
export function ProductCard({ product }: ProductCardProps) {
  return <div>{product.title}</div>;
}

// Props interface: ComponentNameProps
interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

// Custom hooks: use prefix
export function useCart() {
  // ...
}
```

## Database Naming

### Tables: snake_case, plural

```sql
CREATE TABLE loyalty_accounts ();
CREATE TABLE loyalty_transactions ();
CREATE TABLE reward_redemptions ();
```

### Columns: snake_case

```sql
user_id, created_at, loyalty_points, vnpay_transaction_id
```

## API Naming

### URL Paths: kebab-case, plural nouns

```
/store/products
/store/carts/:id/line-items
/store/loyalty/points
```

### Request/Response: camelCase

```typescript
// Request body
interface CreateOrderRequest {
  customerId: string;
  cartId: string;
  shippingAddress: Address;
}

// Response
interface OrderResponse {
  id: string;
  customerId: string;
  total: number;
  createdAt: string;
}
```

## CSS/Tailwind Classes

```tsx
// BEM-like with Tailwind
<div className="product-card">
  <img className="product-card__image" />
  <h3 className="product-card__title">Title</h3>
  <p className="product-card__price">Price</p>
</div>

// Or flat Tailwind
<div className="flex items-center gap-4 p-4">
  <img className="w-full h-48 object-cover" />
</div>
```

## Environment Variables

```bash
# Public (NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_STRAPI_URL=http://strapi:1337
NEXT_PUBLIC_MEDUSA_URL=http://medusa:9000
NEXT_PUBLIC_MEILISEARCH_URL=http://meilisearch:7700

# Server-only
DATABASE_URL=postgres://...
REDIS_URL=redis://...
JWT_SECRET=...

# External services
VNPAY_MERCHANT_ID=your_merchant_id
CLOUDINARY_NAME=your_cloudinary_name
```

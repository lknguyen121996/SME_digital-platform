# TypeScript Practices

## TypeScript Configuration

All services use strict TypeScript. Key settings in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  }
}
```

## Type Safety Rules

### 1. Never Use `any` - Use `unknown` Instead

```typescript
// BAD
function parseJSON(str: string): any {
  return JSON.parse(str);
}

// GOOD
function parseJSON(str: string): unknown {
  return JSON.parse(str);
}

// With type guard
function isProduct(obj: unknown): obj is Product {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj
  );
}
```

### 2. Always Handle Promise Rejections

```typescript
// BAD
fetch('/api/data').then(res => res.json());

// GOOD
try {
  const res = await fetch('/api/data');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
} catch (error) {
  console.error('Failed to fetch:', error);
  throw error;
}
```

### 3. Use Discriminated Unions for State

```typescript
// BAD
interface LoadingState {
  isLoading: boolean;
  data?: Data;
  error?: Error;
}

// GOOD
type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: Error };

// Usage
function render(state: LoadingState) {
  switch (state.status) {
    case 'idle': return <Empty />;
    case 'loading': return <Spinner />;
    case 'success': return <Data data={state.data} />;
    case 'error': return <Error error={state.error} />;
  }
}
```

### 4. Prefer `const` Assertions

```typescript
// BAD
const ROUTES = ['/', '/shop', '/cart'] as string[];
const CONFIG = { theme: 'dark', lang: 'vi' };

// GOOD
const ROUTES = ['/', '/shop', '/cart'] as const;
const CONFIG = { theme: 'dark', lang: 'vi' } as const;
```

### 5. Use Type-First Approach

```typescript
// Define types before implementation
interface ProductService {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  createProduct(data: CreateProductInput): Promise<Product>;
}

// Then implement
class MedusaProductService implements ProductService {
  async getProducts(): Promise<Product[]> {
    // implementation
  }
}
```

## Utility Types

### Common Built-in Utility Types

```typescript
// Make all properties optional
type Partial<T> = { [P in keyof T]?: T[P] };

// Make all properties required
type Required<T> = { [P in keyof T]-?: T[P] };

// Make all properties readonly
type Readonly<T> = { readonly [P in keyof T]: T[P] };

// Pick specific properties
type ProductPreview = Pick<Product, 'id' | 'title' | 'thumbnail' | 'price'>;

// Omit specific properties
type CreateProductInput = Omit<Product, 'id' | 'created_at'>;
```

### Custom Utility Types

```typescript
// Nullable
type Nullable<T> = T | null;

// NonNullable
type NonNullable<T> = T extends null | undefined ? never : T;

// Brand type for IDs
type Brand<K, T> = K & { __brand: T };
type ProductId = Brand<string, 'Product'>;
type OrderId = Brand<string, 'Order'>;

// Result type (like Rust)
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };
```

## API Client Patterns

### 1. Typed Fetch Wrapper

```typescript
async function fetchJSON<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`HTTP ${res.status}: ${error}`);
  }

  return res.json() as Promise<T>;
}
```

### 2. API Client Class

```typescript
class MedusaClient {
  constructor(private baseUrl: string) {}

  async getProducts(): Promise<Product[]> {
    return fetchJSON<Product[]>(`${this.baseUrl}/store/products`);
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      return await fetchJSON<Product>(`${this.baseUrl}/store/products/${id}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }
}
```

## Component Props

### 1. Extract Props from Components

```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

// Use ComponentProps for event handlers
type ProductCardOnClick = ProductCardProps['onAddToCart'];
```

### 2. Children Props

```typescript
// Explicit children
interface CardProps {
  children: React.ReactNode;
}

// Or with additional props
interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

## Error Handling

### 1. Custom Error Classes

```typescript
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

### 2. Result Pattern

```typescript
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error };

async function fetchProduct(id: string): Promise<Result<Product>> {
  try {
    const product = await medusa.getProduct(id);
    return { ok: true, value: product };
  } catch (error) {
    return { ok: false, error: error as Error };
  }
}

// Usage
const result = await fetchProduct('prod_123');
if (result.ok) {
  console.log(result.value);
} else {
  console.error(result.error);
}
```

## Strict Null Checks

### 1. Array Access

```typescript
// BAD - may be undefined
const first = items[0];

// GOOD - explicit check
const first = items[0];
if (first === undefined) {
  throw new Error('Expected at least one item');
}

// Or use at() which returns undefined for invalid indices
const first = items.at(0); // Type: Product | undefined
```

### 2. Object Access

```typescript
// BAD
const name = user!.name;

// GOOD
const name = user?.name ?? 'Anonymous';
```

## Enum Alternatives

Prefer union types and const objects over enums:

```typescript
// BAD - Enums are mutable and not tree-shakeable
enum OrderStatus {
  PENDING,
  PAID,
  SHIPPED,
}

// GOOD - Const object with type
const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  SHIPPED: 'shipped',
} as const;

type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

// Or string literal union
type OrderStatus = 'pending' | 'paid' | 'shipped';
```

## Running TypeScript

```bash
# Type check all files
npm run typecheck

# Strict mode check
npx tsc --noEmit --strict

# Watch mode
npm run typecheck:watch
```

## ESLint + Prettier

Ensure `.eslintrc.json`:

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
}
```

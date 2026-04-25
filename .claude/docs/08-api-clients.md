# API Clients

## Overview

Frontend API clients located in `nhonho-frontend/lib/`:

```
nhonho-frontend/lib/
├── medusa.ts      # E-commerce API client
├── strapi.ts      # CMS API client
├── meilisearch.ts # Search API client
└── index.ts       # Re-export all clients
```

## Medusa Client

### Base Configuration

```typescript
// lib/medusa.ts
const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_URL ?? 'http://localhost:9000';

class MedusaClient {
  private baseUrl: string;
  private storeCookie?: string;

  constructor(baseUrl: string = MEDUSA_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    path: string,
    options?: RequestInit
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error.message ?? `HTTP ${res.status}`);
    }

    return res.json();
  }
}

export const medusa = new MedusaClient();
```

### Products

```typescript
// Get all products with pagination
async function getProducts(params?: {
  limit?: number;
  offset?: number;
  category_id?: string;
}): Promise<{ products: Product[]; count: number }> {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set('limit', String(params.limit));
  if (params?.offset) searchParams.set('offset', String(params.offset));
  if (params?.category_id) searchParams.set('category_id', params.category_id);

  return medusa.request(`/store/products?${searchParams}`);
}

// Get single product
async function getProduct(id: string): Promise<Product | null> {
  try {
    return await medusa.request(`/store/products/${id}`);
  } catch {
    return null;
  }
}
```

### Cart

```typescript
// Create cart
async function createCart(): Promise<Cart> {
  return medusa.request('/store/carts', { method: 'POST' });
}

// Add item to cart
async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<Cart> {
  return medusa.request(`/store/carts/${cartId}/line-items`, {
    method: 'POST',
    body: JSON.stringify({ variant_id: variantId, quantity }),
  });
}

// Update line item
async function updateLineItem(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  return medusa.request(`/store/carts/${cartId}/line-items/${lineId}`, {
    method: 'POST',
    body: JSON.stringify({ quantity }),
  });
}

// Remove line item
async function removeLineItem(cartId: string, lineId: string): Promise<Cart> {
  return medusa.request(`/store/carts/${cartId}/line-items/${lineId}`, {
    method: 'DELETE',
  });
}
```

### Orders

```typescript
interface CreateOrderInput {
  email: string;
  shipping_address: Address;
  billing_address?: Address;
}

async function createOrder(cartId: string, input: CreateOrderInput): Promise<Order> {
  return medusa.request('/store/orders', {
    method: 'POST',
    body: JSON.stringify({ cart_id: cartId, ...input }),
  });
}

async function getOrder(id: string): Promise<Order | null> {
  try {
    return await medusa.request(`/store/orders/${id}`);
  } catch {
    return null;
  }
}

async function getCustomerOrders(): Promise<Order[]> {
  return medusa.request('/store/orders');
}
```

### Customers

```typescript
async function createCustomer(input: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}): Promise<Customer> {
  return medusa.request('/store/customers', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

async function getCustomer(): Promise<Customer | null> {
  try {
    return await medusa.request('/store/customers/me');
  } catch {
    return null;
  }
}

async function updateCustomer(input: Partial<Customer>): Promise<Customer> {
  return medusa.request('/store/customers/me', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
```

### VNPay Integration

```typescript
// Initialize VNPay payment
async function initializeVNPay(cartId: string, amount: number): Promise<{
  payment_url: string;
  transaction_id: string;
}> {
  return medusa.request('/store/vnpay/initialize', {
    method: 'POST',
    body: JSON.stringify({ cart_id: cartId, amount }),
  });
}

// Handle VNPay return
async function completeVNPay(params: {
  vnp_Amount: string;
  vnp_BankCode: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
}): Promise<Order> {
  return medusa.request('/store/vnpay/return?' + new URLSearchParams(params), {
    method: 'GET',
  });
}
```

## Strapi Client

```typescript
// lib/strapi.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function fetchStrapi<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}${path}`);
  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);
  return res.json();
}

// Blog Posts
async function getBlogPosts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): Promise<StrapiResponse<BlogPost[]>> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set('pagination[page]', String(params.page));
  if (params?.pageSize) qs.set('pagination[pageSize]', String(params.pageSize));
  if (params?.category) qs.set('filters[category][$eq]', params.category);

  return fetchStrapi(`/api/blog-posts?${qs}`);
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetchStrapi<StrapiResponse<BlogPost[]>>(
    `/api/blog-posts?filters[slug][$eq]=${slug}`
  );
  return res.data[0] ?? null;
}

// Events
async function getEvents(): Promise<StrapiResponse<Event[]>> {
  return fetchStrapi('/api/events?sort=event_date:desc');
}

async function getEvent(slug: string): Promise<Event | null> {
  const res = await fetchStrapi<StrapiResponse<Event[]>>(
    `/api/events?filters[slug][$eq]=${slug}`
  );
  return res.data[0] ?? null;
}

// Pages
async function getPage(slug: string): Promise<Page | null> {
  const res = await fetchStrapi<StrapiResponse<Page[]>>(
    `/api/pages?filters[slug][$eq]=${slug}`
  );
  return res.data[0] ?? null;
}
```

## Meilisearch Client

```typescript
// lib/meilisearch.ts
const MEILISEARCH_URL = process.env.NEXT_PUBLIC_MEILISEARCH_URL ?? 'http://localhost:7700';

interface SearchResult<T> {
  hits: T[];
  query: string;
  processingTimeMs: number;
  estimatedTotalHits: number;
}

async function searchProducts(
  query: string,
  options?: {
    limit?: number;
    offset?: number;
    filter?: string;
  }
): Promise<SearchResult<Product>> {
  const res = await fetch(`${MEILISEARCH_URL}/indexes/products/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: query,
      limit: options?.limit ?? 20,
      offset: options?.offset ?? 0,
      filter: options?.filter,
    }),
  });

  return res.json();
}

// Initialize product index with Vietnamese analyzer
async function setupProductIndex(): Promise<void> {
  await fetch(`${MEILISEARCH_URL}/indexes/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MEILISEARCH_MASTER_KEY}`,
    },
    body: JSON.stringify({
      primaryKey: 'id',
      searchableAttributes: ['title', 'description', 'region', 'grape_variety'],
      filterableAttributes: ['category_id', 'price', 'region'],
      sortableAttributes: ['price', 'created_at'],
    }),
  });
}
```

## Index Exports

```typescript
// lib/index.ts
export { medusa } from './medusa';
export { strapi } from './strapi';
export { searchProducts } from './meilisearch';

export * from './medusa';
export * from './strapi';
```

## Type Definitions

```typescript
// types/api.ts
export interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  price: number;
  compare_at_price?: number;
  variants: ProductVariant[];
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  total: number;
}

export interface CartItem {
  id: string;
  variant_id: string;
  product: Product;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  created_at: string;
}
```

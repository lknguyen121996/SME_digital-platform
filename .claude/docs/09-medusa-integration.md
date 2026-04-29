# Medusa Integration

## Overview

Frontend sử dụng `@medusajs/js-sdk` để kết nối với Medusa backend.

## Backend Structure

```
backend/
├── apps/backend/              # Medusa v2 application
│   ├── src/                   # Custom code (api, modules, workflows)
│   ├── medusa-config.ts       # Medusa configuration
│   └── .env                   # Environment variables
└── docker-compose.yml         # PostgreSQL database
```

## Quick Start

### 1. Start Database

```bash
docker-compose up -d
```

### 2. Run Migrations

```bash
cd backend/apps/backend
npx medusa db:migrate
```

### 3. Create Admin User

```bash
npx medusa user --email admin@nhonho.vn --password Password123!
```

### 4. Start Backend

```bash
cd backend/apps/backend
npm run dev
```

Backend running at: http://localhost:9000

---

## SDK Setup

### Configuration

**File:** `frontend/src/lib/sdk.ts`

```typescript
import Medusa from "@medusajs/js-sdk";

export const sdk = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
  debug: process.env.NODE_ENV === "development",
});
```

### Environment Variables

**File:** `frontend/.env.local`

```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_key_here
```

---

## Create Publishable API Key

1. Open http://localhost:9000/app
2. Login with admin credentials
3. Go to **Settings → API Keys**
4. Create new publishable key
5. Assign a sales channel to the key
6. Copy the key to `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`

---

## API Layer

### Products

```typescript
// frontend/src/api/medusa/products.ts
import { sdk } from "@/lib/sdk";
import { MedusaProduct } from "@/types/medusa";

export async function getProducts(): Promise<MedusaProduct[]> {
  const response = await sdk.store.product.list();
  return (response.products || []) as unknown as MedusaProduct[];
}

export async function getProductByHandle(handle: string): Promise<MedusaProduct | null> {
  const response = await sdk.store.product.list({ handle });
  return (response.products?.[0] as unknown as MedusaProduct) || null;
}
```

### Cart

```typescript
// frontend/src/api/medusa/cart.ts
import { sdk } from "@/lib/sdk";

export async function createCart(): Promise<Cart | null> {
  const response = await sdk.store.cart.create({});
  return response.cart as unknown as Cart;
}

export async function addToCart(cartId: string, item: CartLineItem): Promise<Cart | null> {
  const response = await sdk.store.cart.createLineItem(cartId, {
    variant_id: item.variant_id,
    quantity: item.quantity,
  });
  return response.cart as unknown as Cart;
}

export async function removeFromCart(cartId: string, lineItemId: string): Promise<Cart | null> {
  const response = await sdk.store.cart.deleteLineItem(cartId, lineItemId);
  return response.parent as unknown as Cart;
}
```

---

## Cart Context

**File:** `frontend/src/providers/MedusaProvider.tsx`

```typescript
"use client";

import { MedusaProvider, useCart } from "@/providers/MedusaProvider";

// Wrap app
function App() {
  return (
    <MedusaProvider>
      <YourApp />
    </MedusaProvider>
  );
}

// Use in components
function CartButton() {
  const { cart, addItem, removeItem, isLoading } = useCart();
  // ...
}
```

### Cart Context API

| Method | Description |
|--------|-------------|
| `cart` | Current cart object or null |
| `cartId` | Cart ID string or null |
| `isLoading` | Loading state boolean |
| `error` | Error message or null |
| `createCart()` | Create new cart, returns cartId |
| `addItem(item)` | Add line item to cart |
| `updateItem(lineItemId, quantity)` | Update line item quantity |
| `removeItem(lineItemId)` | Remove line item from cart |
| `deleteCart()` | Clear cart and localStorage |

---

## Types

Custom types aligned with Medusa API in `frontend/src/types/medusa.ts`:

- `MedusaProduct` - Product type
- `ProductVariant` - Variant with prices, inventory
- `CartLineItem` - { variant_id, quantity }
- `Cart` - { id, items, region_id, total }

---

## Troubleshooting

### CORS Issues

Ensure backend has correct CORS configuration in `medusa-config.ts`:

```typescript
module.exports = defineConfig({
  projectConfig: {
    http: {
      storeCors: "http://localhost:3000,https://nhonho.vn",
    },
  }
})
```

### Publishable Key Not Working

1. Create key in Medusa Admin
2. Add sales channels to the key
3. Ensure key starts with `pk_`

### Redis Warning

If you see `redisUrl not found. A fake redis instance will be used.` - this is fine for development. For production, configure Redis:

```bash
REDIS_URL=redis://localhost:6379
```
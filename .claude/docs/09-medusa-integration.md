# Medusa JS SDK Integration

## Overview

Frontend sử dụng `@medusajs/js-sdk` để kết nối với Medusa backend.

## SDK Setup

### Installation

```bash
npm install @medusajs/js-sdk @medusajs/types
```

### Configuration

**File:** `src/lib/sdk.ts`

```typescript
import Medusa from "@medusajs/js-sdk";

export const sdk = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
  debug: process.env.NODE_ENV === "development",
});
```

### Environment Variables

```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_publishable_key_here
```

Tạo publishable key trong Medusa Admin: **Settings → API Keys → Create API Key**

## API Layer

### Products

```typescript
// src/api/medusa/products.ts
import { sdk } from "@/lib/sdk";
import { MedusaProduct } from "@/types/medusa";

export async function getProducts(): Promise<MedusaProduct[]> {
  const response = await sdk.store.product.list();
  return response.products as unknown as MedusaProduct[];
}

export async function getProductByHandle(handle: string): Promise<MedusaProduct | null> {
  const response = await sdk.store.product.list({ handle });
  return response.products?.[0] as unknown as MedusaProduct || null;
}
```

### Cart

```typescript
// src/api/medusa/cart.ts
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
  return response.parent as unknown as Cart; // Note: returns { deleted, parent: cart }
}
```

## Cart Context

**File:** `src/providers/MedusaProvider.tsx`

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

## SDK Methods Reference

### Products

```typescript
sdk.store.product.list()
sdk.store.product.list({ limit: 10, offset: 0 })
sdk.store.product.list({ handle: "product-handle" })
sdk.store.product.list({ collection_id: ["col_123"] })
```

### Cart

```typescript
sdk.store.cart.create({})
sdk.store.cart.retrieve(cartId)
sdk.store.cart.update(cartId, { region_id: "reg_123" })
sdk.store.cart.createLineItem(cartId, { variant_id, quantity })
sdk.store.cart.updateLineItem(cartId, lineItemId, { quantity })
sdk.store.cart.deleteLineItem(cartId, lineItemId) // returns { deleted, parent: cart }
```

## Types

Custom types aligned with Medusa API in `src/types/medusa.ts`:

- `MedusaProduct` - Product type
- `ProductVariant` - Variant with prices, inventory
- `CartLineItem` - { variant_id, quantity }
- `Cart` - { id, items, region_id, total }

## Mock Data

Fallback mock data available in `src/api/medusa/client.ts` when API calls fail.

## Troubleshooting

### CORS Issues

Ensure Medusa backend config has CORS for frontend origin:

```js
// medusa-config.js
module.exports = {
  projectConfig: {
    http: {
      storeCors: "http://localhost:3000",
    },
  },
}
```

### Publishable Key Not Working

1. Create key in Medusa Admin
2. Add sales channels to the key
3. Ensure key starts with `pk_`

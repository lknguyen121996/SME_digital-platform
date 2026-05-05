---
name: medusa-shipping-options-sdk-issue
description: Medusa JS SDK listCartOptions returns empty array but direct fetch works - shipping options issue
type: reference
---

# Medusa JS SDK Shipping Options Issue

## Problem
`sdk.store.fulfillment.listCartOptions({ cart_id: cartId })` returns `{ shipping_options: [] }` 
but direct fetch to `/store/shipping-options?cart_id=xxx` returns correct data.

## Root Cause
SDK not properly attaching/chaining publishable API key for this specific endpoint, or SDK version bug.

## Solution
Use direct fetch instead of SDK for shipping options:

```typescript
// Direct fetch works
const response = await fetch(
  `${MEDUSA_BACKEND_URL}/store/shipping-options?cart_id=${cartId}`,
  {
    headers: {
      'x-publishable-api-key': PUBLISHABLE_KEY,
    },
  }
);
```

## When to Use Direct Fetch vs SDK

| Scenario | Recommendation |
|---------|----------------|
| Frontend calls Medusa directly (no backend proxy) | Direct Fetch |
| Frontend calls through backend API route | SDK or Direct Fetch (backend handles auth) |
| Publishing key needs to be hidden | Must use backend proxy with SDK/Direct Fetch |
| Debugging API issues | Direct Fetch is easier to debug |

## Note
- Publishable API key is NOT a secret - it only identifies sales channel
- Secret keys need to be protected, publishable keys do not
- Direct fetch is acceptable for split frontend-only architecture

## Files Affected
- `frontend/src/api/checkout.ts` - `getShippingOptions()` function
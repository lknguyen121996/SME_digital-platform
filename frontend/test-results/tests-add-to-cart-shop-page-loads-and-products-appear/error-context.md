# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/add-to-cart.spec.ts >> shop page loads and products appear
- Location: tests/add-to-cart.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForFunction: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e2]: Internal Server Error
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('shop page loads and products appear', async ({ page }) => {
  4  |   await page.goto('http://localhost:3000/shop', { timeout: 30000 });
  5  | 
  6  |   // Wait for initial page load
  7  |   await page.waitForLoadState('load');
  8  | 
  9  |   // Wait for the loading spinner to disappear
  10 |   await page.waitForFunction(
  11 |     () => {
  12 |       const spinner = document.querySelector('.animate-spin');
  13 |       return spinner === null || spinner.parentElement === null;
  14 |     },
  15 |     { timeout: 20000 }
  16 |   );
  17 | 
  18 |   // Additional wait for React to render products
> 19 |   await page.waitForFunction(
     |              ^ Error: page.waitForFunction: Test timeout of 30000ms exceeded.
  20 |     () => {
  21 |       // Look for any ProductCard-related content
  22 |       const buttons = document.querySelectorAll('button');
  23 |       for (const btn of buttons) {
  24 |         if (btn.textContent?.includes('Thêm')) {
  25 |           return true;
  26 |         }
  27 |       }
  28 |       return false;
  29 |     },
  30 |     { timeout: 15000 }
  31 |   );
  32 | 
  33 |   // Now there should be buttons
  34 |   const addToCartButtons = page.locator('button:has-text("Thêm vào giỏ")');
  35 |   const count = await addToCartButtons.count();
  36 |   console.log('Add to cart buttons:', count);
  37 | 
  38 |   expect(count).toBeGreaterThan(0);
  39 | });
  40 | 
```
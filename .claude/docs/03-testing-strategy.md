# Testing Strategy

## Overview

Testing pyramid for NhoNho:
- **Unit Tests**: Vitest - fast, isolated tests for business logic
- **Integration Tests**: Playwright - end-to-end browser testing

## Unit Tests (Vitest)

### Location
```
<service>/
├── src/
│   ├── __tests__/           # Unit tests
│   │   └── *.test.ts
│   └── lib/
│       └── *.test.ts
```

### Run Unit Tests

```bash
cd <service>
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage
```

### Example Test

```typescript
// src/lib/price.test.ts
import { describe, it, expect } from 'vitest';
import { formatPrice } from '../lib/price';

describe('formatPrice', () => {
  it('formats Vietnamese currency correctly', () => {
    expect(formatPrice(1450000)).toBe('1.450.000₫');
  });

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('0₫');
  });
});
```

### Unit Test Checklist

- [ ] Test pure functions in isolation
- [ ] Mock external dependencies (API calls, database)
- [ ] Cover happy path AND edge cases
- [ ] Keep tests fast (< 100ms each)

## Integration Tests (Playwright)

### Location
```
nhonho/
├── tests/
│   └── integration/
│       └── *.spec.ts
```

### Run Playwright Tests

```bash
# Via MCP tools (preferred)
mcp__playwright__init-browser
mcp__playwright__get-screenshot
mcp__playwright__get-full-snapshot

# Or CLI
npx playwright test
```

### Playwright MCP Tools

| Tool | Purpose |
|------|---------|
| `mcp__playwright__init-browser` | Initialize browser with URL |
| `mcp__playwright__get-screenshot` | Take screenshot of current page |
| `mcp__playwright__get-full-snapshot` | Get complete page structure |
| `mcp__playwright__get-interactive-snapshot` | Get interactive elements with screenshot |
| `mcp__playwright__get-text-snapshot` | Get all text content |
| `mcp__playwright__execute-code` | Run custom Playwright code |
| `mcp__playwright__get-full-dom` | Get full DOM |

### Page Test Checklist

After creating or modifying a page:

- [ ] Page loads without crash
- [ ] No console errors (level: error)
- [ ] Key UI elements visible
- [ ] Interactions work (buttons, forms)
- [ ] Responsive on mobile (1024px, 768px, 375px)

### Example Playwright Test

```typescript
// tests/integration/shop.spec.ts
import { test, expect } from '@playwright/test';

test('product listing page loads correctly', async ({ page }) => {
  await page.goto('/shop');

  // Check no console errors
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  // Check page title
  await expect(page).toHaveTitle(/Rượu Vang/);

  // Check product grid exists
  await expect(page.locator('[data-testid="product-grid"]')).toBeVisible();

  // Check no console errors
  expect(errors).toHaveLength(0);
});
```

## Test Coverage Requirements

| Type | Minimum Coverage |
|------|-----------------|
| Utils/Helpers | 90% |
| Price/Formatting | 100% |
| API Client helpers | 80% |
| React Hooks | 70% |

## Running All Tests

```bash
# Unit tests (all services)
npm run test --workspace=nhonho-frontend
npm run test --workspace=nhonho-medusa

# Playwright tests
npx playwright test

# Full CI check
npm run typecheck && npm run test && npx playwright test
```

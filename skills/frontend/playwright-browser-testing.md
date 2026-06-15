---
name: playwright-browser-testing
description: "Playwright browser automation: cross-browser E2E testing, visual regression testing, network interception, parallel test execution, and CI/CD integration for web applications"
updated: 2026-06-13
---

# Playwright Browser Testing — E2E Automation

## When to activate
- Writing end-to-end tests for web applications that run in real browsers
- Testing across multiple browsers (Chromium, Firefox, WebKit) from a single test suite
- Visual regression testing (screenshot comparison to detect UI changes)
- Network interception and mocking for deterministic tests
- Testing authentication flows, multi-step forms, and complex user interactions
- Automating browser tasks (scraping, form filling, screenshot capture)

## When NOT to use
- Unit tests or integration tests that don't need a browser
- API testing where HTTP clients (curl, supertest) are sufficient
- Static HTML validation or linting
- Performance testing where dedicated tools (k6, Artillery) are better suited

## Instructions

### 1. Setup & Configuration

```bash
# Install Playwright with browser binaries
npm init playwright@latest

# Or add to existing project
npm install -D @playwright/test
npx playwright install
```

**Configuration (playwright.config.ts):**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  
  // Run tests in parallel
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  
  // Reporter for CI vs local
  reporter: process.env.CI ? 'github' : 'html',
  
  // Cross-browser matrix
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 14'] } },
  ],
  
  // Start dev server before tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 2. Core Test Patterns

**Page Object Model (recommended structure):**
```typescript
// pages/login.page.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByTestId('error-message');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

**Test file:**
```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Authentication', () => {
  test('successful login redirects to dashboard', async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/login');
    await login.login('user@example.com', 'password123');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('invalid credentials show error', async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/login');
    await login.login('user@example.com', 'wrong');
    
    await expect(login.errorMessage).toContainText('Invalid credentials');
  });
});
```

### 3. Network Interception

**Mock API responses for deterministic tests:**
```typescript
test('dashboard shows user data', async ({ page }) => {
  // Mock the API response
  await page.route('**/api/users/me', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        plan: 'pro',
      }),
    });
  });

  await page.goto('/dashboard');
  await expect(page.getByText('Test User')).toBeVisible();
  await expect(page.getByText('Pro Plan')).toBeVisible();
});

// Simulate API errors
test('handles API failure gracefully', async ({ page }) => {
  await page.route('**/api/data', async (route) => {
    await route.fulfill({ status: 500, body: 'Internal Server Error' });
  });

  await page.goto('/dashboard');
  await expect(page.getByText('Something went wrong')).toBeVisible();
});
```

### 4. Visual Regression Testing

```typescript
test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  
  // Full page screenshot comparison
  await expect(page).toHaveScreenshot('homepage.png', {
    maxDiffPixelRatio: 0.01,  // allow 1% difference
    threshold: 0.2,           // per-pixel color threshold
  });
});

test('component visual regression', async ({ page }) => {
  await page.goto('/components/button');
  const button = page.getByRole('button', { name: 'Primary' });
  
  await expect(button).toHaveScreenshot('primary-button.png');
});
```

**Update snapshots when intentional changes are made:**
```bash
npx playwright test --update-snapshots
```

### 5. Parallel Execution

```typescript
// playwright.config.ts
export default defineConfig({
  // Local: use all CPU cores
  // CI: limit to 2 workers (memory constraint)
  workers: process.env.CI ? 2 : undefined,
  
  // Don't stop on first failure — run all tests
  maxFailures: process.env.CI ? 0 : 10,
  
  // Shard tests across multiple CI machines
  // Usage: npx playwright test --shard=1/3 (run 1st third)
});
```

### 6. CI/CD Integration

```yaml
# .github/workflows/e2e.yml
name: E2E Tests
on: [push, pull_request]
jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Example

**Testing a multi-step checkout flow:**

```typescript
test.describe('Checkout Flow', () => {
  test('complete purchase from cart to confirmation', async ({ page }) => {
    // Step 1: Add item to cart
    await page.goto('/products/widget-pro');
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await expect(page.getByTestId('cart-count')).toHaveText('1');

    // Step 2: Go to checkout
    await page.getByRole('link', { name: 'Checkout' }).click();
    await expect(page).toHaveURL('/checkout');

    // Step 3: Fill shipping
    await page.getByLabel('Address').fill('123 Test St');
    await page.getByLabel('City').fill('San Francisco');
    await page.getByLabel('ZIP').fill('94102');
    await page.getByRole('button', { name: 'Continue to Payment' }).click();

    // Step 4: Mock payment API
    await page.route('**/api/payments', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ status: 'success', order_id: 'ORD-123' }),
      });
    });

    // Step 5: Complete payment
    await page.getByLabel('Card number').fill('4242424242424242');
    await page.getByRole('button', { name: 'Pay $49.99' }).click();

    // Step 6: Verify confirmation
    await expect(page).toHaveURL('/order/ORD-123');
    await expect(page.getByText('Order confirmed')).toBeVisible();
  });
});
```

## Anti-Patterns

- **Fragile selectors:** Using CSS class names that change with refactors — prefer `getByRole`, `getByLabel`, `getByTestId` for stable selectors
- **Hardcoded waits:** `page.waitForTimeout(3000)` creates flaky tests — use `waitForResponse`, `waitForURL`, or auto-waiting assertions instead
- **No cleanup:** Tests that create data without cleaning up pollute the test database — use `beforeEach` setup and `afterEach` teardown
- **Screenshot tolerance too loose:** `maxDiffPixelRatio: 0.5` lets major regressions pass — start strict (0.01) and loosen only for known flaky areas
- **Running against production:** E2E tests that create/modify real data — always run against a test environment with seeded data
- **Ignoring flakiness:** Marking flaky tests as `test.skip` without investigating — flakiness usually indicates a real race condition or timing issue

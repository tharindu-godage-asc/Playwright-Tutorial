# 01 — Getting Started

## Concept

A Playwright Test file is just TypeScript. The building blocks:

```ts
import { test, expect } from '@playwright/test'

test('descriptive name', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible()
})
```

- `test()` registers a test. The `{ page }` argument is a **fixture** — Playwright
  creates a fresh browser page for every test automatically (no manual setup/teardown).
- `page.goto('/')` navigates. Because `baseURL` is set in `playwright.config.ts`, you
  can use relative paths.
- `expect(locator).toBeVisible()` is a **web-first assertion**: it retries for a few
  seconds until it's true or times out, instead of checking once immediately.
- `test.describe('group name', () => { ... })` groups related tests (optional, useful
  for organization and shared `beforeEach` hooks — more on that in exercise 14).

## Running tests

```bash
npx playwright test exercises/01-getting-started          # headless, all browsers
npx playwright test exercises/01-getting-started --project=chromium
npx playwright test exercises/01-getting-started --headed  # watch it happen
npx playwright test exercises/01-getting-started --ui      # interactive time-travel debugger
npx playwright show-report                                 # view the last HTML report
```

## Tasks

Open `exercise.spec.ts`. For each test:

1. Delete the `test.skip(...)` line.
2. Replace the `// TODO` comments with real code.
3. Run the test and make sure it passes.

1. **`homepage has a welcome heading`** — navigate to `/` and assert the `<h2>Welcome</h2>`
   heading is visible using `page.getByRole('heading', { name: ... })`.
2. **`page title is correct`** — assert the document title using
   `await expect(page).toHaveTitle('Playwright Practice App')`.
3. **`clicking a nav link navigates`** — click the "Todos" link in the sidebar and
   assert the URL changed using `await expect(page).toHaveURL(/\/todos/)`.

If you get stuck, compare with `../../solutions/01-getting-started/solution.spec.ts` —
but try writing it yourself first.

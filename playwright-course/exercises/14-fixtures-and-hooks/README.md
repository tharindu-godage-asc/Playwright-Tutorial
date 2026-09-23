# 14 — Fixtures & Hooks

## Concept

### Custom fixtures

The built-in `page` fixture is just one example of Playwright's fixture system — you
can define your own with `test.extend()`. A fixture provides setup, yields a value via
`use()`, and (optionally) runs teardown code after:

```ts
import { test as base, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

type MyFixtures = {
  authenticatedPage: Page
}

export const test = base.extend<MyFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // setup: runs before the test body
    await page.goto('/login')
    await page.getByTestId('username-input').fill('student')
    await page.getByTestId('password-input').fill('playwright123')
    await page.getByTestId('login-submit').click()
    await expect(page).toHaveURL(/\/dashboard/)

    await use(page) // hand control to the test

    // teardown: runs after the test body, even if it failed
  },
})

export { expect }
```

Any test file that imports this custom `test` (instead of the one from
`@playwright/test`) can request `authenticatedPage` as an argument, and Playwright
handles calling the fixture and injecting its value — no `beforeEach` needed, and
setup only runs for tests that actually use it.

### `beforeEach` / `afterEach`

For setup that doesn't need to be reusable across files, a plain hook inside
`test.describe` is simpler:

```ts
test.describe('todos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todos')
  })

  test('...', async ({ page }) => { /* already on /todos */ })
})
```

### `test.step`

Wrap logical phases of a long test in `test.step()` — they show up as a collapsible
tree in the HTML report and trace viewer, which makes failures in a 10-step test much
faster to diagnose:

```ts
await test.step('log in', async () => { ... })
await test.step('add a todo', async () => { ... })
```

## Tasks

1. Open `fixtures.ts` and implement the `authenticatedPage` fixture (setup logs in
   through the UI; no teardown needed for this exercise, but you may add one — e.g.
   logging out — as a bonus).
2. In `exercise.spec.ts`, import `test`/`expect` **from `./fixtures`** (not
   `@playwright/test`) and write `reaches the dashboard without repeating login logic`,
   using the `authenticatedPage` fixture and wrapping the assertion phase in a
   `test.step`.
3. Still in `exercise.spec.ts`, write a `test.describe('todos')` block with a
   `test.beforeEach` that navigates to `/todos`, containing two tests that each assume
   they're already on that page (no `page.goto` inside the test bodies).

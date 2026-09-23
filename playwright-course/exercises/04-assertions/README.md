# 04 — Assertions

## Concept

Playwright's `expect(locator)` assertions are **web-first**: they poll the DOM for up
to the timeout (default 5s) until the condition is met, instead of checking once. This
is what makes tests resilient to async rendering without manual waits.

Common ones you'll use constantly:

```ts
await expect(locator).toBeVisible()
await expect(locator).toBeHidden()
await expect(locator).toHaveText('exact text')
await expect(locator).toContainText('partial')
await expect(locator).toHaveValue('pro')          // form inputs
await expect(locator).toBeChecked()
await expect(locator).toBeDisabled()
await expect(locator).toBeEnabled()
await expect(locator).toHaveCount(3)               // number of matched elements
await expect(locator).toHaveClass(/done/)
await expect(page).toHaveURL(/\/dashboard/)
await expect(page).toHaveTitle('...')
```

Assertions on **plain values** (not locators) use `expect(value).toBe(...)` etc., like
regular Jest — no retrying, since there's nothing async to wait for.

**Soft assertions** (`expect.soft(...)`) record a failure but let the test keep
running, so you see *all* failures in one run instead of stopping at the first:

```ts
expect.soft(await locator.textContent()).toBe('foo')
expect.soft(await other.textContent()).toBe('bar')
// test fails at the end if either soft assertion failed
```

## Tasks

Work in `exercise.spec.ts`.

1. **`todo counter reflects remaining items`** — on `/todos`, assert
   `getByTestId('todo-count')` has text `"2 item(s) left"` (2 of the 3 seeded todos are
   not done).
2. **`disabled submit button becomes enabled`** — on `/forms`, assert the submit button
   (`getByTestId('form-submit')`) `toBeDisabled()` before filling the form, then fill
   the minimum required fields (name, valid email, a plan, the terms checkbox) and
   assert it `toBeEnabled()`.
3. **`table has the expected row count`** — on `/table`, wait for data to load and
   assert `getByTestId('user-row')` `toHaveCount(8)`.
4. **`search narrows the table`** — type "Ada" into the search box and assert the row
   count becomes 1, and that row `toContainText('Ada Lovelace')`.
5. **`use a soft assertion to check two things at once`** — on `/dashboard` (after
   logging in), use `expect.soft` to check both the welcome message text *and* the
   logout button's visibility in the same test, so a failure in one doesn't hide a
   failure in the other.

# 02 — Locators

## Concept

A **locator** describes how to find an element; it doesn't find it immediately. It's
re-evaluated every time you act on it or assert against it, which is why Playwright can
auto-wait and auto-retry.

Preferred locator strategies, roughly in priority order:

```ts
page.getByRole('button', { name: 'Sign in' })   // how a screen reader sees it — best default
page.getByLabel('Password')                      // form fields tied to a <label>
page.getByPlaceholder('Search…')
page.getByText('Welcome')                        // visible text
page.getByTestId('todo-item')                    // data-testid="todo-item" — stable, explicit
page.locator('.todo-list li')                    // CSS, last resort
```

Locators can be **chained** (scope a search to within another element) and **filtered**:

```ts
const row = page.getByTestId('user-row').filter({ hasText: 'Ada' })
const deleteBtn = row.getByRole('button', { name: /remove/i })

// nth / first / last
page.getByTestId('todo-item').first()
page.getByTestId('todo-item').nth(2)
```

`getByTestId` looks for `data-testid` by default — the practice app uses it heavily
(`data-testid="todo-item"`, `data-testid="user-row"`, etc.) specifically so you can
practice it.

## Tasks

Work in `exercise.spec.ts`, against `/todos`, `/table`, and `/forms`.

1. **`finds the todo input by placeholder`** — locate the todo text input via
   `getByPlaceholder` and assert it's visible.
2. **`finds a specific todo by text`** — use `getByText` (exact match) to find the
   seeded "Learn Playwright locators" todo item's text.
3. **`counts todo items`** — use `getByTestId('todo-item')` and assert
   `toHaveCount(3)` (the three seeded todos).
4. **`filters a table row by name`** — on `/table`, wait for the table to load, then use
   `getByTestId('user-row').filter({ hasText: 'Grace Hopper' })` and assert it's visible.
5. **`chains locators to scope a search`** — from the filtered "Grace Hopper" row, find
   its "Remove" button *within that row* (not any remove button on the page) using
   `.getByRole('button', ...)` chained off the row locator.
6. **`selects the plan dropdown by label`** — on `/forms`, use `getByLabel('Plan')` to
   locate the `<select>`.

Tip: run `npm run codegen` and click around the app — it will print the locator
Playwright would generate, which is a great way to check your intuition.

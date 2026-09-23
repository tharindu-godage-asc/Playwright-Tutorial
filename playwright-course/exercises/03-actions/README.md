# 03 — Actions

## Concept

Once you have a locator, you act on it. All actions auto-wait for the element to be
visible, stable, and receive events before performing the action — you almost never
need a manual wait before an action.

```ts
await page.getByRole('button', { name: 'Add' }).click()
await page.getByLabel('Username').fill('student')
await page.getByLabel('I agree to the terms').check()
await page.getByLabel('Plan').selectOption('pro')
await page.getByText('Add').hover()
await page.keyboard.press('Enter')
await locator.press('Enter')          // same, but scoped to the element
```

Useful variants:

- `fill()` sets a value directly (fast, clears first). `pressSequentially()` types
  key-by-key (use when a component reacts to individual keystrokes).
- `check()` / `uncheck()` are idempotent — safe to call even if already in that state.
- `selectOption()` accepts a value, label, or index.
- `click({ button: 'right' })`, `dblclick()`, `click({ modifiers: ['Shift'] })` for
  variations.

## Tasks

Work in `exercise.spec.ts`.

1. **`adds a todo by clicking Add`** — go to `/todos`, fill the input with "Buy milk",
   click the "Add" button, and assert the new item's text is visible in the list.
2. **`adds a todo by pressing Enter`** — same, but submit by pressing `Enter` in the
   input instead of clicking (the form's `onSubmit` handles both).
3. **`toggles a todo checkbox`** — check the checkbox for "Write first test" and assert
   its text now has the `done` class (hint: `toHaveClass(/done/)` on the `<span>`, or
   assert the checkbox `toBeChecked()`).
4. **`filters active todos`** — click the "active" filter button and assert the
   completed seeded todo ("Learn Playwright locators") is no longer visible.
5. **`fills and submits the login form`** — go to `/login`, fill in username/password
   using `getByTestId`, click submit, and assert you land on `/dashboard`.
6. **`selects a plan and experience level`** — on `/forms`, use `selectOption('pro')` on
   the plan dropdown and `check()` the "intermediate" radio button; assert both took
   effect (selected value / checked state).

# 07 — Forms Deep Dive

## Concept

You've already used `fill`, `check`, and `selectOption`. This exercise fills out
**every** input type in one form (`/forms`) and verifies the result, which is the
closest thing to a real "checkout" or "profile settings" form you'll automate on the
job.

A few APIs you haven't used yet:

```ts
await page.getByLabel('Birthday').fill('2024-01-15')     // <input type="date"> wants ISO format
await page.getByLabel('Bio').fill('Some text')             // textarea works like any input
await page.locator('#volume').fill('80')                   // <input type="range"> also accepts fill()
await page.getByRole('textbox', { name: 'Bio' })            // textarea's accessible role is "textbox"
```

For radio/checkbox **groups**, prefer `getByRole('radio', { name: ... })` /
`getByRole('checkbox', { name: ... })` over a raw CSS selector — it reads the same way
a screen reader would, and is resilient to markup changes.

## Tasks

Work in `exercise.spec.ts`, entirely on `/forms`.

1. **`fills every field and submits successfully`** — fill in: full name, a valid
   email, select a plan, check one experience radio, check two interest checkboxes, set
   the volume slider, set a birthday, fill the bio, and check the terms checkbox. Submit
   and assert `getByTestId('form-success')` becomes visible.
2. **`invalid email keeps submit disabled`** — fill every other required field but put
   an invalid string (no `@`) in the email field; assert the submit button stays
   disabled.
3. **`echoed JSON reflects what was submitted`** — after a successful submit (reuse the
   logic from task 1, or extract a helper), assert the success panel's `<pre>` text
   contains the full name you entered (use `toContainText` on
   `getByTestId('form-success')`).
4. **`only checked interests are submitted`** — check the "Testing" and "CI/CD"
   interest checkboxes but leave "Accessibility" and "Performance" unchecked, fill the
   rest of the required fields, submit, and assert the echoed JSON contains
   `"Testing"` and `"CI/CD"` but not `"Accessibility"`.

(File uploads get their own exercise — see `09-file-upload-download`.)

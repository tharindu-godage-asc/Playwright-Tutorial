# 02 — Locators

Working file: `exercises/02-locators/exercise.spec.ts`

## Task 1 — `finds the todo input by placeholder`

**Question:** The todo input has no visible label — what's the next-best locator
strategy when `getByRole`/`getByLabel` don't apply cleanly?

**Approach:**

1. Open `/todos` in the running app (or read `sample-app/src/pages/Todos.tsx`) and
   look at the input element's attributes.
2. It has a `placeholder`. There's a locator method named for exactly that attribute.
3. Assert visibility the same way as exercise 01.

## Task 2 — `finds a specific todo by text`

**Question:** How do you locate an element purely by the text it displays, and why
does it matter whether the match is exact or partial?

**Approach:**

1. Use the text-matching locator. By default it does substring matching, which means
   "Learn Playwright" would also match "Learn Playwright locators" — fine here, but
   worth knowing.
2. The task asks for an *exact* match. Check that locator's options for a way to
   require the full string, not a substring.

## Task 3 — `counts todo items`

**Question:** How do you assert on *how many* elements match a locator, not just
whether one exists?

**Approach:**

1. The app marks every todo row with the same `data-testid`. A locator matching
   multiple elements is completely normal in Playwright — you don't need `.all()` or
   a loop to assert on it.
2. There's a web-first assertion specifically for element counts. Use the seeded data
   in `Todos.tsx` to know what number to expect.

## Task 4 — `filters a table row by name`

**Question:** The table has 8 rows with the same test id — how do you narrow a
locator down to just the one row you care about, based on its content?

**Approach:**

1. `/table` loads its rows asynchronously. Think about what your assertion needs to
   wait for — a web-first assertion on the locator will handle that for you as long
   as you don't try to read a value out of it manually first.
2. Start from the locator that matches all rows, then narrow it using the filtering
   method that takes a `hasText` option, rather than trying to write a single complex
   CSS/XPath selector.

## Task 5 — `chains locators to scope a search`

**Question:** Once you have the one row you want, how do you find a button *inside
that row specifically*, when the same button (by role and name) exists in every row?

**Approach:**

1. This is the same problem as "find the delete button" in any list UI: a global
   search for the button would match all 8 rows' buttons, which isn't what you want.
2. Locators can be called *on* another locator, not just on `page`. Calling a
   role-based locator method on your filtered row locator scopes the search to
   descendants of that row only.
3. The button's accessible name comes from its `aria-label` — check the component
   source for the exact wording, and remember the name-matching option accepts a
   regex if you want case-insensitivity or a partial match.

## Task 6 — `selects the plan dropdown by label`

**Question:** The plan `<select>` does have a proper `<label>` — how do you take
advantage of that instead of falling back to a test id?

**Approach:**

1. Whenever a form control is correctly associated with a `<label for="...">` (or
   wraps it), prefer the locator strategy that matches on label text — it's both
   shorter and doubles as a check that your markup is accessible.
2. Assert visibility to confirm you found it.

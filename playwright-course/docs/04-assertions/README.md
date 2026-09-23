# 04 — Assertions

Working file: `exercises/04-assertions/exercise.spec.ts`

## Task 1 — `todo counter reflects remaining items`

**Question:** How do you assert on an exact piece of derived text (a computed count),
rather than just whether an element is visible?

**Approach:**

1. Locate the counter element by its test id.
2. You want the *exact* text, not a substring — pick the assertion that checks full
   text equality rather than "contains."
3. Work out the expected string from the seeded data in `Todos.tsx`: how many of the
   three seed todos are marked incomplete? Remember the counter's exact wording
   (check the component if unsure — it's not just a number).

## Task 2 — `disabled submit button becomes enabled`

**Question:** How do you prove a button transitions from disabled to enabled as a
*consequence* of filling in the form, rather than just checking its final state?

**Approach:**

1. Assert the disabled state *first*, before touching any fields — this is the part
   that makes the test meaningful; without it, you'd never know the button started
   disabled.
2. Look at `Forms.tsx`'s validation logic to figure out the minimum set of fields
   that make `isValid` true — you don't need to fill in every field, just enough to
   flip the condition.
3. Fill/select/check those fields.
4. Assert the enabled state now. Both this and the disabled check use assertions
   named after the state they check, not a generic "attribute equals" assertion.

## Task 3 — `table has the expected row count`

**Question:** The table's rows only exist after an async fetch resolves — how do you
assert on the count without manually waiting for the network call first?

**Approach:**

1. Navigate to `/table`.
2. Assert the row count directly, using the same count assertion from exercise 02.
   Web-first assertions retry until the condition holds or time out — you don't need
   `waitForResponse` or a manual delay before asserting; the retry *is* the wait.
3. Confirm the expected number by checking how many users the fake backend seeds
   (`sample-app/vite.config.ts`).

## Task 4 — `search narrows the table`

**Question:** How do you prove that typing in a search box actually filters the
visible rows, using two different assertions on the result?

**Approach:**

1. Fill the search input with a partial name.
2. Assert the row count drops to exactly the number of matches for that search term.
3. Separately, assert that the row's content actually contains the name you searched
   for — count alone would still pass even if the wrong row survived the filter, so
   check content too.

## Task 5 — `use a soft assertion to check two things at once`

**Question:** If you have two independent things to check in one test, what changes
if you use `expect.soft` instead of `expect`, and why would you want that?

**Approach:**

1. Log in first (same flow as exercise 03's login test), and confirm you land on
   `/dashboard`.
2. Make two separate checks against the dashboard — the welcome message's text and
   the logout button's visibility — using `expect.soft` for both instead of `expect`.
3. Think about what would happen with regular `expect`: if the first check failed,
   would you ever find out whether the second one also failed? That's the entire
   point of `expect.soft` — the test still fails overall if either soft assertion
   fails, but you see the full picture instead of stopping at the first problem.

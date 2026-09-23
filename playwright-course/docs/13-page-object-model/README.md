# 13 — Page Object Model

Working files: `exercises/13-page-object-model/TodosPage.ts` and
`exercises/13-page-object-model/exercise.spec.ts`

This module is less "figure out one API call" and more "structure code well," so the
questions here are about design, not just syntax.

## Part 1 — Implementing `TodosPage.ts`

**Question:** What does each method on this class need to *do*, given that its whole
purpose is to let tests stop repeating raw locators?

**Approach, method by method:**

- **`goto()`** — the simplest one: just navigate the page it was constructed with to
  `/todos`. Every other method assumes you've already called this (or at least that
  you're already on the right page).
- **`addTodo(text)`** — this is exactly the two-step sequence from exercise 03's
  first task (fill the input, click add), just moved into a reusable method instead
  of being repeated in every test.
- **`item(text)`** — reread the example in the module's README: it returns a
  `Locator`, not a boolean or a string. That's deliberate — the caller decides what
  to *do* with that locator (click something inside it, assert on it, scope further
  off it), so this method shouldn't bake in any particular action or assertion.
- **`toggleTodo(text)`** — use the `item(text)` method you just wrote to scope down
  to the right row, then act on the checkbox within it. Reusing your own method here
  (instead of duplicating the filter logic) is the point of having it.
- **`deleteTodo(text)`** — two things need to happen: a dialog handler needs to be
  registered (same pattern as exercise 08) *before* the click, and then the delete
  button within that specific item needs to be clicked. Since this method owns both
  steps, a test calling `deleteTodo()` never has to think about the confirm dialog at
  all — that's the encapsulation benefit of POM in a nutshell.
- **`filterBy(filter)`** — click the filter button matching whichever value was
  passed in. The three possible test ids follow a predictable naming pattern based on
  the filter name.
- **`remainingCount()`** — return the counter locator's text content. Note this
  method returns a *value* (a `Promise<string | null>`), not a `Locator` — unlike
  `item()`, there's no further chaining a caller would want to do with "the current
  count text," so returning the resolved value directly is more convenient here.

## Part 2 — Writing `exercise.spec.ts` against the page object

**Question:** Once the class exists, how should a test that uses it differ from
tests you wrote in earlier exercises against the same page?

**Approach:**

1. Import the class and construct one instance per test — pass it the test's `page`
   fixture, same as you'd use `page` directly.
2. Replace every raw `page.getByTestId(...)` call you'd normally write with the
   matching page-object method or locator property. If you find yourself reaching
   for `page.` directly inside a test body here, that's a sign either the page object
   is missing a method, or the test is trying to do something the page object wasn't
   designed for.
3. `expect()` calls still belong in the test, not in the page object — the class
   gives you locators and actions; the test decides what "correct" means for each
   scenario (visible? not visible? a specific count?).
4. For the delete test specifically: notice you never need to touch `page.on('dialog',
   ...)` in the test itself — that's now the page object's responsibility, and the
   test just calls `deleteTodo(text)` and asserts on the outcome.

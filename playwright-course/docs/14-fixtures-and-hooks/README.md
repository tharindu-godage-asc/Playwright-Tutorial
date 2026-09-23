# 14 — Fixtures & Hooks

Working files: `exercises/14-fixtures-and-hooks/fixtures.ts` and
`exercises/14-fixtures-and-hooks/exercise.spec.ts`

## Part 1 — Implementing the `authenticatedPage` fixture

**Question:** What does a fixture actually need to do, structurally, versus a
regular helper function?

**Approach:**

1. Look at the shape already scaffolded in `fixtures.ts`: a function receiving the
   built-in `page` fixture plus a `use` callback. The setup code goes *before*
   calling `use()`; whatever you pass to `use()` becomes the value every test
   receives when it asks for `authenticatedPage`.
2. The setup itself is the exact login sequence from earlier exercises: navigate to
   `/login`, fill credentials, submit, confirm the URL. Put that before `use(page)`.
3. Critically: `use()` must be called exactly once, no matter what. If your setup
   code could throw before reaching `use()`, that's fine (the test fails with a clear
   setup error) — but don't accidentally return early or skip the `use()` call, or
   any test requesting this fixture will hang waiting for a value that never arrives.
4. You're handing back the same `page` fixture you received, just after logging it
   in — the fixture's job is the side effect (being logged in), not producing a
   different object.

## Part 2 — Using the fixture and `test.step`

**Question:** How does a test file that imports its `test` from `./fixtures` instead
of `@playwright/test` behave differently?

**Approach:**

1. The import line matters: `import { test, expect } from './fixtures'` gives you a
   `test` function that knows about the extra `authenticatedPage` fixture, alongside
   all the built-in ones. Importing from `@playwright/test` directly would not.
2. Destructure `{ authenticatedPage }` (instead of `{ page }`) in your test function
   — by the time your test body runs, the fixture's setup has already executed, so
   you land straight on an authenticated `/dashboard`.
3. Wrap the actual verification in `test.step()` with a short descriptive name. This
   doesn't change what's being tested — it changes how the result shows up in the
   HTML report and trace viewer, which matters more as tests grow longer. For a
   single-assertion test like this one the benefit is small, but the pattern is worth
   practicing before it becomes genuinely useful in a longer test.

## Part 3 — `test.describe` with `beforeEach`

**Question:** When several tests all need the same starting point (being on
`/todos`), what's the simplest way to share that setup without a custom fixture?

**Approach:**

1. Group the related tests in a `test.describe` block.
2. Add a `test.beforeEach` inside it that does the one shared step — navigating to
   `/todos`.
3. Each test inside the block can now assume that setup already happened; don't
   repeat `page.goto('/todos')` inside the individual test bodies, or you're just
   duplicating what the hook already guarantees.
4. Contrast this with Part 1: a custom fixture is reusable across *any* file that
   imports it and can produce/return a value; a `beforeEach` hook is scoped to one
   file (or one `describe` block) and doesn't hand back anything — it just runs code.
   Use whichever fits: something narrow and file-local usually doesn't need the
   ceremony of a fixture.

# 12 — Auth & Storage State

Working file: `exercises/12-auth-storage-state/exercise.spec.ts`

These three tasks build on each other in one file — read all three before writing
any code, since the design of Task 1 has to account for what Tasks 2 and 3 need.

## Task 1 — `logs in through the UI and saves storage state`

**Question:** How do you capture "being logged in" in a form that a *different* test
(with its own fresh browser context) can reuse later, given this app keeps its auth
token in `localStorage` rather than a cookie?

**Approach:**

1. Log in through the UI exactly as in earlier exercises: fill credentials, submit,
   confirm the URL is `/dashboard`.
2. The browser context object (accessible from `page.context()`) has a method that
   serializes the current cookies *and* the current `localStorage` for every origin
   visited, into a JSON-shaped object or file. Since this app's token lives in
   `localStorage`, that's exactly what needs capturing — a cookie-only mechanism
   would miss it entirely.
3. Call that method with a file path so it writes to disk rather than just returning
   the object in memory — the whole point is that a *separate* test, in a separate
   process/worker, can load it later.
4. Notice this file already has `test.describe.configure({ mode: 'serial' })` at the
   top. Think about why: the config sets `fullyParallel: true`, meaning tests
   normally don't run in any guaranteed order relative to each other. Task 2 depends
   on the file this task writes existing already — without forcing serial order,
   there's no guarantee this task's code runs before Task 2's.

## Task 2 — `reuses saved storage state to skip login`

**Question:** How does a test start with a browser context that's *already*
authenticated, never visiting `/login` at all?

**Approach:**

1. This test needs to live inside a `test.describe` block (already started for you)
   that calls `test.use()` with a `storageState` option pointing at the file Task 1
   wrote. That call configures every test inside that block to start its browser
   context pre-loaded from that file, rather than a blank one.
2. Inside the test itself, navigate directly to `/dashboard` — no `/login` step at
   all.
3. Assert the welcome message is visible. If this fails with a redirect to `/login`,
   the most likely causes are: Task 1 hasn't actually run yet (check the serial-mode
   note above), or the path passed to `test.use()` doesn't match the path Task 1
   wrote to.

## Task 3 — `logging out clears the session`

**Question:** Starting from the same pre-authenticated state as Task 2, how do you
verify that logging out actually invalidates it (rather than just navigating away)?

**Approach:**

1. This test is in the same `describe` block as Task 2, so it also starts
   pre-authenticated — go straight to `/dashboard` again.
2. Click the logout control.
3. Assert the URL changes to `/login` — the same page-level URL assertion pattern
   used throughout the course whenever a click causes navigation.

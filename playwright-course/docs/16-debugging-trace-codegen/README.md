# 16 — Debugging Tools

Working file: `exercises/16-debugging-trace-codegen/exercise.spec.ts`

This module is about workflow more than new API surface, so "solving it yourself"
mostly means actually running the tools, not just reading about them.

## Task 1 — Explore UI mode

**Question:** What does UI mode actually show you that a terminal pass/fail result
doesn't?

**Approach:**

1. Run `npx playwright test --ui` from the `playwright-course` folder.
2. Pick any test from an earlier exercise and step through its actions one at a
   time. For each step, look at the DOM snapshot on the right — this is the same
   underlying data a trace file captures, just browsable live instead of after the
   fact.
3. No code to write here — the goal is just building the habit of reaching for this
   first when something isn't behaving the way you expect.

## Task 2 — Fix `finds the wrong search placeholder`

**Question:** This test fails on purpose because the placeholder string doesn't
match anything real. How do you find the *actual* text without just guessing or
reading the component source directly?

**Approach:**

1. Run this specific test with `--debug` (or run normally with `--trace on` and open
   the HTML report afterward).
2. In the Inspector or trace viewer, look at the DOM snapshot at the point of
   failure — the real placeholder text is sitting right there in the rendered
   markup, even though the assertion couldn't find it under the wrong string.
3. The Inspector also lets you type a locator into its search box and see what it
   matches live against the page — useful for confirming a fix before you even edit
   the file.
4. Update the string in the test to match what you actually observed, and rerun to
   confirm it now passes.

## Task 3 — Add a deliberate pause

**Question:** What's different about `page.pause()` compared to `--debug`, and why
would leaving one in a committed test be a problem?

**Approach:**

1. Add `await page.pause()` right after the navigation in `practices a live pause`.
2. Run it with `--headed` (not `--debug` — `page.pause()` opens the Inspector on its
   own, so you don't need both).
3. Step past the pause and let the rest of the test finish.
4. Now remove the `page.pause()` line. Think about why leaving it in would be a
   problem for anyone else (or any CI system) running this test file: in a
   non-interactive/headless run, there's no one available to click "Resume," so the
   test would simply hang forever rather than fail cleanly. This is exactly why the
   solution for this module doesn't contain a `page.pause()` call at all — it's a
   tool you use *while* writing a test, then remove before it ships.

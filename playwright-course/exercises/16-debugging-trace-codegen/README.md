# 16 — Debugging Tools

## Concept

Playwright ships four debugging tools that cover almost every situation:

### 1. UI Mode — best for writing/fixing tests interactively

```bash
npx playwright test --ui
```

Time-travel through every action of every test, see the DOM snapshot at each step,
inspect network requests, and re-run individual tests without leaving the window. This
should be your default while working through this course.

### 2. `--debug` and `page.pause()` — best for stepping through one test live

```bash
npx playwright test exercises/16-debugging-trace-codegen --debug
```

This opens the Playwright Inspector and pauses before the first action, letting you
step through line by line, or type locators into the Inspector to test them against the
live page. You can also drop `await page.pause()` directly into a test to pause exactly
there (works with `--headed` too, not just `--debug`).

### 3. Trace Viewer — best for diagnosing a failure after the fact (e.g. in CI)

The config's `trace: 'on-first-retry'` means a trace is only recorded when a test fails
and retries. Force one for a single run with:

```bash
npx playwright test exercises/16-debugging-trace-codegen --trace on
npx playwright show-report        # click a test, then "View trace"
```

The trace viewer shows a filmstrip of the whole test, the DOM at each action, console
logs, and network requests — usually enough to diagnose a failure without reproducing
it locally.

### 4. Codegen — best for discovering locators / getting started on a new page

```bash
npm run codegen           # opens the app and records your clicks as Playwright code
```

Click around `/forms` or `/table` and watch the generated code on the right — it's a
fast way to discover what locator Playwright would pick for an element, even if you
don't keep the generated code verbatim.

## Tasks

1. **Explore UI mode.** Run `npx playwright test --ui`, pick any earlier exercise, and
   step through an action to see the DOM snapshot. No code to write.
2. **Fix `finds the wrong search placeholder`.** This test in `exercise.spec.ts` fails
   on purpose — its locator doesn't match anything on the page. Run it with `--debug`
   or `--trace on`, use the Inspector/trace viewer to find the *actual* placeholder
   text rendered on `/table`, and fix the assertion.
3. **Add a deliberate pause.** In `practices a live pause`, add `await page.pause()`
   right after `page.goto('/dialogs')`, run the test with `--headed` (no `--debug`
   needed — `page.pause()` opens the Inspector on its own), step past it, and then
   remove the `page.pause()` line again before moving on (leaving it in would hang
   every future run of this file).

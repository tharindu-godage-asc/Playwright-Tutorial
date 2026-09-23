# 17 — Parallelization & Projects

Working files: `exercises/17-parallel-projects/exercise.spec.ts` and
`exercises/17-parallel-projects/playwright.config.local.ts`

## Task 1 — Run one project at a time

**Question:** What actually changes about a test run when you pass `--project`?

**Approach:**

1. Run the same module twice, once with `--project=firefox` and once with
   `--project=webkit`.
2. Open the HTML report after each and notice the project name labeling each test
   result. Every test you've written in this whole course has, by default, silently
   run once per project (chromium, firefox, webkit) — `--project` is how you narrow
   that down to just one.

## Task 2 — `logs which project it ran under`

**Question:** How does a test find out, at runtime, which project/browser it's
currently executing under?

**Approach:**

1. Inside a test, there's a method that returns metadata about the current test run,
   including a `project` object with a `name` field.
2. Assert that name is one of the project names this course actually defines — check
   both `playwright.config.ts` (the shared root config) and, since this exact file
   also gets run by `playwright.config.local.ts` later in this module, that config's
   project name too.

## Task 3 — `adapts behavior per project`

**Question:** How do you make a specific test skip itself only under one particular
project, while still running normally everywhere else?

**Approach:**

1. `test.skip()` called with a boolean condition (plus a reason string) as the first
   two arguments, from inside a test body, conditionally skips just that test — as
   opposed to `test.skip(true, ...)` you've been removing from every exercise stub,
   which always skips.
2. Build that condition from the same project-name lookup as Task 2, comparing it
   against whichever project name you want to exclude.
3. Confirm the behavior by running with `--project=chromium` and separately with
   `--project=firefox` (or whichever project you chose to skip) — the HTML report
   should show it as skipped only on that one.

## Task 4 — A standalone config with a custom project

**Question:** `playwright.config.local.ts` defines a `mobile-chrome` project using
device emulation — how is a "project" here fundamentally the same concept as
chromium/firefox/webkit in the root config, just configured differently?

**Approach:**

1. Open the file and compare its `projects` array to the root config's. A project is
   just a name plus a `use` block of options — Playwright's device presets (like the
   one used here) are just pre-built `use` option objects for common devices.
2. Run it with `--config=exercises/17-parallel-projects/playwright.config.local.ts`.
3. For `emulates a mobile viewport`, the test needs to behave differently depending
   on which config/project actually ran it — reuse the same `test.info().project.name`
   check from Task 3, but this time to *skip* the assertion when the project isn't
   `mobile-chrome` (since a desktop-sized viewport would legitimately fail the "less
   than 500px wide" check).
4. Where it does run for real (under `mobile-chrome`), assert on `page.viewportSize()`
   — note it can be `null` in theory, so you may need to assert it's non-null before
   reading `.width`, or use a non-null assertion if you're confident it's set here.

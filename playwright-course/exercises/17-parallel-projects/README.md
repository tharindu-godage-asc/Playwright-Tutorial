# 17 — Parallelization & Projects

## Concept

### Workers

Playwright runs test **files** in parallel across worker processes (default: half your
CPU cores). `fullyParallel: true` (set in the root `playwright.config.ts`) goes further
and lets individual tests *within* a file run in parallel too, each in its own worker —
which is why exercise 12 had to opt back into serial execution for tests with a real
dependency between them.

```bash
npx playwright test --workers=4     # override the worker count for one run
npx playwright test --workers=1     # fully serial — useful when debugging flakiness
```

### Projects

A `project` in the config is a named bundle of options — typically a browser/device,
but it can be anything (a "smoke" suite, an authenticated vs. anonymous session, a
different `baseURL`). The root config already defines `chromium`, `firefox`, and
`webkit`; every test you've written so far has silently run three times, once per
project.

```bash
npx playwright test --project=firefox
npx playwright test --project=chromium --project=webkit
```

### Sharding

For CI, split one run across multiple machines with `--shard=<n>/<total>` — each
machine runs a fraction of the test files:

```bash
npx playwright test --shard=1/2   # first half
npx playwright test --shard=2/2   # second half
```

### Project-aware tests

Inside a test, `test.info().project.name` tells you which project is currently
running, useful for the rare case where behavior genuinely differs by browser:

```ts
test('feature only supported in Chromium', async ({ page }) => {
  test.skip(test.info().project.name === 'webkit', 'Not supported in WebKit yet')
  // ...
})
```

## Tasks

1. **Run one project at a time.** From this folder, run:
   ```bash
   npx playwright test exercises/17-parallel-projects --project=firefox
   npx playwright test exercises/17-parallel-projects --project=webkit
   ```
   and check the HTML report — the project name shows next to each test.
2. **`logs which project it ran under`** (in `exercise.spec.ts`) — assert that
   `test.info().project.name` is one of `'chromium' | 'firefox' | 'webkit'`.
3. **`adapts behavior per project`** — write a test that calls `test.skip()` with a
   project-name condition (pick any project to skip) and a reason string, then run it
   with `--project=chromium` and `--project=firefox` and confirm it's reported as
   "skipped" on the one you excluded.
4. **A standalone config with a custom project.** Open `playwright.config.local.ts` in
   this folder — it's a separate, minimal config (not the shared root one) with a
   `mobile-chrome` project using device emulation. Run it with:
   ```bash
   npx playwright test --config=exercises/17-parallel-projects/playwright.config.local.ts
   ```
   and confirm `emulates a mobile viewport` passes, asserting `page.viewportSize()` is
   narrower than 500px wide.

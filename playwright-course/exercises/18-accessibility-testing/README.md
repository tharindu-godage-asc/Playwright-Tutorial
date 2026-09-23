# 18 — Accessibility Testing

## Concept

`@axe-core/playwright` (already installed) runs the industry-standard axe accessibility
engine against a live page and reports WCAG violations — missing labels, bad color
contrast, invalid ARIA usage, and more. It's not a replacement for manual accessibility
testing, but it catches a large class of issues automatically and cheaply, right inside
your existing test suite.

```ts
import AxeBuilder from '@axe-core/playwright'

test('page has no automatically detectable a11y violations', async ({ page }) => {
  await page.goto('/forms')

  const results = await new AxeBuilder({ page }).analyze()

  expect(results.violations).toEqual([])
})
```

Useful `AxeBuilder` options:

```ts
new AxeBuilder({ page })
  .include('#main-content')                 // scope the scan to part of the page
  .exclude('[data-testid="poll-counter"]')   // exclude a known-noisy region
  .withTags(['wcag2a', 'wcag2aa'])           // limit to specific rule sets
  .disableRules(['color-contrast'])          // skip a specific rule you've triaged
```

When a scan reports violations, `results.violations` is an array of objects with `id`
(the rule that failed), `impact` (`minor` | `moderate` | `serious` | `critical`),
`description`, and `nodes` (the actual elements and a suggested fix) — attach it to the
test failure output rather than just asserting `.toEqual([])` blindly, so failures are
diagnosable without re-running locally.

## Tasks

Work in `exercise.spec.ts`.

1. **`home page has no accessibility violations`** — run a full-page scan on `/` and
   assert `results.violations` is empty.
2. **`forms page has no accessibility violations`** — same, on `/forms`. This page has
   labels, fieldsets/legends, and a range input specifically so a full scan has
   something real to check.
3. **`scan scoped to a specific region`** — on `/table`, scope the scan to just the
   `<table>` element using `.include('table')` instead of the whole page.
4. **`report violation details on failure`** — write a scan against `/dialogs` where,
   if `results.violations` is non-empty, the test failure message includes each
   violation's `id` and `description` (hint: pass a formatted string built from
   `results.violations` as the second argument to `expect(...).toEqual([])`, or attach
   it via `testInfo.attach()`), instead of just failing with an unhelpful "expected []
   received [...]".

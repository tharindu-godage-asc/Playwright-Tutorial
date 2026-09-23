# 18 — Accessibility Testing

Working file: `exercises/18-accessibility-testing/exercise.spec.ts`

## Task 1 — `home page has no accessibility violations`

**Question:** How do you run an automated accessibility audit against a live page,
and what does "no violations" actually mean as a test assertion?

**Approach:**

1. Navigate to `/`.
2. Construct the axe builder with the current `page`, and call its analyze method —
   it returns a results object once the scan completes (this is async, so remember to
   await it).
3. The results object has a `violations` array. An empty array means axe found
   nothing to flag. Assert on that array being empty using a deep-equality assertion
   against `[]`, rather than checking its length — an equality check against an empty
   array also gives you the actual violation objects printed in the failure output if
   the assertion fails, which a plain length check wouldn't.

## Task 2 — `forms page has no accessibility violations`

**Question:** Why is `/forms` specifically a more interesting page to scan than the
home page?

**Approach:**

1. Same scan pattern as Task 1, targeted at `/forms` instead.
2. Think about what makes this page a meaningful test: it has labeled inputs,
   grouped radios/checkboxes with `<fieldset>`/`<legend>`, and a range input — real
   opportunities for a11y rules to either pass or catch something, unlike a page
   that's mostly static text.

## Task 3 — `scan scoped to a specific region`

**Question:** How do you scan just one part of a page, and what goes wrong if you
scan too early?

**Approach:**

1. The axe builder has a method for scoping the scan to elements matching a
   selector — pass it a selector for the `<table>` element instead of scanning the
   whole page.
2. Before scanning, think about how `/table` renders: its data loads asynchronously,
   and the `<table>` element doesn't exist in the DOM at all until that fetch
   resolves. If you call the scan immediately after `page.goto()`, the selector you
   scoped to won't match anything yet. Wait for the table to actually be visible
   first (a plain visibility assertion on it works fine) before running the scan.

## Task 4 — `report violation details on failure`

**Question:** If a scan finds violations, `expect(violations).toEqual([])` fails
with a technically-correct but not very readable diff — how do you make a failure
here actually diagnosable at a glance?

**Approach:**

1. Run the same scan pattern as before, against `/dialogs`.
2. Look at the shape of one violation object: it has fields like `id` (which rule
   failed) and `description` (what it means). Build a short summary string out of the
   violations array — mapping each violation to a one-line string and joining them
   works well.
3. Most Playwright assertions accept an optional message as an extra argument, shown
   alongside the failure if it fails. Pass your summary string that way, so a failure
   immediately tells you *which* rules failed and why, without needing to dig through
   the raw `results.violations` object by hand.

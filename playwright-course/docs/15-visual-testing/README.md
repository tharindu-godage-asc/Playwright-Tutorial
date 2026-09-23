# 15 — Visual Testing

Working file: `exercises/15-visual-testing/exercise.spec.ts`

## Task 1 — `home page matches its baseline`

**Question:** Unlike every other assertion so far, this one has no baseline to
compare against the first time you run it — what actually happens on that first run,
and what should happen on the second?

**Approach:**

1. Navigate to `/`.
2. There's an assertion that takes a screenshot of whatever you pass it (the whole
   `page`, here) and compares it against a saved reference image named by the string
   you give it.
3. Run it once with `--project=chromium` — since no baseline exists yet, this run
   creates one and passes. That's expected, not a bug.
4. Run it again without changing anything. This time it's a real comparison against
   the file you just created — it should still pass, proving nothing changed.

## Task 2 — `tabs panel matches its baseline`

**Question:** Why would you screenshot just one element instead of the whole page,
and how do you do that?

**Approach:**

1. The same screenshot assertion works on a `Locator`, not just a `Page` — scope it
   to the tab list element instead of the whole page.
2. Think about *why* this is often better practice: a whole-page screenshot fails on
   literally any visual change anywhere on the page, including ones unrelated to what
   you're actually testing (a sidebar link renamed, unrelated copy edited). Scoping
   to just the region you care about makes the test only fail for changes that
   actually matter to it.

## Task 3 — `async page masks the live poll counter`

**Question:** The `/async` page has an element that changes every second — what
happens if you screenshot it normally, and how do you exclude just that one part?

**Approach:**

1. Without any special handling, this page would fail almost every run, because the
   poll counter's rendered text is different every time the screenshot is taken —
   the image itself is never stable.
2. The screenshot assertion accepts an option for masking out specific locators: it
   still takes the screenshot, but visually blocks out whatever locators you list
   before comparing, so their content doesn't affect the result.
3. Pass the poll counter's locator to that option, and everything else on the page
   still gets compared normally.

## Trying a real failure

Once all three pass, deliberately edit some visible text in
`sample-app/src/pages/Home.tsx` and rerun Task 1 — watch it fail with a diff image
attached to the HTML report. This is the entire point of visual testing: it catches
changes you didn't necessarily think to write an assertion for. Revert the edit, or
regenerate the baseline with `--update-snapshots` if you want to keep it.

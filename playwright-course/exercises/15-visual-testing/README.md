# 15 — Visual Testing

## Concept

`toHaveScreenshot()` compares a screenshot against a saved baseline image and fails if
they differ by more than a small pixel threshold. The first run has no baseline, so it
**creates** one and passes; every run after that **compares** against it.

```ts
await expect(page).toHaveScreenshot('home-page.png')
await expect(locator).toHaveScreenshot('todo-list.png')
```

Useful options:

```ts
await expect(page).toHaveScreenshot('home.png', {
  maxDiffPixelRatio: 0.02,   // tolerate ~2% pixel difference (fonts/AA differ across machines)
  mask: [page.getByTestId('poll-counter')], // hide elements that change every run
})
```

Baselines are OS/browser-specific by default (screenshots differ slightly between
Chromium/Firefox/WebKit and Windows/Mac/Linux), which is why `--project=chromium` is
used below — comparing across all three at once on first run creates three separate
baseline files.

## Tasks

Work in `exercise.spec.ts`.

1. **`home page matches its baseline`** — navigate to `/` and assert
   `await expect(page).toHaveScreenshot('home-page.png')`.
2. **`tabs panel matches its baseline, masking dynamic content`** — go to `/tabs`, and
   screenshot just the tab list (`page.getByRole('tablist')`) rather than the whole
   page — scoping to a locator makes the comparison less brittle to unrelated layout
   changes elsewhere.
3. **`async page masks the live poll counter`** — go to `/async`; screenshotting the
   whole page would be flaky because `getByTestId('poll-counter')` changes every
   second. Use the `mask` option to hide it, so the rest of the layout can still be
   verified.

Run these first with:

```bash
npx playwright test exercises/15-visual-testing --project=chromium
```

to generate baselines (first run always passes and writes to
`exercise.spec.ts-snapshots/`). Run it again — it should still pass. Then try changing
something in `../../sample-app/src/pages/Home.tsx` (e.g. edit the heading text), rerun,
and watch it fail with a diff image in the HTML report. Revert the change afterward, or
regenerate the baseline with:

```bash
npx playwright test exercises/15-visual-testing --project=chromium --update-snapshots
```

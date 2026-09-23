# 05 — Waiting & Auto-Waiting

## Concept

**Rule of thumb: never use `page.waitForTimeout()` (a hardcoded sleep) to wait for UI
to update.** Almost everything you need is covered by:

1. **Actions auto-wait.** `click()`, `fill()`, etc. wait for the element to be
   actionable before doing anything.
2. **Web-first assertions auto-wait.** `await expect(locator).toBeVisible()` retries
   for up to the timeout — this is usually all you need for "wait for X to appear".
3. **`page.waitForResponse()` / `waitForRequest()`** — wait for a specific network call,
   useful when an assertion alone doesn't pin down what you're waiting for.
4. **`expect.poll()`** — turns an arbitrary async function into a retrying assertion,
   for things that aren't a simple locator state:

   ```ts
   await expect.poll(async () => {
     return await page.getByTestId('poll-counter').textContent()
   }).not.toBe('0')
   ```

   `toPass` also takes an `intervals` array controlling the delay between retries
   (default backoff ramps up to 1s between attempts). For something that fails often,
   like the flaky endpoint below, a short constant interval fits far more attempts
   into the timeout: `.toPass({ timeout: 30_000, intervals: [250] })`.

5. **`expect(async () => { ... }).toPass()`** — retries an entire block of code
   (multiple actions/assertions) until it succeeds or times out. Ideal for flaky
   operations like a network call that sometimes fails.

The practice app's `/async` page has purpose-built scenarios for each of these.

## Tasks

Work in `exercise.spec.ts`, against `/async`.

1. **`waits for a slow action to finish`** — click "Start slow action" and assert
   `getByTestId('slow-result')` eventually shows "Done!" — **do not** use
   `waitForTimeout`; let the assertion's built-in retrying handle the 1.5s delay.
2. **`waits for an element that appears after a delay`** — assert
   `getByTestId('delayed-element')` becomes visible (it only mounts 2 seconds after
   the page loads).
3. **`polls a value that changes over time`** — use `expect.poll()` to wait until
   `getByTestId('poll-counter')`'s text is no longer `"0"`.
4. **`retries a flaky network call with toPass`** — click "Call flaky endpoint"
   (`getByTestId('flaky-button')`), then wrap an assertion in
   `expect(async () => {...}).toPass({ timeout: 15_000 })` that re-clicks and re-checks
   until `getByTestId('flaky-result')` shows "Loaded successfully" instead of an error.

Bonus: try replacing one of your solutions with `page.waitForTimeout(3000)` and notice
it's both slower *and* less reliable than the web-first version.

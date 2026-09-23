# 05 — Waiting & Auto-Waiting

Working file: `exercises/05-waiting-and-auto-wait/exercise.spec.ts`

## Task 1 — `waits for a slow action to finish`

**Question:** A button triggers a 1.5-second delayed UI change — how do you wait for
that result without knowing exactly how long it'll take?

**Approach:**

1. Click the button that starts the slow action.
2. Resist the urge to add a sleep here — instead, assert on the final text you expect
   the result element to show. A web-first `toHaveText` assertion will keep polling
   until the delayed update happens or the assertion times out (default 5s covers a
   1.5s delay comfortably).
3. If you're tempted to check an intermediate "Loading…" state too, you could, but
   it's not required by the task — the point is proving the *end* state arrives.

## Task 2 — `waits for an element that appears after a delay`

**Question:** An element doesn't exist in the DOM at all until 2 seconds after page
load — how is waiting for that any different from Task 1?

**Approach:**

1. Navigate to the page and locate the element by its test id, even though it isn't
   there yet at that exact moment.
2. Assert visibility on it. A locator doesn't need the element to exist at the time
   you create the locator — only at the time the assertion actually resolves, which
   is exactly why this works without any special-casing versus Task 1.

## Task 3 — `polls a value that changes over time`

**Question:** A counter's value keeps changing every second, forever — there's no
final state to assert on. How do you wait for "it changed at least once" instead?

**Approach:**

1. This isn't a locator-state question (visible/hidden/text-equals) so much as "keep
   re-running this function until its result differs" — which is exactly what
   `expect.poll()` is for.
2. Give `expect.poll()` an async function that reads the counter's current text, and
   assert that the *result of polling* is not equal to the starting value.
3. Contrast this with `toHaveText()`: that assertion is for "this locator eventually
   equals X." `expect.poll()` is for arbitrary computed values, including ones that
   aren't a simple locator property at all.

## Task 4 — `retries a flaky network call with toPass`

**Question:** An action + assertion pair sometimes fails because of a network call
that fails ~40% of the time — how do you retry the *whole sequence* (click and
re-check), not just the assertion?

**Approach:**

1. A single retrying assertion isn't enough here, because a failure means you need to
   click the button *again*, not just re-check the same state. That's the case
   `toPass()` is built for: wrapping a callback that can contain multiple
   actions/assertions and retrying the entire thing.
2. Inside the callback: click "Call flaky endpoint," then assert the result text
   shows success.
3. Think about timing: the endpoint fails less than half the time, but `toPass`'s
   default retry backoff ramps up toward 1 second between attempts, which limits how
   many attempts fit inside the timeout. Passing a shorter, constant `intervals`
   value gets you more attempts in the same time budget — which matters a lot when
   the underlying operation fails a meaningful fraction of the time.
4. Give the whole thing a generous timeout (comfortably more than the couple of
   seconds you'd expect on average) so a short unlucky streak doesn't fail the test.

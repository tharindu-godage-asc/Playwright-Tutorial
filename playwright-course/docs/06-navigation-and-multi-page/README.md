# 06 — Navigation, Multi-Page & Iframes

Working file: `exercises/06-navigation-and-multi-page/exercise.spec.ts`

## Task 1 — `opens dashboard in a new tab via link`

**Question:** Clicking a `target="_blank"` link opens a second browser tab — how do
you get a handle on *that* tab, given `page` still refers to the original one?

**Approach:**

1. Opening a new tab fires an event on the original page. You need to be listening
   for that event *before* the click happens, because the event can fire essentially
   immediately — starting the listener and the click at the same time (via
   `Promise.all`) is the standard pattern, not starting the click first and awaiting
   the event after.
2. The `Promise.all` gives you back the new `Page` object as its first result.
3. Before asserting on the new tab's URL, think about what `/dashboard` actually
   does: check `Dashboard.tsx`'s guard logic. It requires an auth token, and this
   test never logged in. The new tab shares the same browser context (and therefore
   the same `localStorage`) as the original page, so you can seed the token directly
   with `page.evaluate()` before opening the tab, without going through the login UI
   at all.
4. Wait for the new page to finish loading, then assert its URL.

## Task 2 — `opens dashboard in a new tab via window.open`

**Question:** Does the popup-catching pattern change at all when the trigger is a
JS `window.open()` call instead of an anchor tag?

**Approach:**

1. From Playwright's perspective, no — both produce the same "a new page opened"
   event. Reuse the exact same pattern as Task 1, just clicking the other button.
2. Don't forget the same auth-token seeding step; it's a property of the destination
   page, not of how the tab was opened.

## Task 3 — `interacts with an element inside an iframe`

**Question:** The widget you need to click lives inside an `<iframe>` — why doesn't
`page.getByTestId(...)` find it directly, and what do you use instead?

**Approach:**

1. An iframe is a separate document with its own DOM tree; `page`'s locators only see
   the top-level document. You need a locator rooted *inside* the frame.
2. Find the method that takes a selector for the `<iframe>` element itself and
   returns a scoped locator root for everything inside it — then build your locator
   for the increment button off of that scoped root, not off of `page` directly.
3. Click the button three times (a simple loop or three sequential clicks both work),
   then assert its text reflects the final count.

## Task 4 — `navigates back and forward`

**Question:** How do you simulate the browser's Back/Forward buttons, and confirm
each one landed where you expect?

**Approach:**

1. Perform a normal navigation first (go home, then click a link to `/todos`) so
   there's browser history to go back through.
2. There are dedicated page methods for back/forward navigation — you don't need to
   call `page.goto()` again, which would add new history rather than replaying it.
3. Assert the URL after each step. Going back should land you on the original page;
   going forward again should return you to `/todos`.

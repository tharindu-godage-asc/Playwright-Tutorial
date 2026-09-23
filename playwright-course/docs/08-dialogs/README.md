# 08 — Dialogs

Working file: `exercises/08-dialogs/exercise.spec.ts`

## Task 1 — `accepts a confirm dialog`

**Question:** `window.confirm()` blocks page JavaScript and has no DOM element to
click — so how do you interact with it at all?

**Approach:**

1. Native dialogs surface as an *event* on the page, not as locatable elements.
   Register a listener for that event before you trigger the dialog.
2. Inside the handler, call the method that accepts the dialog (the equivalent of
   clicking "OK").
3. Register the listener *before* clicking the button that opens the dialog — if you
   click first, the dialog can appear and Playwright's default auto-dismiss behavior
   may kick in before your handler is attached.
4. After the click resolves, assert on the result text the page renders based on
   which choice you made.

## Task 2 — `dismisses a confirm dialog`

**Question:** What changes if you want to simulate clicking "Cancel" instead of
"OK"?

**Approach:**

1. Same event-listener pattern as Task 1, but call the dismiss method instead of
   accept inside the handler.
2. Assert on the result text for the dismissed case — check the app's source for the
   exact wording it renders for each outcome.

## Task 3 — `answers a prompt dialog`

**Question:** `window.prompt()` needs a typed answer, not just accept/dismiss — how
do you supply that?

**Approach:**

1. Same pattern again, but the accept method for a prompt dialog takes an optional
   argument: the text to "type" into it before accepting.
2. Assert the result shows exactly the text you supplied.

## Task 4 — `deleting a todo requires confirmation`

**Question:** Deleting a todo triggers a native `confirm()` internally — how does
that interact with a UI flow you've already automated in earlier exercises?

**Approach:**

1. Register a dialog-accepting handler *before* clicking delete, same as Task 1 —
   without one, Playwright's default behavior would dismiss the confirm and the item
   would never actually be removed.
2. Find the specific todo item by its text (same filtering pattern from exercise 02),
   then click its delete button.
3. Assert the item's text is no longer visible anywhere on the page.

## Task 5 — `opens and closes a custom modal via backdrop click`

**Question:** This modal is just DOM elements, not a native dialog — so why would a
plain `.click()` on the backdrop fail to close it?

**Approach:**

1. Open the modal and assert it's visible, same as any other UI toggle.
2. Think about the modal's layout: the backdrop is a full-screen element, but the
   panel sits centered on top of it. Playwright clicks the center point of whatever
   locator you give it by default — which, for the backdrop, lands on the panel that
   covers its center, not the backdrop itself.
3. The click action accepts a `position` option to click at a specific offset within
   the element instead of its center — use a small offset near a corner, where the
   backdrop is guaranteed not to be covered by the panel.
4. Assert the modal is no longer visible afterward.

## Task 6 — `opens a nested modal`

**Question:** How do you prove two overlapping modals are both open at the same
time, rather than one replacing the other?

**Approach:**

1. Open the outer modal, then from within it, click whatever opens the nested one.
2. Assert visibility on *both* modal locators in the same test — if you only checked
   the nested one, you wouldn't catch a bug where opening it accidentally closed the
   outer one first.

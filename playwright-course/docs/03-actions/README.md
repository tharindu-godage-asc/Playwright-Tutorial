# 03 — Actions

Working file: `exercises/03-actions/exercise.spec.ts`

## Task 1 — `adds a todo by clicking Add`

**Question:** What's the minimal sequence of actions to add an item through the UI,
and how do you prove the new item actually appeared (not just that the click
"succeeded")?

**Approach:**

1. Locate the input (as in exercise 02) and set its value — reach for the action that
   sets a value directly rather than typing character by character, since nothing
   here depends on individual keystrokes.
2. Locate and click the "Add" button.
3. The proof isn't that the click didn't throw — it's that the new todo's text is now
   visible somewhere on the page. Assert on that, not on the button click itself.

## Task 2 — `adds a todo by pressing Enter`

**Question:** The same form can be submitted by pressing Enter instead of clicking —
how do you simulate a specific key press on a specific element?

**Approach:**

1. Fill the input the same way as Task 1.
2. Instead of clicking a button, press a key *on that input locator* — there's an
   action for sending a named key to a specific element, which is different from
   sending a key to whatever currently has focus.
3. Assert the same way as Task 1.

## Task 3 — `toggles a todo checkbox`

**Question:** How do you interact with one specific todo's checkbox when there are
several checkboxes on the page that all look identical?

**Approach:**

1. First narrow down to the one todo item by its text (same filtering technique as
   exercise 02, Task 4) — do this before trying to find the checkbox.
2. From that scoped locator, find the checkbox within it and use the action meant for
   checkboxes specifically — it's idempotent, so you don't need to check whether it's
   already checked first.
3. For the assertion, you have two options mentioned in the README: checking the
   checkbox's checked state, or checking the label text's CSS class. Checking the
   checkbox's own state is closer to "what actually happened" — prefer asserting on
   the thing you acted on.

## Task 4 — `filters active todos`

**Question:** How do you prove an item is now *absent* from the visible list, as
opposed to present?

**Approach:**

1. Click the filter button for "active" — same click pattern as before.
2. For the assertion, you're checking that something is *not* there. Web-first
   assertions support negation directly; you don't need `try/catch` or a manual
   check for absence.
3. Pick a todo you know is completed in the seed data (check `Todos.tsx`) so the
   assertion is testing something meaningful.

## Task 5 — `fills and submits the login form`

**Question:** How do you fill in multiple fields and confirm a full login flow
completed, given the result is a navigation rather than a visible message?

**Approach:**

1. Fill the username and password fields — same `fill()` pattern as before, on two
   different locators.
2. Click submit.
3. The visible proof of success here is the URL changing, exactly like exercise 01's
   nav-link task — assert on the page's URL, not on any element.

## Task 6 — `selects a plan and experience level`

**Question:** How do you set the value of a `<select>` and a radio button, and then
prove each one actually reflects the value you set (not just that the calls didn't
error)?

**Approach:**

1. For the `<select>`, use the action built for choosing an option — it can target
   the option by its `value` attribute, which is what the task asks for.
2. For the radio button, locate it by role and accessible name (its label text), then
   use the checkbox/radio action — radios use the same action as checkboxes in
   Playwright's API.
3. To verify: a `<select>`'s current value is checked with the "has this value"
   assertion; a radio's state is checked with the "is checked" assertion. Two
   different element types need two different assertions — don't try to force one
   assertion to cover both.

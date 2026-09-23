# 07 — Forms Deep Dive

Working file: `exercises/07-forms-and-validation/exercise.spec.ts`

## Task 1 — `fills every field and submits successfully`

**Question:** With eight different input types on one form, what's the right action
for each one, and how do you know the submission actually worked?

**Approach:**

1. Go through the form field by field and match the input type to the action built
   for it: plain text/email/textarea/date all take `fill()`; the `<select>` takes the
   option-choosing action; radios and checkboxes take the check action; the range
   slider also accepts `fill()` with a numeric string.
2. For the date field specifically, check what format the underlying `<input
   type="date">` expects — HTML date inputs want ISO format (`YYYY-MM-DD`), not a
   locale-formatted string.
3. Check `Forms.tsx` for which fields are actually required for `isValid` to become
   true — you need at least those before the submit button will do anything useful.
4. Submit, then assert the success panel becomes visible.

## Task 2 — `invalid email keeps submit disabled`

**Question:** How do you prove a *negative* — that something did **not** happen —
when a value is invalid?

**Approach:**

1. Fill in the other required fields correctly, but put a string with no `@` in the
   email field, so only that one field is invalid.
2. Assert the submit button's disabled state, not its enabled state — you're testing
   that validation correctly blocked submission, so the useful assertion is the one
   that would fail if validation had a bug and let it through.
3. You don't need to click submit at all here — the interesting behavior is what the
   button's state is *before* any click.

## Task 3 — `echoed JSON reflects what was submitted`

**Question:** After a successful submit, the app echoes back what you typed as JSON
text inside a `<pre>` — how do you check that the data made it through correctly?

**Approach:**

1. Reuse the fill-and-submit sequence from Task 1, but pick a full name that's
   distinctive enough to search for confidently (avoid something generic that might
   appear elsewhere on the page).
2. Rather than parsing the JSON text yourself, use a "contains this substring"
   assertion against the success panel — it's simpler and still proves the value
   round-tripped correctly.

## Task 4 — `only checked interests are submitted`

**Question:** The interests field is a set of independent checkboxes — how do you
prove that *only* the ones you checked ended up in the submitted data, and the ones
you left alone didn't?

**Approach:**

1. Check exactly two of the four interest checkboxes by their role and label text,
   leaving the other two untouched.
2. Fill in the rest of the required fields and submit.
3. This needs two kinds of assertions on the result: a "contains" check for each
   interest you *did* check, and a negated "does not contain" check for one you
   didn't. Proving the positive case alone wouldn't catch a bug where every interest
   gets submitted regardless of its checked state.

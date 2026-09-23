# 01 — Getting Started

Working file: `exercises/01-getting-started/exercise.spec.ts`

## Task 1 — `homepage has a welcome heading`

**Question:** How do you open a page and prove a specific piece of text is actually
rendered and visible on it (not just present somewhere in the HTML)?

**Approach:**

1. Every test starts from a blank page — the first thing it needs to do is navigate.
   Since `baseURL` is already configured, you only need the path, not the full URL.
2. "Visible" is a stronger claim than "exists in the DOM" — an element can be in the
   markup but hidden by CSS. Playwright has a locator strategy built specifically
   around how assistive technology perceives the page: the accessible **role** plus
   its **accessible name**. A heading has role `"heading"`; its name is its text.
3. Find the locator method for querying by ARIA role, pass the role and the
   `{ name }` option matching the heading text.
4. Wrap it in a web-first assertion for visibility rather than checking `textContent()`
   yourself — that's what gives you automatic retrying while React renders.

## Task 2 — `page title is correct`

**Question:** How do you assert something about the *page* as a whole (the
`<title>`), rather than about one element in it?

**Approach:**

1. Some assertions target a `Locator` (an element); others target the `Page` itself.
   The document title is a page-level property, so the object you pass to `expect()`
   here isn't a locator at all.
2. Look for the assertion whose name mirrors the HTML tag it checks.

## Task 3 — `clicking a nav link navigates`

**Question:** How do you prove that clicking something actually changed the page,
without hard-coding a wait for the navigation to "finish"?

**Approach:**

1. Locate the sidebar link by its role and visible text — the same role-based
   approach as Task 1, but for a link instead of a heading.
2. Click it. You don't need to await a navigation event separately: Playwright's
   click already waits for it, and the assertion after it will retry until the URL
   actually changes.
3. For "assert the URL changed," you're asserting against the `Page` again, not a
   locator — same category as Task 2. Since you only know it *contains* `/todos`
   rather than the exact full URL, reach for a regex rather than an exact string.

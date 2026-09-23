# 12 — Auth & Storage State

## Concept

Logging in through the UI on every single test is slow and repetitive. Playwright lets
you log in **once**, save the resulting browser state (cookies + `localStorage`) to a
JSON file, and have other tests start already authenticated by loading that file —
skipping the login form entirely.

```ts
// 1. Log in once, then persist the state:
await page.context().storageState({ path: 'playwright/.auth/user.json' })

// 2. Any later test/context can start pre-authenticated:
test.use({ storageState: 'playwright/.auth/user.json' })
```

This practice app stores its auth token in `localStorage` (not a cookie), which is
exactly what `storageState()` captures alongside cookies — so this works even though
there's no session cookie involved.

In a full project, this "log in once" step is usually its own `*.setup.ts` file wired
up as a project dependency in `playwright.config.ts` (see the "Projects" section of the
Playwright docs), so every project reuses one saved login instead of repeating it. This
exercise does the same thing by hand, in a single file, so you can see exactly what's
happening before relying on the config-level shortcut.

Note the `test.describe.configure({ mode: 'serial' })` line already at the top of
`exercise.spec.ts` — this course's config sets `fullyParallel: true`, which normally
lets Playwright run every test in its own worker concurrently. `serial` mode overrides
that for this file only, forcing its tests to run in order in one worker, which is
required here since later tests depend on the file the first test writes.

## Tasks

Work in `exercise.spec.ts`. Do these **in order** — the second depends on the first
having run.

1. **`logs in through the UI and saves storage state`** — go to `/login`, fill in valid
   credentials, submit, confirm you land on `/dashboard`, then call
   `page.context().storageState({ path: 'playwright/.auth/user.json' })` to persist it.
2. **`reuses saved storage state to skip login`** — inside a `test.describe` block with
   `test.use({ storageState: 'playwright/.auth/user.json' })`, write a test that
   navigates **directly** to `/dashboard` (never visiting `/login`) and asserts the
   welcome message is visible — proving the saved session was restored.
3. **`logging out clears the session`** — still using the restored storage state,
   click "Log out" on the dashboard and assert you're redirected to `/login`.

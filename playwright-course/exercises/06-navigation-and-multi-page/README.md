# 06 — Navigation, Multi-Page & Iframes

## Concept

### New tabs / popups

A `page` belongs to a `BrowserContext`, which can hold multiple pages. When something
opens a new tab, you catch it with `context.waitForEvent('page')` (or the shorthand
`page.waitForEvent('popup')`), started *before* the action that triggers it, since the
event can fire before `waitForEvent` would otherwise start listening:

```ts
const [newPage] = await Promise.all([
  page.waitForEvent('popup'),
  page.getByTestId('new-tab-button').click(),
])
await newPage.waitForLoadState()
await expect(newPage).toHaveURL(/\/dashboard/)
```

### Iframes

Elements inside an `<iframe>` are not visible to `page.locator()` directly — you must
go through `page.frameLocator(selector)`, which returns a scoped locator root:

```ts
const frame = page.frameLocator('[data-testid="widget-frame"]')
await frame.getByTestId('widget-increment').click()
```

## Tasks

Work in `exercise.spec.ts`.

1. **`opens dashboard in a new tab via link`** — on `/new-tab`, click the link
   (`getByTestId('new-tab-link')`) and capture the resulting popup page. Assert its URL
   is `/dashboard`. Note: `/dashboard` redirects to `/login` without an auth token, and
   the new tab shares this context's `localStorage` — seed the token with
   `page.evaluate(() => localStorage.setItem('pw_demo_token', 'demo-token-123'))`
   before opening the tab, or it'll redirect.
2. **`opens dashboard in a new tab via window.open`** — same, but trigger it via the
   button (`getByTestId('new-tab-button')`) instead of the link.
3. **`interacts with an element inside an iframe`** — on `/iframe`, use
   `frameLocator('[data-testid="widget-frame"]')` to click the increment button inside
   the widget three times and assert its text shows "Clicked 3 times".
4. **`navigates back and forward`** — go to `/`, then `/todos`, then use
   `page.goBack()` and assert you're back on `/`, then `page.goForward()` and assert
   you're on `/todos`.

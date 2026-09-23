# 08 — Dialogs

## Concept

### Native browser dialogs (`alert`, `confirm`, `prompt`)

These **block** normal page JS execution, so Playwright can't click a button inside
them — there isn't one. Instead you listen for the `dialog` event and decide what to
do, *before* triggering the action that opens it:

```ts
page.on('dialog', (dialog) => {
  console.log(dialog.type(), dialog.message())
  dialog.accept()          // or dialog.dismiss(), or dialog.accept('typed value') for prompt()
})
await page.getByTestId('confirm-btn').click()
```

By default, Playwright **auto-dismisses** dialogs if you don't register a handler — so
without a listener, `window.confirm()` returns `false` and `window.prompt()` returns
`null`. This matters for `/todos`, where deleting an item calls `window.confirm()`.

### Custom modals

These are just regular DOM elements (a backdrop `<div>` and a panel `<div>`) — no
special API needed, just normal locators and clicks.

## Tasks

Work in `exercise.spec.ts`, on `/dialogs` and `/todos`.

1. **`accepts a confirm dialog`** — click "Trigger confirm", accept the dialog, and
   assert `getByTestId('dialog-result')` shows "confirm: accepted".
2. **`dismisses a confirm dialog`** — same, but dismiss it; assert the result shows
   "confirm: dismissed".
3. **`answers a prompt dialog`** — click "Trigger prompt", accept with the text
   "Playwright Student", and assert the result shows that text.
4. **`deleting a todo requires confirmation`** — on `/todos`, register a dialog handler
   that accepts, delete the "Write first test" todo, and assert it's gone from the
   list.
5. **`opens and closes a custom modal via backdrop click`** — open the custom modal,
   assert it's visible, then close it by clicking the backdrop
   (`getByTestId('modal-backdrop')`). The backdrop fills the screen but the panel sits
   on top of its center, so a plain `.click()` would hit the panel instead — click at an
   offset with `.click({ position: { x: 10, y: 10 } })` to land on the backdrop itself.
   Assert the modal is no longer visible.
6. **`opens a nested modal`** — open the modal, then open the nested modal from inside
   it, and assert both `getByTestId('modal')` and `getByTestId('nested-modal')` are
   visible at the same time.

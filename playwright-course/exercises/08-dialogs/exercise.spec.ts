import { test, expect } from '@playwright/test'

test('accepts a confirm dialog', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/dialogs')
  // TODO: page.on('dialog', dialog => dialog.accept())
  // TODO: click confirm-btn
  // TODO: assert dialog-result has text "confirm: accepted"
})

test('dismisses a confirm dialog', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/dialogs')
  // TODO: page.on('dialog', dialog => dialog.dismiss())
  // TODO: click confirm-btn
  // TODO: assert dialog-result has text "confirm: dismissed"
})

test('answers a prompt dialog', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/dialogs')
  // TODO: page.on('dialog', dialog => dialog.accept('Playwright Student'))
  // TODO: click prompt-btn
  // TODO: assert dialog-result has text "prompt: Playwright Student"
})

test('deleting a todo requires confirmation', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/todos')
  // TODO: page.on('dialog', dialog => dialog.accept())
  // TODO: delete the "Write first test" todo (find its item, click todo-delete within it)
  // TODO: assert "Write first test" is no longer visible
})

test('opens and closes a custom modal via backdrop click', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/dialogs')
  // TODO: click open-modal
  // TODO: assert modal is visible
  // TODO: click the backdrop at an offset position (see README hint)
  // TODO: assert modal is no longer visible
})

test('opens a nested modal', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/dialogs')
  // TODO: open the modal, then open the nested modal from within it
  // TODO: assert both modal and nested-modal are visible
})

import { test, expect } from '@playwright/test'

test('finds the wrong search placeholder', async ({ page }) => {
  await page.goto('/table')

  // This placeholder text is wrong on purpose — use --debug or --trace on to find
  // the real one rendered on the page, then fix the string below.
  await expect(page.getByPlaceholder('Search users...')).toBeVisible()
})

test('practices a live pause', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/dialogs')
  // TODO: add `await page.pause()` here, run with --headed, step through it,
  // then remove the pause() call again before moving on
  await expect(page.getByTestId('open-modal')).toBeVisible()
})

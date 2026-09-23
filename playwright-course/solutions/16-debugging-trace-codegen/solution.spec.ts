import { test, expect } from '@playwright/test'

test('finds the wrong search placeholder', async ({ page }) => {
  await page.goto('/table')

  // Fixed: the real placeholder, discovered via --debug / the trace viewer.
  await expect(page.getByPlaceholder('Search by name…')).toBeVisible()
})

test('practices a live pause', async ({ page }) => {
  await page.goto('/dialogs')
  // page.pause() was used here during development (run with --headed to try it
  // yourself) and removed again so this test can run unattended in CI.
  await expect(page.getByTestId('open-modal')).toBeVisible()
})

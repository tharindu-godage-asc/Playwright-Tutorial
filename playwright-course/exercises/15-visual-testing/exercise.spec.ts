import { test, expect } from '@playwright/test'

test('home page matches its baseline', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/')
  // TODO: await expect(page).toHaveScreenshot('home-page.png')
})

test('tabs panel matches its baseline', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/tabs')
  // TODO: screenshot just the tablist locator, not the whole page
})

test('async page masks the live poll counter', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/async')
  // TODO: await expect(page).toHaveScreenshot('async-page.png', { mask: [page.getByTestId('poll-counter')] })
})

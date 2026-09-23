import { test, expect } from '@playwright/test'

test('home page matches its baseline', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('home-page.png')
})

test('tabs panel matches its baseline', async ({ page }) => {
  await page.goto('/tabs')
  await expect(page.getByRole('tablist')).toHaveScreenshot('tabs-tablist.png')
})

test('async page masks the live poll counter', async ({ page }) => {
  await page.goto('/async')
  await expect(page).toHaveScreenshot('async-page.png', {
    mask: [page.getByTestId('poll-counter')],
  })
})

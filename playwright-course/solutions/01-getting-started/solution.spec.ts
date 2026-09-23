import { test, expect } from '@playwright/test'

test('homepage has a welcome heading', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible()
})

test('page title is correct', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Playwright Practice App')
})

test('clicking a nav link navigates', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Todos' }).click()
  await expect(page).toHaveURL(/\/todos/)
})

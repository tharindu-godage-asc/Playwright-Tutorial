import { test, expect } from '@playwright/test'

test('opens dashboard in a new tab via link', async ({ page }) => {
  await page.goto('/new-tab')
  // /dashboard redirects to /login without an auth token. The new tab shares this
  // context's localStorage, so seeding it here logs in both pages at once.
  await page.evaluate(() => localStorage.setItem('pw_demo_token', 'demo-token-123'))

  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByTestId('new-tab-link').click(),
  ])
  await newPage.waitForLoadState()
  await expect(newPage).toHaveURL(/\/dashboard/)
})

test('opens dashboard in a new tab via window.open', async ({ page }) => {
  await page.goto('/new-tab')
  await page.evaluate(() => localStorage.setItem('pw_demo_token', 'demo-token-123'))

  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByTestId('new-tab-button').click(),
  ])
  await newPage.waitForLoadState()
  await expect(newPage).toHaveURL(/\/dashboard/)
})

test('interacts with an element inside an iframe', async ({ page }) => {
  await page.goto('/iframe')

  const frame = page.frameLocator('[data-testid="widget-frame"]')
  const button = frame.getByTestId('widget-increment')
  await button.click()
  await button.click()
  await button.click()

  await expect(button).toHaveText('Clicked 3 times')
})

test('navigates back and forward', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Todos' }).click()
  await expect(page).toHaveURL(/\/todos/)

  await page.goBack()
  await expect(page).toHaveURL('/')

  await page.goForward()
  await expect(page).toHaveURL(/\/todos/)
})

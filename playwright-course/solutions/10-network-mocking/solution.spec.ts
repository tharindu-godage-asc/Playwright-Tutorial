import { test, expect } from '@playwright/test'

test('mocks the user list with fixed data', async ({ page }) => {
  await page.route('**/api/users', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Mock User', role: 'Tester', email: 'mock@example.com' },
      ]),
    }),
  )

  await page.goto('/table')

  await expect(page.getByTestId('user-row')).toHaveCount(1)
  await expect(page.getByTestId('user-row')).toContainText('Mock User')
})

test('simulates a server error and asserts the error state', async ({ page }) => {
  await page.route('**/api/users', (route) =>
    route.fulfill({ status: 500, body: 'Server error' }),
  )

  await page.goto('/table')

  await expect(page.getByTestId('table-error')).toBeVisible()
})

test('waits for the real network response', async ({ page }) => {
  await Promise.all([page.waitForResponse('**/api/users'), page.goto('/table')])

  await expect(page.getByTestId('user-row')).toHaveCount(8)
})

test('mocks a failed login without a real backend', async ({ page }) => {
  await page.route('**/api/login', (route) =>
    route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Mocked failure' }),
    }),
  )

  await page.goto('/login')
  await page.getByTestId('username-input').fill('anyone')
  await page.getByTestId('password-input').fill('anything')
  await page.getByTestId('login-submit').click()

  await expect(page.getByTestId('login-error')).toHaveText('Mocked failure')
})

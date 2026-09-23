import { test, expect } from '@playwright/test'

test('mocks the user list with fixed data', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // TODO: page.route('**/api/users', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([...]) }))
  await page.goto('/table')
  // TODO: assert user-row has count 1 and contains your chosen name
})

test('simulates a server error and asserts the error state', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // TODO: page.route('**/api/users', route => route.fulfill({ status: 500, body: 'Server error' }))
  await page.goto('/table')
  // TODO: assert table-error becomes visible
})

test('waits for the real network response', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // TODO: Promise.all([page.waitForResponse('**/api/users'), page.goto('/table')])
  // TODO: assert user-row has count 8
})

test('mocks a failed login without a real backend', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // TODO: page.route('**/api/login', route => route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ error: 'Mocked failure' }) }))
  await page.goto('/login')
  // TODO: fill in any username/password and submit
  // TODO: assert login-error shows "Mocked failure"
})

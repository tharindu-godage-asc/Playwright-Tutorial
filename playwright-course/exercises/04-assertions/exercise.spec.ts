import { test, expect } from '@playwright/test'

test('todo counter reflects remaining items', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/todos')
  // TODO: assert getByTestId('todo-count') has text "2 item(s) left"
})

test('disabled submit button becomes enabled', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/forms')
  // TODO: assert the submit button is disabled
  // TODO: fill full name, email, plan, and check the terms checkbox
  // TODO: assert the submit button is enabled
})

test('table has the expected row count', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/table')
  // TODO: assert getByTestId('user-row') has count 8
  // (web-first assertions wait for the async fetch to finish for you)
})

test('search narrows the table', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/table')
  // TODO: fill the search box (getByTestId('table-search')) with "Ada"
  // TODO: assert getByTestId('user-row') has count 1
  // TODO: assert that row contains the text "Ada Lovelace"
})

test('use a soft assertion to check two things at once', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // Log in first
  await page.goto('/login')
  await page.getByTestId('username-input').fill('student')
  await page.getByTestId('password-input').fill('playwright123')
  await page.getByTestId('login-submit').click()
  await expect(page).toHaveURL(/\/dashboard/)

  // TODO: expect.soft the welcome message contains "student"
  // TODO: expect.soft the logout button is visible
})

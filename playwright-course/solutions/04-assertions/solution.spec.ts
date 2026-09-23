import { test, expect } from '@playwright/test'

test('todo counter reflects remaining items', async ({ page }) => {
  await page.goto('/todos')
  await expect(page.getByTestId('todo-count')).toHaveText('2 item(s) left')
})

test('disabled submit button becomes enabled', async ({ page }) => {
  await page.goto('/forms')
  const submit = page.getByTestId('form-submit')
  await expect(submit).toBeDisabled()

  await page.getByTestId('full-name').fill('Ada Lovelace')
  await page.getByTestId('email').fill('ada@example.com')
  await page.getByLabel('Plan').selectOption('pro')
  await page.getByTestId('terms-checkbox').check()

  await expect(submit).toBeEnabled()
})

test('table has the expected row count', async ({ page }) => {
  await page.goto('/table')
  await expect(page.getByTestId('user-row')).toHaveCount(8)
})

test('search narrows the table', async ({ page }) => {
  await page.goto('/table')
  await page.getByTestId('table-search').fill('Ada')
  await expect(page.getByTestId('user-row')).toHaveCount(1)
  await expect(page.getByTestId('user-row')).toContainText('Ada Lovelace')
})

test('use a soft assertion to check two things at once', async ({ page }) => {
  await page.goto('/login')
  await page.getByTestId('username-input').fill('student')
  await page.getByTestId('password-input').fill('playwright123')
  await page.getByTestId('login-submit').click()
  await expect(page).toHaveURL(/\/dashboard/)

  expect.soft(await page.getByTestId('welcome-message').textContent()).toContain('student')
  await expect.soft(page.getByTestId('logout-button')).toBeVisible()
})

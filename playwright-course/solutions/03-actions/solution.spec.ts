import { test, expect } from '@playwright/test'

test('adds a todo by clicking Add', async ({ page }) => {
  await page.goto('/todos')
  await page.getByTestId('todo-input').fill('Buy milk')
  await page.getByTestId('todo-add').click()
  await expect(page.getByText('Buy milk')).toBeVisible()
})

test('adds a todo by pressing Enter', async ({ page }) => {
  await page.goto('/todos')
  const input = page.getByTestId('todo-input')
  await input.fill('Walk the dog')
  await input.press('Enter')
  await expect(page.getByText('Walk the dog')).toBeVisible()
})

test('toggles a todo checkbox', async ({ page }) => {
  await page.goto('/todos')
  const item = page.getByTestId('todo-item').filter({ hasText: 'Write first test' })
  await item.getByTestId('todo-checkbox').check()
  await expect(item.getByTestId('todo-checkbox')).toBeChecked()
})

test('filters active todos', async ({ page }) => {
  await page.goto('/todos')
  await page.getByTestId('filter-active').click()
  await expect(page.getByText('Learn Playwright locators')).not.toBeVisible()
})

test('fills and submits the login form', async ({ page }) => {
  await page.goto('/login')
  await page.getByTestId('username-input').fill('student')
  await page.getByTestId('password-input').fill('playwright123')
  await page.getByTestId('login-submit').click()
  await expect(page).toHaveURL(/\/dashboard/)
})

test('selects a plan and experience level', async ({ page }) => {
  await page.goto('/forms')
  const plan = page.getByLabel('Plan')
  await plan.selectOption('pro')
  await page.getByRole('radio', { name: 'intermediate' }).check()

  await expect(plan).toHaveValue('pro')
  await expect(page.getByRole('radio', { name: 'intermediate' })).toBeChecked()
})

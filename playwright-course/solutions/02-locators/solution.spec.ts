import { test, expect } from '@playwright/test'

test('finds the todo input by placeholder', async ({ page }) => {
  await page.goto('/todos')
  await expect(page.getByPlaceholder('What needs doing?')).toBeVisible()
})

test('finds a specific todo by text', async ({ page }) => {
  await page.goto('/todos')
  await expect(page.getByText('Learn Playwright locators', { exact: true })).toBeVisible()
})

test('counts todo items', async ({ page }) => {
  await page.goto('/todos')
  await expect(page.getByTestId('todo-item')).toHaveCount(3)
})

test('filters a table row by name', async ({ page }) => {
  await page.goto('/table')
  const row = page.getByTestId('user-row').filter({ hasText: 'Grace Hopper' })
  await expect(row).toBeVisible()
})

test('chains locators to scope a search', async ({ page }) => {
  await page.goto('/table')
  const row = page.getByTestId('user-row').filter({ hasText: 'Grace Hopper' })
  const deleteBtn = row.getByRole('button', { name: /remove/i })
  await expect(deleteBtn).toBeVisible()
})

test('selects the plan dropdown by label', async ({ page }) => {
  await page.goto('/forms')
  await expect(page.getByLabel('Plan')).toBeVisible()
})

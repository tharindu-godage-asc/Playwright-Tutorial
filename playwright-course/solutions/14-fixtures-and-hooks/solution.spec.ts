import { test, expect } from './fixtures'

test('reaches the dashboard without repeating login logic', async ({ authenticatedPage }) => {
  await test.step('verify dashboard', async () => {
    await expect(authenticatedPage.getByTestId('welcome-message')).toBeVisible()
  })
})

test.describe('todos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todos')
  })

  test('todo input is visible on load', async ({ page }) => {
    await expect(page.getByTestId('todo-input')).toBeVisible()
  })

  test('seeded todos are visible on load', async ({ page }) => {
    await expect(page.getByTestId('todo-item')).toHaveCount(3)
  })
})

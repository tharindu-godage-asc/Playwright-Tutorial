import { test, expect } from '@playwright/test'

test('finds the todo input by placeholder', async ({ page }) => {
  //test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/todos')
  await expect(page.getByPlaceholder('Whatneeds doing?')).toBeVisible()
  // TODO: locate the input using getByPlaceholder('What needs doing?')
  // TODO: assert it is visible
})

test('finds a specific todo by text', async ({ page }) => {
  //test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/todos')
  await expect(page.getByText('Learn Playwright locators')).toBeVisible()
  // TODO: use getByText to find "Learn Playwright locators"
  // TODO: assert it is visible
})

test('counts todo items', async ({ page }) => {
  //test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/todos')
  await expect(page.getByTestId('todo-item')).toHaveCount(3)
  // TODO: locate all elements with data-testid="todo-item"
  // TODO: assert there are exactly 3
})

test('filters a table row by name', async ({ page }) => {
  //test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/table')
  await expect(page.getByTestId('user-row').filter({ hasText: 'Grace Hopper' })).toBeVisible();
  // TODO: locate rows with data-testid="user-row", filtered to the one containing "Grace Hopper"
  // TODO: assert it is visible
})

test('chains locators to scope a search', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/table')
  // TODO: find the "Grace Hopper" row like in the previous test
  // TODO: within that row, find the "Remove" button (role "button", accessible name matches /remove/i)
  // TODO: assert that button is visible
})

test('selects the plan dropdown by label', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/forms')
  // TODO: locate the <select> using getByLabel('Plan')
  // TODO: assert it is visible
})

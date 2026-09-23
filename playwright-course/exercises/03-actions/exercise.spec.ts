import { test, expect } from '@playwright/test'

test('adds a todo by clicking Add', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/todos')
  // TODO: fill the todo input (getByTestId('todo-input')) with "Buy milk"
  // TODO: click the "Add" button (getByTestId('todo-add'))
  // TODO: assert "Buy milk" is visible in the list
})

test('adds a todo by pressing Enter', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/todos')
  // TODO: fill the todo input with "Walk the dog"
  // TODO: press "Enter" on that locator instead of clicking Add
  // TODO: assert "Walk the dog" is visible in the list
})

test('toggles a todo checkbox', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/todos')
  // TODO: find the todo item containing "Write first test" (getByTestId('todo-item').filter({ hasText: ... }))
  // TODO: check its checkbox
  // TODO: assert the checkbox is checked
})

test('filters active todos', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/todos')
  // TODO: click the "active" filter button (getByTestId('filter-active'))
  // TODO: assert "Learn Playwright locators" (the completed seed item) is not visible
})

test('fills and submits the login form', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/login')
  // TODO: fill username-input with "student"
  // TODO: fill password-input with "playwright123"
  // TODO: click login-submit
  // TODO: assert the URL is now /dashboard
})

test('selects a plan and experience level', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/forms')
  // TODO: selectOption('pro') on the Plan dropdown (getByLabel('Plan'))
  // TODO: check the "intermediate" radio button (getByRole('radio', { name: 'intermediate' }))
  // TODO: assert the dropdown's value is 'pro' (toHaveValue) and the radio is checked
})

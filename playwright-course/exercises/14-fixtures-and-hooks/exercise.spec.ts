import { test, expect } from './fixtures'

test('reaches the dashboard without repeating login logic', async ({ authenticatedPage }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // authenticatedPage is already logged in and on /dashboard once you implement the fixture.
  // TODO: wrap the check in a test.step('verify dashboard') block
  // TODO: inside the step, assert the welcome message is visible
})

test.describe('todos', () => {
  test.beforeEach(async ({ page }) => {
    // TODO: navigate to /todos
  })

  test('todo input is visible on load', async ({ page }) => {
    test.skip(true, 'Remove this line once you start implementing the test')

    // TODO: assert the todo input (getByTestId('todo-input')) is visible
    // (no page.goto needed here — beforeEach already navigated)
  })

  test('seeded todos are visible on load', async ({ page }) => {
    test.skip(true, 'Remove this line once you start implementing the test')

    // TODO: assert getByTestId('todo-item') has count 3
  })
})

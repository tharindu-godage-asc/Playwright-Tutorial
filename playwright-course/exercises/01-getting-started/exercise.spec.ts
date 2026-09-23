import { test, expect } from '@playwright/test'

test('homepage has a welcome heading', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // TODO: navigate to '/'
  // TODO: assert the "Welcome" heading (role "heading") is visible
})

test('page title is correct', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // TODO: navigate to '/'
  // TODO: assert the page title equals "Playwright Practice App"
})

test('clicking a nav link navigates', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // TODO: navigate to '/'
  // TODO: click the "Todos" link in the sidebar nav
  // TODO: assert the URL now contains /todos
})

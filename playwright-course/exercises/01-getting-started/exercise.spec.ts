import { test, expect } from '@playwright/test'

test('homepage has a welcome heading', async ({ page }) => {
  // test.skip(true, 'Remove this line once you start implementing the test')
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();

  // TODO: navigate to '/'
  // TODO: assert the "Welcome" heading (role "heading") is visible
})

test('page title is correct', async ({ page }) => {
  //test.skip(true, 'Remove this line once you start implementing the test')
    await page.goto('/')
    await expect(page).toHaveTitle('Playwright Practice App');
  // TODO: navigate to '/'
  // TODO: assert the page title equals "Playwright Practice App"
})

test('clicking a nav link navigates', async ({ page }) => {
  //test.skip(true, 'Remove this line once you start implementing the test')
  await page.goto('/')
  await page.click('a[href="/todos"]')
  // TODO: navigate to '/'
  // TODO: click the "Todos" link in the sidebar nav
  // TODO: assert the URL now contains /todos
})

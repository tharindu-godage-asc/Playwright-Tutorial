import { test, expect } from '@playwright/test'

test('opens dashboard in a new tab via link', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/new-tab')
  // /dashboard redirects to /login without an auth token. The new tab shares this
  // context's localStorage, so seed it here before opening the tab:
  // await page.evaluate(() => localStorage.setItem('pw_demo_token', 'demo-token-123'))
  // TODO: Promise.all([page.waitForEvent('popup'), page.getByTestId('new-tab-link').click()])
  // TODO: assert the new page's URL is /dashboard
})

test('opens dashboard in a new tab via window.open', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/new-tab')
  // TODO: seed the auth token again (see previous test)
  // TODO: same pattern, but click getByTestId('new-tab-button')
})

test('interacts with an element inside an iframe', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/iframe')
  // TODO: const frame = page.frameLocator('[data-testid="widget-frame"]')
  // TODO: click frame.getByTestId('widget-increment') three times
  // TODO: assert its text is "Clicked 3 times"
})

test('navigates back and forward', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/')
  await page.getByRole('link', { name: 'Todos' }).click()
  await expect(page).toHaveURL(/\/todos/)

  // TODO: page.goBack(), assert URL is '/'
  // TODO: page.goForward(), assert URL contains /todos
})

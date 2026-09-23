import { test, expect } from '@playwright/test'

// These tests must run in order in the same worker: the first one creates the
// storage-state file the later ones depend on. `fullyParallel` in the config would
// otherwise let Playwright run them concurrently in separate workers.
test.describe.configure({ mode: 'serial' })

const authFile = 'playwright/.auth/user.json'

test('logs in through the UI and saves storage state', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/login')
  // TODO: fill username-input and password-input, click login-submit
  // TODO: assert the URL is /dashboard
  // TODO: await page.context().storageState({ path: authFile })
})

test.describe('with a pre-authenticated session', () => {
  test.use({ storageState: authFile })

  test('reuses saved storage state to skip login', async ({ page }) => {
    test.skip(true, 'Remove this line once you start implementing the test')

    // TODO: go straight to /dashboard (no /login visit)
    // TODO: assert the welcome message is visible
  })

  test('logging out clears the session', async ({ page }) => {
    test.skip(true, 'Remove this line once you start implementing the test')

    // TODO: go to /dashboard
    // TODO: click logout-button
    // TODO: assert the URL is now /login
  })
})

import { test, expect } from '@playwright/test'

// These tests must run in order in the same worker: the first one creates the
// storage-state file the later ones depend on. `fullyParallel` in the config would
// otherwise let Playwright run them concurrently in separate workers.
test.describe.configure({ mode: 'serial' })

const authFile = 'playwright/.auth/user-solution.json'

test('logs in through the UI and saves storage state', async ({ page }) => {
  await page.goto('/login')
  await page.getByTestId('username-input').fill('student')
  await page.getByTestId('password-input').fill('playwright123')
  await page.getByTestId('login-submit').click()
  await expect(page).toHaveURL(/\/dashboard/)

  await page.context().storageState({ path: authFile })
})

test.describe('with a pre-authenticated session', () => {
  test.use({ storageState: authFile })

  test('reuses saved storage state to skip login', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByTestId('welcome-message')).toBeVisible()
  })

  test('logging out clears the session', async ({ page }) => {
    await page.goto('/dashboard')
    await page.getByTestId('logout-button').click()
    await expect(page).toHaveURL(/\/login/)
  })
})

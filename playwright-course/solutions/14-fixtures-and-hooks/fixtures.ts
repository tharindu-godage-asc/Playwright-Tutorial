import { test as base, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

type MyFixtures = {
  authenticatedPage: Page
}

export const test = base.extend<MyFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login')
    await page.getByTestId('username-input').fill('student')
    await page.getByTestId('password-input').fill('playwright123')
    await page.getByTestId('login-submit').click()
    await expect(page).toHaveURL(/\/dashboard/)

    await use(page)
  },
})

export { expect }

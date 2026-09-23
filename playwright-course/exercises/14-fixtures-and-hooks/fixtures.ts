import { test as base, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

type MyFixtures = {
  authenticatedPage: Page
}

export const test = base.extend<MyFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // TODO: navigate to /login, fill credentials, submit, assert URL is /dashboard
    // (this fixture must call use() exactly once — keep it below your setup code,
    // and don't remove it, or every test that requests this fixture will hang)
    await use(page)
  },
})

export { expect }

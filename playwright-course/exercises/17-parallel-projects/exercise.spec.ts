import { test, expect } from '@playwright/test'

test('logs which project it ran under', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // TODO: assert test.info().project.name is one of the configured project names
  // (this file also runs under playwright.config.local.ts's 'mobile-chrome' project)
  // expect(['chromium', 'firefox', 'webkit', 'mobile-chrome']).toContain(test.info().project.name)
})

test('adapts behavior per project', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // TODO: test.skip(test.info().project.name === 'webkit', 'Demonstrating a project-specific skip')
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible()
})

test('emulates a mobile viewport', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // This assertion is only meaningful when run via playwright.config.local.ts's
  // mobile-chrome project — skip it under the root config's desktop projects.
  // TODO: test.skip(test.info().project.name !== 'mobile-chrome', 'Only meaningful under the local mobile config')

  await page.goto('/')
  // TODO: assert page.viewportSize()!.width is less than 500
})

import { test, expect } from '@playwright/test'

test('logs which project it ran under', async ({ page }) => {
  expect(['chromium', 'firefox', 'webkit', 'mobile-chrome']).toContain(
    test.info().project.name,
  )
})

test('adapts behavior per project', async ({ page }) => {
  test.skip(test.info().project.name === 'webkit', 'Demonstrating a project-specific skip')

  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible()
})

test('emulates a mobile viewport', async ({ page }) => {
  test.skip(
    test.info().project.name !== 'mobile-chrome',
    'Only meaningful under the local mobile config',
  )

  await page.goto('/')
  expect(page.viewportSize()!.width).toBeLessThan(500)
})

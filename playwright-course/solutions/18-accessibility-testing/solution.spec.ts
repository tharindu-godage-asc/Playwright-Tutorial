import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home page has no accessibility violations', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})

test('forms page has no accessibility violations', async ({ page }) => {
  await page.goto('/forms')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})

test('scan scoped to a specific region', async ({ page }) => {
  await page.goto('/table')
  // The table only renders after the async fetch resolves — scanning before that
  // would find no matching element for .include('table').
  await expect(page.getByTestId('user-table')).toBeVisible()

  const results = await new AxeBuilder({ page }).include('table').analyze()
  expect(results.violations).toEqual([])
})

test('report violation details on failure', async ({ page }) => {
  await page.goto('/dialogs')
  const results = await new AxeBuilder({ page }).analyze()

  const summary = results.violations
    .map((v) => `${v.id}: ${v.description}`)
    .join('\n')

  expect(results.violations, summary).toEqual([])
})

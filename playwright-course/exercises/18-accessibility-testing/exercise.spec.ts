import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home page has no accessibility violations', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/')
  // TODO: const results = await new AxeBuilder({ page }).analyze()
  // TODO: assert results.violations is an empty array
})

test('forms page has no accessibility violations', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/forms')
  // TODO: same as above, scanning /forms
})

test('scan scoped to a specific region', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/table')
  // TODO: wait for the table to actually render first — it loads async, and scanning
  // too early means .include('table') matches nothing (getByTestId('user-table'))
  // TODO: new AxeBuilder({ page }).include('table').analyze()
  // TODO: assert violations is empty
})

test('report violation details on failure', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/dialogs')
  // TODO: run a scan
  // TODO: build a readable summary string from results.violations (id + description per violation)
  // TODO: assert results.violations is empty, passing the summary as the assertion message
})

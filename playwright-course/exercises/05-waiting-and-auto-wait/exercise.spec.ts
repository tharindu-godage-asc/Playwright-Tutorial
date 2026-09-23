import { test, expect } from '@playwright/test'

test('waits for a slow action to finish', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/async')
  // TODO: click getByTestId('slow-button')
  // TODO: assert getByTestId('slow-result') eventually has text 'Done!'
})

test('waits for an element that appears after a delay', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/async')
  // TODO: assert getByTestId('delayed-element') becomes visible
})

test('polls a value that changes over time', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/async')
  // TODO: use expect.poll(async () => ...) to wait until the poll-counter text is not "0"
})

test('retries a flaky network call with toPass', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/async')
  // TODO: wrap a click + assertion in expect(async () => { ... }).toPass(...) so it
  // keeps retrying "Call flaky endpoint" until getByTestId('flaky-result') shows success.
  // The endpoint fails ~40% of the time — pass { timeout: 30_000, intervals: [250] }
  // so retries are frequent enough to reliably succeed within the timeout.
})

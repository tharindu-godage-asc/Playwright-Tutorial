import { test, expect } from '@playwright/test'

test('waits for a slow action to finish', async ({ page }) => {
  await page.goto('/async')
  await page.getByTestId('slow-button').click()
  await expect(page.getByTestId('slow-result')).toHaveText('Done!')
})

test('waits for an element that appears after a delay', async ({ page }) => {
  await page.goto('/async')
  await expect(page.getByTestId('delayed-element')).toBeVisible()
})

test('polls a value that changes over time', async ({ page }) => {
  await page.goto('/async')
  await expect
    .poll(async () => page.getByTestId('poll-counter').textContent())
    .not.toBe('0')
})

test('retries a flaky network call with toPass', async ({ page }) => {
  await page.goto('/async')

  // intervals keeps retries frequent (rather than the default backoff that ramps up to
  // 1s between attempts) — with a 40%-failure endpoint, more frequent attempts make
  // this reliably pass well within the timeout instead of occasionally exhausting it.
  await expect(async () => {
    await page.getByTestId('flaky-button').click()
    await expect(page.getByTestId('flaky-result')).toHaveText('Loaded successfully')
  }).toPass({ timeout: 30_000, intervals: [250] })
})

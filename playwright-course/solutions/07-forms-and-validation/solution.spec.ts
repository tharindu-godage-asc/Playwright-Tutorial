import { test, expect } from '@playwright/test'

test('fills every field and submits successfully', async ({ page }) => {
  await page.goto('/forms')

  await page.getByTestId('full-name').fill('Zoe Example')
  await page.getByTestId('email').fill('zoe@example.com')
  await page.getByLabel('Plan').selectOption('pro')
  await page.getByRole('radio', { name: 'intermediate' }).check()
  await page.getByRole('checkbox', { name: 'Testing' }).check()
  await page.getByRole('checkbox', { name: 'CI/CD' }).check()
  await page.locator('#volume').fill('80')
  await page.getByTestId('birthday').fill('2024-01-15')
  await page.getByTestId('bio').fill('Learning Playwright, one exercise at a time.')
  await page.getByTestId('terms-checkbox').check()

  await page.getByTestId('form-submit').click()
  await expect(page.getByTestId('form-success')).toBeVisible()
})

test('invalid email keeps submit disabled', async ({ page }) => {
  await page.goto('/forms')

  await page.getByTestId('full-name').fill('Zoe Example')
  await page.getByTestId('email').fill('not-an-email')
  await page.getByLabel('Plan').selectOption('pro')
  await page.getByTestId('terms-checkbox').check()

  await expect(page.getByTestId('form-submit')).toBeDisabled()
})

test('echoed JSON reflects what was submitted', async ({ page }) => {
  await page.goto('/forms')

  await page.getByTestId('full-name').fill('Zoe Example')
  await page.getByTestId('email').fill('zoe@example.com')
  await page.getByLabel('Plan').selectOption('free')
  await page.getByTestId('terms-checkbox').check()
  await page.getByTestId('form-submit').click()

  await expect(page.getByTestId('form-success')).toContainText('Zoe Example')
})

test('only checked interests are submitted', async ({ page }) => {
  await page.goto('/forms')

  await page.getByRole('checkbox', { name: 'Testing' }).check()
  await page.getByRole('checkbox', { name: 'CI/CD' }).check()

  await page.getByTestId('full-name').fill('Zoe Example')
  await page.getByTestId('email').fill('zoe@example.com')
  await page.getByLabel('Plan').selectOption('free')
  await page.getByTestId('terms-checkbox').check()
  await page.getByTestId('form-submit').click()

  const success = page.getByTestId('form-success')
  await expect(success).toContainText('Testing')
  await expect(success).toContainText('CI/CD')
  await expect(success).not.toContainText('Accessibility')
})

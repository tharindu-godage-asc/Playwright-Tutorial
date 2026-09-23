import { test, expect } from '@playwright/test'

test('fills every field and submits successfully', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/forms')
  // TODO: fill full-name, email
  // TODO: selectOption a plan
  // TODO: check one experience radio (getByRole('radio', { name: ... }))
  // TODO: check two interest checkboxes (getByRole('checkbox', { name: ... }))
  // TODO: set the volume slider (locator for input#volume) with fill('80')
  // TODO: fill birthday with '2024-01-15'
  // TODO: fill bio with some text
  // TODO: check the terms checkbox
  // TODO: click form-submit
  // TODO: assert getByTestId('form-success') is visible
})

test('invalid email keeps submit disabled', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/forms')
  // TODO: fill full-name
  // TODO: fill email with an invalid value like "not-an-email"
  // TODO: selectOption a plan
  // TODO: check the terms checkbox
  // TODO: assert form-submit is still disabled
})

test('echoed JSON reflects what was submitted', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/forms')
  // TODO: fill the minimum required fields with a recognisable full name, e.g. "Zoe Example"
  // TODO: submit
  // TODO: assert getByTestId('form-success') contains that full name
})

test('only checked interests are submitted', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/forms')
  // TODO: check "Testing" and "CI/CD" checkboxes only
  // TODO: fill the rest of the required fields and submit
  // TODO: assert the success panel contains "Testing" and "CI/CD"
  // TODO: assert the success panel does NOT contain "Accessibility"
})

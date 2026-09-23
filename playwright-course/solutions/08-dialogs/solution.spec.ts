import { test, expect } from '@playwright/test'

test('accepts a confirm dialog', async ({ page }) => {
  await page.goto('/dialogs')
  page.on('dialog', (dialog) => dialog.accept())

  await page.getByTestId('confirm-btn').click()
  await expect(page.getByTestId('dialog-result')).toHaveText('confirm: accepted')
})

test('dismisses a confirm dialog', async ({ page }) => {
  await page.goto('/dialogs')
  page.on('dialog', (dialog) => dialog.dismiss())

  await page.getByTestId('confirm-btn').click()
  await expect(page.getByTestId('dialog-result')).toHaveText('confirm: dismissed')
})

test('answers a prompt dialog', async ({ page }) => {
  await page.goto('/dialogs')
  page.on('dialog', (dialog) => dialog.accept('Playwright Student'))

  await page.getByTestId('prompt-btn').click()
  await expect(page.getByTestId('dialog-result')).toHaveText('prompt: Playwright Student')
})

test('deleting a todo requires confirmation', async ({ page }) => {
  await page.goto('/todos')
  page.on('dialog', (dialog) => dialog.accept())

  const item = page.getByTestId('todo-item').filter({ hasText: 'Write first test' })
  await item.getByTestId('todo-delete').click()

  await expect(page.getByText('Write first test')).not.toBeVisible()
})

test('opens and closes a custom modal via backdrop click', async ({ page }) => {
  await page.goto('/dialogs')

  await page.getByTestId('open-modal').click()
  await expect(page.getByTestId('modal')).toBeVisible()

  await page.getByTestId('modal-backdrop').click({ position: { x: 10, y: 10 } })
  await expect(page.getByTestId('modal')).not.toBeVisible()
})

test('opens a nested modal', async ({ page }) => {
  await page.goto('/dialogs')

  await page.getByTestId('open-modal').click()
  await page.getByTestId('open-nested-modal').click()

  await expect(page.getByTestId('modal')).toBeVisible()
  await expect(page.getByTestId('nested-modal')).toBeVisible()
})

import fs from 'node:fs/promises'
import path from 'node:path'
import { test, expect } from '@playwright/test'

test('uploads a file from disk', async ({ page }) => {
  await page.goto('/forms')

  await page
    .getByTestId('avatar-upload')
    .setInputFiles(path.join(__dirname, '../../fixtures/sample-upload.txt'))

  await expect(page.getByTestId('uploaded-filename')).toHaveText('Selected: sample-upload.txt')
})

test('uploads an in-memory file without touching disk', async ({ page }) => {
  await page.goto('/forms')

  await page.getByTestId('avatar-upload').setInputFiles({
    name: 'generated.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('hello from a buffer'),
  })

  await expect(page.getByTestId('uploaded-filename')).toHaveText('Selected: generated.txt')
})

test('downloads the exported CSV', async ({ page }) => {
  await page.goto('/table')
  await expect(page.getByTestId('user-row')).toHaveCount(8)

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('table-export').click(),
  ])

  expect(download.suggestedFilename()).toBe('users.csv')
})

test('downloaded CSV contains expected data', async ({ page }) => {
  await page.goto('/table')
  await expect(page.getByTestId('user-row')).toHaveCount(8)

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('table-export').click(),
  ])

  const filePath = await download.path()
  const content = await fs.readFile(filePath!, 'utf-8')
  expect(content).toContain('Ada Lovelace')
})

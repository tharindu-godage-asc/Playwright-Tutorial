import path from 'node:path'
import { test, expect } from '@playwright/test'

test('uploads a file from disk', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/forms')
  // TODO: setInputFiles on getByTestId('avatar-upload') with
  // path.join(__dirname, '../../fixtures/sample-upload.txt')
  // TODO: assert getByTestId('uploaded-filename') shows "sample-upload.txt"
})

test('uploads an in-memory file without touching disk', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/forms')
  // TODO: setInputFiles with { name, mimeType, buffer: Buffer.from('...') }
  // TODO: assert uploaded-filename shows the name you gave it
})

test('downloads the exported CSV', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/table')
  // TODO: wait for the table to load (assert user-row has count 8, or similar)
  // TODO: Promise.all([page.waitForEvent('download'), click table-export])
  // TODO: assert download.suggestedFilename() === 'users.csv'
})

test('downloaded CSV contains expected data', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  await page.goto('/table')
  // TODO: same download pattern as above
  // TODO: read the file (download.path() + fs.readFile, or createReadStream)
  // TODO: assert the content includes "Ada Lovelace"
})

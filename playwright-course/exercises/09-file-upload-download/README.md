# 09 — File Upload & Download

## Concept

### Uploads

`<input type="file">` can't be filled by typing — the browser blocks scripted typing
into file pickers for security. Playwright bypasses the OS file dialog entirely with
`setInputFiles()`:

```ts
await page.getByTestId('avatar-upload').setInputFiles('fixtures/sample-upload.txt')

// multiple files:
await input.setInputFiles(['a.png', 'b.png'])

// clear a selection:
await input.setInputFiles([])

// an in-memory file, no disk file needed:
await input.setInputFiles({
  name: 'generated.txt',
  mimeType: 'text/plain',
  buffer: Buffer.from('hello'),
})
```

### Downloads

A download doesn't open a locator you can assert on directly — it fires a `download`
event on the page. Same pattern as popups: start listening *before* the triggering
click.

```ts
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.getByTestId('table-export').click(),
])
expect(download.suggestedFilename()).toBe('users.csv')
const path = await download.path()   // saved to a temp location; or download.saveAs(target)
```

## Tasks

Work in `exercise.spec.ts`.

1. **`uploads a file from disk`** — on `/forms`, use `setInputFiles()` with
   `../../fixtures/sample-upload.txt` on the avatar input, and assert
   `getByTestId('uploaded-filename')` shows "sample-upload.txt".
2. **`uploads an in-memory file without touching disk`** — same field, but build the
   file from a `Buffer` instead of a path; assert the filename you gave it shows up.
3. **`downloads the exported CSV`** — on `/table`, wait for data to load, click "Export
   CSV" (`getByTestId('table-export')`), capture the `download` event, and assert
   `download.suggestedFilename()` is `"users.csv"`.
4. **`downloaded CSV contains expected data`** — extending the previous test, read the
   downloaded file's content (`await download.createReadStream()` or
   `fs.readFile(await download.path())`) and assert it contains `"Ada Lovelace"`.

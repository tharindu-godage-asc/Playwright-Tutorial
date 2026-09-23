# 09 — File Upload & Download

Working file: `exercises/09-file-upload-download/exercise.spec.ts`

## Task 1 — `uploads a file from disk`

**Question:** File inputs open a native OS file picker when clicked — there's no
dialog for Playwright to interact with the normal way. How do you select a file
without ever "opening" that picker?

**Approach:**

1. Locate the file input by its test id, same as any other input.
2. There's an action specifically for file inputs that bypasses the OS dialog
   entirely and sets the selected file(s) directly — it takes a path (or array of
   paths) to a real file on disk.
3. A sample file is already provided under `fixtures/`. Build an absolute path to it
   relative to the test file (`__dirname` plus a relative path is the standard Node
   pattern) rather than relying on the process's current working directory.
4. After setting the file, assert the page shows the filename you uploaded — the app
   renders it once the change event fires.

## Task 2 — `uploads an in-memory file without touching disk`

**Question:** What if the file's content is generated at test time and never needs
to touch the filesystem?

**Approach:**

1. Same input and same action as Task 1, but instead of a path string, pass an
   object describing the file directly: a name, a MIME type, and its contents as a
   buffer.
2. Assert the filename shown matches the `name` you gave the in-memory file.

## Task 3 — `downloads the exported CSV`

**Question:** Clicking "Export CSV" doesn't render anything new in the page — it
triggers a browser download. How do you observe that at all?

**Approach:**

1. A download, like a popup, fires an event on the page rather than producing
   something you can locate in the DOM. Same pattern as exercise 06's popup
   handling: start listening for the event before the click that triggers it, using
   `Promise.all`.
2. Before triggering the export, make sure the table has actually finished loading
   its data — the export button reflects whatever rows are currently rendered.
3. The event gives you back a `Download` object. Check its suggested filename
   against what you'd expect the app to name the file (look at how the button
   constructs the download in `Table.tsx` if you're not sure).

## Task 4 — `downloaded CSV contains expected data`

**Question:** Beyond just confirming a download happened, how do you check what's
actually *inside* the downloaded file?

**Approach:**

1. Same download-catching pattern as Task 3.
2. The `Download` object gives you a way to get to the file's contents — either a
   local path where Playwright saved it (which you can then read with Node's `fs`
   module) or a readable stream directly. Either approach works; reading via `fs`
   after getting the path is the more common pattern.
3. Assert the file's text content contains a name you know should be in the exported
   data.

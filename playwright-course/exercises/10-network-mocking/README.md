# 10 — Network Mocking

## Concept

`page.route(urlPattern, handler)` intercepts requests matching a glob or regex and lets
you fulfill, modify, or block them — without touching the real backend. This is how you
test error states, edge cases, and slow networks deterministically.

```ts
// Replace the real response entirely:
await page.route('**/api/users', (route) =>
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{ id: 1, name: 'Mock User', role: 'Tester', email: 'm@example.com' }]),
  }),
)

// Force an error:
await page.route('**/api/users', (route) => route.fulfill({ status: 500, body: 'Server error' }))

// Let it hit the real network but inspect it:
page.on('response', (response) => {
  if (response.url().includes('/api/users')) console.log(response.status())
})

// Wait for a specific response as part of an action:
const [response] = await Promise.all([
  page.waitForResponse('**/api/users'),
  page.getByTestId('table-reload').click(),
])
```

Register `page.route()` **before** the navigation/action that triggers the request.

## Tasks

Work in `exercise.spec.ts`, on `/table` and `/login`.

1. **`mocks the user list with fixed data`** — before navigating to `/table`, mock
   `**/api/users` to return exactly one user of your choosing. Assert the table shows
   exactly 1 row with that user's name.
2. **`simulates a server error and asserts the error state`** — mock `**/api/users` to
   return a 500. Navigate to `/table` and assert `getByTestId('table-error')` becomes
   visible.
3. **`waits for the real network response`** — without mocking, navigate to `/table`
   and use `page.waitForResponse('**/api/users')` alongside the navigation to know
   exactly when data has arrived, then assert the row count is 8.
4. **`mocks a failed login without a real backend`** — mock `**/api/login` to return a
   401 with `{ error: 'Mocked failure' }`, attempt to log in with any credentials, and
   assert `getByTestId('login-error')` shows "Mocked failure".

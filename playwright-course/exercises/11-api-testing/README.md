# 11 — API Testing

## Concept

Playwright isn't only a browser tool — the `request` fixture gives you an HTTP client
(`APIRequestContext`) for testing endpoints directly, with no browser page involved.
This is much faster than driving the UI when you just need to verify backend behavior,
and it's commonly used to **set up state** for UI tests (e.g. create a user via API,
then test the UI that displays it).

```ts
test('gets users via API', async ({ request }) => {
  const res = await request.get('/api/users')
  expect(res.ok()).toBeTruthy()
  expect(res.status()).toBe(200)

  const users = await res.json()
  expect(users).toHaveLength(8)
})

test('posts JSON', async ({ request }) => {
  const res = await request.post('/api/login', {
    data: { username: 'student', password: 'playwright123' },
  })
  expect(res.status()).toBe(200)
})
```

The `request` fixture automatically uses the `baseURL` from `playwright.config.ts`,
same as `page.goto()`.

## Tasks

Work in `exercise.spec.ts`. None of these tests need `page` at all.

1. **`GET /api/users returns 8 users`** — assert status 200 and that the parsed JSON
   array has length 8.
2. **`POST /api/login succeeds with correct credentials`** — assert status 200 and that
   the response body has a `token` field.
3. **`POST /api/login fails with wrong credentials`** — assert status 401 and that the
   response body has an `error` field.
4. **`creates and deletes a scratch user`** — `/api/users` is read by several other
   pages and exercises, so mutating it here would make unrelated tests flaky depending
   on run order (a real hazard with any shared backend). Instead, practice
   create/delete against the isolated `/api/scratch-users` sandbox: `POST` a new user
   and assert the response is `201` with a generated `id`; `GET
   /api/scratch-users/:id` and assert it matches; `DELETE` it; then `GET` it again and
   assert `404`.

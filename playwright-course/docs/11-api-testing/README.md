# 11 — API Testing

Working file: `exercises/11-api-testing/exercise.spec.ts`

## Task 1 — `GET /api/users returns 8 users`

**Question:** How do you test a backend endpoint directly, with no browser or page
involved at all?

**Approach:**

1. Instead of destructuring `{ page }` in your test function, destructure `{
   request }` — a completely separate fixture that gives you an HTTP client.
2. Call the `get` method with the endpoint's path. Like `page.goto()`, it resolves
   against the config's `baseURL`, so you only need the path.
3. The result gives you both a status code and a way to read the body as JSON.
   Assert the status is 200, then assert the parsed array's length.

## Task 2 — `POST /api/login succeeds with correct credentials`

**Question:** How do you send a JSON body with a POST request, and what should a
successful auth response contain?

**Approach:**

1. Use the `post` method, passing an options object with a `data` field — the
   request fixture serializes it to JSON automatically and sets the right headers.
2. Use the real demo credentials (check `sample-app/README.md` if you don't remember
   them).
3. Assert the status is 200, then parse the body and assert it has a `token` field
   with a truthy value — you're checking the *shape* of a successful response, not
   any specific token string.

## Task 3 — `POST /api/login fails with wrong credentials`

**Question:** What does the same endpoint return for bad credentials, and how is
testing a failure case different from testing a success case?

**Approach:**

1. Same request pattern as Task 2, but with credentials you know are wrong.
2. Assert the status is 401, not 200 — an important habit: don't just check that the
   body "looks like an error," also check the status code reflects failure.
3. Assert the body has an `error` field.

## Task 4 — `creates and deletes a scratch user`

**Question:** `/api/users` is read by the Table page and by other exercises that
assert an exact row count — why would deleting a real seeded user here be a bad idea,
and what should you use instead?

**Approach:**

1. Think through what happens if this test permanently removed one of the 8 seeded
   users: any other test (in this file or another one, possibly running in parallel)
   that asserts `toHaveCount(8)` on the table could suddenly start failing depending
   on execution order — a classic shared-mutable-state hazard. The isolated
   `/api/scratch-users` collection exists precisely so CRUD practice doesn't touch
   data anything else depends on.
2. `POST` a new record to `/api/scratch-users` with a name/role/email of your
   choosing. Check the response status (a successful creation isn't a 200 — look up
   what status code REST conventions use for "resource created") and read the
   generated `id` out of the response body.
3. `GET /api/scratch-users/:id` using that id, and assert the returned data matches
   what you created.
4. `DELETE` it, then `GET` it again — assert this final read returns 404, proving the
   delete actually took effect rather than just returning a success status.

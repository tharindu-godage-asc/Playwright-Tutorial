# 10 — Network Mocking

Working file: `exercises/10-network-mocking/exercise.spec.ts`

## Task 1 — `mocks the user list with fixed data`

**Question:** How do you make the table show data you control, instead of whatever
the fake backend happens to return?

**Approach:**

1. There's a page method for intercepting requests matching a URL pattern. It takes
   a glob (or regex) and a handler function that decides how to respond.
2. Inside the handler, don't let the request continue to the real server — construct
   and send back your own response with a status, content type, and JSON body of
   your choosing.
3. Register the route interception **before** navigating to `/table` — if the page
   already made the request by the time you set up the route, mocking it is too
   late.
4. Assert the row count matches the number of users in your mock data, and that the
   row contains the name you chose.

## Task 2 — `simulates a server error and asserts the error state`

**Question:** How do you test what the UI does when the backend fails, without
actually being able to make the real backend fail on demand?

**Approach:**

1. Same route-interception pattern as Task 1, but respond with an error status
   instead of a success payload.
2. Look at `Table.tsx`'s fetch error handling to see what element appears when the
   request fails, and assert on that becoming visible.

## Task 3 — `waits for the real network response`

**Question:** Without any mocking, how do you know precisely when the real
`/api/users` request has completed, rather than relying on an assertion's own retry
loop?

**Approach:**

1. There's a page method that resolves once a response matching a URL pattern comes
   back. Pair it with the navigation in a `Promise.all`, the same "start listening
   before triggering" pattern from popups and downloads.
2. This is somewhat redundant with just using a web-first assertion (which would
   retry until the count is right regardless), but it's worth doing once to see the
   pattern — it becomes essential later, when you need to read something *from* the
   response itself (status, headers, body) rather than just knowing it happened.
3. Assert the row count once the response has resolved.

## Task 4 — `mocks a failed login without a real backend`

**Question:** How do you test the login form's error-handling path deterministically
(a specific error message, every time), without depending on the fake backend's
actual credential check?

**Approach:**

1. Mock the login endpoint the same way as Task 1, returning a 401 status and a JSON
   body with a specific `error` message of your choosing.
2. Fill in and submit the login form with any credentials — since the request is
   mocked, the actual values don't matter.
3. Assert the login page's error banner shows the exact message you put in the mock
   response, not the app's real "Invalid credentials" text. If your assertion shows
   the real text instead of your mocked one, that's a sign the route wasn't
   registered before the request fired.

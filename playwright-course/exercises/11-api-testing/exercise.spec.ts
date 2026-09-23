import { test, expect } from '@playwright/test'

test('GET /api/users returns 8 users', async ({ request }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // TODO: const res = await request.get('/api/users')
  // TODO: assert res.status() === 200
  // TODO: assert the parsed JSON body has length 8
})

test('POST /api/login succeeds with correct credentials', async ({ request }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // TODO: request.post('/api/login', { data: { username: 'student', password: 'playwright123' } })
  // TODO: assert status 200 and body has a token field
})

test('POST /api/login fails with wrong credentials', async ({ request }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // TODO: request.post('/api/login', { data: { username: 'wrong', password: 'wrong' } })
  // TODO: assert status 401 and body has an error field
})

test('creates and deletes a scratch user', async ({ request }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  // /api/users is shared with other exercises, so don't mutate it — use the
  // isolated /api/scratch-users sandbox for create/delete practice instead.

  // TODO: POST /api/scratch-users with { name, role, email }
  // TODO: assert status 201, remember the created id
  // TODO: GET /api/scratch-users/:id, assert 200 and the name matches
  // TODO: DELETE /api/scratch-users/:id
  // TODO: GET /api/scratch-users/:id again, assert 404
})

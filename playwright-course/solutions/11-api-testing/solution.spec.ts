import { test, expect } from '@playwright/test'

test('GET /api/users returns 8 users', async ({ request }) => {
  const res = await request.get('/api/users')
  expect(res.status()).toBe(200)

  const users = await res.json()
  expect(users).toHaveLength(8)
})

test('POST /api/login succeeds with correct credentials', async ({ request }) => {
  const res = await request.post('/api/login', {
    data: { username: 'student', password: 'playwright123' },
  })
  expect(res.status()).toBe(200)

  const body = await res.json()
  expect(body.token).toBeTruthy()
})

test('POST /api/login fails with wrong credentials', async ({ request }) => {
  const res = await request.post('/api/login', {
    data: { username: 'wrong', password: 'wrong' },
  })
  expect(res.status()).toBe(401)

  const body = await res.json()
  expect(body.error).toBeTruthy()
})

test('creates and deletes a scratch user', async ({ request }) => {
  const createRes = await request.post('/api/scratch-users', {
    data: { name: 'Temp Person', role: 'Tester', email: 'temp@example.com' },
  })
  expect(createRes.status()).toBe(201)
  const created = await createRes.json()
  expect(created.id).toBeTruthy()

  const getRes = await request.get(`/api/scratch-users/${created.id}`)
  expect(getRes.status()).toBe(200)
  expect((await getRes.json()).name).toBe('Temp Person')

  const deleteRes = await request.delete(`/api/scratch-users/${created.id}`)
  expect(deleteRes.status()).toBe(200)

  const getAfterDeleteRes = await request.get(`/api/scratch-users/${created.id}`)
  expect(getAfterDeleteRes.status()).toBe(404)
})

import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// In-memory "database" used by the fake /api/* endpoints below.
let users = [
  { id: 1, name: 'Ada Lovelace', role: 'Engineer', email: 'ada@example.com' },
  { id: 2, name: 'Grace Hopper', role: 'Admiral', email: 'grace@example.com' },
  { id: 3, name: 'Alan Turing', role: 'Researcher', email: 'alan@example.com' },
  { id: 4, name: 'Margaret Hamilton', role: 'Engineer', email: 'margaret@example.com' },
  { id: 5, name: 'Katherine Johnson', role: 'Mathematician', email: 'katherine@example.com' },
  { id: 6, name: 'Tim Berners-Lee', role: 'Engineer', email: 'tim@example.com' },
  { id: 7, name: 'Radia Perlman', role: 'Engineer', email: 'radia@example.com' },
  { id: 8, name: 'Hedy Lamarr', role: 'Inventor', email: 'hedy@example.com' },
]

// A separate, isolated collection for CRUD practice (create/delete), so tests that
// exercise it never affect the `users` list that other pages/exercises read counts
// from. Each test run should create its own records here rather than sharing them.
type ScratchUser = { id: number; name: string; role: string; email: string }
let scratchUsers: ScratchUser[] = []
let nextScratchId = 1

function readBody(req: import('http').IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => resolve(data))
  })
}

// A small hand-rolled "backend" so exercises can practice real network
// requests: page.route() interception, waitForResponse, mocking errors, etc.
function fakeApiPlugin(): Plugin {
  return {
    name: 'fake-api',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        const url = new URL(req.url ?? '/', 'http://localhost')

        // Simulated network latency so loading states are visible.
        await new Promise((r) => setTimeout(r, 400))

        if (url.pathname === '/users' && req.method === 'GET') {
          res.statusCode = 200
          res.end(JSON.stringify(users))
          return
        }

        if (url.pathname.startsWith('/users/') && req.method === 'DELETE') {
          const id = Number(url.pathname.split('/').pop())
          users = users.filter((u) => u.id !== id)
          res.statusCode = 200
          res.end(JSON.stringify({ ok: true }))
          return
        }

        if (url.pathname === '/scratch-users' && req.method === 'GET') {
          res.statusCode = 200
          res.end(JSON.stringify(scratchUsers))
          return
        }

        if (url.pathname === '/scratch-users' && req.method === 'POST') {
          const body = JSON.parse((await readBody(req)) || '{}')
          const created: ScratchUser = {
            id: nextScratchId++,
            name: body.name ?? 'Unnamed',
            role: body.role ?? 'Unknown',
            email: body.email ?? '',
          }
          scratchUsers.push(created)
          res.statusCode = 201
          res.end(JSON.stringify(created))
          return
        }

        if (url.pathname.startsWith('/scratch-users/') && req.method === 'GET') {
          const id = Number(url.pathname.split('/').pop())
          const found = scratchUsers.find((u) => u.id === id)
          if (!found) {
            res.statusCode = 404
            res.end(JSON.stringify({ error: 'Not found' }))
            return
          }
          res.statusCode = 200
          res.end(JSON.stringify(found))
          return
        }

        if (url.pathname.startsWith('/scratch-users/') && req.method === 'DELETE') {
          const id = Number(url.pathname.split('/').pop())
          const before = scratchUsers.length
          scratchUsers = scratchUsers.filter((u) => u.id !== id)
          res.statusCode = scratchUsers.length < before ? 200 : 404
          res.end(JSON.stringify({ ok: scratchUsers.length < before }))
          return
        }

        if (url.pathname === '/login' && req.method === 'POST') {
          const body = JSON.parse((await readBody(req)) || '{}')
          if (body.username === 'student' && body.password === 'playwright123') {
            res.statusCode = 200
            res.end(JSON.stringify({ token: 'demo-token-123', user: 'student' }))
          } else {
            res.statusCode = 401
            res.end(JSON.stringify({ error: 'Invalid credentials' }))
          }
          return
        }

        if (url.pathname === '/flaky' && req.method === 'GET') {
          // Fails ~40% of the time on purpose, to practice retries/toPass.
          if (Math.random() < 0.4) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Temporary failure, try again' }))
          } else {
            res.statusCode = 200
            res.end(JSON.stringify({ ok: true, message: 'Loaded successfully' }))
          }
          return
        }

        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), fakeApiPlugin()],
})

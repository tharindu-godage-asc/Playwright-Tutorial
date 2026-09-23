import { useEffect, useMemo, useState } from 'react'

type User = { id: number; name: string; role: string; email: string }
type SortKey = 'name' | 'role' | 'email'

export default function Table() {
  const [users, setUsers] = useState<User[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortAsc, setSortAsc] = useState(true)

  useEffect(() => {
    load()
  }, [])

  function load() {
    setUsers(null)
    setError(null)
    fetch('/api/users')
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.json()
      })
      .then(setUsers)
      .catch((err) => setError(err.message))
  }

  async function removeUser(id: number) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' })
    setUsers((prev) => prev?.filter((u) => u.id !== id) ?? null)
  }

  const rows = useMemo(() => {
    if (!users) return []
    const filtered = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    )
    const sorted = [...filtered].sort((a, b) => {
      const cmp = a[sortKey].localeCompare(b[sortKey])
      return sortAsc ? cmp : -cmp
    })
    return sorted
  }, [users, search, sortKey, sortAsc])

  function sortBy(key: SortKey) {
    if (key === sortKey) {
      setSortAsc((prev) => !prev)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  function exportCsv() {
    const header = 'name,role,email'
    const lines = rows.map((u) => `${u.name},${u.role},${u.email}`)
    const csv = [header, ...lines].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section>
      <h2>User Table</h2>
      <p>
        Data comes from a real network request to <code>/api/users</code> (see{' '}
        <code>vite.config.ts</code>), so this page is a good target for{' '}
        <code>page.route()</code>, <code>waitForResponse</code>, and loading-state assertions.
      </p>

      <div className="toolbar">
        <input
          data-testid="table-search"
          placeholder="Search by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button data-testid="table-reload" onClick={load}>
          Reload
        </button>
        <button data-testid="table-export" onClick={exportCsv} disabled={rows.length === 0}>
          Export CSV
        </button>
      </div>

      {users === null && !error && <p data-testid="table-loading">Loading users…</p>}
      {error && (
        <p role="alert" data-testid="table-error">
          Failed to load: {error}
        </p>
      )}

      {users !== null && (
        <table data-testid="user-table">
          <thead>
            <tr>
              <th>
                <button className="sort-btn" onClick={() => sortBy('name')} data-testid="sort-name">
                  Name {sortKey === 'name' ? (sortAsc ? '▲' : '▼') : ''}
                </button>
              </th>
              <th>
                <button className="sort-btn" onClick={() => sortBy('role')} data-testid="sort-role">
                  Role {sortKey === 'role' ? (sortAsc ? '▲' : '▼') : ''}
                </button>
              </th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id} data-testid="user-row">
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>{u.email}</td>
                <td>
                  <button
                    aria-label={`Remove ${u.name}`}
                    onClick={() => removeUser(u.id)}
                    data-testid="user-remove"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {users !== null && rows.length === 0 && <p data-testid="table-empty">No matching users.</p>}
    </section>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, isAuthenticated, logout } from '../auth'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }
    setUser(getUser())
  }, [navigate])

  if (!user) return null

  return (
    <section>
      <h2>Dashboard</h2>
      <p data-testid="welcome-message">Welcome, {user}! This is a protected route.</p>
      <p>
        It redirects to <code>/login</code> if there is no auth token in{' '}
        <code>localStorage</code> &mdash; useful for practicing Playwright's{' '}
        <code>storageState</code> feature to skip the login UI in later tests.
      </p>
      <button
        data-testid="logout-button"
        onClick={() => {
          logout()
          navigate('/login')
        }}
      >
        Log out
      </button>
    </section>
  )
}

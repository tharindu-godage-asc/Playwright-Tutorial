import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../auth'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Login failed')
        return
      }
      login(data.token, data.user)
      navigate('/dashboard')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section>
      <h2>Login</h2>
      <p>
        Demo credentials: <strong>student</strong> / <strong>playwright123</strong>
      </p>
      <form onSubmit={handleSubmit} aria-label="Login form">
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            data-testid="username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            data-testid="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <p role="alert" className="error-banner" data-testid="login-error">
            {error}
          </p>
        )}
        <button type="submit" disabled={submitting} data-testid="login-submit">
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </section>
  )
}

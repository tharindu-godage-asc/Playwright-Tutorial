import { NavLink, Outlet } from 'react-router-dom'

const links: Array<{ to: string; label: string }> = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Login' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/todos', label: 'Todos' },
  { to: '/table', label: 'Table' },
  { to: '/forms', label: 'Forms' },
  { to: '/dialogs', label: 'Dialogs' },
  { to: '/drag-drop', label: 'Drag & Drop' },
  { to: '/tabs', label: 'Tabs' },
  { to: '/iframe', label: 'Iframe' },
  { to: '/new-tab', label: 'New Tab' },
  { to: '/async', label: 'Async / Waiting' },
]

export default function Layout() {
  return (
    <div className="app-shell">
      <nav className="sidebar" aria-label="Main navigation">
        <h1 className="brand">Playwright Practice App</h1>
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className="content" data-testid="page-content">
        <Outlet />
      </main>
    </div>
  )
}

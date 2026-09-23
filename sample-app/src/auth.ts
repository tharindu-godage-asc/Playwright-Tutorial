const TOKEN_KEY = 'pw_demo_token'
const USER_KEY = 'pw_demo_user'

export function login(token: string, user: string) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, user)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getUser(): string | null {
  return localStorage.getItem(USER_KEY)
}

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}

import { useState } from 'react'

const SITE_AUTH_KEY = 'pak-gondes-site-auth'
const SITE_EMAIL = 'pengunjung@pakgondes.local'
const SITE_PASSWORD = 'Gondes2025!'

export function useSiteAuth() {
  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem(SITE_AUTH_KEY) === 'true'
  )

  function login(email, password) {
    if (email !== SITE_EMAIL || password !== SITE_PASSWORD) return false
    sessionStorage.setItem(SITE_AUTH_KEY, 'true')
    setAuthenticated(true)
    return true
  }

  function logout() {
    sessionStorage.removeItem(SITE_AUTH_KEY)
    setAuthenticated(false)
  }

  return { authenticated, login, logout }
}

export default function SiteLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    if (!onLogin(credentials.email, credentials.password)) {
      setError('Email atau kata sandi tidak sesuai.')
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form className="card p-4" style={{ maxWidth: 380, width: '100%' }} onSubmit={submit}>
        <h1 className="h4 text-danger text-center">Ayam Pak Gondesss</h1>
        <p className="text-center text-secondary">Masuk untuk membuka website</p>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Kata sandi"
          autoComplete="current-password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <button className="btn btn-danger" type="submit">Masuk</button>
      </form>
    </div>
  )
}
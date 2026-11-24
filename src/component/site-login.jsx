import { useState } from 'react'
import {
  authenticateSiteUser,
  clearSiteSession,
  readSiteSession,
  registerSiteUser,
  saveSiteSession,
} from './site-auth.js'

export function useSiteAuth() {
  const [user, setUser] = useState(readSiteSession)

  async function login(credentials) {
    const authenticatedUser = await authenticateSiteUser(credentials)
    if (!authenticatedUser) return false
    saveSiteSession(authenticatedUser)
    setUser(authenticatedUser)
    return true
  }

  async function register(details) {
    const registeredUser = await registerSiteUser(details)
    saveSiteSession(registeredUser)
    setUser(registeredUser)
  }

  function logout() {
    clearSiteSession()
    setUser(null)
  }

  return { authenticated: Boolean(user), user, login, register, logout }
}

export default function SiteLogin({ onLogin, onRegister }) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    setError('')
    try {
      if (isRegistering) {
        await onRegister(credentials)
      } else if (!await onLogin(credentials)) {
        setError('Email atau kata sandi tidak sesuai.')
      }
    } catch (authError) {
      setError(authError.message || 'Tidak dapat memproses akun. Coba lagi.')
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form className="card p-4" style={{ maxWidth: 380, width: '100%' }} onSubmit={submit}>
        <h1 className="h4 text-danger text-center">Ayam Pak Gondesss</h1>
        <p className="text-center text-secondary">{isRegistering ? 'Buat akun pengguna baru' : 'Masuk dengan akun pengguna'}</p>
        {isRegistering && (
          <input
            className="form-control mb-3"
            type="text"
            autoComplete="name"
            placeholder="Nama"
            aria-label="Nama"
            maxLength="100"
            value={credentials.name}
            onChange={(event) => setCredentials({ ...credentials, name: event.target.value })}
            required
          />
        )}
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          autoComplete="email"
          aria-label="Email"
          value={credentials.email}
          onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Kata sandi"
          autoComplete={isRegistering ? 'new-password' : 'current-password'}
          aria-label="Kata sandi"
          minLength={isRegistering ? 8 : undefined}
          value={credentials.password}
          onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
          required
        />
        {isRegistering && <small className="text-secondary mb-3">Kata sandi minimal 8 karakter.</small>}
        {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
        <button className="btn btn-danger" type="submit">{isRegistering ? 'Buat Akun' : 'Masuk'}</button>
        <button
          className="btn btn-link mt-2"
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering)
            setError('')
          }}
        >
          {isRegistering ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Buat akun'}
        </button>
      </form>
    </div>
  )
}
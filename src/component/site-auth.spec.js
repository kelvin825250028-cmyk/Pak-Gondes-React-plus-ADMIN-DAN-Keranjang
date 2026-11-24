import { webcrypto } from 'node:crypto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { authenticateSiteUser, registerSiteUser } from './site-auth.js'

describe('site user accounts', () => {
  let localStorageData

  beforeEach(() => {
    localStorageData = new Map()
    vi.stubGlobal('crypto', webcrypto)
    vi.stubGlobal('localStorage', {
      getItem: (key) => localStorageData.has(key) ? localStorageData.get(key) : null,
      setItem: (key, value) => localStorageData.set(key, value),
    })
  })

  afterEach(() => vi.unstubAllGlobals())

  it('registers a user and authenticates with the created email and password', async () => {
    const user = await registerSiteUser({
      name: '  Kelvin  ',
      email: '  Kelvin@example.com ',
      password: 'rahasia123',
    })

    expect(user).toEqual({ name: 'Kelvin', email: 'kelvin@example.com' })
    expect(await authenticateSiteUser({ email: 'KELVIN@example.com', password: 'rahasia123' })).toEqual(user)
    expect(await authenticateSiteUser({ email: 'kelvin@example.com', password: 'salah1234' })).toBeNull()
    expect(localStorageData.get('pak-gondes-site-users')).not.toContain('rahasia123')
  })

  it('rejects duplicate email addresses regardless of capitalization', async () => {
    await registerSiteUser({ name: 'Kelvin', email: 'kelvin@example.com', password: 'rahasia123' })

    await expect(registerSiteUser({
      name: 'Kelvin Lain',
      email: 'KELVIN@example.com',
      password: 'rahasia123',
    })).rejects.toThrow('Email sudah terdaftar')
  })

  it('requires a valid email and a password of at least eight characters', async () => {
    await expect(registerSiteUser({ name: 'Kelvin', email: 'bukan-email', password: 'rahasia123' }))
      .rejects.toThrow('email yang valid')
    await expect(registerSiteUser({ name: 'Kelvin', email: 'kelvin@example.com', password: '1234567' }))
      .rejects.toThrow('minimal 8 karakter')
  })
})

import { webcrypto } from 'node:crypto'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ADMIN_EMAIL, isValidAdminCredentials } from './admin-auth.js'

describe('admin credential verification', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('verifies the demo password against its salted PBKDF2 hash', async () => {
    vi.stubGlobal('crypto', webcrypto)

    await expect(isValidAdminCredentials({
      email: ADMIN_EMAIL,
      password: 'GondesDemo2025!',
    })).resolves.toBe(true)
    await expect(isValidAdminCredentials({
      email: ADMIN_EMAIL,
      password: 'incorrect-password',
    })).resolves.toBe(false)
  })

  it('rejects an incorrect admin email without deriving a password hash', async () => {
    const importKey = vi.fn()
    vi.stubGlobal('crypto', { subtle: { importKey } })

    await expect(isValidAdminCredentials({
      email: 'user@example.com',
      password: 'GondesDemo2025!',
    })).resolves.toBe(false)
    expect(importKey).not.toHaveBeenCalled()
  })
})

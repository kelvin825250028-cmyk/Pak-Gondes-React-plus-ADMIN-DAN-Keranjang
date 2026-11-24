export const ADMIN_EMAIL = 'admin@pakgondes.local'
export const AUTH_STORAGE_KEY = 'pakgondes_admin_authenticated'
const ADMIN_PASSWORD_SALT = 'd30e0af2642d90a40a0f97dfb675219a'
const ADMIN_PASSWORD_HASH = 'f53f49b92cc457e9dc6580fb9c78f251fcb26f1b95ff35edf8de1b95e8871c8b'
const PASSWORD_HASH_ITERATIONS = 600000

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{2}/g).map((byte) => Number.parseInt(byte, 16)))
}

function constantTimeEqual(left, right) {
  if (left.length !== right.length) return false
  let difference = 0
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }
  return difference === 0
}

export async function isValidAdminCredentials(credentials) {
  if (credentials?.email?.trim().toLocaleLowerCase('id-ID') !== ADMIN_EMAIL) return false
  if (typeof credentials.password !== 'string') return false

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(credentials.password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const result = await crypto.subtle.deriveBits({
    name: 'PBKDF2',
    hash: 'SHA-256',
    salt: hexToBytes(ADMIN_PASSWORD_SALT),
    iterations: PASSWORD_HASH_ITERATIONS,
  }, key, 256)
  const passwordHash = Array.from(new Uint8Array(result), (byte) => (
    byte.toString(16).padStart(2, '0')
  )).join('')

  return constantTimeEqual(passwordHash, ADMIN_PASSWORD_HASH)
}

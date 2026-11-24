export const SITE_USERS_STORAGE_KEY = 'pak-gondes-site-users'
const SITE_SESSION_KEY = 'pak-gondes-site-auth'
const PASSWORD_HASH_ITERATIONS = 120000

function readUsers() {
  const savedUsers = localStorage.getItem(SITE_USERS_STORAGE_KEY)
  if (savedUsers === null) return []

  const users = JSON.parse(savedUsers)
  if (!Array.isArray(users) || users.some((user) => (
    !user
    || typeof user.name !== 'string'
    || typeof user.email !== 'string'
    || typeof user.salt !== 'string'
    || typeof user.passwordHash !== 'string'
  ))) {
    throw new Error('Data akun tersimpan tidak valid.')
  }
  return users
}

function saveUsers(users) {
  localStorage.setItem(SITE_USERS_STORAGE_KEY, JSON.stringify(users))
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{2}/g).map((byte) => Number.parseInt(byte, 16)))
}

async function hashPassword(password, salt) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const hash = await crypto.subtle.deriveBits({
    name: 'PBKDF2',
    hash: 'SHA-256',
    salt,
    iterations: PASSWORD_HASH_ITERATIONS,
  }, key, 256)
  return bytesToHex(new Uint8Array(hash))
}

function passwordsMatch(left, right) {
  if (left.length !== right.length) return false
  let difference = 0
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }
  return difference === 0
}

export async function registerSiteUser({ name, email, password }) {
  const normalizedName = name.trim()
  const normalizedEmail = email.trim().toLocaleLowerCase('id-ID')
  if (!normalizedName || normalizedName.length > 100) {
    throw new Error('Nama wajib diisi dan maksimal 100 karakter.')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error('Masukkan alamat email yang valid.')
  }
  if (password.length < 8) {
    throw new Error('Kata sandi harus memiliki minimal 8 karakter.')
  }

  const users = readUsers()
  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error('Email sudah terdaftar. Silakan masuk.')
  }

  const salt = crypto.getRandomValues(new Uint8Array(16))
  const user = {
    name: normalizedName,
    email: normalizedEmail,
    salt: bytesToHex(salt),
    passwordHash: await hashPassword(password, salt),
    visits: 1,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  }
  saveUsers([...users, user])
  return { name: user.name, email: user.email }
}

export async function authenticateSiteUser({ email, password }) {
  const normalizedEmail = email.trim().toLocaleLowerCase('id-ID')
  const users = readUsers()
  const userIndex = users.findIndex((account) => account.email === normalizedEmail)
  if (userIndex === -1) return null
  const user = users[userIndex]

  const candidateHash = await hashPassword(password, hexToBytes(user.salt))
  if (!passwordsMatch(candidateHash, user.passwordHash)) return null
  const updatedUser = {
    ...user,
    visits: Number.isSafeInteger(user.visits) && user.visits >= 0 ? user.visits + 1 : 1,
    lastLogin: new Date().toISOString(),
  }
  users[userIndex] = updatedUser
  saveUsers(users)
  return { name: user.name, email: user.email }
}

export function readSiteVisitors() {
  return readUsers().map((user) => ({
    name: user.name,
    email: user.email,
    visits: Number.isSafeInteger(user.visits) && user.visits >= 0 ? user.visits : 0,
    status: 'Terdaftar',
  }))
}

export function readSiteSession() {
  const savedSession = sessionStorage.getItem(SITE_SESSION_KEY)
  if (savedSession === null) return null

  try {
    const user = JSON.parse(savedSession)
    if (typeof user?.name === 'string' && typeof user?.email === 'string') return user
    sessionStorage.removeItem(SITE_SESSION_KEY)
    return null
  } catch {
    sessionStorage.removeItem(SITE_SESSION_KEY)
    return null
  }
}

export function saveSiteSession(user) {
  sessionStorage.setItem(SITE_SESSION_KEY, JSON.stringify(user))
}

export function clearSiteSession() {
  sessionStorage.removeItem(SITE_SESSION_KEY)
}

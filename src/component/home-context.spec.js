import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  defaultHomeContent,
  readHomeContent,
  saveHomeContent,
  HOME_CONTENT_STORAGE_KEY,
} from './home-content.js'

describe('home content storage', () => {
  let storage

  beforeEach(() => {
    storage = new Map()
    vi.stubGlobal('localStorage', {
      getItem: (key) => storage.has(key) ? storage.get(key) : null,
      setItem: (key, value) => storage.set(key, value),
    })
  })

  afterEach(() => vi.unstubAllGlobals())

  it('returns defaults when no content is saved', () => {
    expect(readHomeContent()).toEqual(defaultHomeContent)
  })

  it('saves and reads editable hero content', () => {
    const content = { ...defaultHomeContent, badge: 'BARU', description: 'Deskripsi baru' }
    saveHomeContent(content)
    expect(storage.has(HOME_CONTENT_STORAGE_KEY)).toBe(true)
    expect(readHomeContent()).toEqual(content)
  })

  it('falls back to defaults for invalid saved content', () => {
    storage.set(HOME_CONTENT_STORAGE_KEY, JSON.stringify({ badge: 'Tidak lengkap' }))
    expect(readHomeContent()).toEqual(defaultHomeContent)
  })
})

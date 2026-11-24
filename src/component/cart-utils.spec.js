// Runtime validation coverage for: cart orders shared with the admin dashboard.
// Baris 2: penjelasan singkat untuk baris kode berikut.
import { afterEach, describe, expect, it, vi } from 'vitest'
// Baris 3: penjelasan singkat untuk baris kode berikut.
import { readOrders, saveOrders } from './cart-utils.js'
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 5: penjelasan singkat untuk baris kode berikut.
describe('order storage', () => {
// Baris 6: penjelasan singkat untuk baris kode berikut.
  const storage = new Map()
// Baris 7: penjelasan singkat untuk baris kode berikut.
  const localStorageMock = {
// Baris 8: penjelasan singkat untuk baris kode berikut.
    getItem: vi.fn((key) => storage.get(key) ?? null),
// Baris 9: penjelasan singkat untuk baris kode berikut.
    setItem: vi.fn((key, value) => storage.set(key, String(value))),
// Baris 10: penjelasan singkat untuk baris kode berikut.
    removeItem: vi.fn((key) => storage.delete(key)),
// Baris 11: penjelasan singkat untuk baris kode berikut.
    clear: vi.fn(() => storage.clear()),
// Baris 12: penjelasan singkat untuk baris kode berikut.
  }
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 14: penjelasan singkat untuk baris kode berikut.
  afterEach(() => {
// Baris 15: penjelasan singkat untuk baris kode berikut.
    storage.clear()
// Baris 16: penjelasan singkat untuk baris kode berikut.
    vi.stubGlobal('localStorage', localStorageMock)
// Baris 17: penjelasan singkat untuk baris kode berikut.
    vi.clearAllMocks()
// Baris 18: penjelasan singkat untuk baris kode berikut.
  })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 20: penjelasan singkat untuk baris kode berikut.
  it('saves orders so the admin dashboard can read them', () => {
// Baris 21: penjelasan singkat untuk baris kode berikut.
    vi.stubGlobal('localStorage', localStorageMock)
// Baris 22: penjelasan singkat untuk baris kode berikut.
    const orders = [{ id: 'PG-123', customer: 'Pengunjung', items: [], total: 0, status: 'Baru' }]
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 24: penjelasan singkat untuk baris kode berikut.
    saveOrders(orders)
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 26: penjelasan singkat untuk baris kode berikut.
    expect(readOrders()).toEqual(orders)
// Baris 27: penjelasan singkat untuk baris kode berikut.
  })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 29: penjelasan singkat untuk baris kode berikut.
  it('returns an empty list when there are no orders yet', () => {
// Baris 30: penjelasan singkat untuk baris kode berikut.
    vi.stubGlobal('localStorage', localStorageMock)
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 32: penjelasan singkat untuk baris kode berikut.
    expect(readOrders()).toEqual([])
// Baris 33: penjelasan singkat untuk baris kode berikut.
  })
// Baris 34: penjelasan singkat untuk baris kode berikut.
})
// Baris kosong: pemisah antardeklarasi atau blok kode.

// Runtime validation coverage for: Jakarta store opening hours.
// Baris 2: penjelasan singkat untuk baris kode berikut.
import { describe, expect, it } from 'vitest'
// Baris 3: penjelasan singkat untuk baris kode berikut.
import { isStoreOpen } from './business-hours.js'
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 5: penjelasan singkat untuk baris kode berikut.
describe('isStoreOpen', () => {
// Baris 6: penjelasan singkat untuk baris kode berikut.
  it('is closed before 10:00 WIB', () => {
// Baris 7: penjelasan singkat untuk baris kode berikut.
    expect(isStoreOpen(new Date('2026-11-09T02:59:00.000Z'))).toBe(false)
// Baris 8: penjelasan singkat untuk baris kode berikut.
  })
// Baris 10: penjelasan singkat untuk baris kode berikut.
  it('opens at 10:00 WIB', () => {
// Baris 11: penjelasan singkat untuk baris kode berikut.
    expect(isStoreOpen(new Date('2026-11-09T03:00:00.000Z'))).toBe(true)
// Baris 12: penjelasan singkat untuk baris kode berikut.
  })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 14: penjelasan singkat untuk baris kode berikut.
  it('stays open until 21:59 WIB', () => {
// Baris 15: penjelasan singkat untuk baris kode berikut.
    expect(isStoreOpen(new Date('2026-11-09T14:59:00.000Z'))).toBe(true)
// Baris 16: penjelasan singkat untuk baris kode berikut.
  })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 18: penjelasan singkat untuk baris kode berikut.
  it('closes at 22:00 WIB', () => {
// Baris 19: penjelasan singkat untuk baris kode berikut.
    expect(isStoreOpen(new Date('2026-11-09T15:00:00.000Z'))).toBe(false)
// Baris 20: penjelasan singkat untuk baris kode berikut.
  })
// Baris 21: penjelasan singkat untuk baris kode berikut.
})
// Baris kosong: pemisah antardeklarasi atau blok kode.

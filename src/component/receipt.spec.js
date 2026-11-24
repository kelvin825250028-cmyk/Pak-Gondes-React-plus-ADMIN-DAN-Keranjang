// Runtime validation coverage for: printable receipt content.
// Baris 2: penjelasan singkat untuk baris kode berikut.
import { describe, expect, it } from 'vitest'
// Baris 3: penjelasan singkat untuk baris kode berikut.
import { buildReceiptHtml } from './receipt.js'
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 5: penjelasan singkat untuk baris kode berikut.
describe('printable order receipt', () => {
// Baris 6: penjelasan singkat untuk baris kode berikut.
  it('includes customer, purchased items, quantities, and the total', () => {
// Baris 7: penjelasan singkat untuk baris kode berikut.
    const html = buildReceiptHtml({
// Baris 8: penjelasan singkat untuk baris kode berikut.
      id: 'PG-123',
// Baris 9: penjelasan singkat untuk baris kode berikut.
      createdAt: '2026-11-09T14:00:00.000Z',
// Baris 10: penjelasan singkat untuk baris kode berikut.
      customer: 'Budi Santoso',
// Baris 11: penjelasan singkat untuk baris kode berikut.
      phone: '081234567890',
// Baris 12: penjelasan singkat untuk baris kode berikut.
      service: 'Take Away',
// Baris 13: penjelasan singkat untuk baris kode berikut.
      notes: '',
// Baris 14: penjelasan singkat untuk baris kode berikut.
      items: [{ id: 'ayam', name: 'Nasi Ayam Geprek', price: 30000, quantity: 2 }],
// Baris 15: penjelasan singkat untuk baris kode berikut.
      total: 60000,
// Baris 16: penjelasan singkat untuk baris kode berikut.
    })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 18: penjelasan singkat untuk baris kode berikut.
    expect(html).toContain('Budi Santoso')
// Baris 19: penjelasan singkat untuk baris kode berikut.
    expect(html).toContain('Nasi Ayam Geprek')
// Baris 20: penjelasan singkat untuk baris kode berikut.
    expect(html).toContain('>2</td>')
// Baris 21: penjelasan singkat untuk baris kode berikut.
    expect(html).toMatch(/Rp\s*60\.000/)
// Baris 22: penjelasan singkat untuk baris kode berikut.
    expect(html).toContain('@media print')
// Baris 23: penjelasan singkat untuk baris kode berikut.
  })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 25: penjelasan singkat untuk baris kode berikut.
  it('escapes user-provided values in the printed document', () => {
// Baris 26: penjelasan singkat untuk baris kode berikut.
    const html = buildReceiptHtml({
// Baris 27: penjelasan singkat untuk baris kode berikut.
      id: 'PG-123',
// Baris 28: penjelasan singkat untuk baris kode berikut.
      createdAt: '2026-11-09T14:00:00.000Z',
// Baris 29: penjelasan singkat untuk baris kode berikut.
      customer: '<img src=x onerror=alert(1)>',
// Baris 30: penjelasan singkat untuk baris kode berikut.
      phone: '081234567890',
// Baris 31: penjelasan singkat untuk baris kode berikut.
      service: 'Take Away',
// Baris 32: penjelasan singkat untuk baris kode berikut.
      notes: '',
// Baris 33: penjelasan singkat untuk baris kode berikut.
      items: [{ id: 'ayam', name: '<script>alert(1)</script>', price: 30000, quantity: 1 }],
// Baris 34: penjelasan singkat untuk baris kode berikut.
      total: 30000,
// Baris 35: penjelasan singkat untuk baris kode berikut.
    })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 37: penjelasan singkat untuk baris kode berikut.
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
// Baris 38: penjelasan singkat untuk baris kode berikut.
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
// Baris 39: penjelasan singkat untuk baris kode berikut.
    expect(html).not.toContain('<script>alert(1)</script>')
// Baris 40: penjelasan singkat untuk baris kode berikut.
  })
// Baris 41: penjelasan singkat untuk baris kode berikut.
})
// Baris kosong: pemisah antardeklarasi atau blok kode.

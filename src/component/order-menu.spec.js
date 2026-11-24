// Runtime validation coverage for: category-specific contact form menu options.
// Baris 2: penjelasan singkat untuk baris kode berikut.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
// Baris 3: penjelasan singkat untuk baris kode berikut.
import { createContactOrder, getMenuByCategory, menuByCategory } from './order-menu.js'
// Baris 4: penjelasan singkat untuk baris kode berikut.
import { defaultMenuItems, saveMenu } from './menu-data.js'
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 6: penjelasan singkat untuk baris kode berikut.
describe('contact order menu categories', () => {
// Baris 7: penjelasan singkat untuk baris kode berikut.
  const storage = new Map()
// Baris 8: penjelasan singkat untuk baris kode berikut.
  const localStorageMock = {
// Baris 9: penjelasan singkat untuk baris kode berikut.
    getItem: vi.fn((key) => storage.get(key) ?? null),
// Baris 10: penjelasan singkat untuk baris kode berikut.
    setItem: vi.fn((key, value) => storage.set(key, String(value))),
// Baris 11: penjelasan singkat untuk baris kode berikut.
    removeItem: vi.fn((key) => storage.delete(key)),
// Baris 12: penjelasan singkat untuk baris kode berikut.
    clear: vi.fn(() => storage.clear()),
// Baris 13: penjelasan singkat untuk baris kode berikut.
  }
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 15: penjelasan singkat untuk baris kode berikut.
  beforeEach(() => {
// Baris 16: penjelasan singkat untuk baris kode berikut.
    vi.stubGlobal('localStorage', localStorageMock)
// Baris 17: penjelasan singkat untuk baris kode berikut.
  })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 19: penjelasan singkat untuk baris kode berikut.
  afterEach(() => {
// Baris 20: penjelasan singkat untuk baris kode berikut.
    storage.clear()
// Baris 21: penjelasan singkat untuk baris kode berikut.
    vi.unstubAllGlobals()
// Baris 22: penjelasan singkat untuk baris kode berikut.
    vi.clearAllMocks()
// Baris 23: penjelasan singkat untuk baris kode berikut.
  })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 25: penjelasan singkat untuk baris kode berikut.
  it('only offers rice meals in the Paket Nasi category', () => {
// Baris 26: penjelasan singkat untuk baris kode berikut.
    expect(menuByCategory['Paket Nasi']).toContain('Nasi Ayam Geprek Sambal Gondes')
// Baris 27: penjelasan singkat untuk baris kode berikut.
    expect(menuByCategory['Paket Nasi'].some((menu) => menu.includes('Indomie'))).toBe(false)
// Baris 28: penjelasan singkat untuk baris kode berikut.
    expect(menuByCategory['Paket Nasi'].some((menu) => menu.includes('Es Teh'))).toBe(false)
// Baris 29: penjelasan singkat untuk baris kode berikut.
  })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 31: penjelasan singkat untuk baris kode berikut.
  it('only offers drinks in the Aneka Minuman category', () => {
// Baris 32: penjelasan singkat untuk baris kode berikut.
    expect(menuByCategory['Aneka Minuman']).toContain('Es Teh Manis Jumbo')
// Baris 33: penjelasan singkat untuk baris kode berikut.
    expect(menuByCategory['Aneka Minuman'].some((menu) => menu.includes('Ayam'))).toBe(false)
// Baris 34: penjelasan singkat untuk baris kode berikut.
    expect(menuByCategory['Aneka Minuman'].some((menu) => menu.includes('Indomie'))).toBe(false)
// Baris 35: penjelasan singkat untuk baris kode berikut.
  })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 37: penjelasan singkat untuk baris kode berikut.
  it('creates a local order with the selected category and correct total', () => {
// Baris 38: penjelasan singkat untuk baris kode berikut.
    const order = createContactOrder({
// Baris 39: penjelasan singkat untuk baris kode berikut.
      category: 'Paket Nasi',
// Baris 40: penjelasan singkat untuk baris kode berikut.
      menu: 'Nasi Ayam Geprek Sambal Gondes',
// Baris 41: penjelasan singkat untuk baris kode berikut.
      customer: ' Budi Santoso ',
// Baris 42: penjelasan singkat untuk baris kode berikut.
      phone: ' 081234567890 ',
// Baris 43: penjelasan singkat untuk baris kode berikut.
      quantity: 2,
// Baris 44: penjelasan singkat untuk baris kode berikut.
      service: 'Take Away',
// Baris 45: penjelasan singkat untuk baris kode berikut.
      notes: ' Pedas level 3 ',
// Baris 46: penjelasan singkat untuk baris kode berikut.
    }, new Date('2026-11-09T14:00:00.000Z'))
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 48: penjelasan singkat untuk baris kode berikut.
    expect(order.category).toBe('Paket Nasi')
// Baris 49: penjelasan singkat untuk baris kode berikut.
    expect(order.items[0].name).toBe('Nasi Ayam Geprek Sambal Gondes')
// Baris 50: penjelasan singkat untuk baris kode berikut.
    expect(order.items[0].quantity).toBe(2)
// Baris 51: penjelasan singkat untuk baris kode berikut.
    expect(order.total).toBe(60000)
// Baris 52: penjelasan singkat untuk baris kode berikut.
    expect(order.customer).toBe('Budi Santoso')
// Baris 53: penjelasan singkat untuk baris kode berikut.
    expect(order.notes).toBe('Pedas level 3')
// Baris 54: penjelasan singkat untuk baris kode berikut.
    expect(order.status).toBe('Baru')
// Baris 55: penjelasan singkat untuk baris kode berikut.
  })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 57: penjelasan singkat untuk baris kode berikut.
  it('rejects a menu that does not belong to the selected category', () => {
// Baris 58: penjelasan singkat untuk baris kode berikut.
    expect(() => createContactOrder({
// Baris 59: penjelasan singkat untuk baris kode berikut.
      category: 'Paket Nasi',
// Baris 60: penjelasan singkat untuk baris kode berikut.
      menu: 'Es Teh Manis Jumbo',
// Baris 61: penjelasan singkat untuk baris kode berikut.
      customer: 'Budi Santoso',
// Baris 62: penjelasan singkat untuk baris kode berikut.
      phone: '081234567890',
// Baris 63: penjelasan singkat untuk baris kode berikut.
      quantity: 1,
// Baris 64: penjelasan singkat untuk baris kode berikut.
      service: 'Take Away',
// Baris 65: penjelasan singkat untuk baris kode berikut.
      notes: '',
// Baris 66: penjelasan singkat untuk baris kode berikut.
    })).toThrow('Menu tidak sesuai dengan kategori yang dipilih.')
// Baris 67: penjelasan singkat untuk baris kode berikut.
  })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 69: penjelasan singkat untuk baris kode berikut.
  it('uses newly saved menu items and prices when making website orders', () => {
// Baris 70: penjelasan singkat untuk baris kode berikut.
    const newMenu = {
// Baris 71: penjelasan singkat untuk baris kode berikut.
      id: 'menu-es-kopi-123',
// Baris 72: penjelasan singkat untuk baris kode berikut.
      category: 'Aneka Minuman',
// Baris 73: penjelasan singkat untuk baris kode berikut.
      name: 'Es Kopi Susu',
// Baris 74: penjelasan singkat untuk baris kode berikut.
      price: 15000,
// Baris 75: penjelasan singkat untuk baris kode berikut.
      description: 'Kopi susu dingin.',
// Baris 76: penjelasan singkat untuk baris kode berikut.
    }
// Baris 77: penjelasan singkat untuk baris kode berikut.
    saveMenu([...defaultMenuItems, newMenu])
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 79: penjelasan singkat untuk baris kode berikut.
    expect(getMenuByCategory()['Aneka Minuman']).toContain('Es Kopi Susu')
// Baris 80: penjelasan singkat untuk baris kode berikut.
    const order = createContactOrder({
// Baris 81: penjelasan singkat untuk baris kode berikut.
      category: 'Aneka Minuman',
// Baris 82: penjelasan singkat untuk baris kode berikut.
      menu: 'Es Kopi Susu',
// Baris 83: penjelasan singkat untuk baris kode berikut.
      customer: 'Nadia',
// Baris 84: penjelasan singkat untuk baris kode berikut.
      phone: '081234567890',
// Baris 85: penjelasan singkat untuk baris kode berikut.
      quantity: 2,
// Baris 86: penjelasan singkat untuk baris kode berikut.
      service: 'Take Away',
// Baris 87: penjelasan singkat untuk baris kode berikut.
      notes: '',
// Baris 88: penjelasan singkat untuk baris kode berikut.
    })
// Baris 89: penjelasan singkat untuk baris kode berikut.
    expect(order.items[0].price).toBe(15000)
// Baris 90: penjelasan singkat untuk baris kode berikut.
    expect(order.total).toBe(30000)
// Baris 91: penjelasan singkat untuk baris kode berikut.
  })
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 93: penjelasan singkat untuk baris kode berikut.
  it('lets the website order a package added from the dashboard catalog', () => {
// Baris 94: penjelasan singkat untuk baris kode berikut.
    const packageItem = {
// Baris 95: penjelasan singkat untuk baris kode berikut.
      id: 'menu-paket-hemat-123',
// Baris 96: penjelasan singkat untuk baris kode berikut.
      category: 'Paket Spesial',
// Baris 97: penjelasan singkat untuk baris kode berikut.
      name: 'Paket Hemat Berdua',
// Baris 98: penjelasan singkat untuk baris kode berikut.
      price: 50000,
// Baris 99: penjelasan singkat untuk baris kode berikut.
      description: 'Dua porsi ayam dan dua minuman.',
// Baris 100: penjelasan singkat untuk baris kode berikut.
    }
// Baris 101: penjelasan singkat untuk baris kode berikut.
    saveMenu([...defaultMenuItems, packageItem])
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 103: penjelasan singkat untuk baris kode berikut.
    expect(getMenuByCategory()['Paket Spesial']).toContain(packageItem.name)
// Baris 104: penjelasan singkat untuk baris kode berikut.
    const order = createContactOrder({
// Baris 105: penjelasan singkat untuk baris kode berikut.
      category: 'Paket Spesial',
// Baris 106: penjelasan singkat untuk baris kode berikut.
      menu: packageItem.name,
// Baris 107: penjelasan singkat untuk baris kode berikut.
      customer: 'Nadia',
// Baris 108: penjelasan singkat untuk baris kode berikut.
      phone: '081234567890',
// Baris 109: penjelasan singkat untuk baris kode berikut.
      quantity: 1,
// Baris 110: penjelasan singkat untuk baris kode berikut.
      service: 'Take Away',
// Baris 111: penjelasan singkat untuk baris kode berikut.
      notes: '',
// Baris 112: penjelasan singkat untuk baris kode berikut.
    })
// Baris 113: penjelasan singkat untuk baris kode berikut.
    expect(order.items[0].id).toBe(packageItem.id)
// Baris 114: penjelasan singkat untuk baris kode berikut.
    expect(order.total).toBe(50000)
// Baris 115: penjelasan singkat untuk baris kode berikut.
  })
// Baris 116: penjelasan singkat untuk baris kode berikut.
})
// Baris kosong: pemisah antardeklarasi atau blok kode.

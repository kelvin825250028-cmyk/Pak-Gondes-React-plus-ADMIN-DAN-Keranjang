/**
 * order-menu.js - logika pembuatan pesanan dari form Kontak & Pesanan (tanpa tampilan).
 */
// Baris 4: penjelasan singkat untuk baris kode berikut.
import { defaultMenuItems, groupMenuByCategory, readMenu } from './menu-data.js'
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Versi statis dari menu bawaan (tidak membaca localStorage). Dipakai terutama oleh unit test.
// Baris 7: penjelasan singkat untuk baris kode berikut.
export const menuByCategory = groupMenuByCategory(defaultMenuItems)
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Peta nama menu -> harga dari menu bawaan, dibuat dengan Object.fromEntries.
// Baris 10: penjelasan singkat untuk baris kode berikut.
export const menuPrices = Object.fromEntries(
// Baris 11: penjelasan singkat untuk baris kode berikut.
  defaultMenuItems.map((item) => [item.name, item.price]),
// Baris 12: penjelasan singkat untuk baris kode berikut.
)
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Versi dinamis: mengelompokkan menu yang sedang berlaku (dari localStorage, bisa berisi hasil edit admin).
// Baris 15: penjelasan singkat untuk baris kode berikut.
export function getMenuByCategory(items = readMenu()) {
// Baris 16: penjelasan singkat untuk baris kode berikut.
  return groupMenuByCategory(items)
// Baris 17: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Membuat OBJEK PESANAN dari form 'Kontak & Pesanan'. Fungsi murni (tanpa React) sehingga mudah dites.
// Parameter kedua 'createdAt' bisa diisi saat testing supaya hasil id & tanggal dapat diprediksi.
// Baris 21: penjelasan singkat untuk baris kode berikut.
export function createContactOrder({ category, menu, customer, phone, quantity, service, notes }, createdAt = new Date()) {
  // VALIDASI 1: jumlah harus bilangan bulat >= 1.
// Baris 23: penjelasan singkat untuk baris kode berikut.
  if (!Number.isInteger(quantity) || quantity < 1) {
// Baris 24: penjelasan singkat untuk baris kode berikut.
    throw new Error('Jumlah pesanan minimal satu.')
// Baris 25: penjelasan singkat untuk baris kode berikut.
  }
// Baris kosong: pemisah antardeklarasi atau blok kode.
  // VALIDASI 2: pastikan menu benar-benar ada DAN termasuk kategori yang dipilih. Harga diambil dari data menu,
  // BUKAN dari form, sehingga pelanggan tidak bisa memalsukan harga.
// Baris 29: penjelasan singkat untuk baris kode berikut.
  const selectedMenu = readMenu().find((item) => item.category === category && item.name === menu)
// Baris 30: penjelasan singkat untuk baris kode berikut.
  if (!selectedMenu) {
// Baris 31: penjelasan singkat untuk baris kode berikut.
    throw new Error('Menu tidak sesuai dengan kategori yang dipilih.')
// Baris 32: penjelasan singkat untuk baris kode berikut.
  }
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 34: penjelasan singkat untuk baris kode berikut.
  return {
    // Nomor pesanan unik berbasis waktu (milidetik).
// Baris 36: penjelasan singkat untuk baris kode berikut.
    id: `PG-${createdAt.getTime()}`,
    // trim() membuang spasi di awal/akhir teks input.
// Baris 38: penjelasan singkat untuk baris kode berikut.
    customer: customer.trim(),
// Baris 39: penjelasan singkat untuk baris kode berikut.
    phone: phone.trim(),
// Baris 40: penjelasan singkat untuk baris kode berikut.
    service,
// Baris 41: penjelasan singkat untuk baris kode berikut.
    notes: notes.trim(),
// Baris 42: penjelasan singkat untuk baris kode berikut.
    category,
    // Bentuk 'items' sama dengan pesanan dari keranjang (array), supaya admin dan struk bisa memakai kode yang sama untuk kedua sumber.
// Baris 44: penjelasan singkat untuk baris kode berikut.
    items: [{
// Baris 45: penjelasan singkat untuk baris kode berikut.
      id: selectedMenu.id,
// Baris 46: penjelasan singkat untuk baris kode berikut.
      name: selectedMenu.name,
// Baris 47: penjelasan singkat untuk baris kode berikut.
      price: selectedMenu.price,
// Baris 48: penjelasan singkat untuk baris kode berikut.
      quantity,
// Baris 49: penjelasan singkat untuk baris kode berikut.
    }],
// Baris 50: penjelasan singkat untuk baris kode berikut.
    total: selectedMenu.price * quantity,
    // Status awal pesanan. Admin dapat mengubahnya (Diproses, Selesai, dst).
// Baris 52: penjelasan singkat untuk baris kode berikut.
    status: 'Baru',
    // Waktu disimpan sebagai teks ISO (standar, aman dikonversi ke JSON dan kembali ke Date).
// Baris 54: penjelasan singkat untuk baris kode berikut.
    createdAt: createdAt.toISOString(),
// Baris 55: penjelasan singkat untuk baris kode berikut.
  }
// Baris 56: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.

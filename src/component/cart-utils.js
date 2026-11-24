/**
 * cart-utils.js - fungsi pembantu: baca/simpan pesanan di localStorage dan format Rupiah.
 * (Walau namanya 'cart', file ini juga dipakai oleh admin, kontak, dan struk.)
 */
// Kunci (nama) penyimpanan pesanan di localStorage. Ditulis sebagai konstanta agar tidak salah ketik.
// Baris 6: penjelasan singkat untuk baris kode berikut.
const ORDER_STORAGE_KEY = 'pakgondes_orders'
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Membaca daftar pesanan dari localStorage. localStorage hanya menyimpan TEKS, jadi hasilnya diubah dengan JSON.parse.
// '|| "[]"' = jika belum ada data (null), pakai array kosong.
// Baris 10: penjelasan singkat untuk baris kode berikut.
export function readOrders() {
// Baris 11: penjelasan singkat untuk baris kode berikut.
  return JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]')
// Baris 12: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Menyimpan daftar pesanan: array -> teks JSON (JSON.stringify) -> localStorage.
// Data ini hanya ada di browser yang sama; tidak ada server/database.
// Baris 16: penjelasan singkat untuk baris kode berikut.
export function saveOrders(orders) {
// Baris 17: penjelasan singkat untuk baris kode berikut.
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders))
// Baris 18: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Format angka ke Rupiah. Contoh: 30000 -> 'Rp 30.000'.
// Intl.NumberFormat bawaan browser, 'id-ID' = titik sebagai pemisah ribuan, maximumFractionDigits: 0 = tanpa koma.
// Baris 22: penjelasan singkat untuk baris kode berikut.
export function formatRupiah(amount) {
// Baris 23: penjelasan singkat untuk baris kode berikut.
  return new Intl.NumberFormat('id-ID', {
// Baris 24: penjelasan singkat untuk baris kode berikut.
    style: 'currency',
// Baris 25: penjelasan singkat untuk baris kode berikut.
    currency: 'IDR',
// Baris 26: penjelasan singkat untuk baris kode berikut.
    maximumFractionDigits: 0,
// Baris 27: penjelasan singkat untuk baris kode berikut.
  }).format(amount)
// Baris 28: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.

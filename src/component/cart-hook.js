/**
 * cart-hook.js - custom hook useCart() untuk membaca Context keranjang.
 */
// Baris 4: penjelasan singkat untuk baris kode berikut.
import { useContext } from 'react'
// Baris 5: penjelasan singkat untuk baris kode berikut.
import { CartContext } from './cart-context.js'
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Custom hook: jalan pintas untuk mengambil data keranjang. Pemakaian: const { items, addItem } = useCart().
// Baris 8: penjelasan singkat untuk baris kode berikut.
export function useCart() {
// Baris 9: penjelasan singkat untuk baris kode berikut.
  const cart = useContext(CartContext)
  // Pengaman: jika komponen dipakai di luar <CartProvider>, tampilkan pesan error yang jelas agar mudah menemukan kesalahan.
// Baris 11: penjelasan singkat untuk baris kode berikut.
  if (!cart) {
// Baris 12: penjelasan singkat untuk baris kode berikut.
    throw new Error('useCart harus digunakan di dalam CartProvider.')
// Baris 13: penjelasan singkat untuk baris kode berikut.
  }
// Baris 14: penjelasan singkat untuk baris kode berikut.
  return cart
// Baris 15: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.

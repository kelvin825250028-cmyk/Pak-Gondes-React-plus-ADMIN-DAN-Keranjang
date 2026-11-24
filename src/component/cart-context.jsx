/**
 * cart-context.jsx - CartProvider: pusat data & logika KERANJANG.
 * Menyediakan ke seluruh aplikasi: items, itemCount, total, addItem, updateQuantity, clearCart.
 * Alur data: tombol 'Tambah' (menu.jsx) -> addItem -> state items -> localStorage + badge navbar + halaman cart.
 */
import { useEffect, useState } from 'react'
import { CartContext } from './cart-context.js'
// Kunci penyimpanan keranjang di localStorage.
const CART_STORAGE_KEY = 'pakgondes_cart'

export function CartProvider({ children }) {
  // State daftar item keranjang. Bentuk tiap item: { id, name, price, quantity }.
  // useState(() => ...) = LAZY INITIALIZER: fungsi hanya dijalankan sekali saat pertama render, bukan di setiap render.
  // Isi awal dibaca dari localStorage sehingga keranjang tidak hilang walau halaman dimuat ulang atau pindah halaman.
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]'))

  // Setiap 'items' berubah (tambah/ubah/hapus), simpan otomatis ke localStorage. Inilah yang membuat keranjang persisten.
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // Menambah produk ke keranjang. Jika produk sudah ada -> quantity +1; jika belum -> masukkan baru dengan quantity 1.
  function addItem(product) {
    // Memakai bentuk FUNGSI (updater) agar selalu bekerja dari data terbaru, aman bila diklik cepat berkali-kali.
    setItems((currentItems) => {
      // Cari apakah produk dengan id yang sama sudah ada di keranjang.
      const existing = currentItems.find((item) => item.id === product.id)
      if (existing) {
        // State di React tidak boleh diubah langsung (immutable). map() membuat array BARU; item yang cocok disalin dengan
        // { ...item, quantity: +1 } (spread operator) sehingga React mendeteksi perubahan dan merender ulang.
        return currentItems.map((item) => (
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ))
      }
      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  // Mengubah jumlah item. ATURAN: jika quantity <= 0, item DIHAPUS dari keranjang (filter). Itulah sebabnya tombol 'Hapus' di cart.jsx cukup memanggil updateQuantity(id, 0).
  function updateQuantity(id, quantity) {
    setItems((currentItems) => (
      quantity > 0
        ? currentItems.map((item) => (item.id === id ? { ...item, quantity } : item))
        : currentItems.filter((item) => item.id !== id)
    ))
  }

  // Mengosongkan keranjang (dipanggil setelah pesanan berhasil dibuat).
  function clearCart() {
    setItems([])
  }

  // Total jumlah porsi (bukan jumlah jenis menu). Ditampilkan sebagai badge angka di navbar. reduce() = menjumlahkan semua quantity.
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  // Total harga = jumlah dari (harga x quantity) tiap item. Dihitung ulang tiap render (turunan dari items), jadi tidak perlu disimpan di state.
  const total = items.reduce((amount, item) => amount + item.price * item.quantity, 0)

  return (
    // Semua komponen anak dapat mengambil nilai di 'value' lewat useCart(). Ini cara berbagi data tanpa mengoper props berlapis-lapis (prop drilling).
    <CartContext.Provider value={{ items, itemCount, total, addItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

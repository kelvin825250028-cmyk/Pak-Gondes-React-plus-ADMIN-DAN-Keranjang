/**
 * cart-context.js - HANYA mendefinisikan objek Context keranjang.
 * Kenapa dipisah dari cart-context.jsx? Aturan lint React Fast Refresh: file yang mengekspor komponen sebaiknya
 * tidak mengekspor hal lain. Jadi Context (non-komponen) ditaruh di file .js tersendiri.
 * CATATAN: ada dua file 'cart-context' (.js dan .jsx). Keduanya BERBEDA fungsi; import selalu ditulis lengkap dengan ekstensinya.
 */
// Baris 7: penjelasan singkat untuk baris kode berikut.
import { createContext } from 'react'
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Membuat 'wadah' Context dengan nilai awal null. Nilai sebenarnya diisi oleh <CartProvider> di cart-context.jsx.
// Bila komponen memakai Context di luar Provider, nilainya tetap null (itu yang dideteksi cart-hook.js).
// Baris 11: penjelasan singkat untuk baris kode berikut.
export const CartContext = createContext(null)
// Baris kosong: pemisah antardeklarasi atau blok kode.

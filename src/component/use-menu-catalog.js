/**
 * use-menu-catalog.js - hook yang menjaga daftar menu SELALU sinkron dengan localStorage.
 */
// Baris 4: penjelasan singkat untuk baris kode berikut.
import { useEffect, useState } from 'react'
// Baris 5: penjelasan singkat untuk baris kode berikut.
import { MENU_STORAGE_KEY, readMenu } from './menu-data.js'
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Custom hook: memberi komponen daftar menu terbaru + fungsi untuk mengubahnya. Pemakaian: const [menuItems, setMenuItems] = useMenuCatalog().
// Baris 8: penjelasan singkat untuk baris kode berikut.
export default function useMenuCatalog() {
  // Lazy initializer: readMenu dijalankan sekali saat komponen pertama kali muncul (tanpa tanda kurung = fungsinya yang diberikan, bukan hasilnya).
// Baris 10: penjelasan singkat untuk baris kode berikut.
  const [menuItems, setMenuItems] = useState(readMenu)
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 12: penjelasan singkat untuk baris kode berikut.
  useEffect(() => {
    // Dipanggil saat localStorage diubah. event.key === null berarti seluruh localStorage dihapus (clear()).
// Baris 14: penjelasan singkat untuk baris kode berikut.
    function syncMenu(event) {
// Baris 15: penjelasan singkat untuk baris kode berikut.
      if (event.key === MENU_STORAGE_KEY || event.key === null) {
// Baris 16: penjelasan singkat untuk baris kode berikut.
        setMenuItems(readMenu())
// Baris 17: penjelasan singkat untuk baris kode berikut.
      }
// Baris 18: penjelasan singkat untuk baris kode berikut.
    }
// Baris kosong: pemisah antardeklarasi atau blok kode.
    // PENTING: event 'storage' HANYA terpicu di tab LAIN, bukan tab yang melakukan perubahan.
    // Jadi admin mengedit menu di satu tab -> tab website lain yang terbuka ikut ter-update otomatis.
// Baris 22: penjelasan singkat untuk baris kode berikut.
    window.addEventListener('storage', syncMenu)
    // Fungsi pembersih (cleanup): melepas listener saat komponen hilang, mencegah kebocoran memori dan listener ganda.
// Baris 24: penjelasan singkat untuk baris kode berikut.
    return () => window.removeEventListener('storage', syncMenu)
// Baris 25: penjelasan singkat untuk baris kode berikut.
  }, [])
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 27: penjelasan singkat untuk baris kode berikut.
  return [menuItems, setMenuItems]
// Baris 28: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.

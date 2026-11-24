/**
 * navigation.js - pembantu pembuat URL antar halaman.
 */
// Membuat URL ke sebuah halaman. Contoh: pageUrl('menu','minuman') -> '/?page=menu#minuman'.
// import.meta.env.BASE_URL otomatis berisi '/' (lokal) atau '/nama-repo/' (GitHub Pages), sesuai 'base' di vite.config.js.
// Selalu pakai fungsi ini, jangan menulis '?page=...' manual, agar link tidak patah setelah deploy.
// Baris 7: penjelasan singkat untuk baris kode berikut.
export function pageUrl(page, anchor = '') {
// Baris 8: penjelasan singkat untuk baris kode berikut.
  const url = `${import.meta.env.BASE_URL}?page=${page}`
  // Jika ada 'anchor', ditambahkan sebagai #id untuk melompat ke bagian tertentu di halaman (mis. #paket-nasi).
// Baris 10: penjelasan singkat untuk baris kode berikut.
  return anchor ? `${url}#${anchor}` : url
// Baris 11: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.

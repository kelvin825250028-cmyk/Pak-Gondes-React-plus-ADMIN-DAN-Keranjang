/**
 * menu-data.js - DATA dan aturan MENU (sumber utama seluruh daftar menu).
 * Semua halaman (beranda, menu, kontak, admin) membaca menu lewat file ini, sehingga perubahan dari admin langsung berlaku di mana-mana.
 */
// Kunci localStorage untuk menu yang diedit admin. Diekspor karena dipakai juga oleh use-menu-catalog.js.
// Baris 6: penjelasan singkat untuk baris kode berikut.
export const MENU_STORAGE_KEY = 'pakgondes_menu'
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Daftar kategori yang SAH. Dipakai untuk dropdown, validasi data, dan pengelompokan menu.
// Teks kategori harus sama persis di semua tempat, karena dipakai sebagai pembanding string.
// Baris 10: penjelasan singkat untuk baris kode berikut.
export const menuCategories = [
// Baris 11: penjelasan singkat untuk baris kode berikut.
  'Paket Spesial',
// Baris 12: penjelasan singkat untuk baris kode berikut.
  'Paket Nasi',
// Baris 13: penjelasan singkat untuk baris kode berikut.
  'Paket Indomie',
// Baris 14: penjelasan singkat untuk baris kode berikut.
  'Ala Carte & Cemilan',
// Baris 15: penjelasan singkat untuk baris kode berikut.
  'Aneka Minuman',
// Baris 16: penjelasan singkat untuk baris kode berikut.
]
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Label singkat kategori untuk tampilan tabel (mis. 'Ala Carte & Cemilan' ditampilkan 'Ala Carte').
// Baris 19: penjelasan singkat untuk baris kode berikut.
export const menuCategoryLabels = {
// Baris 20: penjelasan singkat untuk baris kode berikut.
  'Paket Spesial': 'Paket Spesial',
// Baris 21: penjelasan singkat untuk baris kode berikut.
  'Paket Nasi': 'Paket Nasi',
// Baris 22: penjelasan singkat untuk baris kode berikut.
  'Paket Indomie': 'Paket Indomie',
// Baris 23: penjelasan singkat untuk baris kode berikut.
  'Ala Carte & Cemilan': 'Ala Carte',
// Baris 24: penjelasan singkat untuk baris kode berikut.
  'Aneka Minuman': 'Minuman',
// Baris 25: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.
// DATA MENU BAWAAN (sumber kebenaran awal). Bentuk tiap menu:
// { id (unik), category, name, price (angka bulat Rupiah), description, image (opsional: nama file di src/images) }.
// Bila admin belum pernah mengubah menu, daftar inilah yang dipakai.
// Baris 30: penjelasan singkat untuk baris kode berikut.
export const defaultMenuItems = [
// Baris 31: penjelasan singkat untuk baris kode berikut.
  { id: 'nasi-ayam-geprek-sambal-gondes', category: 'Paket Nasi', name: 'Nasi Ayam Geprek Sambal Gondes', price: 30000, description: 'Nasi putih pulen, ayam crispy geprek berlumur sambal gondes ulek dadakan, lalapan segar.', image: 'geprek-gondes.jpg' },
// Baris 32: penjelasan singkat untuk baris kode berikut.
  { id: 'nasi-ayam-goreng-sambal-kampoeng', category: 'Paket Nasi', name: 'Nasi Ayam Goreng Sambal Kampoeng', price: 30000, description: 'Nasi + ayam goreng rempah gurih, taburan kremesan garing, sambal terasi matang khas Semarang.', image: 'sambal-kampoeng.jpg' },
// Baris 33: penjelasan singkat untuk baris kode berikut.
  { id: 'nasi-ayam-goreng-kalasan', category: 'Paket Nasi', name: 'Nasi Ayam Goreng Kalasan', price: 36000, description: 'Nasi + ayam goreng 1/4 ekor ungkep bumbu kalasan manis gurih, kremes, sambal & lalap.', image: 'kalasan.jpg' },
// Baris 34: penjelasan singkat untuk baris kode berikut.
  { id: 'nasi-ayam-geprek-mozarella-sambal-gondes', category: 'Paket Nasi', name: 'Nasi Ayam Geprek Mozarella Sambal Gondes', price: 38000, description: 'Nasi hangat, ayam geprek sambal gondes dengan lelehan keju mozarella berlimpah.', image: 'geprek-mozarella.jpg' },
// Baris 35: penjelasan singkat untuk baris kode berikut.
  { id: 'nasi-ayam-sambal-matah', category: 'Paket Nasi', name: 'Nasi Ayam Sambal Matah', price: 34000, description: 'Nasi putih dan ayam crispy dengan irisan bawang merah, serai, cabai rawit, minyak kelapa.', image: 'sambal-matah.jpg' },
// Baris 36: penjelasan singkat untuk baris kode berikut.
  { id: 'nasi-goreng-kampoeng', category: 'Paket Nasi', name: 'Nasi Goreng Kampoeng', price: 29000, description: 'Nasi goreng aroma wajan rempah tradisional, suwiran ayam, pilihan telur ceplok/dadar.', image: 'nasi-goreng.jpg' },
// Baris 37: penjelasan singkat untuk baris kode berikut.
  { id: 'indomie-ayam-geprek-sambal-gondes', category: 'Paket Indomie', name: 'Indomie Ayam Geprek Sambal Gondes', price: 25000, description: 'Indomie goreng atau kuah bersama 1 potong ayam geprek berlumur sambal.', image: 'indomie.jpg' },
// Baris 38: penjelasan singkat untuk baris kode berikut.
  { id: 'indomie-telor-ceplok-dadar', category: 'Paket Indomie', name: 'Indomie Telor Ceplok / Dadar', price: 18000, description: 'Indomie goreng / kuah dengan sawi hijau segar dan telur ceplok atau dadar.' },
// Baris 39: penjelasan singkat untuk baris kode berikut.
  { id: 'indomie-saja', category: 'Paket Indomie', name: 'Indomie Saja', price: 12000, description: 'Indomie goreng atau kuah dengan sentuhan sambal cabai geprek khas Pak Gondesss.' },
// Baris 40: penjelasan singkat untuk baris kode berikut.
  { id: 'indomie-ayam-geprek-mozzarella-sambal-gondes', category: 'Paket Indomie', name: 'Indomie Ayam Geprek Mozzarella Sambal Gondes', price: 39000, description: 'Indomie goreng, ayam geprek pedas, dan lelehan keju mozzarella legit.' },
// Baris 41: penjelasan singkat untuk baris kode berikut.
  { id: 'ayam-geprek-sambal-gondes', category: 'Ala Carte & Cemilan', name: 'Ayam Geprek Sambal Gondes', price: 25000, description: '1 porsi ayam geprek gurih garing tanpa nasi, level pedas 1 sampai 5.' },
// Baris 42: penjelasan singkat untuk baris kode berikut.
  { id: 'ayam-goreng-sambal-kampoeng', category: 'Ala Carte & Cemilan', name: 'Ayam Goreng Sambal Kampoeng', price: 25000, description: '1 potong ayam goreng bumbu kuning dengan kremes dan sambal kampoeng.' },
// Baris 43: penjelasan singkat untuk baris kode berikut.
  { id: 'ayam-goreng-kalasan', category: 'Ala Carte & Cemilan', name: 'Ayam Goreng Kalasan', price: 32000, description: 'Ayam 1/4 ekor ungkep santan gula jawa, gurih manis empuk sampai ke tulang.' },
// Baris 44: penjelasan singkat untuk baris kode berikut.
  { id: 'terong-crispy-geprek', category: 'Ala Carte & Cemilan', name: 'Terong Crispy Geprek', price: 12000, description: 'Irisan terong berlapis tepung renyah digeprek dengan cabai rawit merah.' },
// Baris 45: penjelasan singkat untuk baris kode berikut.
  { id: 'jamur-crispy', category: 'Ala Carte & Cemilan', name: 'Jamur Crispy', price: 13000, description: 'Jamur tiram segar dibalut tepung berbumbu, digoreng kering renyah.' },
// Baris 46: penjelasan singkat untuk baris kode berikut.
  { id: 'telor-ceplok-dadar', category: 'Ala Carte & Cemilan', name: 'Telor Ceplok / Dadar', price: 8000, description: 'Telur ayam negeri, ceplok (mata sapi) atau dadar daun bawang.' },
// Baris 47: penjelasan singkat untuk baris kode berikut.
  { id: 'nasi-putih-pulen', category: 'Ala Carte & Cemilan', name: 'Nasi Putih Pulen', price: 8000, description: 'Nasi putih hangat dari beras premium, porsi melimpah.' },
// Baris 48: penjelasan singkat untuk baris kode berikut.
  { id: 'krupuk-gendar-kerung', category: 'Ala Carte & Cemilan', name: 'Krupuk Gendar / Kerung', price: 3000, description: 'Kerupuk tradisional khas Jawa Tengah dari beras, renyah dan gurih.' },
// Baris 49: penjelasan singkat untuk baris kode berikut.
  { id: 'es-teh-manis-jumbo', category: 'Aneka Minuman', name: 'Es Teh Manis Jumbo', price: 6000, description: 'Teh melati wangi dengan gula pasir murni, disajikan dingin.', image: 'es-teh.jpg' },
// Baris 50: penjelasan singkat untuk baris kode berikut.
  { id: 'nutrisari-jeruk', category: 'Aneka Minuman', name: 'Nutrisari Jeruk', price: 8000, description: 'Nutrisari rasa jeruk peras dingin.' },
// Baris 51: penjelasan singkat untuk baris kode berikut.
  { id: 'es-milo', category: 'Aneka Minuman', name: 'Es Milo', price: 12000, description: 'Susu malt cokelat Milo kental, disajikan dingin.' },
// Baris 52: penjelasan singkat untuk baris kode berikut.
  { id: 'air-mineral-botol-600ml', category: 'Aneka Minuman', name: 'Air Mineral Botol 600ml', price: 5000, description: 'Air mineral kemasan praktis (tersedia dingin dan suhu ruang).' },
// Baris 53: penjelasan singkat untuk baris kode berikut.
]
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Membaca menu: pakai data admin di localStorage jika ada, kalau belum ada pakai defaultMenuItems.
// Baris 56: penjelasan singkat untuk baris kode berikut.
export function readMenu() {
// Baris 57: penjelasan singkat untuk baris kode berikut.
  const savedMenu = localStorage.getItem(MENU_STORAGE_KEY)
  // null = belum pernah disimpan -> pakai menu bawaan.
// Baris 59: penjelasan singkat untuk baris kode berikut.
  if (savedMenu === null) return defaultMenuItems
// Baris kosong: pemisah antardeklarasi atau blok kode.
  // Data dari localStorage tidak boleh dipercaya begitu saja (bisa rusak atau diedit manual lewat DevTools).
// Baris 62: penjelasan singkat untuk baris kode berikut.
  const items = JSON.parse(savedMenu)
  // VALIDASI struktur data: harus array dan tiap item punya id/name (teks), category yang sah, price bilangan bulat >= 0, description (teks).
  // PERHATIAN: bila data tidak valid, fungsi melempar error; di aplikasi ini error tersebut bisa membuat halaman gagal tampil.
  // Jika itu terjadi saat latihan, hapus kunci 'pakgondes_menu' di DevTools > Application > Local Storage.
// Baris 66: penjelasan singkat untuk baris kode berikut.
  if (!Array.isArray(items) || items.some((item) => (
// Baris 67: penjelasan singkat untuk baris kode berikut.
    !item
// Baris 68: penjelasan singkat untuk baris kode berikut.
    || typeof item.id !== 'string'
// Baris 69: penjelasan singkat untuk baris kode berikut.
    || typeof item.name !== 'string'
// Baris 70: penjelasan singkat untuk baris kode berikut.
    || !menuCategories.includes(item.category)
// Baris 71: penjelasan singkat untuk baris kode berikut.
    || !Number.isInteger(item.price)
// Baris 72: penjelasan singkat untuk baris kode berikut.
    || item.price < 0
// Baris 73: penjelasan singkat untuk baris kode berikut.
    || typeof item.description !== 'string'
// Baris 74: penjelasan singkat untuk baris kode berikut.
  ))) {
// Baris 75: penjelasan singkat untuk baris kode berikut.
    throw new Error('Data menu tersimpan tidak valid.')
// Baris 76: penjelasan singkat untuk baris kode berikut.
  }
// Baris 77: penjelasan singkat untuk baris kode berikut.
  return items
// Baris 78: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Menyimpan menu ke localStorage (dipanggil dari halaman admin).
// Baris 81: penjelasan singkat untuk baris kode berikut.
export function saveMenu(items) {
// Baris 82: penjelasan singkat untuk baris kode berikut.
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items))
// Baris 83: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Mengelompokkan menu: { 'Paket Nasi': ['Nasi A', 'Nasi B'], ... }. Hanya nama menu yang disimpan; dipakai untuk dropdown bertingkat di form pesan.
// Baris 86: penjelasan singkat untuk baris kode berikut.
export function groupMenuByCategory(items) {
// Baris 87: penjelasan singkat untuk baris kode berikut.
  return Object.fromEntries(menuCategories.map((category) => [
// Baris 88: penjelasan singkat untuk baris kode berikut.
    category,
// Baris 89: penjelasan singkat untuk baris kode berikut.
    items.filter((item) => item.category === category).map((item) => item.name),
// Baris 90: penjelasan singkat untuk baris kode berikut.
  ]))
// Baris 91: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Membuat id unik untuk menu baru dari namanya. Langkah: huruf kecil -> hapus aksen (normalize NFD) -> ganti simbol dengan '-' ->
// tambah waktu (Date.now) dan angka acak agar id tidak pernah bentrok. Contoh hasil: 'menu-es-jeruk-lx3k9a-f4d2qz'.
// Baris 95: penjelasan singkat untuk baris kode berikut.
export function createMenuId(name) {
// Baris 96: penjelasan singkat untuk baris kode berikut.
  const slug = name.toLocaleLowerCase('id-ID')
// Baris 97: penjelasan singkat untuk baris kode berikut.
    .normalize('NFD')
// Baris 98: penjelasan singkat untuk baris kode berikut.
    .replace(/[\u0300-\u036f]/g, '')
// Baris 99: penjelasan singkat untuk baris kode berikut.
    .replace(/[^a-z0-9]+/g, '-')
// Baris 100: penjelasan singkat untuk baris kode berikut.
    .replace(/^-|-$/g, '')
// Baris 101: penjelasan singkat untuk baris kode berikut.
  return `menu-${slug}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
// Baris 102: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.

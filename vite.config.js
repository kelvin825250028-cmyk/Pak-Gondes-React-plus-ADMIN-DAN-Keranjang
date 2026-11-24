/**
 * vite.config.js - konfigurasi build tool Vite.
 * Vite = dev server cepat + bundler. Dijalankan lewat 'npm run dev' (pengembangan) dan 'npm run build' (produksi).
 */
// Baris 5: penjelasan singkat untuk baris kode berikut.
import react from '@vitejs/plugin-react'
// Baris 6: penjelasan singkat untuk baris kode berikut.
import { defineConfig } from 'vite'
// Baris kosong: pemisah antardeklarasi atau blok kode.
// https://vite.dev/config/
// Baris 9: penjelasan singkat untuk baris kode berikut.
export default defineConfig({
  // Plugin React: mengaktifkan transformasi JSX dan Fast Refresh (halaman ter-update otomatis saat kode disimpan).
// Baris 11: penjelasan singkat untuk baris kode berikut.
  plugins: [react()],
  // PENTING: 'base' = awalan URL tempat situs dihosting.
  // Di GitHub Pages situs berada di sub-folder (/nama-repo/), bukan di root, jadi saat build oleh GitHub Actions
  // base harus berisi nama repo. Di komputer lokal (npm run dev) base cukup '/'.
  // Nilai ini juga dibaca di kode lewat import.meta.env.BASE_URL (lihat navigation.js).
// Baris 16: penjelasan singkat untuk baris kode berikut.
  base: process.env.GITHUB_ACTIONS === 'true'
// Baris 17: penjelasan singkat untuk baris kode berikut.
    ? '/Pak-Gondes-React-plus-ADMIN-DAN-Keranjang/'
// Baris 18: penjelasan singkat untuk baris kode berikut.
    : '/',
// Baris 19: penjelasan singkat untuk baris kode berikut.
})
// Baris kosong: pemisah antardeklarasi atau blok kode.

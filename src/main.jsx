/**
 * main.jsx - titik masuk (entry point) aplikasi React.
 * Alur: index.html -> main.jsx -> App.jsx -> halaman yang dipilih.
 */
// CSS Bootstrap + ikon diimpor SEKALI di sini agar berlaku untuk seluruh halaman.
// Urutan penting: Bootstrap dulu, baru CSS milik sendiri (index.css, style.css) supaya CSS kita bisa menimpa gaya bawaan Bootstrap.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// JavaScript Bootstrap (bundle sudah termasuk Popper). Dibutuhkan oleh komponen interaktif yang memakai atribut data-bs-*,
// misalnya dropdown menu di navbar dan modal foto (data-bs-toggle="modal").
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './style.css'
import App from './App.jsx'

// TITIK MASUK REACT: mengambil <div id="root"> dari index.html lalu merender <App /> ke dalamnya.
createRoot(document.getElementById('root')).render(
  // StrictMode hanya aktif saat development: React sengaja menjalankan beberapa fungsi dua kali untuk membantu menemukan bug.
  // Tidak berpengaruh pada hasil build produksi.
  <StrictMode>
    <App />
  </StrictMode>,
)

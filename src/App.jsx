/**
 * App.jsx - komponen utama: ROUTER sederhana berbasis query string.
 * Contoh URL: /?page=menu, /?page=cart, /?page=admin.
 * Setiap pindah halaman = browser memuat ulang halaman (link biasa <a href>), bukan navigasi di dalam React.
 * Karena itu state React hilang saat pindah halaman; itulah sebabnya keranjang disimpan di localStorage.
 */
import { useEffect } from 'react'
import Beranda from './component/beranda.jsx'
import KontakPesan from './component/kontak_pesan.jsx'
import Menu from './component/menu.jsx'
import Tentang from './component/tentang.jsx'
import { SiteLayout } from './component/index.jsx'
import Cart from './component/cart.jsx'
import Admin from './component/admin.jsx'
import { CartProvider } from './component/cart-context.jsx'
import SiteLogin, { useSiteAuth } from './component/site-login.jsx'

// PETA HALAMAN (routing sederhana, tanpa library react-router).
// Key = nilai parameter ?page=... di URL. Value = judul tab browser + komponen yang dirender.
// Untuk menambah halaman baru: buat komponennya, import, lalu tambahkan satu baris di objek ini.
const pages = {
  beranda: { title: 'Beranda', component: Beranda },
  menu: { title: 'Daftar Menu', component: Menu },
  tentang: { title: 'Tentang Kami', component: Tentang },
  kontak: { title: 'Kontak & Pesanan', component: KontakPesan },
  cart: { title: 'Keranjang Belanja', component: Cart },
  admin: { title: 'Admin Panel', component: Admin },
}

// Komponen akar. Tugasnya: membaca URL, memilih halaman, lalu membungkusnya dengan Provider keranjang dan layout.
function App() {
  // Membaca parameter 'page' dari URL, contoh: /?page=menu -> 'menu'. Hasilnya null jika parameter tidak ada.
  const requestedPage = new URLSearchParams(window.location.search).get('page')
  // VALIDASI: bila parameter kosong atau tidak dikenal (mis. ?page=ngawur), kembali ke 'beranda'.
  // Tanpa pengecekan ini, pages[...] bernilai undefined dan aplikasi akan error.
  const page = pages[requestedPage] ? requestedPage : 'beranda'
  // Destructuring + rename: 'component' diganti nama 'Page' (huruf awal KAPITAL wajib agar JSX <Page /> dikenali sebagai komponen).
  const { title, component: Page } = pages[page]

  // Efek samping: mengubah judul tab browser setiap kali halaman berganti.
  // Array dependensi [title] artinya efek hanya dijalankan ulang jika 'title' berubah.
  useEffect(() => {
    document.title = `${title} | Ayam Pak Gondesss`
  }, [title])
  const { authenticated, login } = useSiteAuth()

if (!authenticated) {
  return <SiteLogin onLogin={login} />
}

  return (
    // CartProvider membungkus SEMUA halaman sehingga data keranjang bisa diakses dari komponen mana pun lewat useCart().
    <CartProvider>
      {/*
        Halaman admin memakai layout AdminLTE sendiri, sehingga TIDAK dibungkus SiteLayout (navbar + footer situs publik).
        Halaman lain dibungkus SiteLayout. 'activePage' dipakai untuk menandai menu navbar yang sedang aktif.
      */}
      {page === 'admin' ? (
        <Page />
      ) : (
        // Children (<Page />) akan muncul di dalam <main> pada SiteLayout.
        <SiteLayout activePage={page}>
          <Page />
        </SiteLayout>
      )}
    </CartProvider>
  )
}

export default App

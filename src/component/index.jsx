/**
 * index.jsx - LAYOUT situs (SiteLayout) + pembantu aset (imageUrl, videoUrl).
 * Semua halaman publik dirender di dalam SiteLayout sehingga navbar dan footer konsisten.
 */
import { useEffect, useState } from 'react'
import { useCart } from './cart-hook.js'
import { isStoreOpen } from './business-hours.js'
// pageUrl dibuat di navigation.js (bebas React); file ini hanya mengekspornya ulang agar komponen lain boleh mengimpor dari './index.jsx'.
import { pageUrl } from './navigation.js'
export { pageUrl } from './navigation.js'

// import.meta.glob (fitur Vite): memuat SEMUA file di src/images sekaligus saat build. Hasilnya objek { path: url }.
// Url-nya sudah diberi hash oleh Vite sehingga cache browser aman. 'eager: true' = langsung dimuat, bukan nanti.
const images = import.meta.glob('../images/*', {
  eager: true,
  import: 'default',
  query: '?url',
})

// Sama seperti di atas, untuk folder src/videos.
const videos = import.meta.glob('../videos/*', {
  eager: true,
  import: 'default',
  query: '?url',
})

// Mengubah nama file ('hero.jpg') menjadi URL gambar yang valid. Pemakaian: <img src={imageUrl('hero.jpg')} />.
// Bila nama file salah, hasilnya undefined dan gambar tidak tampil: periksa ejaan nama file.
export function imageUrl(fileName) {
  return images[`../images/${fileName}`]
}

// Sama seperti imageUrl, untuk video.
export function videoUrl(fileName) {
  return videos[`../videos/${fileName}`]
}

// LAYOUT situs publik: status bar, navbar, isi halaman ({children}), dan footer. Dipakai semua halaman kecuali admin.
export function SiteLayout({ activePage, children, userName, onLogout }) {
  // Mengambil jumlah item dari keranjang untuk badge di navbar.
  const { itemCount } = useCart()
  // State status buka/tutup. Nilai awal memanggil isStoreOpen (lazy initializer).
  const [storeOpen, setStoreOpen] = useState(isStoreOpen)

  // Timer: cek ulang status buka/tutup setiap 60 detik (60_000 ms) agar status berubah sendiri tanpa memuat ulang halaman.
  useEffect(() => {
    const timer = window.setInterval(() => setStoreOpen(isStoreOpen()), 60_000)
    // Cleanup: hentikan timer saat komponen dilepas, agar tidak menumpuk.
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      {/* Bar status paling atas. Kelas 'is-open' / 'is-closed' (lihat style.css) mengubah warnanya. role="status" memberi tahu screen reader. */}
      <div className={`store-status-bar text-center text-light py-2 small ${storeOpen ? 'is-open' : 'is-closed'}`} role="status">
        <strong>{storeOpen ? 'BUKA' : 'TUTUP'}</strong>
        {' '}&bull; Setiap hari 10.00 - 22.00 WIB &bull; WA 0812-3456-7890 &bull;
        Grogol, Jakarta Barat
      </div>
      {/* NAVBAR. 'sticky-top' membuatnya menempel di atas saat halaman digulir. */}
      <header className="site-header sticky-top bg-white">
        <div className="container d-flex align-items-center justify-content-between gap-3 flex-wrap py-3">
          <a className="text-decoration-none" href={pageUrl('beranda')}>
            <strong className="d-block text-danger fs-5">Ayam Pak Gondesss</strong>
            <small className="text-secondary">KHAS GROGOL PEDAS NIKMAT</small>
          </a>
          {/* Menu navigasi. Tiap link memakai pageUrl(); halaman aktif diberi warna merah (text-danger) dan aria-current="page" untuk aksesibilitas. */}
          <nav
            id="nav"
            className="d-flex align-items-center gap-3 flex-wrap fw-semibold"
            aria-label="Navigasi utama"
          >
            <a
              href={pageUrl('beranda')}
              className={`nav-link p-0 ${activePage === 'beranda' ? 'text-danger' : ''}`}
              aria-current={activePage === 'beranda' ? 'page' : undefined}
            >
              Beranda
            </a>
            {/* Dropdown 'Menu' memakai Bootstrap JS (data-bs-toggle="dropdown"), tanpa state React. Item-nya melompat ke bagian halaman menu lewat anchor (#paket-nasi dst). */}
            <div className="dropdown">
              <button
                className={`nav-link dropdown-toggle p-0 border-0 bg-transparent ${activePage === 'menu' ? 'text-danger' : ''}`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menu
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href={pageUrl('menu')}>Semua Menu</a></li>
                <li><a className="dropdown-item" href={pageUrl('menu', 'paket-nasi')}>Paket Nasi</a></li>
                <li><a className="dropdown-item" href={pageUrl('menu', 'paket-indomie')}>Paket Indomie</a></li>
                <li><a className="dropdown-item" href={pageUrl('menu', 'ala-carte')}>Ala Carte</a></li>
                <li><a className="dropdown-item" href={pageUrl('menu', 'minuman')}>Minuman</a></li>
              </ul>
            </div>
            <a
              href={pageUrl('tentang')}
              className={`nav-link p-0 ${activePage === 'tentang' ? 'text-danger' : ''}`}
              aria-current={activePage === 'tentang' ? 'page' : undefined}
            >
              Tentang Kami
            </a>
            <a
              href={pageUrl('kontak')}
              className={`nav-link p-0 ${activePage === 'kontak' ? 'text-danger' : ''}`}
              aria-current={activePage === 'kontak' ? 'page' : undefined}
            >
              Kontak
            </a>
            <a
              href={pageUrl('cart')}
              className={`nav-link p-0 ${activePage === 'cart' ? 'text-danger' : ''}`}
              aria-current={activePage === 'cart' ? 'page' : undefined}
            >
              <i className="bi bi-basket3 me-1" aria-hidden="true" />
              Keranjang <span className="badge rounded-pill bg-danger">{itemCount}</span>
            </a>
            <a href={pageUrl('admin')} className={`nav-link p-0 ${activePage === 'admin' ? 'text-danger' : ''}`}>
              Admin
            </a>
          </nav>
          <a className="btn btn-danger" href={pageUrl('cart')} aria-label={`Buka keranjang, ${itemCount} item`}>
            <i className="bi bi-basket3 me-1" aria-hidden="true" />
            Keranjang <span className="badge rounded-pill bg-light text-danger ms-1">{itemCount}</span>
          </a>
          <div className="d-flex align-items-center gap-2">
            <span className="small text-secondary">Hai, {userName}</span>
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={onLogout}>Keluar</button>
          </div>
        </div>
      </header>
      {/* Isi halaman diselipkan di sini. id="main" adalah target 'Skip to main content' di index.html. */}
      <main id="main">{children}</main>
      {/* FOOTER dengan info alamat, jam operasional, dan kontak. */}
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-12 col-md-6 col-lg-3">
              <h2 className="h5 text-warning mb-3">Ayam Pak Gondesss</h2>
              <p>Warung UMKM kuliner otentik di Grogol, Jakarta Barat. Ayam goreng &amp; geprek bumbu rempah dengan sambal pedas nampol.</p>
              <p><span className="badge rounded-pill bg-warning text-dark">100% HALAL</span></p>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <h2 className="h5 text-warning mb-3">Navigasi Cepat</h2>
              <ul className="list-unstyled d-grid gap-2 mb-0">
                <li><a className="d-block text-decoration-none" href={pageUrl('beranda')}>Beranda</a></li>
                <li><a className="d-block text-decoration-none" href={pageUrl('menu')}>Daftar Menu</a></li>
                <li><a className="d-block text-decoration-none" href={pageUrl('tentang')}>Tentang Kami</a></li>
                <li><a className="d-block text-decoration-none" href={pageUrl('kontak')}>Kontak &amp; Pesanan</a></li>
              </ul>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <h2 className="h5 text-warning mb-3">Jam Operasional</h2>
              <p>Setiap Hari<br />10.00 - 22.00 WIB</p>
              <p>Dine-in, Takeaway &amp; Delivery</p>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <h2 className="h5 text-warning mb-3">Kontak &amp; Lokasi</h2>
              <p>Jl. Dr. Susilo Raya No. 42, Grogol Petamburan, Jakarta Barat 11450</p>
              <p>WA: +62 812-3456-7890</p>
              <p>Instagram @ayampakgondes<br />TikTok @ayampakgondes<br />GoFood &amp; GrabFood</p>
            </div>
          </div>
          <p className="border-top mt-4 pt-3 small text-center">
            &copy; 2025 Ayam Pak Gondesss Grogol. Proyek Web HTML &amp; CSS UMKM Kuliner.
          </p>
        </div>
      </footer>
    </>
  )
}

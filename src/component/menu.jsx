/**
 * menu.jsx - halaman DAFTAR MENU (?page=menu).
 */
import { useState } from 'react'
import { imageUrl, pageUrl, videoUrl } from './index.jsx'
import { useCart } from './cart-hook.js'
import { formatRupiah } from './cart-utils.js'
import { menuCategoryLabels } from './menu-data.js'
import useMenuCatalog from './use-menu-catalog.js'
// Halaman 'Daftar Menu': foto menu andalan, video, tabel harga lengkap dengan tombol 'Tambah' ke keranjang.
function Menu() {
  // addItem = tambah ke keranjang; itemCount = jumlah item untuk teks ajakan di bagian bawah.
  const { addItem, itemCount } = useCart()
  // Daftar menu terkini dari localStorage/menu bawaan.
  const [menuItems] = useMenuCatalog()
  const [query, setQuery] = useState('')
  // Hanya menu yang punya foto (item.image ada) yang masuk galeri foto. Harga diformat ke Rupiah di sini.
  const menuPhotos = menuItems
    .filter((item) => item.image)
    .map((item) => ({ ...item, alt: item.name, price: formatRupiah(item.price) }))
  // Peta kategori -> id anchor. Dipakai agar link dropdown navbar (mis. ?page=menu#paket-nasi) melompat ke baris pertama kategori tersebut.
  const categoryAnchors = {
    'Paket Spesial': 'paket-spesial',
    'Paket Nasi': 'paket-nasi',
    'Paket Indomie': 'paket-indomie',
    'Ala Carte & Cemilan': 'ala-carte',
    'Aneka Minuman': 'minuman',
  }
  // Menyiapkan data tabel: tiap menu diberi properti 'anchor' HANYA pada kemunculan PERTAMA tiap kategori.
  const anchoredMenuItems = []
  // Set = kumpulan nilai unik; dipakai untuk mengingat kategori mana yang sudah punya anchor.
  const seenCategories = new Set()
  // Anchor diberikan sekali per kategori, karena atribut id HTML tidak boleh duplikat dalam satu halaman.
  for (const item of menuItems) {
    anchoredMenuItems.push({
      ...item,
      anchor: !seenCategories.has(item.category) ? categoryAnchors[item.category] : undefined,
    })
    seenCategories.add(item.category)
  }
  // Pencarian mencocokkan nama, deskripsi, dan label kategori tanpa membedakan kapital.
  const keyword = query.trim().toLocaleLowerCase('id-ID')
  function matches(item) {
    if (!keyword) return true
    return [item.name, item.description, menuCategoryLabels[item.category]]
      .filter(Boolean)
      .some((text) => text.toLocaleLowerCase('id-ID').includes(keyword))
  }
  const filteredPhotos = menuPhotos.filter(matches)
  const filteredMenuItems = anchoredMenuItems.filter(matches)

  return (
    <>
      {/* BAGIAN 1 - Hero/judul halaman. */}
      <section className="bg-body-tertiary py-5">
        <div className="container">
          <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">
            RESEP KHAS GROGOL &amp; SEMARANG &bull; UPDATE 2025 &bull; 100% HALAL
          </span>
          <h1>Daftar Menu Lengkap Ayam Pak Gondesss</h1>
          <p>Pilihan nasi paket, Indomie, lauk ala carte &amp; minuman segar dengan rasa juara dan harga bersahabat untuk mahasiswa, pekerja, dan keluarga.</p>
          <div className="d-flex gap-3 flex-wrap mt-3">
            <a className="btn btn-danger" href={pageUrl('cart')}>Pesan Cepat Sekarang</a>
          </div>
        </div>
      </section>
      <section className="pt-4">
        <div className="container">
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-search" aria-hidden="true" /></span>
            <input
              className="form-control"
              type="search"
              placeholder="Cari menu, misalnya geprek, indomie, es teh..."
              aria-label="Cari menu"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
      </section>

      {/* BAGIAN 2 - Foto menu andalan (klik untuk memperbesar lewat modal Bootstrap). */}
      <section id="foto-menu" className="py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">FOTO MENU ANDALAN</span>
            <h2>Tampilan Asli Sajian Kami</h2>
            <p className="text-secondary">Klik foto untuk memperbesar.</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {/* Kartu foto. Id modal dibuat dari index; modal pasangannya dirender di bagian paling bawah file ini. */}
            {filteredPhotos.map((item, index) => {
              const modalId = `foto-menu-${index + 1}`
              return (
                <article className="card p-4 h-100" id={`kartu-menu-${index + 1}`} key={item.image}>
                  <a className="d-block" href={`#${modalId}`} data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                    <img className="photo img-fluid w-100 object-fit-cover rounded-3" src={imageUrl(item.image)} alt={item.alt} loading="lazy" />
                  </a>
                  <h3>{item.name}</h3>
                  <p className="text-danger fw-bold">{item.price}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* BAGIAN 3 - Video menu. */}
      <section className="bg-body-tertiary py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">VIDEO MENU</span>
            <h2>Begini Cara Kami Menyajikan Ayam Geprek</h2>
          </div>
          <div className="ratio ratio-16x9 overflow-hidden rounded-4">
            <video className="w-100 h-100 object-fit-contain" controls playsInline preload="metadata" poster={imageUrl('geprek-gondes.jpg')}>
              <source src={videoUrl('profil.mp4')} type="video/mp4" />
              Browser Anda tidak mendukung video. <a href={videoUrl('profil.mp4')}>Unduh video</a>.
            </video>
          </div>
          <p className="d-block small text-secondary mt-2">Proses penyajian menu favorit Ayam Pak Gondesss</p>
        </div>
      </section>

      {/* BAGIAN 4 - TABEL HARGA LENGKAP. Satu baris per menu; tombol 'Tambah' memanggil addItem() dari keranjang. */}
      <section className="py-5">
        <div className="container">
          <div className="mb-4">
            <span className="badge rounded-pill bg-warning-subtle text-danger-emphasis fw-bold">TRANSPARANSI HARGA BERSAHABAT</span>
            <h2>Ringkasan Menu &amp; Daftar Harga</h2>
            <p className="text-secondary">Harga resmi per porsi di gerai Grogol. Level pedas Sambal Gondes 1-5 gratis pilih.</p>
          </div>
          <div className="table-responsive border rounded">
            <table className="table table-striped table-hover mb-0">
              <caption>Daftar harga menu (Rupiah, per porsi)</caption>
              <thead className="table-dark">
                <tr><th>KATEGORI</th><th>NAMA MENU</th><th className="text-end text-nowrap text-danger fw-bold">HARGA</th><th>KETERANGAN / KOMPOSISI</th><th>AKSI</th></tr>
              </thead>
              <tbody>
                {filteredMenuItems.length === 0 && (
                  <tr><td colSpan="5" className="text-center text-secondary py-4">Menu "{query}" tidak ditemukan.</td></tr>
                )}
                {filteredMenuItems.map((item) => {
                  return (
                    // id hanya terisi pada baris pertama tiap kategori (undefined = atribut tidak dirender). 'key' memakai item.id yang unik.
                    <tr id={item.anchor} key={item.id}>
                      <td><span className="badge">{menuCategoryLabels[item.category]}</span></td>
                      <td><strong>{item.name}</strong></td>
                      <td className="text-end text-nowrap text-danger fw-bold">{formatRupiah(item.price)}</td>
                      <td>{item.description}</td>
                      {/* Hanya id, name, price yang dikirim ke keranjang. Jumlah (quantity) ditambahkan otomatis oleh addItem. */}
                      <td className="text-nowrap">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={() => addItem({ id: item.id, name: item.name, price: item.price })}
                          aria-label={`Tambah ${item.name} ke keranjang`}
                        >
                          <i className="bi bi-plus-lg me-1" aria-hidden="true" />
                          Tambah
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* BAGIAN 5 - Ajakan: tampilkan jumlah item di keranjang dan tautan lanjut ke Keranjang / Form pesan. */}
      <section className="bg-body-tertiary py-5">
        <div className="container">
          <h2>Sudah menentukan pilihan menu lezatmu?</h2>
          <p className="text-secondary">{itemCount > 0 ? `${itemCount} item ada di keranjang.` : 'Tambahkan menu ke keranjang untuk melanjutkan pesanan.'}</p>
          <p className="text-secondary">Isi formulir pemesanan online untuk nasi box kantor, kumpul kampus, atau makan siang cepat.</p>
          <div className="d-flex gap-3 flex-wrap mt-3">
            <a className="btn btn-danger" href={pageUrl('cart')}>Lihat Keranjang</a>
            <a className="btn btn-danger" href={pageUrl('kontak')}>Pesan via Formulir Online</a>
          </div>
        </div>
      </section>

      {/* MODAL pop-up foto besar (sengaja di luar section). Id harus cocok dengan data-bs-target pada kartu foto di atas. */}
      {filteredPhotos.map((item, index) => {
        const modalId = `foto-menu-${index + 1}`
        return (
          <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true" key={modalId}>
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content bg-transparent border-0">
                <button type="button" className="btn-close btn-close-white ms-auto mb-2" data-bs-dismiss="modal" aria-label="Tutup" />
                <div className="modal-body p-0 text-center">
                  <img className="img-fluid rounded" src={imageUrl(item.image)} alt={item.alt} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Menu 
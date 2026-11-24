/**
 * admin.jsx - halaman ADMIN (?page=admin): login + dashboard AdminLTE.
 * Kemampuan: lihat & cari pesanan, ubah status pesanan, tambah/edit/hapus menu.
 * CATATAN: semua data tersimpan di localStorage browser (tanpa server), dan login hanya demo.
 */
import { useEffect, useState } from 'react'
// Import tanpa nama (side effect): menjalankan JavaScript AdminLTE agar tombol buka/tutup sidebar (data-lte-toggle) berfungsi.
import 'admin-lte/dist/js/adminlte.esm.js'
// '?url' = Vite memberi URL file CSS, bukan menyisipkannya ke seluruh situs.
// CSS AdminLTE hanya dipasang di halaman admin lewat <link> (lihat di bawah) agar tidak merusak gaya situs publik.
import adminLteStylesheet from 'admin-lte/dist/css/adminlte.css?url'
import { formatRupiah, readOrders, saveOrders } from './cart-utils.js'
import { createMenuId, menuCategories, saveMenu } from './menu-data.js'
import { pageUrl } from './navigation.js'
import useMenuCatalog from './use-menu-catalog.js'

// PERINGATAN KEAMANAN: kredensial di sini terlihat oleh siapa saja yang membuka kode sumber di browser.
// Ini hanya DEMO untuk tugas. Aplikasi sungguhan wajib memakai autentikasi di server (backend).
const ADMIN_EMAIL = 'admin@pakgondes.local'
const ADMIN_PASSWORD = 'GondesDemo2025!'
// Penanda 'sudah login' disimpan di sessionStorage (hilang saat tab ditutup), berbeda dari localStorage yang permanen.
const AUTH_STORAGE_KEY = 'pakgondes_admin_authenticated'
// Daftar status pesanan yang dapat dipilih admin.
const orderStatuses = ['Baru', 'Menunggu konfirmasi', 'Diproses', 'Selesai', 'Dibatalkan']
// Data PENGUNJUNG CONTOH (palsu). Aplikasi belum mengumpulkan data pengunjung sungguhan; tabel ini hanya contoh tampilan.
const demoVisitors = [
  { name: 'Nadia Putri', email: 'nadia@example.com', visits: 8, status: 'Aktif' },
  { name: 'Rizky Pratama', email: 'rizky@example.com', visits: 5, status: 'Aktif' },
  { name: 'Aulia Safitri', email: 'aulia@example.com', visits: 3, status: 'Aktif' },
]

// Halaman ADMIN: login -> dashboard (ringkasan angka, kelola menu, tabel pesanan, pengunjung contoh).
function Admin() {
  // Status login, nilai awal dibaca dari sessionStorage supaya tidak logout saat halaman dimuat ulang.
  const [authenticated, setAuthenticated] = useState(sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true')
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [orderStatusFilter, setOrderStatusFilter] = useState('')
  // Daftar pesanan dari localStorage (dibuat oleh cart.jsx dan kontak_pesan.jsx).
  const [orders, setOrders] = useState(readOrders)
  // Daftar menu (sinkron dengan localStorage lewat hook).
  const [menuItems, setMenuItems] = useMenuCatalog()
  // null = form dalam mode TAMBAH menu baru. Berisi id = mode EDIT menu tersebut.
  const [editingMenuId, setEditingMenuId] = useState(null)
  // State isi form menu. 'price' disimpan sebagai TEKS karena nilai input HTML berupa string; diubah ke angka saat disimpan.
  const [menuForm, setMenuForm] = useState({
    category: menuCategories[0],
    name: '',
    price: '',
    description: '',
  })
  const [menuError, setMenuError] = useState('')

  // Sinkronisasi pesanan: bila ada pesanan baru dari tab lain (event 'storage'), muat ulang agar dashboard selalu terbaru.
  useEffect(() => {
    function syncOrders(event) {
      if (event.key === 'pakgondes_orders') {
        setOrders(readOrders())
      }
    }

    window.addEventListener('storage', syncOrders)
    return () => window.removeEventListener('storage', syncOrders)
  }, [])

  // Cocokkan email & sandi dengan konstanta. Jika benar: simpan penanda ke sessionStorage + ubah state.
  function login(event) {
    event.preventDefault()
    if (credentials.email !== ADMIN_EMAIL || credentials.password !== ADMIN_PASSWORD) {
      setError('Email atau kata sandi tidak sesuai.')
      return
    }
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true')
    setAuthenticated(true)
    setError('')
  }

  // Hapus penanda login.
  function logout() {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
    setAuthenticated(false)
  }

  // Ubah status satu pesanan: salin array dengan map (immutable), ubah yang cocok, simpan ke localStorage lalu ke state.
  function updateStatus(orderId, status) {
    const updatedOrders = orders.map((order) => (
      order.id === orderId ? { ...order, status } : order
    ))
    saveOrders(updatedOrders)
    setOrders(updatedOrders)
  }

  // Menyimpan form menu (tambah ATAU edit). Urutan: validasi -> susun data -> simpan.
  function submitMenu(event) {
    event.preventDefault()
    // Ubah teks harga menjadi angka.
    const price = Number(menuForm.price)
    const name = menuForm.name.trim()
    const description = menuForm.description.trim()
    // VALIDASI 1: nama & deskripsi tidak boleh kosong (setelah di-trim).
    if (!name || !description) {
      setMenuError('Nama dan deskripsi menu tidak boleh kosong.')
      return
    }
    // VALIDASI 2: harga harus bilangan bulat aman dan tidak negatif (cocok dengan aturan di readMenu).
    if (!Number.isSafeInteger(price) || price < 0) {
      setMenuError('Harga harus berupa angka Rupiah bulat dan tidak boleh negatif.')
      return
    }
    // VALIDASI 3: cegah nama kembar di kategori yang sama (tidak peka huruf besar/kecil). Saat EDIT, menu yang sedang diedit dikecualikan (item.id !== editingMenuId).
    if (menuItems.some((item) => (
      item.id !== editingMenuId
      && item.category === menuForm.category
      && item.name.toLocaleLowerCase('id-ID') === name.toLocaleLowerCase('id-ID')
    ))) {
      setMenuError('Nama menu sudah ada di kategori tersebut.')
      return
    }

    // Gabungan data form yang sudah dibersihkan.
    const menuDetails = { ...menuForm, name, description, price }
    // Mode EDIT: map() mengganti satu item. Mode TAMBAH: tambahkan item baru dengan id unik di akhir array.
    const updatedMenu = editingMenuId
      ? menuItems.map((item) => (
        item.id === editingMenuId ? { ...item, ...menuDetails } : item
      ))
      : [...menuItems, { ...menuDetails, id: createMenuId(name) }]

    // try/catch karena localStorage bisa gagal (penuh / diblokir browser). Pesan error ditampilkan ke admin.
    try {
      // Urutan penting: simpan ke localStorage DULU, baru perbarui state, sehingga tampilan tidak pernah mendahului data yang tersimpan.
      saveMenu(updatedMenu)
      setMenuItems(updatedMenu)
      setEditingMenuId(null)
      setMenuForm({ category: menuCategories[0], name: '', price: '', description: '' })
      setMenuError('')
    } catch (saveError) {
      setMenuError(`Menu gagal disimpan di browser ini: ${saveError.message}`)
    }
  }

  // Isi form dengan data menu yang dipilih lalu pindah ke mode edit.
  function editMenu(item) {
    setEditingMenuId(item.id)
    setMenuForm({
      category: item.category,
      name: item.name,
      price: String(item.price),
      description: item.description,
    })
    setMenuError('')
    // Fokus ke kolom pertama form agar admin langsung bisa mengetik. '?.' mencegah error bila elemen tidak ditemukan.
    document.getElementById('menu-category')?.focus()
  }

  function deleteMenu(item) {
    if (!window.confirm(`Hapus menu "${item.name}"?`)) return
    const updatedMenu = menuItems.filter((menu) => menu.id !== item.id)
    try {
      saveMenu(updatedMenu)
      setMenuItems(updatedMenu)
      if (editingMenuId === item.id) cancelMenuEdit()
    } catch (saveError) {
      setMenuError(`Menu gagal dihapus: ${saveError.message}`)
    }
  }

  // Batalkan edit: kosongkan form dan kembali ke mode tambah.
  function cancelMenuEdit() {
    setEditingMenuId(null)
    setMenuForm({ category: menuCategories[0], name: '', price: '', description: '' })
    setMenuError('')
  }

  // DATA TURUNAN (dihitung ulang tiap render, bukan state): kata kunci pencarian dinormalisasi ke huruf kecil.
  const normalizedSearch = search.trim().toLocaleLowerCase('id-ID')
  // Pencarian pesanan juga mencocokkan tanggal lokal yang tampil dan nilai tanggal aslinya.
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt)
    const searchableValues = [
      order.id,
      order.customer,
      order.phone,
      order.status,
      ...order.items.map((item) => item.name),
      order.createdAt,
      Number.isNaN(orderDate.getTime()) ? '' : orderDate.toLocaleString('id-ID'),
    ].filter(Boolean)
    const matchesSearch = searchableValues.some((value) => (
      value.toLocaleLowerCase('id-ID').includes(normalizedSearch)
    ))
    const matchesStatus = !orderStatusFilter || order.status === orderStatusFilter
    return matchesSearch && matchesStatus
  })
  // Filter yang sama untuk tabel pengunjung contoh.
  const filteredVisitors = demoVisitors.filter((visitor) => (
    [visitor.name, visitor.email, visitor.status]
      .some((value) => value.toLocaleLowerCase('id-ID').includes(normalizedSearch))
  ))
  // Hitung pesanan yang butuh perhatian (status Baru / Menunggu konfirmasi).
  const newOrders = orders.filter((order) => (
    order.status === 'Baru' || order.status === 'Menunggu konfirmasi'
  )).length
  const completedOrders = orders.filter((order) => order.status === 'Selesai')
  // OMZET = jumlah total HANYA dari pesanan berstatus 'Selesai'.
  const revenue = completedOrders.reduce((total, order) => total + order.total, 0)

  // GERBANG LOGIN: selama belum login, hanya form login yang dirender (return awal); dashboard di bawahnya tidak tampil.
  if (!authenticated) {
    return (
      // TAMPILAN LOGIN.
      <div className="admin-login-page">
        {/* CSS AdminLTE dimuat di sini saja (hanya saat halaman admin tampil). */}
        <link rel="stylesheet" href={adminLteStylesheet} />
        <div className="admin-login-card card card-outline card-danger">
          <div className="card-header text-center">
            <a href={pageUrl('beranda')} className="h2 text-decoration-none"><b>Pak</b> Gondesss</a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Masuk untuk membuka dashboard AdminLTE</p>
            <form onSubmit={login}>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  aria-label="Email admin"
                  autoComplete="username"
                  placeholder="Email admin"
                  value={credentials.email}
                  onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                  required
                />
                <span className="input-group-text"><i className="bi bi-envelope" aria-hidden="true" /></span>
              </div>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="password"
                  aria-label="Kata sandi"
                  autoComplete="current-password"
                  placeholder="Kata sandi"
                  value={credentials.password}
                  onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                  required
                />
                <span className="input-group-text"><i className="bi bi-lock" aria-hidden="true" /></span>
              </div>
              {error && <p className="alert alert-danger py-2" role="alert">{error}</p>}
              <button className="btn btn-danger w-100" type="submit">Masuk ke Dashboard</button>
            </form>
            <p className="small text-secondary mt-3 mb-0">
              Login menggunakan Email yang disediakan
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    // TAMPILAN DASHBOARD (struktur standar AdminLTE: header, sidebar, main, footer).
    <div className="app-wrapper layout-fixed sidebar-expand-lg bg-body-tertiary adminlte-dashboard">
      {/* CSS AdminLTE (dashboard). */}
      <link rel="stylesheet" href={adminLteStylesheet} />
      <nav className="app-header navbar navbar-expand bg-body">
        <div className="container-fluid">
          <button
            className="btn btn-link nav-link"
            type="button"
            data-lte-toggle="sidebar"
            aria-label="Buka atau tutup navigasi admin"
          >
            <i className="bi bi-list fs-4" aria-hidden="true" />
          </button>
          <span className="navbar-text fw-semibold">Admin Panel Ayam Pak Gondesss</span>
          <span className="badge text-bg-secondary ms-auto me-3">Admin</span>
          <button className="btn btn-outline-danger btn-sm" type="button" onClick={logout}>
            <i className="bi bi-box-arrow-right me-1" aria-hidden="true" />Keluar
          </button>
        </div>
      </nav>
      {/* SIDEBAR navigasi. Tautan #dashboard/#orders/... melompat ke bagian di halaman yang sama (anchor). */}
      <aside className="app-sidebar bg-dark shadow" data-bs-theme="dark">
        <div className="sidebar-brand">
          <a href="#dashboard" className="brand-link text-decoration-none">
            <span className="brand-text fw-light"><b>Pak</b> Gondesss</span>
          </a>
        </div>
        <div className="sidebar-wrapper">
          <nav className="mt-2" aria-label="Navigasi dashboard">
            <ul className="nav sidebar-menu flex-column" role="menu">
              <li className="nav-item">
                <a className="nav-link active" href="#dashboard">
                  <i className="nav-icon bi bi-speedometer2" aria-hidden="true" /><p>Dashboard</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#orders">
                  <i className="nav-icon bi bi-receipt" aria-hidden="true" /><p>Data Pesanan</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#menu-management">
                  <i className="nav-icon bi bi-egg-fried" aria-hidden="true" /><p>Kelola Menu</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#visitors">
                  <i className="nav-icon bi bi-people" aria-hidden="true" /><p>User Pengunjung</p>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={pageUrl('beranda')}>
                  <i className="nav-icon bi bi-arrow-left" aria-hidden="true" /><p>Kembali ke Website</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      {/* ISI DASHBOARD. */}
      <main className="app-main" id="dashboard">
        <div className="app-content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6"><h1 className="mb-0">Dashboard</h1></div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-end">
                  <li className="breadcrumb-item"><a href={pageUrl('beranda')}>Beranda</a></li>
                  <li className="breadcrumb-item active">Dashboard Admin</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="app-content">
          <div className="container-fluid">
            <div className="alert alert-info" role="note">
              <i className="bi bi-info-circle me-2" aria-hidden="true" />
              Pesanan dibaca dari browser yang sama dengan keranjang. Dashboard ini belum menggunakan backend/database.
            </div>
            {/* KARTU RINGKASAN (small-box): total pesanan, pesanan baru, pengunjung contoh, omzet. */}
            <div className="row g-3 mb-4">
              <div className="col-lg-3 col-6">
                <div className="small-box text-bg-primary"><div className="inner"><h3>{orders.length}</h3><p>Total Pesanan</p></div><i className="small-box-icon bi bi-receipt" aria-hidden="true" /></div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box text-bg-warning"><div className="inner"><h3>{newOrders}</h3><p>Pesanan Baru</p></div><i className="small-box-icon bi bi-hourglass-split" aria-hidden="true" /></div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box text-bg-success"><div className="inner"><h3>{demoVisitors.length}</h3><p>User Pengunjung (Contoh)</p></div><i className="small-box-icon bi bi-people" aria-hidden="true" /></div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box text-bg-danger"><div className="inner"><h3 className="fs-4">{formatRupiah(revenue)}</h3><p>Omzet Selesai</p></div><i className="small-box-icon bi bi-cash-stack" aria-hidden="true" /></div>
              </div>
            </div>
            {/* KELOLA MENU: form tambah/edit di atas, tabel daftar menu di bawah. */}
            <section className="card mb-4" id="menu-management">
              <div className="card-header">
                <h2 className="card-title">{editingMenuId ? 'Edit Menu' : 'Tambah Menu'}</h2>
              </div>
              <div className="card-body">
                {/* Form menu (controlled components). maxLength membatasi panjang teks di browser; validasi sebenarnya ada di submitMenu(). */}
                <form className="row g-3" onSubmit={submitMenu}>
                  <div className="col-md-4">
                    <label className="form-label" htmlFor="menu-category">Kategori</label>
                    <select
                      className="form-select"
                      id="menu-category"
                      value={menuForm.category}
                      onChange={(event) => setMenuForm({ ...menuForm, category: event.target.value })}
                    >
                      {menuCategories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                  </div>
                  <div className="col-md-5">
                    <label className="form-label" htmlFor="menu-name">Nama menu</label>
                    <input
                      className="form-control"
                      id="menu-name"
                      value={menuForm.name}
                      onChange={(event) => setMenuForm({ ...menuForm, name: event.target.value })}
                      maxLength="100"
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label" htmlFor="menu-price">Harga (Rupiah)</label>
                    <input
                      className="form-control"
                      id="menu-price"
                      type="number"
                      min="0"
                      step="1"
                      value={menuForm.price}
                      onChange={(event) => setMenuForm({ ...menuForm, price: event.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="menu-description">Deskripsi</label>
                    <textarea
                      className="form-control"
                      id="menu-description"
                      rows="2"
                      value={menuForm.description}
                      onChange={(event) => setMenuForm({ ...menuForm, description: event.target.value })}
                      maxLength="300"
                      required
                    />
                  </div>
                  {menuError && <div className="col-12"><p className="alert alert-danger mb-0" role="alert">{menuError}</p></div>}
                  <div className="col-12 d-flex gap-2">
                    <button className="btn btn-danger" type="submit">
                      <i className={`bi ${editingMenuId ? 'bi-save' : 'bi-plus-lg'} me-1`} aria-hidden="true" />
                      {editingMenuId ? 'Simpan Perubahan' : 'Tambah Menu'}
                    </button>
                    {editingMenuId && <button className="btn btn-outline-secondary" type="button" onClick={cancelMenuEdit}>Batal Edit</button>}
                  </div>
                </form>
              </div>
              <div className="card-header border-top">
                <h3 className="card-title">Daftar Menu ({menuItems.length})</h3>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle mb-0">
                    <thead><tr><th>Kategori</th><th>Nama Menu</th><th>Harga</th><th>Deskripsi</th><th>Aksi</th></tr></thead>
                    <tbody>
                      {menuItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.category}</td>
                          <td><strong>{item.name}</strong></td>
                          <td className="text-nowrap">{formatRupiah(item.price)}</td>
                          <td>{item.description}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => editMenu(item)}>
                              <i className="bi bi-pencil me-1" aria-hidden="true" />Edit
                            </button>
                            <button className="btn btn-sm btn-outline-secondary ms-1" type="button" onClick={() => deleteMenu(item)}>
                              <i className="bi bi-trash me-1" aria-hidden="true" />Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                      {menuItems.length === 0 && <tr><td className="text-center text-secondary py-4" colSpan="5">Belum ada menu.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer text-secondary small">Perubahan menu tersimpan di browser ini dan tersinkron ke tab website yang terbuka.</div>
            </section>
            {/* TABEL PESANAN dengan pencarian tanggal dan filter status; status tiap pesanan tetap bisa diubah di tabel. */}
            <div className="card mb-4" id="orders">
              <div className="card-header">
                <h2 className="card-title">Tabel Pesanan</h2>
                <div className="card-tools d-flex flex-wrap gap-2">
                  <div className="input-group input-group-sm admin-search">
                    <label className="visually-hidden" htmlFor="admin-search">Cari pesanan, pengunjung, atau tanggal</label>
                    <input
                      className="form-control"
                      id="admin-search"
                      type="search"
                      placeholder="Cari pesanan / pengunjung / tanggal..."
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                    <span className="input-group-text"><i className="bi bi-search" aria-hidden="true" /></span>
                  </div>
                  <label className="visually-hidden" htmlFor="order-status-filter">Filter status pesanan</label>
                  <select
                    className="form-select form-select-sm admin-status-filter"
                    id="order-status-filter"
                    value={orderStatusFilter}
                    onChange={(event) => setOrderStatusFilter(event.target.value)}
                  >
                    <option value="">Semua status</option>
                    {orderStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle mb-0">
                    <thead><tr><th>No. Pesanan</th><th>Pelanggan</th><th>Menu</th><th>Total</th><th>Status</th></tr></thead>
                    <tbody>
                      {/* Satu baris per pesanan (key = id pesanan). onChange pada <select> status memanggil updateStatus(orderId, statusBaru). */}
                      {filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td><strong>{order.id}</strong><br /><small className="text-secondary">{new Date(order.createdAt).toLocaleString('id-ID')}</small></td>
                          <td>{order.customer}<br /><span className="text-secondary">{order.phone}</span></td>
                          <td>{order.items.map((item) => <div key={item.id}>{item.name} &times; {item.quantity}</div>)}</td>
                          <td className="text-nowrap">{formatRupiah(order.total)}</td>
                          <td>
                            <label className="visually-hidden" htmlFor={`status-${order.id}`}>Status {order.id}</label>
                            <select
                              className="form-select form-select-sm"
                              id={`status-${order.id}`}
                              value={order.status}
                              onChange={(event) => updateStatus(order.id, event.target.value)}
                            >
                              {orderStatuses.map((status) => <option key={status}>{status}</option>)}
                            </select>
                          </td>
                        </tr>
                      ))}
                      {filteredOrders.length === 0 && (
                        <tr><td className="text-center text-secondary py-4" colSpan="5">Tidak ada pesanan yang cocok.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer text-secondary small">Perubahan status disimpan di browser ini dan terlihat pada tab dashboard lain.</div>
            </div>
            {/* TABEL PENGUNJUNG (data contoh, bukan data nyata). */}
            <div className="card" id="visitors">
              <div className="card-header"><h2 className="card-title">User Pengunjung (Data Contoh)</h2></div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead><tr><th>Nama Pengunjung</th><th>Email Contoh</th><th>Jumlah Kunjungan</th><th>Status</th></tr></thead>
                    <tbody>
                      {filteredVisitors.map((visitor) => (
                        <tr key={visitor.email}>
                          <td>{visitor.name}</td><td>{visitor.email}</td><td>{visitor.visits}</td>
                          <td><span className="badge text-bg-success">{visitor.status}</span></td>
                        </tr>
                      ))}
                      {filteredVisitors.length === 0 && (
                        <tr><td className="text-center text-secondary py-4" colSpan="4">Tidak ada pengunjung yang cocok.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="app-footer"><strong>Ayam Pak Gondesss</strong> &mdash; Dashboard AdminLTE (Demo)</footer>
    </div>
  )
}

export default Admin

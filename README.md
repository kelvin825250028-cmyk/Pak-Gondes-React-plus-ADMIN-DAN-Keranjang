# Ayam Pak Gondesss

Website React/Vite untuk menampilkan menu dan menerima pesanan Ayam Pak Gondesss.

## Menjalankan aplikasi

```sh
npm install
npm run dev
```

## Deploy ke GitHub Pages

Setelah perubahan didorong ke branch `main`, workflow GitHub Actions akan membangun dan menerbitkan website secara otomatis. Deploy manual juga dapat dijalankan dari tab **Actions** dengan workflow **Deploy to GitHub Pages**.

URL website: https://kelvin825250028-cmyk.github.io/Pak-Gondes-React-plus-ADMIN-DAN-Keranjang/

## Keranjang dan dashboard

Pilih menu dari halaman **Menu**, tambahkan ke keranjang, lalu isi detail pemesan dan buat pesanan. Pesanan langsung dicatat tanpa terhubung ke WhatsApp, lalu struk ditampilkan dan dapat dicetak. Data keranjang dan pesanan disimpan di `localStorage` browser; dashboard admin membaca pesanan dari browser yang sama, dan perubahan status disimpan di sana. Data tidak disinkronkan ke browser atau perangkat lain.

Halaman **Admin** meminta login dan menggunakan layout AdminLTE. Dashboard menampilkan tabel pesanan aktual dari keranjang dengan pencarian dan pengelolaan status. Tabel pengunjung menampilkan akun yang mendaftar di browser yang sama serta jumlah login mereka. Akun demo admin lokal:

| Jenis akun | Email | Kata sandi |
|---|---|---|
| Admin | `admin@pakgondes.local` | Hash PBKDF2; gunakan kata sandi demo yang dibagikan pengelola |

Pengguna dapat membuat akun dari formulir masuk dengan mengisi nama, email, dan kata sandi (minimal 8 karakter). Akun hanya tersimpan di browser yang digunakan dan tidak dapat dipakai untuk masuk dari perangkat/browser lain.

Login pengguna dan admin ini hanya untuk demonstrasi. Kata sandi admin diverifikasi menggunakan PBKDF2; data akun pengguna tersimpan di browser dan kata sandinya di-hash di sisi klien. Karena autentikasi berjalan di frontend, kode/hash masih dapat diperiksa atau dimanipulasi dan bukan pengganti backend. Jangan gunakan kata sandi nyata. Gunakan backend dengan autentikasi dan penyimpanan server sebelum dipublikasikan atau dipakai untuk data nyata.

## Pemeriksaan

```sh
npm run lint
npm run build
```

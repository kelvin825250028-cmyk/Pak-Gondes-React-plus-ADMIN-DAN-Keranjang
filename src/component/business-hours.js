/** // Header dokumentasi file: menjelaskan nama dan tujuan fungsi pada file ini.
 * business-hours.js - logika status BUKA/TUTUP warung (fungsi murni, tanpa React).
 */ // Akhir header dokumentasi file.
// Fungsi mengembalikan true bila warung sedang buka pada rentang 10.00 hingga 21.59 WIB.
// Parameter date default ke saat ini, tetapi dapat diisi tanggal tertentu untuk pengujian.
// Baris 6: penjelasan singkat untuk baris kode berikut.
export function isStoreOpen(date = new Date()) { // Membuat fungsi untuk mengecek status warung berdasarkan tanggal.
  // Jam diproses secara eksplisit menggunakan zona waktu Asia/Jakarta agar konsisten di semua perangkat.
  // hourCycle h23 memakai format jam 00-23 sehingga tidak muncul nilai jam 24.
// Baris 9: penjelasan singkat untuk baris kode berikut.
  const parts = new Intl.DateTimeFormat('en-GB', { // Membentuk formatter waktu untuk memecah komponen tanggal.
// Baris 10: penjelasan singkat untuk baris kode berikut.
    timeZone: 'Asia/Jakarta', // Menentukan zona waktu agar hasil selalu memakai waktu WIB.
// Baris 11: penjelasan singkat untuk baris kode berikut.
    hour: '2-digit', // Meminta komponen jam ditampilkan dengan dua digit.
// Baris 12: penjelasan singkat untuk baris kode berikut.
    minute: '2-digit', // Meminta komponen menit ditampilkan dengan dua digit.
// Baris 13: penjelasan singkat untuk baris kode berikut.
    hourCycle: 'h23', // Menggunakan siklus jam 24-jam untuk rentang 00-23.
// Baris 14: penjelasan singkat untuk baris kode berikut.
  }).formatToParts(date) // Mengubah tanggal menjadi bagian-bagian jam dan menit.
  // Bagian waktu ini dicari berdasarkan type lalu nilainya dikonversi menjadi angka.
// Baris 16: penjelasan singkat untuk baris kode berikut.
  const hour = Number(parts.find((part) => part.type === 'hour')?.value) // Mengambil dan mengubah komponen jam menjadi Number.
// Baris 17: penjelasan singkat untuk baris kode berikut.
  const minute = Number(parts.find((part) => part.type === 'minute')?.value) // Mengambil dan mengubah komponen menit menjadi Number.
  // Jam dan menit dikonversi menjadi total menit sejak pukul 00.00.
// Baris 19: penjelasan singkat untuk baris kode berikut.
  const time = hour * 60 + minute // Menghitung waktu dalam satuan menit agar mudah dibandingkan.
  // Nilai 600 berarti 10.00, sedangkan 1320 berarti 22.00 dan sudah berada di luar jam buka.
// Baris 21: penjelasan singkat untuk baris kode berikut.
  return time >= 10 * 60 && time < 22 * 60 // Mengembalikan true hanya jika waktu berada di antara 10.00 dan sebelum 22.00.
// Baris 22: penjelasan singkat untuk baris kode berikut.
} // Menutup deklarasi dan isi fungsi isStoreOpen.
// Baris kosong: pemisah antardeklarasi atau blok kode.

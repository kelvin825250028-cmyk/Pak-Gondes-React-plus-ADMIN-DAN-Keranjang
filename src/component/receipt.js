/**
 * receipt.js - pembuat dan pencetak STRUK pesanan.
 * Struk dibuat sebagai dokumen HTML terpisah yang dibuka di jendela baru lalu dicetak (bisa juga disimpan sebagai PDF lewat dialog cetak).
 */
// Baris 5: penjelasan singkat untuk baris kode berikut.
import { formatRupiah } from './cart-utils.js'
// Baris kosong: pemisah antardeklarasi atau blok kode.
// KEAMANAN (anti XSS): mengubah karakter berbahaya (& < > " ') menjadi entitas HTML.
// WAJIB karena struk dibuat dari STRING HTML mentah (bukan JSX); JSX otomatis aman, string mentah tidak.
// Tanpa ini, pelanggan bisa mengetik <script> di kolom nama/catatan dan skrip itu akan dijalankan saat struk dicetak.
// Baris 10: penjelasan singkat untuk baris kode berikut.
function escapeHtml(value) {
// Baris 11: penjelasan singkat untuk baris kode berikut.
  return String(value).replace(/[&<>"']/g, (character) => ({
// Baris 12: penjelasan singkat untuk baris kode berikut.
    '&': '&amp;',
// Baris 13: penjelasan singkat untuk baris kode berikut.
    '<': '&lt;',
// Baris 14: penjelasan singkat untuk baris kode berikut.
    '>': '&gt;',
// Baris 15: penjelasan singkat untuk baris kode berikut.
    '"': '&quot;',
// Baris 16: penjelasan singkat untuk baris kode berikut.
    "'": '&#39;',
// Baris 17: penjelasan singkat untuk baris kode berikut.
  })[character])
// Baris 18: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Membangun dokumen HTML lengkap untuk struk (dengan CSS di dalamnya) dari satu objek pesanan. Fungsi murni -> mudah dites (receipt.spec.js).
// Baris 21: penjelasan singkat untuk baris kode berikut.
export function buildReceiptHtml(order) {
  // Satu <tr> per item pesanan; jumlah = harga x qty. Join('') menggabungkan array string menjadi satu string.
// Baris 23: penjelasan singkat untuk baris kode berikut.
  const rows = order.items.map((item) => `
    <tr>
      <td>${escapeHtml(item.name)}</td>
      <td class="number">${item.quantity}</td>
      <td class="number">${formatRupiah(item.price * item.quantity)}</td>
    </tr>
  `).join('')
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Baris 31: penjelasan singkat untuk baris kode berikut.
  return `<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Struk ${escapeHtml(order.id)} - Ayam Pak Gondesss</title>
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; padding: 32px; color: #242424; font: 14px/1.5 Arial, sans-serif; }
      main { max-width: 680px; margin: 0 auto; }
      header, .thanks { text-align: center; }
      header { border-bottom: 1px dashed #777; padding-bottom: 16px; }
      h1 { margin: 0 0 4px; font-size: 24px; }
      p { margin: 4px 0; }
      dl { display: grid; grid-template-columns: 130px 1fr; gap: 5px 12px; margin: 20px 0; }
      dt { font-weight: bold; }
      dd { margin: 0; overflow-wrap: anywhere; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 9px 5px; border-bottom: 1px solid #ddd; text-align: left; vertical-align: top; }
      th { border-bottom: 1px solid #444; }
      .number { text-align: right; white-space: nowrap; }
      tfoot td { border-top: 1px solid #444; border-bottom: 0; font-weight: bold; }
      .notes { margin-top: 16px; }
      .thanks { border-top: 1px dashed #777; margin-top: 22px; padding-top: 14px; }
      @page { margin: 16mm; }
      @media print { body { padding: 0; } }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>Ayam Pak Gondesss</h1>
        <p>Jl. Dr. Susilo Raya No. 42, Grogol</p>
        <strong>STRUK PESANAN</strong>
      </header>
      <dl>
        <dt>No. Pesanan</dt><dd>${escapeHtml(order.id)}</dd>
        <dt>Tanggal</dt><dd>${escapeHtml(new Date(order.createdAt).toLocaleString('id-ID'))}</dd>
        <dt>Pelanggan</dt><dd>${escapeHtml(order.customer)}</dd>
        <dt>Telepon</dt><dd>${escapeHtml(order.phone)}</dd>
        <dt>Jenis layanan</dt><dd>${escapeHtml(order.service)}</dd>
      </dl>
      <table>
        <thead><tr><th>Menu</th><th class="number">Qty</th><th class="number">Jumlah</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><td colspan="2">Total</td><td class="number">${formatRupiah(order.total)}</td></tr></tfoot>
      </table>
      ${order.notes ? `<p class="notes"><strong>Catatan:</strong> ${escapeHtml(order.notes)}</p>` : ''}
      <p class="thanks">Terima kasih telah memesan.</p>
    </main>
  </body>
</html>`
// Baris 83: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.
// Membuka jendela baru berisi struk lalu memanggil dialog cetak browser.
// Baris 86: penjelasan singkat untuk baris kode berikut.
export function printReceipt(order) {
  // Browser dapat memblokir pop-up. Fungsi mengembalikan false bila gagal agar UI menampilkan pesan 'izinkan pop-up'.
// Baris 88: penjelasan singkat untuk baris kode berikut.
  const printWindow = window.open('', '_blank', 'width=800,height=700')
// Baris 89: penjelasan singkat untuk baris kode berikut.
  if (!printWindow) {
// Baris 90: penjelasan singkat untuk baris kode berikut.
    return false
// Baris 91: penjelasan singkat untuk baris kode berikut.
  }
// Baris kosong: pemisah antardeklarasi atau blok kode.
  // Menulis HTML struk langsung ke jendela baru.
// Baris 94: penjelasan singkat untuk baris kode berikut.
  printWindow.document.open()
// Baris 95: penjelasan singkat untuk baris kode berikut.
  printWindow.document.write(buildReceiptHtml(order))
// Baris 96: penjelasan singkat untuk baris kode berikut.
  printWindow.document.close()
  // Tutup jendela otomatis setelah pengguna selesai mencetak/membatalkan.
// Baris 98: penjelasan singkat untuk baris kode berikut.
  printWindow.onafterprint = () => printWindow.close()
  // Jeda 300 ms agar konten & CSS selesai dirender sebelum dialog cetak dibuka.
// Baris 100: penjelasan singkat untuk baris kode berikut.
  window.setTimeout(() => {
// Baris 101: penjelasan singkat untuk baris kode berikut.
    printWindow.focus()
// Baris 102: penjelasan singkat untuk baris kode berikut.
    printWindow.print()
// Baris 103: penjelasan singkat untuk baris kode berikut.
  }, 300)
// Baris 104: penjelasan singkat untuk baris kode berikut.
  return true
// Baris 105: penjelasan singkat untuk baris kode berikut.
}
// Baris kosong: pemisah antardeklarasi atau blok kode.

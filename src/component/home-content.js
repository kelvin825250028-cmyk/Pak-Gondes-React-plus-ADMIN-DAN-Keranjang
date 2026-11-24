export const HOME_CONTENT_STORAGE_KEY = 'pakgondes_home_content'

export const homeButtonTargets = [
  { value: 'menu', label: 'Menu' },
  { value: 'tentang', label: 'Tentang Kami' },
  { value: 'kontak', label: 'Pesan Sekarang' },
  { value: 'cart', label: 'Keranjang' },
  { value: 'admin', label: 'Admin' },
]

export const defaultHomeContent = {
  badge: 'SAMBAL ULEG BAWANG & RAWIT MERAH ASLI',
  titlePrefix: 'Ayam Lezat,',
  titleHighlight: 'Sambal Gondes',
  titleSuffix: ', Harga Bersahabat',
  description: 'Kuliner ayam goreng & geprek khas racikan Pak Gondes di Grogol, Jakarta Barat. Sambal uleg pedas mantap, porsi mengenyangkan, dan harga ramah kantong mahasiswa & keluarga!',
  primaryButton: 'Lihat Menu Lengkap',
  secondaryButton: 'Pesan Sekarang',
  primaryTarget: 'menu',
  secondaryTarget: 'kontak',
  image: 'hero.jpg',
  imageAlt: 'Ayam geprek sambal Gondes khas Pak Gondes',
  stats: [
    { value: '100%', label: 'Bahan Halal' },
    { value: 'Rp 12rb', label: 'Mulai Dari' },
    { value: '4.9 ★', label: '1.500+ Ulasan' },
    { value: 'Promo', label: 'Pelajar Trisakti / Untar / Ukrida' },
  ],
}

export function readHomeContent() {
  const savedContent = localStorage.getItem(HOME_CONTENT_STORAGE_KEY)
  if (!savedContent) return defaultHomeContent

  try {
    const content = JSON.parse(savedContent)
    if (
      !content
      || typeof content.badge !== 'string'
      || typeof content.titlePrefix !== 'string'
      || typeof content.titleHighlight !== 'string'
      || typeof content.titleSuffix !== 'string'
      || typeof content.description !== 'string'
      || typeof content.primaryButton !== 'string'
      || typeof content.secondaryButton !== 'string'
      || !homeButtonTargets.some((target) => target.value === content.primaryTarget)
      || !homeButtonTargets.some((target) => target.value === content.secondaryTarget)
      || typeof content.image !== 'string'
      || typeof content.imageAlt !== 'string'
      || !Array.isArray(content.stats)
      || content.stats.length !== 4
      || content.stats.some((stat) => (
        !stat
        || typeof stat.value !== 'string'
        || typeof stat.label !== 'string'
      ))
    ) {
      return defaultHomeContent
    }
    return content
  } catch {
    return defaultHomeContent
  }
}

export function saveHomeContent(content) {
  localStorage.setItem(HOME_CONTENT_STORAGE_KEY, JSON.stringify(content))
}
// Canonical, ordered list of CS categories used across the site.
// Both the Textbooks page and the University curriculum page render
// filters in this exact order, so the taxonomy stays consistent.
export const CATEGORY_ORDER = [
  'Programlama',
  'Ayrık Matematik',
  'Doğrusal Cebir',
  'İstatistik',
  'Algoritmalar',
  'Hesaplama Teorisi',
  'Programlama Dilleri',
  'Derleyiciler',
  'Bilgisayar Mimarisi',
  'Bilgisayar Sistemleri',
  'İşletim Sistemleri',
  'Bilgisayar Ağları',
  'Dağıtık Sistemler',
  'Veritabanları',
  'Yazılım Mühendisliği',
  'Kriptografi',
  'Bilgisayar Grafikleri',
  'Bilgisayar Görüşü',
  'Yapay Zeka',
  'Makine Öğrenmesi',
  'Derin Öğrenme',
  'Kuvvetlendirmeli Öğrenme',
  'Kuantum Hesaplama',
]

// Stable comparator for arrays of category names.
export function orderCategories(list) {
  const idx = Object.fromEntries(CATEGORY_ORDER.map((c, i) => [c, i]))
  return [...list].sort((a, b) => {
    const ai = idx[a] ?? 999
    const bi = idx[b] ?? 999
    return ai - bi
  })
}

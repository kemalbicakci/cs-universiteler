import { useMemo, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { universities, categoryColors } from '../data/universities'
import { textbooks } from '../data/textbooks'
import { CATEGORY_ORDER, orderCategories } from '../data/categories'

// Build a map: category → top textbook (by usageCount)
const TOP_BOOK_BY_CATEGORY = (() => {
  const byCat = {}
  textbooks.forEach(b => {
    if (!byCat[b.category] || byCat[b.category].usageCount < b.usageCount) {
      byCat[b.category] = b
    }
  })
  return byCat
})()

export default function UniversityDetail() {
  const { id } = useParams()
  const uni = universities.find(u => u.id === id)
  const [activeCategory, setActiveCategory] = useState('Tümü')

  // All 23 categories always shown, in canonical order (same as Textbooks page).
  const categories = useMemo(() => ['Tümü', ...CATEGORY_ORDER], [])

  // Count of courses per category for this university (to dim empty chips).
  const categoryCounts = useMemo(() => {
    if (!uni) return {}
    const counts = {}
    uni.courses.forEach(c => { counts[c.category] = (counts[c.category] || 0) + 1 })
    return counts
  }, [uni])

  const sortedCourses = useMemo(() => {
    if (!uni) return []
    // Order courses by canonical category order, preserving original order within a category.
    const catOrder = Object.fromEntries(
      categories.filter(c => c !== 'Tümü').map((c, i) => [c, i])
    )
    return [...uni.courses]
      .map((c, i) => ({ c, i }))
      .sort((a, b) => {
        const ai = catOrder[a.c.category] ?? 999
        const bi = catOrder[b.c.category] ?? 999
        return ai - bi || a.i - b.i
      })
      .map(x => x.c)
  }, [uni, categories])

  const filteredCourses = useMemo(() => {
    if (activeCategory === 'Tümü') return sortedCourses
    return sortedCourses.filter(c => c.category === activeCategory)
  }, [sortedCourses, activeCategory])

  if (!uni) return <Navigate to="/universiteler" replace />

  return (
    <div>
      {/* Header */}
      <div className="uni-detail-header">
        <div className="uni-detail-header-inner">
          <Link to="/universiteler" className="uni-detail-back">
            ← Üniversiteler
          </Link>
          <div className="uni-detail-title-row">
            <span className="uni-detail-flag">{uni.flag}</span>
            <div>
              <h1 className="uni-detail-name">{uni.name}</h1>
              <div className="uni-detail-fullname">{uni.fullName}</div>
            </div>
          </div>
          <div className="uni-detail-meta">
            <span className="uni-detail-meta-item">🏆 QS Sıralama #{uni.rank}</span>
            <span className="uni-detail-meta-item">📍 {uni.city}</span>
            <span className="uni-detail-meta-item">🌍 {uni.country}</span>
            <span className="uni-detail-meta-item">📅 Kur. {uni.founded}</span>
            <span className="uni-detail-meta-item">📖 {uni.courses.length} ders</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="uni-detail-content">
        <div className="uni-detail-description">
          {uni.description}
        </div>

        <div className="courses-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <h2 className="courses-title" style={{ margin: 0 }}>Müfredat</h2>
            {uni.curriculumUrl && (
              <a
                href={uni.curriculumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="curriculum-source-link"
                title="Resmi müfredat kaynağı"
              >
                🎓 Resmi kaynak ↗
              </a>
            )}
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {filteredCourses.length} ders gösteriliyor
          </span>
        </div>

        {/* Category filter */}
        <div className="category-filter">
          {categories.map(cat => {
            const count = cat === 'Tümü' ? uni.courses.length : (categoryCounts[cat] || 0)
            const empty = count === 0
            return (
            <button
              key={cat}
              className={'chip' + (activeCategory === cat ? ' active' : '') + (empty ? ' chip-empty' : '')}
              onClick={() => { if (!empty) setActiveCategory(cat) }}
              disabled={empty}
              title={empty ? `Bu üniversitede ${cat} kategorisinde ders yok` : undefined}
              style={
                activeCategory === cat || cat === 'Tümü'
                  ? {}
                  : empty
                    ? {}
                    : { borderColor: categoryColors[cat] + '44', color: categoryColors[cat] }
              }
            >
              {cat !== 'Tümü' && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: empty ? '#cbd5e0' : categoryColors[cat],
                    marginRight: 5,
                  }}
                />
              )}
              {cat}
            </button>
          )})}
        </div>

        {/* Courses grouped by year */}
        {YEAR_SECTIONS.map(({ key, label }) => {
          const yearCourses = filteredCourses.filter(c => (c.year ?? 'elective') === key)
          if (yearCourses.length === 0) return null
          return (
            <section key={key} className="year-section">
              <div className="year-header">
                <h3 className="year-title">{label}</h3>
                <span className="year-count">{yearCourses.length} ders</span>
              </div>
              <div className="courses-grid">
                {yearCourses.map((course, i) => renderCourseCard(course, i))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

const YEAR_SECTIONS = [
  { key: 1, label: '1. Sınıf' },
  { key: 2, label: '2. Sınıf' },
  { key: 3, label: '3. Sınıf' },
  { key: 4, label: '4. Sınıf' },
  { key: 'elective', label: 'Seçmeli' },
]

function renderCourseCard(course, i) {
  const color = categoryColors[course.category] || '#718096'
  const book = TOP_BOOK_BY_CATEGORY[course.category]
  const cardInner = (
    <>
      <div className="course-dot" style={{ background: color }} />
      <div className="course-info">
        <div className="course-code">{course.code}</div>
        <div className="course-name">{course.name}</div>
        <div className="course-footer">
          <span
            className="course-badge"
            style={{
              background: color + '18',
              color: color,
              border: `1px solid ${color}33`,
            }}
          >
            {course.category}
          </span>
          {book && (
            <span
              className="course-book-link"
              title={`${book.title} — ${book.shortAuthors}`}
            >
              📖 {book.shortAuthors}{book.url ? ' ↗' : ''}
            </span>
          )}
        </div>
      </div>
    </>
  )
  if (book && book.url) {
    return (
      <a
        key={i}
        href={book.url}
        target="_blank"
        rel="noopener noreferrer"
        className="course-card course-card-link"
        title={`${book.title} — ${book.shortAuthors}`}
      >
        {cardInner}
      </a>
    )
  }
  if (book) {
    return (
      <Link
        key={i}
        to="/kitaplar"
        className="course-card course-card-link"
        title={`${book.title} — ${book.shortAuthors}`}
      >
        {cardInner}
      </Link>
    )
  }
  return (
    <div key={i} className="course-card">
      {cardInner}
    </div>
  )
}

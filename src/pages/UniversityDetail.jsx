import { useMemo, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { universities, categoryColors } from '../data/universities'
import { textbooks } from '../data/textbooks'
import { orderCategories } from '../data/categories'

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

  const categories = useMemo(() => {
    if (!uni) return []
    return ['Tümü', ...orderCategories([...new Set(uni.courses.map(c => c.category))])]
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
          <h2 className="courses-title">Müfredat</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {filteredCourses.length} ders gösteriliyor
          </span>
        </div>

        {/* Category filter */}
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={'chip' + (activeCategory === cat ? ' active' : '')}
              onClick={() => setActiveCategory(cat)}
              style={
                activeCategory === cat || cat === 'Tümü'
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
                    background: categoryColors[cat],
                    marginRight: 5,
                  }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Courses grid */}
        <div className="courses-grid">
          {filteredCourses.map((course, i) => {
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
          })}
        </div>
      </div>
    </div>
  )
}

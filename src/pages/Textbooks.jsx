import { useState, useMemo } from 'react'
import { textbooks, categoryColors } from '../data/textbooks'

const MAX_USAGE = Math.max(...textbooks.map(b => b.usageCount))
const CATEGORIES = ['Tümü', ...new Set(textbooks.map(b => b.category))]

export default function Textbooks() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tümü')

  const filtered = useMemo(() => {
    return textbooks.filter(b => {
      const matchSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.shortAuthors.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === 'Tümü' || b.category === category
      return matchSearch && matchCat
    })
  }, [search, category])

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">📚 En Çok Okutulan Kitaplar</h1>
        <p className="page-subtitle">
          Dünyanın önde gelen CS üniversitelerinde kullanım sıklığına göre sıralanmış ders kitapları
        </p>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="Kitap veya yazar ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Category chips */}
      <div className="filter-chips" style={{ marginBottom: 28 }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={'chip' + (category === cat ? ' active' : '')}
            onClick={() => setCategory(cat)}
            style={
              category === cat || cat === 'Tümü'
                ? {}
                : {
                    borderColor: (categoryColors[cat] || '#718096') + '55',
                    color: categoryColors[cat] || '#718096',
                  }
            }
          >
            {cat !== 'Tümü' && (
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: categoryColors[cat] || '#718096',
                  marginRight: 5,
                }}
              />
            )}
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-text">Sonuç bulunamadı</div>
        </div>
      ) : (
        <div className="textbooks-list">
          {filtered.map(book => {
            const catColor = categoryColors[book.category] || '#718096'
            return (
              <div key={book.id} className="book-card">
                <div className="book-card-inner">
                  {/* Rank */}
                  <div className="book-rank-col">
                    <span className={'book-rank-num' + (book.rank <= 3 ? ' top3' : '')}>
                      #{book.rank}
                    </span>
                  </div>

                  {/* Color spine */}
                  <div
                    className="book-spine"
                    style={{ background: book.coverColor }}
                  />

                  {/* Content */}
                  <div className="book-content">
                    <div className="book-header">
                      <div className="book-title-area">
                        <div className="book-title">{book.title}</div>
                        {book.subtitle && (
                          <div className="book-subtitle">{book.subtitle}</div>
                        )}
                      </div>
                      <span
                        className="book-badge"
                        style={{
                          background: catColor + '18',
                          color: catColor,
                          border: `1px solid ${catColor}44`,
                        }}
                      >
                        {book.category}
                      </span>
                    </div>

                    <div className="book-authors">{book.shortAuthors}</div>

                    <div className="book-meta">
                      <span className="book-meta-item">📖 {book.edition}</span>
                      <span className="book-meta-item">📅 {book.year}</span>
                      <span className="book-meta-item">🏢 {book.publisher}</span>
                      {book.isbn !== '—' && (
                        <span className="book-meta-item">ISBN: {book.isbn}</span>
                      )}
                      {book.pages && (
                        <span className="book-meta-item">📄 {book.pages.toLocaleString()} sayfa</span>
                      )}
                    </div>

                    <p className="book-desc">{book.description}</p>

                    <div className="book-footer">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <div className="book-courses">
                          {book.courses.map(c => (
                            <span key={c} className="book-course-tag">{c}</span>
                          ))}
                        </div>
                        {book.openAccess && (
                          <span className="open-access-badge">✓ Açık Erişim</span>
                        )}
                      </div>

                      <div className="usage-bar-container">
                        <span className="usage-label">{book.usageCount}+ üniversite</span>
                        <div className="usage-bar">
                          <div
                            className="usage-fill"
                            style={{
                              width: `${(book.usageCount / MAX_USAGE) * 100}%`,
                              background: `linear-gradient(90deg, ${book.coverColor}, ${book.coverColor}aa)`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Universities using this book */}
                    <details style={{ marginTop: 14 }}>
                      <summary style={{ fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        Bu kitabı kullanan üniversiteler ({book.usedAt.length})
                      </summary>
                      <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {book.usedAt.map(u => (
                          <span
                            key={u}
                            style={{
                              fontSize: '0.72rem',
                              padding: '2px 8px',
                              background: 'var(--bg)',
                              border: '1px solid var(--border)',
                              borderRadius: 20,
                              color: 'var(--text-light)',
                            }}
                          >
                            {u}
                          </span>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

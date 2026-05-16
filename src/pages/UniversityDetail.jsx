import { useParams, Link, Navigate } from 'react-router-dom'
import { universities } from '../data/universities'
import { textbooks } from '../data/textbooks'

export default function UniversityDetail() {
  const { id } = useParams()
  const uni = universities.find(u => u.id === id)
  if (!uni) return <Navigate to="/universiteler" replace />

  // Books that cite this university (with the direct citation URL).
  const citingBooks = textbooks
    .map(b => {
      const entry = (b.usedAt || []).find(e => e.name === uni.name)
      return entry ? { book: b, entry } : null
    })
    .filter(Boolean)
    .sort((a, b) => a.book.title.localeCompare(b.book.title))

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
            {uni.rank && <span className="uni-detail-meta-item">🏆 QS Sıralama #{uni.rank}</span>}
            {uni.city && <span className="uni-detail-meta-item">📍 {uni.city}</span>}
            {uni.country && <span className="uni-detail-meta-item">🌍 {uni.country}</span>}
            {uni.founded && <span className="uni-detail-meta-item">📅 Kur. {uni.founded}</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="uni-detail-content">
        {uni.description && (
          <div className="uni-detail-description">
            {uni.description}
          </div>
        )}

        {uni.curriculumUrl && (
          <div className="uni-detail-source-card">
            <div className="uni-detail-source-title">Resmi bölüm sayfası</div>
            <p className="uni-detail-source-desc">
              Lisans müfredatı, ders kataloğu, sınav takvimi ve duyurular için bölümün resmi sayfasını ziyaret edin.
            </p>
            <a
              href={uni.curriculumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="curriculum-source-link"
            >
              🎓 Resmi kaynağa git ↗
            </a>
          </div>
        )}

        {citingBooks.length > 0 && (
          <div className="uni-detail-source-card">
            <div className="uni-detail-source-title">
              📚 Bu üniversitenin syllabus'unda ismen geçen ders kitapları ({citingBooks.length})
            </div>
            <p className="uni-detail-source-desc">
              Aşağıdaki kitaplar, bu üniversitenin açık kaynaklı bir ders programında doğrulanmış şekilde
              kullanılıyor. Her satırdaki link, kitabın geçtiği orijinal syllabus sayfasına gider; 📦 ikonu
              Wayback Machine snapshot'ına yönlendirir.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, width: '100%' }}>
              {citingBooks.map(({ book, entry }) => (
                <div key={book.id} className="uni-citing-book">
                  <div className="uni-citing-book-info">
                    <div className="uni-citing-book-title">{book.title}</div>
                    <div className="uni-citing-book-author">{book.shortAuthors} · {book.category}</div>
                  </div>
                  <span className="evidence-pill" style={{ flexShrink: 0 }}>
                    <a href={entry.url} target="_blank" rel="noopener noreferrer" className="evidence-pill-link">
                      Syllabus ↗
                    </a>
                    {entry.archive && (
                      <a
                        href={entry.archive}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="evidence-archive-link"
                        title="Wayback Machine snapshot"
                      >
                        📦
                      </a>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

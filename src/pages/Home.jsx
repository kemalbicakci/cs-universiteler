import { Link } from 'react-router-dom'
import { universities } from '../data/universities'
import { textbooks } from '../data/textbooks'

const PREVIEW_UNIS = universities.slice(0, 6)
const PREVIEW_BOOKS = textbooks.slice(0, 4)

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-icon">🎓</div>
          <h1 className="hero-title">
            Dünya CS Müfredatlarını<br />Keşfedin
          </h1>
          <p className="hero-desc">
            QS sıralamasında ilk 30'a giren bilgisayar bilimleri üniversitelerinin
            müfredatları ve en çok okutulan ders kitapları tek bir platformda.
          </p>
          <div className="hero-actions">
            <Link to="/universiteler" className="btn btn-primary">
              🏛 Üniversitelere Göz At
            </Link>
            <Link to="/kitaplar" className="btn btn-outline">
              📚 En Çok Okutulan Kitaplar
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item">
            <div className="stat-number">{universities.length}</div>
            <div className="stat-label">Üniversite</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {universities.reduce((s, u) => s + u.courses.length, 0)}+
            </div>
            <div className="stat-label">Ders</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{textbooks.length}</div>
            <div className="stat-label">Ders Kitabı</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {[...new Set(universities.map(u => u.country))].length}
            </div>
            <div className="stat-label">Ülke</div>
          </div>
        </div>
      </div>

      {/* Preview: Universities */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">🏆 Öne Çıkan Üniversiteler</h2>
          <Link to="/universiteler" className="section-link">
            Tümünü Gör →
          </Link>
        </div>
        <div className="uni-grid">
          {PREVIEW_UNIS.map(uni => (
            <Link to={`/universiteler/${uni.id}`} key={uni.id} className="uni-card">
              <div className="uni-card-bar" style={{ background: uni.color }} />
              <div className="uni-card-body">
                <div className="uni-card-header">
                  <span className="uni-rank">#{uni.rank}</span>
                  <span className="uni-flag">{uni.flag}</span>
                </div>
                <div className="uni-name">{uni.name}</div>
                <div className="uni-fullname">{uni.fullName}</div>
                <div className="uni-meta">
                  <span className="uni-meta-item">📍 {uni.city}</span>
                  <span className="uni-meta-item">🌍 {uni.country}</span>
                </div>
                <div className="uni-course-count">
                  📖 {uni.courses.length} ders
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Preview: Top Books */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">📚 En Çok Okutulan Kitaplar</h2>
          <Link to="/kitaplar" className="section-link">
            Tümünü Gör →
          </Link>
        </div>
        <div className="home-books-grid">
          {PREVIEW_BOOKS.map(book => (
            <Link to="/kitaplar" key={book.id} className="home-book-card">
              <div
                className="home-book-cover"
                style={{ background: `linear-gradient(135deg, ${book.coverColor}cc, ${book.coverColor})` }}
              >
                <span className="home-book-rank">#{book.rank}</span>
                <span className="home-book-icon">📖</span>
              </div>
              <div className="home-book-body">
                <div className="home-book-title">{book.title}</div>
                <div className="home-book-author">{book.shortAuthors}</div>
                <div className="home-book-usage">
                  {book.usageCount}+ üniversite
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#f0f4f8', borderTop: '1px solid #e2e8f0', padding: '48px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 12 }}>
          Hangi kitabı okumalıyım?
        </h2>
        <p style={{ color: 'var(--text-light)', marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
          Dünyanın en iyi CS üniversitelerinde hangi kitapların kullanıldığını görün ve
          kendi öğrenim yolunuzu planlayın.
        </p>
        <Link to="/kitaplar" className="btn btn-primary" style={{ display: 'inline-flex', background: 'var(--primary)', color: 'white' }}>
          📚 Kitap Listesine Git
        </Link>
      </section>
    </div>
  )
}

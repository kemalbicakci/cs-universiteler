import { useState } from 'react'
import { Link } from 'react-router-dom'
import { universities } from '../data/universities'
import { textbooks } from '../data/textbooks'

const WORLD_UNIS = universities.filter(u => u.region === 'world')
const TR_UNIS = universities.filter(u => u.region === 'tr')
const PREVIEW_BOOKS = textbooks.slice(0, 4)

export default function Home() {
  const [region, setRegion] = useState('world')
  const regionUnis = region === 'tr' ? TR_UNIS : WORLD_UNIS
  const previewUnis = regionUnis.slice(0, 6)
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-icon">🎓</div>
          <h1 className="hero-title">
            CS Müfredatlarını<br />Keşfedin
          </h1>
          <p className="hero-desc">
            {region === 'tr'
              ? "Türkiye'nin önde gelen Bilgisayar Mühendisliği programlarının müfredatları, yıllara göre dersler ve kullanılan kitaplar."
              : "Dünyanın ilk 30 bilgisayar bilimleri üniversitesinin müfredatları ve en çok okutulan ders kitapları tek platformda."}
          </p>

          {/* Region toggle */}
          <div className="region-toggle" role="tablist" aria-label="Bölge seçimi">
            <button
              role="tab"
              aria-selected={region === 'world'}
              className={'region-toggle-btn' + (region === 'world' ? ' active' : '')}
              onClick={() => setRegion('world')}
            >
              🌍 Dünya
            </button>
            <button
              role="tab"
              aria-selected={region === 'tr'}
              className={'region-toggle-btn' + (region === 'tr' ? ' active' : '')}
              onClick={() => setRegion('tr')}
            >
              🇹🇷 Türkiye
            </button>
          </div>

          <div className="hero-actions">
            <Link to={`/universiteler?region=${region}`} className="btn btn-primary">
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
            <div className="stat-number">{regionUnis.length}</div>
            <div className="stat-label">Üniversite</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {regionUnis.reduce((s, u) => s + u.courses.length, 0)}+
            </div>
            <div className="stat-label">Ders</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{textbooks.length}</div>
            <div className="stat-label">Ders Kitabı</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {[...new Set(regionUnis.map(u => u.city))].length}
            </div>
            <div className="stat-label">Şehir</div>
          </div>
        </div>
      </div>

      {/* Preview: Universities */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">
            {region === 'tr' ? '🇹🇷 Türkiye - Öne Çıkan Üniversiteler' : '🌍 Dünya - Öne Çıkan Üniversiteler'}
          </h2>
          <Link to={`/universiteler?region=${region}`} className="section-link">
            Tümünü Gör →
          </Link>
        </div>
        <div className="uni-grid">
          {previewUnis.map(uni => (
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

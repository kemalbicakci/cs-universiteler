import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { universities } from '../data/universities'

export default function Universities() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialRegion = searchParams.get('region') === 'tr' ? 'tr' : 'world'
  const [region, setRegion] = useState(initialRegion)
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('Tümü')

  useEffect(() => {
    setSearchParams({ region }, { replace: true })
    setCountry('Tümü')
  }, [region])

  const regionUnis = useMemo(() => universities.filter(u => u.region === region), [region])
  const countries = useMemo(() => ['Tümü', ...new Set(regionUnis.map(u => u.country))], [regionUnis])

  const filtered = useMemo(() => {
    return regionUnis.filter(u => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.city.toLowerCase().includes(search.toLowerCase())
      const matchCountry = country === 'Tümü' || u.country === country
      return matchSearch && matchCountry
    })
  }, [regionUnis, search, country])

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">🏛 Üniversiteler</h1>
        <p className="page-subtitle">
          {region === 'tr'
            ? "Türkiye'nin önde gelen 30 Bilgisayar Mühendisliği programı"
            : "QS Dünya Üniversite Sıralamasına göre bilgisayar bilimlerinde ilk 30 üniversite"}
        </p>
      </div>

      {/* Region toggle */}
      <div className="region-toggle" role="tablist" aria-label="Bölge seçimi" style={{ marginBottom: 24 }}>
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

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="Üniversite ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {countries.length > 2 && (
          <select
            className="filter-select"
            value={country}
            onChange={e => setCountry(e.target.value)}
          >
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}
      </div>

      {/* Country chips (only when multiple countries) */}
      {countries.length > 2 && (
        <div className="filter-chips" style={{ marginBottom: 24 }}>
          {countries.map(c => (
            <button
              key={c}
              className={'chip' + (country === c ? ' active' : '')}
              onClick={() => setCountry(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-text">Sonuç bulunamadı</div>
        </div>
      ) : (
        <>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
            {filtered.length} üniversite listeleniyor
          </p>
          <div className="uni-grid">
            {filtered.map(uni => (
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
                  <div className="uni-meta" style={{ marginTop: 4 }}>
                    <span className="uni-meta-item">📅 Kur. {uni.founded}</span>
                  </div>
                  <div className="uni-course-count">
                    📖 {uni.courses.length} ders · Müfredatı gör →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

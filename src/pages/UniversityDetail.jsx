import { useParams, Link, Navigate } from 'react-router-dom'
import { universities } from '../data/universities'

export default function UniversityDetail() {
  const { id } = useParams()
  const uni = universities.find(u => u.id === id)
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
      </div>
    </div>
  )
}

import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Universities from './pages/Universities'
import UniversityDetail from './pages/UniversityDetail'
import Textbooks from './pages/Textbooks'

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <Navbar />
        <div className="site-disclaimer" role="note">
          <div className="site-disclaimer-inner">
            <span className="site-disclaimer-icon" aria-hidden="true">ℹ️</span>
            <span>
              <strong>Bu site bağımsız bir çalışmadır.</strong> Müfredatlar ilgili bölümlerin kamuya açık program yapılarına dayalı, en iyi çabayla hazırlanmış taslaklardır ve 2025–2026 müfredatlarıyla birebir örtüşmeyebilir. Güncel ve bağlayıcı bilgi için her üniversite sayfasındaki <em>“🎓 Resmi kaynak”</em> linkini kullanın. Ders kitabı eşleşmeleri de yaklaşıktır — kaynak listesi kapsamlı değildir.
            </span>
          </div>
        </div>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/universiteler" element={<Universities />} />
            <Route path="/universiteler/:id" element={<UniversityDetail />} />
            <Route path="/kitaplar" element={<Textbooks />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer-inner">
            <p>CS Müfredatları — Dünya'nın en iyi bilgisayar bilimleri üniversitelerini keşfedin</p>
            <p className="footer-sub">QS Dünya Üniversite Sıralamaları 2025 verilerine dayalı</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  )
}

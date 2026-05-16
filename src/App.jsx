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
              <strong>Bu site bağımsız bir çalışmadır.</strong> Her üniversite kartında resmi bölüm sayfasına bağlantı bulursunuz. Ders kitabı listesinde bir üniversite ancak ilgili kitap o bölümün açık kaynaklı bir ders programında <em>açıkça isim olarak</em> zikredilmişse görünür; aksi durumda kitap için herhangi bir kullanım sayısı veya bağlantı listelenmez. Her kanıt linkinin yanındaki <strong>📦</strong> ikonu, sayfa ileride taşınır veya kaldırılırsa diye Wayback Machine snapshot'ına gider. Hem ders kitapları hem üniversiteler, doğrulanmış kanıt sayısına göre sıralanır. <strong>Güncelleme / katkı / hata bildirimi için:</strong> <a href="mailto:bicakcikemal@gmail.com?subject=cs-universiteler%20katk%C4%B1" className="site-disclaimer-mail">bicakcikemal@gmail.com</a>
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
            <p>Bilgisayar Mühendisliği Ders Kitapları — Dünya ve Türkiye'nin önde gelen üniversitelerinde okutulan klasikler</p>
            <p className="footer-sub">
              Eksik bir kitap, hatalı bir link veya eklenmesi gereken bir syllabus mu var?{' '}
              <a href="mailto:bicakcikemal@gmail.com?subject=cs-universiteler%20katk%C4%B1" className="footer-mail">
                bicakcikemal@gmail.com
              </a>
              {' '}adresine yazın.
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  )
}

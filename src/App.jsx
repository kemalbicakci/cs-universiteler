import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Universities from './pages/Universities'
import UniversityDetail from './pages/UniversityDetail'
import Textbooks from './pages/Textbooks'
import About from './pages/About'

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/universiteler" element={<Universities />} />
            <Route path="/universiteler/:id" element={<UniversityDetail />} />
            <Route path="/kitaplar" element={<Textbooks />} />
            <Route path="/yontem" element={<About />} />
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
            <p className="footer-sub">
              Hazırlayan:{' '}
              <a href="https://www.kemalbicakci.com" target="_blank" rel="noopener noreferrer" className="footer-mail">
                Kemal Bıçakcı
              </a>
              {' '}· Kaynak kodu:{' '}
              <a href="https://github.com/kemalbicakci/cs-universiteler" target="_blank" rel="noopener noreferrer" className="footer-mail">
                github.com/kemalbicakci/cs-universiteler
              </a>
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  )
}

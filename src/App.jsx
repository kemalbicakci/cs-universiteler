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

import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <span>🎓</span>
          CS Müfredatları
        </NavLink>
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
          >
            Ana Sayfa
          </NavLink>
          <NavLink
            to="/universiteler"
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
          >
            Üniversiteler
          </NavLink>
          <NavLink
            to="/kitaplar"
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
          >
            Kitaplar
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

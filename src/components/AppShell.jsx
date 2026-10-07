import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CalendarPlus, Home, LogOut, Menu, PawPrint, X } from 'lucide-react'
import { useState } from 'react'

export default function AppShell({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  function logout() {
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/dashboard" aria-label="PetCare - página inicial">
          <span className="brand-mark"><PawPrint size={23} aria-hidden="true" /></span>
          <span>PetCare</span>
        </Link>

        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>

        <nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Navegação principal">
          <Link className={location.pathname === '/dashboard' ? 'active' : ''} to="/dashboard" onClick={() => setOpen(false)}>
            <Home size={18} aria-hidden="true" /> Início
          </Link>
          <Link className={location.pathname.includes('/compromissos') ? 'active' : ''} to="/compromissos/novo" onClick={() => setOpen(false)}>
            <CalendarPlus size={18} aria-hidden="true" /> Novo compromisso
          </Link>
          <button className="nav-logout" onClick={logout}>
            <LogOut size={18} aria-hidden="true" /> Sair
          </button>
        </nav>
      </header>
      <main className="main-content">{children}</main>
    </div>
  )
}

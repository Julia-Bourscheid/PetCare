'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CalendarPlus, Home, LogOut, Menu, PawPrint, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  function logout() {
    router.push('/login')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/dashboard" aria-label="PetCare - página inicial">
          <span className="brand-mark"><PawPrint size={23} aria-hidden="true" /></span>
          <span>PetCare</span>
        </Link>

        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>

        <nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Navegação principal">
          <Link className={pathname === '/dashboard' ? 'active' : ''} href="/dashboard" onClick={() => setOpen(false)}>
            <Home size={18} aria-hidden="true" /> Início
          </Link>
          <Link className={pathname.includes('/compromissos') ? 'active' : ''} href="/compromissos/novo" onClick={() => setOpen(false)}>
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

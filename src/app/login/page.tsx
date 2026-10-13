'use client'

import { PawPrint, Eye, EyeOff } from 'lucide-react'
import { useState, type SubmitEvent } from 'react'
import { useRouter } from 'next/navigation'
import { api, errorMessage } from '@/services/api'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Informe e-mail e senha para continuar.')
      return
    }

    setError('')
    setLoading(true)
    try {
      const user = await api.login(email.trim(), password)
      localStorage.setItem('petcare_user', user.name)
      router.push('/dashboard')
    } catch (err) {
      setError(errorMessage(err))
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-logo"><PawPrint size={50} aria-hidden="true" /></div>
        <p className="eyebrow">CUIDAR FICOU MAIS FÁCIL</p>
        <h1 id="login-title">Bem-vindo ao PetCare</h1>
        <p className="login-subtitle">Organize a rotina e os cuidados dos seus pets.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="Digite seu e-mail" />
          <label htmlFor="password">Senha</label>
          <div className="password-field">
            <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="Digite sua senha" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <button className="primary-button full" type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
        <p className="mock-note">Conta de demonstração: demo@petcare.com · senha petcare123</p>
      </section>
    </main>
  )
}

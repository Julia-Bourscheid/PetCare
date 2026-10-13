'use client'

import { PawPrint, Eye, EyeOff } from 'lucide-react'
import { useState, type SubmitEvent } from 'react'
import { useRouter } from 'next/navigation'
import { eyebrow, fieldError, fieldInput, fieldLabel, primaryButton } from '@/components/ui'
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
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#eef7f3,#f7faf9_50%)] p-[25px]">
      <section className="w-[min(440px,100%)] rounded-[23px] border border-line bg-white px-5 py-[27px] shadow-[0_15px_50px_rgba(47,75,65,.08)] xs:p-[38px]" aria-labelledby="login-title">
        <div className="mx-auto mb-5 grid size-20 place-items-center rounded-3xl bg-primary-light text-primary-dark"><PawPrint size={50} aria-hidden="true" /></div>
        <p className={`${eyebrow} text-center`}>CUIDAR FICOU MAIS FÁCIL</p>
        <h1 id="login-title" className="text-center text-[1.9rem]">Bem-vindo ao PetCare</h1>
        <p className="mb-7 text-center leading-normal text-muted">Organize a rotina e os cuidados dos seus pets.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label className={fieldLabel} htmlFor="email">E-mail</label>
          <input className={fieldInput} id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="Digite seu e-mail" />
          <label className={fieldLabel} htmlFor="password">Senha</label>
          <div className="relative">
            <input className={`${fieldInput} pr-[46px]`} id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="Digite sua senha" />
            <button className="absolute top-[5px] right-[5px] grid size-[38px] place-items-center text-muted" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
          {error && <p className={`${fieldError} mb-4`} role="alert">{error}</p>}
          <button className={`${primaryButton} mt-2.5 w-full`} type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
        <p className="mt-[18px] text-center text-xs text-muted">Conta de demonstração: demo@petcare.com · senha petcare123</p>
      </section>
    </main>
  )
}

import { PawPrint, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!user.trim() || !password.trim()) {
      setError('Informe usuário e senha para continuar.')
      return
    }

    setError('')
    localStorage.setItem('petcare_user', user.trim())
    navigate('/dashboard')
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-logo"><PawPrint size={50} aria-hidden="true" /></div>
        <p className="eyebrow">CUIDAR FICOU MAIS FÁCIL</p>
        <h1 id="login-title">Bem-vindo ao PetCare</h1>
        <p className="login-subtitle">Organize a rotina e os cuidados dos seus pets.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="user">Usuário</label>
          <input id="user" value={user} onChange={(e) => setUser(e.target.value)} autoComplete="username" placeholder="Digite seu usuário" />
          <label htmlFor="password">Senha</label>
          <div className="password-field">
            <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="Digite sua senha" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <button className="primary-button full" type="submit">Entrar</button>
        </form>
        <p className="mock-note">* Login demonstrativo para o projeto acadêmico.</p>
      </section>
    </main>
  )
}

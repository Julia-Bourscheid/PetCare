import { redirect } from 'next/navigation'

// Qualquer rota desconhecida volta para o login.
export default function UnknownRoute() {
  redirect('/login')
}

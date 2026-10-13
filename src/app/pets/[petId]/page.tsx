import { ArrowLeft, CalendarDays, PawPrint, Weight } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { getPet } from '@/database/pets/get-pet'
import { currentUser } from '@/lib/session'
import { isUuid } from '@/lib/uuid'

export default async function PetProfile({ params }: PageProps<'/pets/[petId]'>) {
  const user = await currentUser()
  if (!user) redirect('/login')

  const { petId } = await params
  const pet = isUuid(petId) ? await getPet(petId, user.id) : null

  if (!pet) {
    return (
      <AppShell>
        <section className="not-found">
          <h1>Pet não encontrado</h1>
          <Link href="/dashboard">Voltar ao painel</Link>
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <Link className="back-link" href="/dashboard"><ArrowLeft size={18} /> Voltar para o painel</Link>
      <section className="profile-card">
        <div className="profile-hero">
          <div className="profile-avatar" aria-hidden="true">{pet.icon}</div>
          <div>
            <p className="eyebrow">PERFIL DO PET</p>
            <h1>{pet.name}</h1>
            <p>{pet.type} · {pet.breed}</p>
          </div>
        </div>

        <div className="profile-grid">
          <div className="detail-item"><PawPrint size={20} /><span><small>Idade</small><strong>{pet.age}</strong></span></div>
          <div className="detail-item"><Weight size={20} /><span><small>Peso</small><strong>{pet.weight}</strong></span></div>
          <div className="detail-item"><CalendarDays size={20} /><span><small>Próxima vacina</small><strong>{pet.vaccine}</strong></span></div>
        </div>

        <div className="profile-description">
          <h2>Sobre {pet.name}</h2>
          <p>{pet.description}</p>
        </div>
      </section>
    </AppShell>
  )
}

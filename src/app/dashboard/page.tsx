'use client'

import { RefreshCw } from 'lucide-react'
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/AppShell'
import AppointmentCard from '@/components/AppointmentCard'
import PetCard from '@/components/PetCard'
import SummaryCard from '@/components/SummaryCard'
import Modal from '@/components/Modal'
import { errorBanner, eyebrow } from '@/components/ui'
import { api, errorMessage } from '@/services/api'
import type { Appointment, Pet } from '@/types'

const placeholder = 'rounded-[14px] border border-dashed border-line bg-white p-[35px] text-center text-muted'

// localStorage só existe no navegador; no servidor a saudação usa o nome padrão.
const subscribeToUser = () => () => {}
const getUser = () => localStorage.getItem('petcare_user') || 'usuário'
const getServerUser = () => 'usuário'

export default function Dashboard() {
  const router = useRouter()
  const [pets, setPets] = useState<Pet[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [filter, setFilter] = useState('Todos')
  const user = useSyncExternalStore(subscribeToUser, getUser, getServerUser)

  function loadDashboard() {
    return Promise.all([api.getPets(), api.getAppointments()])
      .then(([petsData, appointmentsData]) => {
        setPets(petsData)
        setAppointments(appointmentsData)
        setError('')
      })
      .catch(err => setError(errorMessage(err)))
      .finally(() => setLoading(false))
  }

  function retry() {
    setLoading(true)
    setError('')
    loadDashboard()
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'Todos') return appointments
    return appointments.filter(item => item.category === filter)
  }, [appointments, filter])

  async function remove(id: string) {
    if (!window.confirm('Deseja realmente excluir este compromisso?')) return
    try {
      await api.deleteAppointment(id)
      setAppointments(current => current.filter(item => item.id !== id))
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  async function toggleComplete(item: Appointment) {
    try {
      const updated = await api.updateAppointment(item.id, { completed: !item.completed })
      setAppointments(current => current.map(currentItem => currentItem.id === item.id ? updated : currentItem))
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  return (
    <AppShell>
      <section className="mb-7 flex flex-col items-stretch gap-[18px] md:flex-row md:items-end md:justify-between md:gap-[30px]">
        <div>
          <p className={eyebrow}>SEU PAINEL</p>
          <h1>Olá, {user}! <span aria-hidden="true">🐾</span></h1>
          <p className="text-muted">Acompanhe os cuidados e os próximos compromissos dos seus pets.</p>
        </div>
      </section>

      <section className="mb-[38px] grid grid-cols-1 gap-[15px] md:grid-cols-3" aria-label="Resumo">
        <SummaryCard icon="🐾" value={pets.length} label="Pets cadastrados" />
        <SummaryCard icon="💉" value="1" label="Vacina pendente" detail="Próxima: 15/10" />
        <SummaryCard icon="🍽️" value={appointments.filter(a => a.category === 'Alimentação').length} label="Refeições" detail="Hoje" />
      </section>

      <section className="mt-[38px]">
        <div className="mb-4">
          <h2>Seus pets</h2>
          <p className="text-muted">Selecione um pet para ver seus detalhes.</p>
        </div>
        <div className="grid grid-cols-1 gap-[15px] md:grid-cols-3">
          {pets.map(pet => <PetCard key={pet.id} pet={pet} />)}
        </div>
      </section>

      <section className="mt-[38px]">
        <div className="mb-4 flex flex-col items-stretch gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2>Próximos compromissos</h2>
            <p className="text-muted">Organize a rotina dos seus pets.</p>
          </div>
          <div className="flex flex-wrap justify-start gap-[5px] md:justify-end" aria-label="Filtrar compromissos">
            {['Todos', 'Alimentação', 'Rotina', 'Higiene', 'Saúde'].map(option => (
              <button
                key={option}
                className={`rounded-[9px] border px-2.5 py-[7px] text-[.8rem] font-bold ${filter === option ? 'border-[#bfd2c9] bg-primary-light text-primary-dark' : 'border-line bg-white text-muted hover:border-[#bfd2c9] hover:bg-primary-light hover:text-primary-dark'}`}
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className={errorBanner} role="alert">
            <span>{error}</span>
            <button className="inline-flex items-center gap-1.5 font-extrabold" onClick={retry}><RefreshCw size={16} /> Tentar novamente</button>
          </div>
        )}

        {loading ? (
          <div className={placeholder}>Carregando compromissos...</div>
        ) : filtered.length === 0 ? (
          <div className={placeholder}>Nenhum compromisso encontrado para este filtro.</div>
        ) : (
          <div className="grid gap-2.5">
            {filtered.map(item => (
              <AppointmentCard
                key={item.id}
                appointment={item}
                onEdit={() => router.push(`/compromissos/${item.id}/editar`)}
                onDelete={remove}
                onComplete={toggleComplete}
              />
            ))}
          </div>
        )}
      </section>

      <Modal open={Boolean(selectedAppointment)} title="Detalhes do compromisso" onClose={() => setSelectedAppointment(null)}>
        {selectedAppointment && <p>{selectedAppointment.title}</p>}
      </Modal>
    </AppShell>
  )
}


'use client'

import { RefreshCw } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/AppShell'
import AppointmentCard, { formatDate } from '@/components/AppointmentCard'
import PetCard from '@/components/PetCard'
import SummaryCard from '@/components/SummaryCard'
import Modal from '@/components/Modal'
import { errorBanner } from '@/components/ui'
import { api, errorMessage } from '@/services/api'
import type { Appointment, Pet } from '@/types'

const placeholder =
  'rounded-[14px] border border-dashed border-line bg-white p-[35px] text-center text-muted'

const emptyPetForm = {
  name: '',
  type: 'Cachorro',
  breed: '',
  age: '',
  weight: '',
  vaccine: '',
  icon: '🐾',
  description: '',
}

export default function Dashboard() {
  const router = useRouter()

  const [pets, setPets] = useState<Pet[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null)

  const [petModalOpen, setPetModalOpen] = useState(false)
  const [petSaving, setPetSaving] = useState(false)
  const [petForm, setPetForm] = useState(emptyPetForm)

  const [filter, setFilter] = useState('Todos')

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

  async function savePet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (petSaving) return

    setPetSaving(true)
    setError('')

    try {
      const newPet = await api.createPet({
        ...petForm,
        name: petForm.name.trim(),
        breed: petForm.breed.trim(),
        description: petForm.description.trim(),
      })

      setPets(current =>
        [...current, newPet].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      )

      setPetModalOpen(false)
      setPetForm({ ...emptyPetForm })
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setPetSaving(false)
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Deseja realmente excluir este compromisso?')) {
      return
    }

    try {
      await api.deleteAppointment(id)
      setAppointments(current =>
        current.filter(item => item.id !== id),
      )
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  async function toggleComplete(item: Appointment) {
    try {
      const updated = await api.updateAppointment(item.id, {
        completed: !item.completed,
      })

      setAppointments(current =>
        current.map(currentItem =>
          currentItem.id === item.id ? updated : currentItem,
        ),
      )
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  return (
    <AppShell>
      {/* Cadastro e listagem dos pets: aparece apenas uma vez */}
      <section className="mt-[38px]">
        <div className="mb-4">
          <h2>Seus pets</h2>
          <p className="text-muted">
            Selecione um pet para ver seus detalhes.
          </p>
        </div>

        <div className="mb-5 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setError('')
              setPetModalOpen(true)
            }}
            className="rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:opacity-90"
          >
            + Cadastrar pet
          </button>
        </div>

        {pets.length === 0 ? (
          <div className={placeholder}>
            Você ainda não cadastrou nenhum pet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-[15px] md:grid-cols-3">
            {pets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </section>

      {error && (
        <div className={`${errorBanner} mb-5`} role="alert">
          <span>{error}</span>
          <button
            className="inline-flex items-center gap-1.5 font-extrabold"
            onClick={retry}
          >
            <RefreshCw size={16} />
            Tentar novamente
          </button>
        </div>
      )}

      {/* Cartões de resumo */}
      <section
        className="mb-[38px] mt-[38px] grid grid-cols-1 gap-[15px] md:grid-cols-3"
        aria-label="Resumo"
      >
        <SummaryCard
          icon="🐾"
          value={pets.length}
          label="Pets cadastrados"
        />

        <SummaryCard
          icon="💉"
          value="1"
          label="Vacina pendente"
          detail="Próxima: 15/10"
        />

        <SummaryCard
          icon="🍽️"
          value={
            appointments.filter(a => a.category === 'Alimentação').length
          }
          label="Refeições"
          detail="Hoje"
        />
      </section>

      {/* Próximos compromissos */}
      <section className="mt-[38px]">
        <div className="mb-4 flex flex-col items-stretch gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2>Próximos compromissos</h2>
            <p className="text-muted">
              Organize a rotina dos seus pets.
            </p>
          </div>

          <div
            className="flex flex-wrap justify-start gap-[5px] md:justify-end"
            aria-label="Filtrar compromissos"
          >
            {[
              'Todos',
              'Alimentação',
              'Rotina',
              'Higiene',
              'Saúde',
            ].map(option => (
              <button
                key={option}
                className={`rounded-[9px] border px-2.5 py-[7px] text-[.8rem] font-bold ${
                  filter === option
                    ? 'border-[#bfd2c9] bg-primary-light text-primary-dark'
                    : 'border-line bg-white text-muted hover:border-[#bfd2c9] hover:bg-primary-light hover:text-primary-dark'
                }`}
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className={placeholder}>
            Carregando compromissos...
          </div>
        ) : filtered.length === 0 ? (
          <div className={placeholder}>
            Nenhum compromisso encontrado para este filtro.
          </div>
        ) : (
          <div className="grid gap-2.5">
            {filtered.map(item => (
              <AppointmentCard
                key={item.id}
                appointment={item}
                onView={setSelectedAppointment}
                onEdit={() =>
                  router.push(`/compromissos/${item.id}/editar`)
                }
                onDelete={remove}
                onComplete={toggleComplete}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal de cadastro de pet */}
      <Modal
        open={petModalOpen}
        title="Cadastrar novo pet"
        onClose={() => {
          if (!petSaving) setPetModalOpen(false)
        }}
      >
        <form onSubmit={savePet} className="grid gap-4">
          <label className="grid gap-1">
            Nome *
            <input
              required
              maxLength={100}
              value={petForm.name}
              onChange={e =>
                setPetForm({ ...petForm, name: e.target.value })
              }
              className="rounded-lg border border-line p-3"
              placeholder="Nome do pet"
            />
          </label>

          <label className="grid gap-1">
            Tipo *
            <select
              required
              value={petForm.type}
              onChange={e =>
                setPetForm({ ...petForm, type: e.target.value })
              }
              className="rounded-lg border border-line p-3"
            >
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
              <option value="Outro">Outro</option>
            </select>
          </label>

          <label className="grid gap-1">
            Raça *
            <input
              required
              maxLength={100}
              value={petForm.breed}
              onChange={e =>
                setPetForm({ ...petForm, breed: e.target.value })
              }
              className="rounded-lg border border-line p-3"
              placeholder="Raça do pet"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1">
              Idade *
              <input
                required
                type="number"
                min="0"
                max="100"
                step="1"
                value={petForm.age}
                onChange={e =>
                  setPetForm({ ...petForm, age: e.target.value })
                }
                className="min-w-0 rounded-lg border border-line p-3"
              />
            </label>

            <label className="grid gap-1">
              Peso (kg) *
              <input
                required
                type="number"
                min="0.1"
                max="1000"
                step="0.1"
                value={petForm.weight}
                onChange={e =>
                  setPetForm({ ...petForm, weight: e.target.value })
                }
                className="min-w-0 rounded-lg border border-line p-3"
              />
            </label>
          </div>

          <label className="grid gap-1">
            Próxima vacina
            <input
              type="date"
              value={petForm.vaccine}
              onChange={e =>
                setPetForm({ ...petForm, vaccine: e.target.value })
              }
              className="rounded-lg border border-line p-3"
            />
          </label>

          <label className="grid gap-1">
            Observações
            <textarea
              maxLength={1000}
              value={petForm.description}
              onChange={e =>
                setPetForm({ ...petForm, description: e.target.value })
              }
              className="rounded-lg border border-line p-3"
              rows={3}
              placeholder="Informações importantes sobre o pet"
            />
          </label>

          <button
            type="submit"
            disabled={petSaving}
            className="rounded-xl bg-primary px-5 py-3 font-bold text-white disabled:opacity-60"
          >
            {petSaving ? 'Salvando...' : 'Salvar pet'}
          </button>
        </form>
      </Modal>

      {/* Modal de detalhes do compromisso */}
      <Modal
        open={Boolean(selectedAppointment)}
        title="Detalhes do compromisso"
        onClose={() => setSelectedAppointment(null)}
      >
        {selectedAppointment && (
          <dl className="grid grid-cols-[auto_1fr] gap-x-[18px] gap-y-2.5 [&_dt]:font-bold [&_dt]:text-muted">
            <dt>Compromisso</dt>
            <dd>{selectedAppointment.title}</dd>

            <dt>Pet</dt>
            <dd>{selectedAppointment.pet}</dd>

            <dt>Categoria</dt>
            <dd>{selectedAppointment.category}</dd>

            <dt>Data</dt>
            <dd>{formatDate(selectedAppointment.date)}</dd>

            <dt>Horário</dt>
            <dd>{selectedAppointment.time}</dd>

            <dt>Situação</dt>
            <dd>
              {selectedAppointment.completed ? 'Concluído' : 'Pendente'}
            </dd>

            <dt>Observações</dt>
            <dd>
              {selectedAppointment.notes || 'Nenhuma observação.'}
            </dd>
          </dl>
        )}
      </Modal>
    </AppShell>
  )
}

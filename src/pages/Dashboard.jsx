import { Plus, RefreshCw, Syringe } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import AppointmentCard from '../components/AppointmentCard'
import PetCard from '../components/PetCard'
import SummaryCard from '../components/SummaryCard'
import Modal from '../components/Modal'
import { pets } from '../data/pets'
import { api } from '../services/api'

export default function Dashboard() {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [filter, setFilter] = useState('Todos')
  const user = localStorage.getItem('petcare_user') || 'usuário'

  async function loadAppointments() {
    try {
      setLoading(true)
      setError('')
      const data = await api.getAppointments()
      setAppointments(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'Todos') return appointments
    return appointments.filter(item => item.category === filter)
  }, [appointments, filter])

  async function remove(id) {
    if (!window.confirm('Deseja realmente excluir este compromisso?')) return
    try {
      await api.deleteAppointment(id)
      setAppointments(current => current.filter(item => item.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  async function toggleComplete(item) {
    try {
      const updated = await api.updateAppointment(item.id, { completed: !item.completed })
      setAppointments(current => current.map(currentItem => currentItem.id === item.id ? updated : currentItem))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AppShell>
      <section className="welcome">
        <div>
          <p className="eyebrow">SEU PAINEL</p>
          <h1>Olá, {user}! <span aria-hidden="true">🐾</span></h1>
          <p>Acompanhe os cuidados e os próximos compromissos dos seus pets.</p>
        </div>
        <Link className="primary-button" to="/compromissos/novo"><Plus size={19} /> Novo compromisso</Link>
      </section>

      <section className="summary-grid" aria-label="Resumo">
        <SummaryCard icon="🐾" value={pets.length} label="Pets cadastrados" />
        <SummaryCard icon="💉" value="1" label="Vacina pendente" detail="Próxima: 15/10" />
        <SummaryCard icon="🍽️" value={appointments.filter(a => a.category === 'Alimentação').length} label="Refeições" detail="Hoje" />
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Seus pets</h2>
            <p>Selecione um pet para ver seus detalhes.</p>
          </div>
        </div>
        <div className="pets-grid">
          {pets.map(pet => <PetCard key={pet.id} pet={pet} />)}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading appointment-heading">
          <div>
            <h2>Próximos compromissos</h2>
            <p>Organize a rotina dos seus pets.</p>
          </div>
          <div className="filter-group" aria-label="Filtrar compromissos">
            {['Todos', 'Alimentação', 'Rotina', 'Higiene', 'Saúde'].map(option => (
              <button key={option} className={filter === option ? 'filter active' : 'filter'} onClick={() => setFilter(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="error-banner" role="alert">
            <span>{error}</span>
            <button onClick={loadAppointments}><RefreshCw size={16} /> Tentar novamente</button>
          </div>
        )}

        {loading ? (
          <div className="loading">Carregando compromissos...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">Nenhum compromisso encontrado para este filtro.</div>
        ) : (
          <div className="appointments-list">
            {filtered.map(item => (
              <AppointmentCard
                key={item.id}
                appointment={item}
                onEdit={() => navigate(`/compromissos/${item.id}/editar`)}
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

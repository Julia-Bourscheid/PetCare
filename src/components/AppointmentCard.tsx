import { CalendarDays, Check, Clock3, Pencil, Trash2 } from 'lucide-react'
import type { Appointment } from '@/types'

const categoryIcon: Record<string, string> = {
  Alimentação: '🍽️',
  Rotina: '🌙',
  Higiene: '🛁',
  Saúde: '💉'
}

interface AppointmentCardProps {
  appointment: Appointment
  onEdit: (appointment: Appointment) => void
  onDelete: (id: number) => void
  onComplete: (appointment: Appointment) => void
}

export default function AppointmentCard({ appointment, onEdit, onDelete, onComplete }: AppointmentCardProps) {
  return (
    <article className={`appointment-card ${appointment.completed ? 'completed' : ''}`}>
      <div className="appointment-icon" aria-hidden="true">
        {categoryIcon[appointment.category] || '🐾'}
      </div>
      <div className="appointment-info">
        <strong>{appointment.title}</strong>
        <span>{appointment.pet} · {appointment.category}</span>
        <small><CalendarDays size={14} aria-hidden="true" /> {formatDate(appointment.date)} <Clock3 size={14} aria-hidden="true" /> {appointment.time}</small>
      </div>
      <div className="appointment-actions">
        <button onClick={() => onComplete(appointment)} aria-label={appointment.completed ? 'Marcar como pendente' : 'Marcar como concluído'} title={appointment.completed ? 'Marcar como pendente' : 'Concluir'}>
          <Check size={17} />
        </button>
        <button onClick={() => onEdit(appointment)} aria-label={`Editar ${appointment.title}`} title="Editar">
          <Pencil size={17} />
        </button>
        <button onClick={() => onDelete(appointment.id)} aria-label={`Excluir ${appointment.title}`} title="Excluir">
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  )
}

function formatDate(value: string) {
  if (!value) return ''
  return new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR')
}

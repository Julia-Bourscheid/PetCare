import { ArrowLeft, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { pets } from '../data/pets'
import { api } from '../services/api'

const initial = {
  title: '',
  pet: '',
  category: '',
  date: '',
  time: '',
  notes: ''
}

export default function AppointmentForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const editing = Boolean(id)
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!editing) return
    api.getAppointments()
      .then(data => {
        const item = data.find(current => String(current.id) === String(id))
        if (item) setForm({ title: item.title || '', pet: item.pet || '', category: item.category || '', date: item.date || '', time: item.time || '', notes: item.notes || '', completed: item.completed })
      })
      .catch(err => setApiError(err.message))
  }, [editing, id])

  function change(event) {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
    setErrors(current => ({ ...current, [name]: '' }))
  }

  function validate() {
    const next = {}
    if (!form.title.trim()) next.title = 'Informe o nome do compromisso.'
    if (!form.pet) next.pet = 'Selecione um pet.'
    if (!form.category) next.category = 'Selecione uma categoria.'
    if (!form.date) next.date = 'Informe a data.'
    if (!form.time) next.time = 'Informe o horário.'
    if (form.title.trim().length > 0 && form.title.trim().length < 3) next.title = 'Use pelo menos 3 caracteres.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function submit(event) {
    event.preventDefault()
    setApiError('')
    if (!validate()) return

    try {
      setSaving(true)
      if (editing) {
        await api.updateAppointment(id, form)
      } else {
        await api.createAppointment(form)
      }
      navigate('/dashboard')
    } catch (err) {
      setApiError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AppShell>
      <Link className="back-link" to="/dashboard"><ArrowLeft size={18} /> Voltar para o painel</Link>
      <section className="form-card">
        <div className="form-header">
          <div>
            <p className="eyebrow">{editing ? 'EDITAR' : 'NOVO'}</p>
            <h1>{editing ? 'Editar compromisso' : 'Novo compromisso'}</h1>
            <p>Preencha os dados para organizar a rotina do seu pet.</p>
          </div>
        </div>

        {apiError && <div className="error-banner" role="alert">{apiError}</div>}

        <form onSubmit={submit} noValidate>
          <div className="form-grid">
            <div className="field field-full">
              <label htmlFor="title">Nome do compromisso <span>*</span></label>
              <input id="title" name="title" value={form.title} onChange={change} aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'title-error' : undefined} placeholder="Ex.: Banho do Thor" />
              {errors.title && <small id="title-error" className="field-error">{errors.title}</small>}
            </div>

            <div className="field">
              <label htmlFor="pet">Pet <span>*</span></label>
              <select id="pet" name="pet" value={form.pet} onChange={change} aria-invalid={Boolean(errors.pet)}>
                <option value="">Selecione</option>
                {pets.map(pet => <option key={pet.id} value={pet.name}>{pet.icon} {pet.name}</option>)}
              </select>
              {errors.pet && <small className="field-error">{errors.pet}</small>}
            </div>

            <div className="field">
              <label htmlFor="category">Categoria <span>*</span></label>
              <select id="category" name="category" value={form.category} onChange={change} aria-invalid={Boolean(errors.category)}>
                <option value="">Selecione</option>
                <option>Alimentação</option>
                <option>Rotina</option>
                <option>Higiene</option>
                <option>Saúde</option>
              </select>
              {errors.category && <small className="field-error">{errors.category}</small>}
            </div>

            <div className="field">
              <label htmlFor="date">Data <span>*</span></label>
              <input id="date" name="date" type="date" value={form.date} onChange={change} aria-invalid={Boolean(errors.date)} />
              {errors.date && <small className="field-error">{errors.date}</small>}
            </div>

            <div className="field">
              <label htmlFor="time">Horário <span>*</span></label>
              <input id="time" name="time" type="time" value={form.time} onChange={change} aria-invalid={Boolean(errors.time)} />
              {errors.time && <small className="field-error">{errors.time}</small>}
            </div>

            <div className="field field-full">
              <label htmlFor="notes">Observações</label>
              <textarea id="notes" name="notes" value={form.notes} onChange={change} rows="4" placeholder="Algum cuidado ou informação importante?" />
            </div>
          </div>

          <p className="required-note">* Campos obrigatórios</p>
          <div className="form-actions">
            <Link className="secondary-button" to="/dashboard">Cancelar</Link>
            <button className="primary-button" type="submit" disabled={saving}>
              <Save size={18} /> {saving ? 'Salvando...' : editing ? 'Salvar alterações' : 'Salvar compromisso'}
            </button>
          </div>
        </form>
      </section>
    </AppShell>
  )
}

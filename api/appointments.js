let appointments = [
  { id: 1, pet: 'Mimi', title: 'Jantar da Mimi', category: 'Alimentação', date: '2026-10-08', time: '19:00', notes: 'Ração e água.' },
  { id: 2, pet: 'Nina', title: 'Ninar a Nina', category: 'Rotina', date: '2026-10-08', time: '20:00', notes: '' },
  { id: 3, pet: 'Thor', title: 'Banho do Thor', category: 'Higiene', date: '2026-10-09', time: '21:00', notes: 'Usar shampoo neutro.' }
]

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'GET') {
    return res.status(200).json(appointments)
  }

  if (req.method === 'POST') {
    const body = req.body || {}
    if (!body.title || !body.pet || !body.category || !body.date || !body.time) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' })
    }
    const item = { id: Date.now(), ...body }
    appointments.push(item)
    return res.status(201).json(item)
  }

  const id = Number(req.query?.id)
  if (!id) return res.status(400).json({ message: 'Informe um id válido.' })

  if (req.method === 'PUT') {
    const index = appointments.findIndex(item => item.id === id)
    if (index === -1) return res.status(404).json({ message: 'Compromisso não encontrado.' })
    appointments[index] = { ...appointments[index], ...(req.body || {}), id }
    return res.status(200).json(appointments[index])
  }

  if (req.method === 'DELETE') {
    const exists = appointments.some(item => item.id === id)
    if (!exists) return res.status(404).json({ message: 'Compromisso não encontrado.' })
    appointments = appointments.filter(item => item.id !== id)
    return res.status(204).end()
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE')
  return res.status(405).json({ message: 'Método não permitido.' })
}

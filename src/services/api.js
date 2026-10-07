async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  })

  if (!response.ok) {
    let message = 'Não foi possível concluir a operação.'
    try {
      const data = await response.json()
      message = data.message || message
    } catch {
      // Resposta sem JSON.
    }
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  if (response.status === 204) return null
  return response.json()
}

export const api = {
  getAppointments: () => request('/api/appointments'),
  createAppointment: (data) => request('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateAppointment: (id, data) => request(`/api/appointments?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteAppointment: (id) => request(`/api/appointments?id=${id}`, {
    method: 'DELETE'
  })
}

import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PetProfile from './pages/PetProfile'
import AppointmentForm from './pages/AppointmentForm'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pets/:petId" element={<PetProfile />} />
      <Route path="/compromissos/novo" element={<AppointmentForm />} />
      <Route path="/compromissos/:id/editar" element={<AppointmentForm />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

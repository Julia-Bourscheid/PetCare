import { Link } from 'react-router-dom'

export default function PetCard({ pet }) {
  return (
    <Link className="pet-card" to={`/pets/${pet.id}`} aria-label={`Ver perfil de ${pet.name}`}>
      <span className="pet-avatar" aria-hidden="true">{pet.icon}</span>
      <strong>{pet.name}</strong>
      <small>{pet.type}</small>
    </Link>
  )
}

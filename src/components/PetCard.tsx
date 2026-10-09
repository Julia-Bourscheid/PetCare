import Link from 'next/link'
import type { Pet } from '@/types'

export default function PetCard({ pet }: { pet: Pet }) {
  return (
    <Link className="pet-card" href={`/pets/${pet.id}`} aria-label={`Ver perfil de ${pet.name}`}>
      <span className="pet-avatar" aria-hidden="true">{pet.icon}</span>
      <strong>{pet.name}</strong>
      <small>{pet.type}</small>
    </Link>
  )
}

import Link from 'next/link'
import type { Pet } from '@/types'

export default function PetCard({ pet }: { pet: Pet }) {
  return (
    <Link
      className="flex items-center gap-3 rounded-[15px] border border-line bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:border-[#b9cec4] hover:shadow-[0_7px_22px_rgba(47,75,65,.07)] xs:p-[15px]"
      href={`/pets/${pet.id}`}
    >
      <span className="grid size-[54px] place-items-center rounded-full bg-sand text-[1.8rem]" aria-hidden="true">{pet.icon}</span>
      <strong className="block">{pet.name}</strong>
      <small className="text-muted">{pet.type}</small>
    </Link>
  )
}

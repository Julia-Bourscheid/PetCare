import type { Pet } from '@/types'

export const pets: Pet[] = [
  {
    id: 'nina',
    name: 'Nina',
    type: 'Coelho',
    age: '2 anos',
    weight: '1,8 kg',
    breed: 'Mini Lop',
    vaccine: '15/10/2026',
    icon: '🐰',
    description: 'Carinhosa e tranquila. Gosta de feno e de ficar em lugares aconchegantes.'
  },
  {
    id: 'mimi',
    name: 'Mimi',
    type: 'Gato',
    age: '3 anos',
    weight: '4,2 kg',
    breed: 'SRD',
    vaccine: '22/10/2026',
    icon: '🐱',
    description: 'Curiosa e brincalhona. Adora brinquedos com penas e horários certinhos para comer.'
  },
  {
    id: 'thor',
    name: 'Thor',
    type: 'Cão',
    age: '4 anos',
    weight: '12 kg',
    breed: 'Golden Retriever',
    vaccine: '20/10/2026',
    icon: '🐶',
    description: 'Muito ativo e companheiro. Gosta de passeios, banho e bastante atenção.'
  }
]

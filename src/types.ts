export interface User {
  id: string
  name: string
  email: string
}

export interface Pet {
  id: string
  name: string
  type: string
  age: string
  weight: string
  breed: string
  vaccine: string
  icon: string
  description: string
}

export interface Appointment {
  id: string
  petId: string
  pet: string
  title: string
  category: string
  date: string
  time: string
  notes: string
  completed?: boolean
}

export type AppointmentInput = Omit<Appointment, 'id' | 'pet'>

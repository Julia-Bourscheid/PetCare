import AppointmentForm from '@/components/AppointmentForm'

export default async function EditAppointmentPage({ params }: PageProps<'/compromissos/[id]/editar'>) {
  const { id } = await params
  return <AppointmentForm id={id} />
}

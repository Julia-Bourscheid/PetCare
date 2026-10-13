interface SummaryCardProps {
  icon: string
  value: number | string
  label: string
  detail?: string
}

export default function SummaryCard({ icon, value, label, detail }: SummaryCardProps) {
  return (
    <article className="flex items-center gap-[15px] rounded-2xl border border-line bg-white p-[15px] shadow-[0_5px_20px_rgba(47,75,65,.04)] md:p-[19px]">
      <div className="grid size-12 place-items-center rounded-[13px] bg-primary-light text-[1.35rem]" aria-hidden="true">{icon}</div>
      <div>
        <strong className="block text-[1.45rem]">{value}</strong>
        <span className="block font-extrabold">{label}</span>
        {detail && <small className="mt-0.5 block text-muted">{detail}</small>}
      </div>
    </article>
  )
}

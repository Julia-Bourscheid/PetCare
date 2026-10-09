interface SummaryCardProps {
  icon: string
  value: number | string
  label: string
  detail?: string
}

export default function SummaryCard({ icon, value, label, detail }: SummaryCardProps) {
  return (
    <article className="summary-card">
      <div className="summary-icon" aria-hidden="true">{icon}</div>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
        {detail && <small>{detail}</small>}
      </div>
    </article>
  )
}

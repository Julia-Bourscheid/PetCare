export default function SummaryCard({ icon, value, label, detail }) {
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

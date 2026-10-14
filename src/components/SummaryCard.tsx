  interface SummaryCardProps {
  icon: string
  value: number | string
  label: string
  detail?: string
  onClick?: () => void
}

export default function SummaryCard({
  icon,
  value,
  label,
  detail,
  onClick,
}: SummaryCardProps) {
  const className =
    'flex w-full items-center gap-[15px] rounded-2xl border border-line bg-white p-[15px] text-left shadow-[0_5px_20px_rgba(47,75,65,.04)] transition-all duration-200 md:p-[19px]'

  const content = (
    <>
      <div
        className="grid size-12 shrink-0 place-items-center rounded-[13px] bg-primary-light text-[1.35rem]"
        aria-hidden="true"
      >
        {icon}
      </div>

      <div>
        <strong className="block text-[1.45rem]">{value}</strong>
        <span className="block font-extrabold">{label}</span>
        {detail && (
          <small className="mt-0.5 block text-muted">{detail}</small>
        )}
      </div>
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`${label}: ${value}. Ver detalhes`}
        className={`${className} cursor-pointer hover:-translate-y-1 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
      >
        {content}
      </button>
    )
  }

  return <article className={className}>{content}</article>
}
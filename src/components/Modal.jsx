import { X } from 'lucide-react'

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button onClick={onClose} aria-label="Fechar janela"><X /></button>
        </div>
        <div className="modal-body">{children}</div>
      </section>
    </div>
  )
}

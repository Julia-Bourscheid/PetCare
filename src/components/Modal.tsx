import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

export default function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-[rgba(25,37,33,.42)] p-5" role="presentation" onMouseDown={onClose}>
      <section className="w-[min(520px,100%)] rounded-[18px] bg-white shadow-[0_20px_60px_rgba(0,0,0,.2)]" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-line px-5 py-[18px]">
          <h2 id="modal-title" className="mb-0">{title}</h2>
          <button className="grid size-[34px] place-items-center rounded-lg text-muted hover:bg-primary-light" onClick={onClose} aria-label="Fechar janela"><X /></button>
        </div>
        <div className="p-5">{children}</div>
      </section>
    </div>
  )
}

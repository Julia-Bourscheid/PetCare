
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

export default function Modal({
  open,
  title,
  children,
  onClose,
}: ModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-30 grid place-items-center overflow-y-auto bg-[rgba(25,37,33,.42)] p-3 sm:p-5"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="flex max-h-[90dvh] w-[min(520px,100%)] flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_20px_60px_rgba(0,0,0,.2)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-[18px]">
          <h2 id="modal-title" className="mb-0">
            {title}
          </h2>

          <button
            type="button"
            className="grid size-[34px] place-items-center rounded-lg text-muted hover:bg-primary-light"
            onClick={onClose}
            aria-label="Fechar janela"
          >
            <X />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto p-5">
          {children}
        </div>
      </section>
    </div>
  )
}

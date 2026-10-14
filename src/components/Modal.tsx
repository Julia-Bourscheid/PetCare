import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  role?: 'dialog' | 'alertdialog'
  describedBy?: string
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Modal({
  open,
  title,
  children,
  onClose,
  role = 'dialog',
  describedBy,
}: ModalProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Mantém o onClose mais recente sem reexecutar o efeito de foco a cada render
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'

    // Foco inicial: primeiro item focável do conteúdo; se não houver, o próprio modal
    const firstInContent =
      contentRef.current?.querySelector<HTMLElement>(FOCUSABLE)
    ;(firstInContent ?? dialogRef.current)?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      )

      if (items.length === 0) {
        event.preventDefault()
        return
      }

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || active === dialogRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-30 grid place-items-center overflow-y-auto bg-[rgba(25,37,33,.42)] p-3 sm:p-5"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        ref={dialogRef}
        tabIndex={-1}
        className="flex max-h-[90dvh] w-[min(520px,100%)] flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_20px_60px_rgba(0,0,0,.2)] outline-none"
        role={role}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={describedBy}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-[18px]">
          <h2 id={titleId} className="mb-0">
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

        <div ref={contentRef} className="min-h-0 overflow-y-auto p-5">
          {children}
        </div>
      </section>
    </div>
  )
}
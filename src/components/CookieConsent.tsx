'use client'

import { useState, useSyncExternalStore } from 'react'
import ClarityScript from '@/components/ClarityScript'
import { primaryButton, secondaryButton } from '@/components/ui'

type Consent = 'granted' | 'denied'

const CONSENT_COOKIE = 'petcare_consent'
const ONE_YEAR = 60 * 60 * 24 * 365

function readConsent(): Consent | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`))
  return match ? (match[1] as Consent) : null
}

function subscribe() {
  return () => {}
}

export default function CookieConsent({ clarityProjectId }: { clarityProjectId?: string }) {
  const savedConsent = useSyncExternalStore(subscribe, readConsent, () => undefined)
  const [choice, setChoice] = useState<Consent>()
  const consent = choice ?? savedConsent

  function decide(value: Consent) {
    document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${ONE_YEAR}; Path=/; SameSite=Lax`
    setChoice(value)
  }

  if (!clarityProjectId) return null
  if (consent === 'granted') return <ClarityScript projectId={clarityProjectId} />
  if (consent !== null) return null

  return (
    <section className="fixed inset-x-3 bottom-3 z-20 mx-auto max-w-[560px] rounded-[16px] border border-line bg-white p-[18px] shadow-[0_12px_30px_rgba(0,0,0,.1)]" aria-labelledby="cookie-consent-title">
      <h2 className="mb-1.5 text-lg font-extrabold" id="cookie-consent-title">Sua privacidade</h2>
      <p className="mb-4 text-muted">
        Com sua permissão, usamos o Microsoft Clarity para entender como o PetCare é usado (cliques, rolagem e páginas visitadas) e melhorar o app. O cookie de login é essencial e não depende desta escolha.
      </p>
      <div className="flex flex-wrap gap-2.5">
        <button className={primaryButton} onClick={() => decide('granted')}>Aceitar</button>
        <button className={secondaryButton} onClick={() => decide('denied')}>Recusar</button>
      </div>
    </section>
  )
}

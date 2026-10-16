import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import CookieConsent from '@/components/CookieConsent'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito'
})

export const metadata: Metadata = {
  title: 'PetCare',
  description: 'PetCare — organização e cuidados com seus pets.'
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body className="min-w-80 bg-page font-sans text-ink">
        {children}
        <CookieConsent clarityProjectId={process.env.CLARITY_PROJECT_ID} />
      </body>
    </html>
  )
}

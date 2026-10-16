'use client'

import Clarity from '@microsoft/clarity'
import { useEffect } from 'react'

export default function ClarityScript({ projectId }: { projectId: string }) {
  useEffect(() => {
    Clarity.init(projectId)
    Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'granted' })
  }, [projectId])

  return null
}

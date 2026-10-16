'use client'

import Clarity from '@microsoft/clarity'
import { useEffect } from 'react'

export default function ClarityScript({ projectId }: { projectId?: string }) {
  useEffect(() => {
    if (projectId) Clarity.init(projectId)
  }, [projectId])

  return null
}

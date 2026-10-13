import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Não gerar AGENTS.md automaticamente no `next dev`.
  agentRules: false
}

export default nextConfig

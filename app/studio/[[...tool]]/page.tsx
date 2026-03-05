'use client'

import dynamic from 'next/dynamic'
import config from '../../../sanity.config'

// Load NextStudio only on the client side to avoid SSR issues with React Context
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

export default function StudioPage() {
  return <NextStudio config={config} />
}

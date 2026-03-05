import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface HeroBannerProps {
  headline: string
  subheadline?: string
  backgroundImage?: {
    asset?: { _id: string; url: string; metadata?: { lqip?: string } }
    alt?: string
    hotspot?: { x: number; y: number }
  }
  ctaLabel?: string
  ctaHref?: string
  overlayOpacity?: number
}

// Unsplash fallback for textile/fabric imagery
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1558171813-aa3d50b24e07?w=1920&q=85'

export function HeroBanner({
  headline,
  subheadline,
  backgroundImage,
  ctaLabel = 'Ver Produtos',
  ctaHref = '/catalogo',
  overlayOpacity = 45,
}: HeroBannerProps) {
  const imageUrl = backgroundImage?.asset
    ? urlFor(backgroundImage).width(1920).height(1080).fit('crop').url()
    : FALLBACK_IMAGE

  const lqip = backgroundImage?.asset?.metadata?.lqip

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={backgroundImage?.alt || 'Aspen Estamparia'}
          fill
          priority
          className="object-cover object-center"
          placeholder={lqip ? 'blur' : 'empty'}
          blurDataURL={lqip}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-text-primary"
          style={{ opacity: (overlayOpacity ?? 45) / 100 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-content text-center text-white max-w-4xl">
        <p className="label-tag text-white/50 mb-6 tracking-[0.3em]">Estamparia Premium B2B</p>

        <h1 className="text-display-xl text-white mb-8 text-balance leading-tight">
          {headline}
        </h1>

        {subheadline && (
          <p className="font-sans text-base lg:text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={ctaHref} className="btn-primary">
            {ctaLabel}
          </Link>
          <Link href="/sobre" className="btn-outline-light">
            Conheça a Aspen
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-white/60 animate-[scrollDown_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}

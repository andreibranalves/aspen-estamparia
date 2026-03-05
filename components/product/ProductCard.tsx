import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

const CATEGORY_LABELS: Record<string, string> = {
  canga: 'Canga',
  toalha: 'Toalha de Praia',
  lenco: 'Lenço',
  outro: 'Outro',
}

// Unsplash textile fallbacks per category
const FALLBACK_IMAGES: Record<string, string> = {
  canga: 'https://images.unsplash.com/photo-1507098977-b609a2abd7de?w=800&q=80',
  toalha: 'https://images.unsplash.com/photo-1631824783596-f4fe96d2f5f7?w=800&q=80',
  lenco: 'https://images.unsplash.com/photo-1561052967-61fc91e48d79?w=800&q=80',
  outro: 'https://images.unsplash.com/photo-1558171813-aa3d50b24e07?w=800&q=80',
}

interface ProductCardProps {
  name: string
  slug: string
  category: string
  minOrderQty: number
  mainImage?: {
    asset?: { _id: string; url: string; metadata?: { lqip?: string } }
    alt?: string
  }
  compact?: boolean
}

export function ProductCard({ name, slug, category, minOrderQty, mainImage, compact = false }: ProductCardProps) {
  const imageUrl = mainImage?.asset
    ? urlFor(mainImage).width(800).height(compact ? 600 : 700).fit('crop').url()
    : FALLBACK_IMAGES[category] || FALLBACK_IMAGES.outro

  const lqip = mainImage?.asset?.metadata?.lqip

  return (
    <Link href={`/produtos/${slug}`} className="group block overflow-hidden">
      {/* Image */}
      <div className={`relative overflow-hidden bg-surface ${compact ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
        <Image
          src={imageUrl}
          alt={mainImage?.alt || name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          placeholder={lqip ? 'blur' : 'empty'}
          blurDataURL={lqip}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-text-primary/0 group-hover:bg-text-primary/10 transition-colors duration-500" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-background/90 backdrop-blur-sm font-sans text-xs font-medium tracking-widest uppercase px-3 py-1.5 text-text-muted">
            {CATEGORY_LABELS[category] || category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="pt-5 pb-2">
        <h3 className="font-serif text-xl text-text-primary group-hover:text-cta transition-colors duration-300 mb-2">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="font-sans text-xs text-text-muted tracking-wide">
            MOQ: {minOrderQty} unidades
          </p>
          <span className="font-sans text-xs font-medium tracking-widest uppercase text-cta opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Ver detalhes →
          </span>
        </div>
      </div>
    </Link>
  )
}

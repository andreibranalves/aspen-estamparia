'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface GalleryImage {
  asset?: { _id: string; url: string; metadata?: { lqip?: string } }
  alt?: string
  caption?: string
}

// Unsplash fallbacks
const FALLBACKS = [
  'https://images.unsplash.com/photo-1558171813-aa3d50b24e07?w=1200&q=85',
  'https://images.unsplash.com/photo-1561052967-61fc91e48d79?w=1200&q=85',
  'https://images.unsplash.com/photo-1507098977-b609a2abd7de?w=1200&q=85',
]

interface ImageGalleryProps {
  images?: GalleryImage[]
  productName: string
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [active, setActive] = useState(0)

  const displayImages =
    images && images.length > 0 ? images : FALLBACKS.map((url) => ({ asset: undefined, alt: productName, _fallbackUrl: url } as GalleryImage & { _fallbackUrl?: string }))

  const getUrl = (img: GalleryImage & { _fallbackUrl?: string }, width = 1200) => {
    if ((img as { _fallbackUrl?: string })._fallbackUrl) return (img as { _fallbackUrl?: string })._fallbackUrl!
    if (img.asset) return urlFor(img).width(width).fit('crop').url()
    return FALLBACKS[0]
  }

  const activeImg = displayImages[active] as GalleryImage & { _fallbackUrl?: string }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square lg:aspect-[4/5] bg-surface overflow-hidden">
        <Image
          src={getUrl(activeImg)}
          alt={activeImg.alt || productName}
          fill
          priority
          className="object-cover transition-opacity duration-300"
          placeholder={activeImg.asset?.metadata?.lqip ? 'blur' : 'empty'}
          blurDataURL={activeImg.asset?.metadata?.lqip}
        />
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {displayImages.map((img, i) => {
            const thumbImg = img as GalleryImage & { _fallbackUrl?: string }
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative flex-shrink-0 w-20 h-20 overflow-hidden transition-opacity ${i === active ? 'ring-1 ring-cta opacity-100' : 'opacity-50 hover:opacity-80'}`}
              >
                <Image
                  src={getUrl(thumbImg, 200)}
                  alt={thumbImg.alt || `Imagem ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

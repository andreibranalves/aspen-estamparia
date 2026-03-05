'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface GalleryImage {
  asset?: { _id: string; url: string; metadata?: { lqip?: string } }
  alt?: string
  caption?: string
}

interface ImageGalleryProps {
  images?: GalleryImage[]
  productName: string
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [active, setActive] = useState(0)

  const hasImages = images && images.length > 0

  if (!hasImages) {
    return (
      <div className="aspect-square lg:aspect-[4/5] bg-surface flex items-center justify-center">
        <p className="font-sans text-xs text-text-muted tracking-widest uppercase">Imagem em breve</p>
      </div>
    )
  }

  const getUrl = (img: GalleryImage, width = 1200) => {
    if (img.asset) return urlFor(img).width(width).fit('crop').url()
    return ''
  }

  const activeImg = images[active]

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
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-20 h-20 overflow-hidden transition-opacity ${i === active ? 'ring-1 ring-cta opacity-100' : 'opacity-50 hover:opacity-80'}`}
            >
              <Image
                src={getUrl(img, 200)}
                alt={img.alt || `Imagem ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

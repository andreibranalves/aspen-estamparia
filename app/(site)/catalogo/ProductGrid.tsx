'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/product/ProductCard'

const CATEGORIES = [
  { label: 'Todos', value: 'all' },
  { label: 'Cangas', value: 'canga' },
  { label: 'Toalhas', value: 'toalha' },
  { label: 'Lenços', value: 'lenco' },
]

interface Product {
  _id: string
  name: string
  slug: string
  category: string
  minOrderQty: number
  images?: { asset?: { _id: string; url: string; metadata?: { lqip?: string } }; alt?: string }[]
  mainImage?: { asset?: { _id: string; url: string; metadata?: { lqip?: string } }; alt?: string }
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? products : products.filter((p) => p.category === active)

  return (
    <>
      {/* Filter bar */}
      <div className="flex gap-2 flex-wrap mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`font-sans text-xs font-medium tracking-widest uppercase px-5 py-2.5 border transition-colors duration-200 ${
              active === cat.value
                ? 'bg-text-primary text-background border-text-primary'
                : 'border-accent/40 text-text-muted hover:border-text-primary hover:text-text-primary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-sans text-text-muted">Nenhum produto encontrado nesta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filtered.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              slug={product.slug}
              category={product.category}
              minOrderQty={product.minOrderQty}
              mainImage={product.images?.[0] || product.mainImage}
            />
          ))}
        </div>
      )}
    </>
  )
}

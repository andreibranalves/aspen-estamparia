export const revalidate = 60

import { client } from '@/sanity/lib/client'
import { HERO_BANNER_QUERY, FEATURED_PRODUCTS_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { HeroBanner } from '@/components/hero/HeroBanner'
import { BrandStatement } from '@/components/home/BrandStatement'
import { ProcessStrip } from '@/components/home/ProcessStrip'
import { CTABanner } from '@/components/home/CTABanner'
import { ProductCard } from '@/components/product/ProductCard'
import Link from 'next/link'

export default async function HomePage() {
  const [hero, featuredProducts, settings] = await Promise.all([
    client.fetch(HERO_BANNER_QUERY),
    client.fetch(FEATURED_PRODUCTS_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
  ])

  return (
    <>
      {/* Hero */}
      <HeroBanner
        headline={hero?.headline || 'Têxteis Personalizados para Marcas que Inspiram'}
        subheadline={hero?.subheadline}
        backgroundImage={hero?.backgroundImage}
        ctaLabel={hero?.ctaLabel || 'Ver Produtos'}
        ctaHref={hero?.ctaHref || '/catalogo'}
        overlayOpacity={hero?.overlayOpacity}
      />

      {/* Brand Statement */}
      <BrandStatement />

      {/* Featured Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-content">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="label-tag mb-4">Nossos Produtos</p>
                <h2 className="text-display-md font-serif text-text-primary">
                  Catálogo Premium
                </h2>
              </div>
              <Link href="/catalogo" className="hidden sm:block font-sans text-xs font-medium tracking-widest uppercase text-cta hover:text-cta-hover transition-colors">
                Ver todos →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {featuredProducts.map((product: {
                _id: string
                name: string
                slug: string
                category: string
                minOrderQty: number
                mainImage?: { asset?: { _id: string; url: string; metadata?: { lqip?: string } }; alt?: string }
              }) => (
                <ProductCard
                  key={product._id}
                  name={product.name}
                  slug={product.slug}
                  category={product.category}
                  minOrderQty={product.minOrderQty}
                  mainImage={product.mainImage}
                />
              ))}
            </div>

            <div className="mt-12 text-center sm:hidden">
              <Link href="/catalogo" className="btn-outline">
                Ver Catálogo Completo
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <ProcessStrip />

      {/* CTA */}
      <CTABanner contactWhatsApp={settings?.contactWhatsApp} />
    </>
  )
}

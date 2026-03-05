import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { ProductGrid } from './ProductGrid'

export const metadata: Metadata = {
  title: 'Catálogo de Produtos',
  description: 'Cangas, toalhas de praia e lenços personalizados para empresas. Conheça nosso catálogo de têxteis premium.',
}

export default async function CatalogoPage() {
  const products = await client.fetch(PRODUCTS_QUERY)

  return (
    <div className="section-padding bg-background min-h-screen">
      <div className="container-content">
        {/* Page header */}
        <div className="mb-16 pb-12 border-b border-accent/20">
          <p className="label-tag mb-4">Aspen Estamparia</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h1 className="text-display-lg font-serif text-text-primary max-w-xl">
              Nossos Produtos
            </h1>
            <p className="font-sans text-base text-text-muted max-w-md leading-relaxed">
              Todos os nossos produtos são fabricados sob encomenda com personalização completa.
              Solicite um orçamento para começar.
            </p>
          </div>
        </div>

        {/* Products with client-side filter */}
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

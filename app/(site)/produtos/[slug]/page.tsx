import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { ImageGallery } from '@/components/product/ImageGallery'
import { PortableTextRenderer } from '@/components/product/PortableTextRenderer'
import { QuoteForm } from '@/components/product/QuoteForm'
import Link from 'next/link'

const CATEGORY_LABELS: Record<string, string> = {
  canga: 'Canga',
  toalha: 'Toalha de Praia',
  lenco: 'Lenço',
  outro: 'Outro',
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch(PRODUCT_SLUGS_QUERY)
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
  if (!product) return { title: 'Produto não encontrado' }
  return {
    title: product.name,
    description: `${product.name} personalizado para empresas — Aspen Estamparia`,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const [product, settings] = await Promise.all([
    client.fetch(PRODUCT_BY_SLUG_QUERY, { slug }),
    client.fetch(SITE_SETTINGS_QUERY),
  ])

  if (!product) notFound()

  const waLink = settings?.contactWhatsApp
    ? `https://wa.me/${settings.contactWhatsApp}?text=Olá! Tenho interesse no produto: ${product.name}`
    : undefined

  return (
    <div className="section-padding bg-background">
      <div className="container-content">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-12 font-sans text-xs text-text-muted">
          <Link href="/" className="hover:text-text-primary transition-colors">Início</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-text-primary transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-text-primary">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Gallery */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            {/* Category + Name */}
            <p className="label-tag mb-4">{CATEGORY_LABELS[product.category] || product.category}</p>
            <h1 className="font-serif text-display-md text-text-primary mb-6">{product.name}</h1>

            {/* MOQ badge */}
            <div className="inline-flex items-center gap-3 bg-surface px-5 py-3 mb-8 w-fit">
              <span className="font-sans text-xs text-text-muted tracking-widest uppercase">Pedido mínimo</span>
              <span className="font-serif text-lg text-text-primary">{product.minOrderQty} unidades</span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-10">
                <PortableTextRenderer value={product.description} />
              </div>
            )}

            {/* Material Specs */}
            {product.materialSpecs && (
              <div className="mb-10">
                <p className="label-tag mb-5">Especificações</p>
                <div className="border border-accent/20 divide-y divide-accent/20">
                  {Object.entries(product.materialSpecs as Record<string, string>)
                    .filter(([, v]) => v)
                    .map(([key, value]) => {
                      const labels: Record<string, string> = {
                        material: 'Material',
                        dimensions: 'Dimensões',
                        weight: 'Gramatura',
                        composition: 'Composição',
                      }
                      return (
                        <div key={key} className="flex justify-between items-center px-5 py-3">
                          <span className="font-sans text-xs text-text-muted tracking-wide">{labels[key] || key}</span>
                          <span className="font-sans text-sm text-text-primary">{value}</span>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}

            {/* Customization Options */}
            {product.customizationOptions && product.customizationOptions.length > 0 && (
              <div className="mb-10">
                <p className="label-tag mb-5">Personalizações Disponíveis</p>
                <div className="flex flex-wrap gap-2">
                  {product.customizationOptions.map((opt: string) => (
                    <span
                      key={opt}
                      className="font-sans text-xs text-text-muted border border-accent/30 px-3 py-1.5 tracking-wide"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp shortcut */}
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mb-4 text-center"
              >
                Solicitar via WhatsApp
              </a>
            )}
          </div>
        </div>

        {/* Quote Form */}
        <div className="mt-24 pt-16 border-t border-accent/20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="label-tag mb-4">Solicitar Orçamento</p>
              <h2 className="font-serif text-display-md text-text-primary">
                Vamos criar algo único juntos
              </h2>
            </div>
            <QuoteForm productName={product.name} />
          </div>
        </div>
      </div>
    </div>
  )
}

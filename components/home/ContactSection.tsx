import { client } from '@/sanity/lib/client'
import { PRODUCT_NAMES_QUERY } from '@/sanity/lib/queries'
import { QuoteForm } from '@/components/product/QuoteForm'

export async function ContactSection() {
  const productDocs = await client.fetch(PRODUCT_NAMES_QUERY)
  const productNames: string[] = (productDocs || []).map((p: { name: string }) => p.name)

  return (
    <section id="orcamento" className="section-padding bg-background border-t border-accent/20">
      <div className="container-content">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="label-tag mb-4">Solicitar Orçamento</p>
            <h2 className="font-serif text-display-md text-text-primary">
              Vamos criar algo único juntos
            </h2>
          </div>
          <QuoteForm products={productNames} />
        </div>
      </div>
    </section>
  )
}

import { client } from '@/sanity/lib/client'
import { PRODUCT_NAMES_QUERY } from '@/sanity/lib/queries'
import { QuoteForm } from '@/components/product/QuoteForm'

export async function ContactSection() {
  const productDocs = await client.fetch(PRODUCT_NAMES_QUERY)
  const productNames: string[] = (productDocs || []).map((p: { name: string }) => p.name)

  return (
    <section id="orcamento" className="section-padding bg-surface">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: copy */}
          <div className="lg:pt-2">
            <p className="label-tag mb-6">Solicitar Orçamento</p>
            <h2 className="font-serif text-display-md text-text-primary mb-6">
              Vamos criar algo único juntos
            </h2>
            <p className="font-sans text-base text-text-muted leading-relaxed mb-10">
              Preencha o formulário e entraremos em contacto com uma proposta personalizada
              para o seu projeto. Sem compromisso.
            </p>
            <div className="flex flex-col gap-4 font-sans text-sm text-text-muted">
              <div className="flex items-start gap-3">
                <span className="text-accent mt-0.5">→</span>
                <span>Resposta em até 24 horas úteis</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent mt-0.5">→</span>
                <span>Pedido mínimo a partir de 30 unidades</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent mt-0.5">→</span>
                <span>Personalização completa — arte, material e acabamento</span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <QuoteForm products={productNames} />
          </div>
        </div>
      </div>
    </section>
  )
}

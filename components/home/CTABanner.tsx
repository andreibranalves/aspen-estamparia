import Link from 'next/link'

interface CTABannerProps {
  contactWhatsApp?: string
}

export function CTABanner({ contactWhatsApp }: CTABannerProps) {
  const waLink = contactWhatsApp
    ? `https://wa.me/${contactWhatsApp}?text=Olá! Gostaria de solicitar um orçamento para produtos personalizados.`
    : '#contato'

  return (
    <section className="bg-cta section-padding">
      <div className="container-content text-center">
        <p className="label-tag text-white/40 mb-6 tracking-[0.3em]">Pronto para começar?</p>
        <h2 className="text-display-lg font-serif text-white mb-6 max-w-2xl mx-auto">
          Transforme sua marca em um produto que as pessoas carregam consigo
        </h2>
        <p className="font-sans text-base text-white/60 mb-12 max-w-xl mx-auto leading-relaxed">
          Entre em contato e receba uma proposta personalizada para o seu projeto. Sem compromisso.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
            Falar no WhatsApp
          </a>
          <Link href="/catalogo" className="btn-outline-light">
            Ver Catálogo
          </Link>
        </div>
      </div>
    </section>
  )
}

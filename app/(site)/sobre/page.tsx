import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { ABOUT_PAGE_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { PortableTextRenderer } from '@/components/product/PortableTextRenderer'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Sobre a Aspen',
  description: 'Conheça a história e os valores da Aspen Estamparia, especialista em têxteis personalizados para empresas.',
}

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1558171813-aa3d50b24e07?w=1920&q=85'
const FALLBACK_SECTION = 'https://images.unsplash.com/photo-1631824783596-f4fe96d2f5f7?w=1200&q=80'

export default async function SobrePage() {
  const [about, settings] = await Promise.all([
    client.fetch(ABOUT_PAGE_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
  ])

  const waLink = settings?.contactWhatsApp
    ? `https://wa.me/${settings.contactWhatsApp}?text=Olá! Gostaria de saber mais sobre a Aspen Estamparia.`
    : '#contato'

  const heroImageUrl = about?.heroImage?.asset
    ? urlFor(about.heroImage).width(1920).height(800).fit('crop').url()
    : FALLBACK_HERO

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImageUrl}
            alt={about?.heroImage?.alt || 'Aspen Estamparia'}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-text-primary/50" />
        </div>
        <div className="relative z-10 text-center text-white container-content">
          <p className="label-tag text-white/40 mb-6 tracking-[0.3em]">Sobre Nós</p>
          <h1 className="text-display-lg font-serif text-white max-w-3xl mx-auto">
            {about?.heroHeadline || 'Feito com propósito. Entregue com precisão.'}
          </h1>
        </div>
      </section>

      {/* Sections */}
      {about?.sections && about.sections.length > 0 ? (
        <div className="section-padding">
          {about.sections.map((section: {
            _key: string
            title?: string
            body?: unknown[]
            image?: { asset?: { _id: string; url: string; metadata?: { lqip?: string } }; alt?: string }
          }, i: number) => {
            const sectionImageUrl = section.image?.asset
              ? urlFor(section.image).width(800).height(600).fit('crop').url()
              : FALLBACK_SECTION
            const isEven = i % 2 === 0

            return (
              <div key={section._key} className={`container-content mb-24 last:mb-0`}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:[&>*:first-child]:order-2'}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <Image
                      src={sectionImageUrl}
                      alt={section.image?.alt || section.title || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    {section.title && (
                      <h2 className="font-serif text-display-md text-text-primary mb-6">{section.title}</h2>
                    )}
                    {section.body && <PortableTextRenderer value={section.body as unknown[]} />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Fallback content if no sections in CMS */
        <div className="section-padding container-content max-w-3xl mx-auto text-center">
          <p className="font-sans text-base text-text-muted leading-relaxed">
            A Aspen Estamparia é especialista em têxteis personalizados para o mercado corporativo.
            Combinamos tecnologia de estamparia digital com materiais premium para criar produtos
            que fortalecem a identidade de marcas exigentes.
          </p>
        </div>
      )}

      {/* Values */}
      {about?.values && about.values.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-content">
            <div className="text-center mb-16">
              <p className="label-tag mb-4">O que nos guia</p>
              <h2 className="text-display-md font-serif text-text-primary">Nossos Valores</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {about.values.map((value: { _key: string; icon?: string; title: string; description?: string }) => (
                <div key={value._key} className="text-center p-8 bg-background">
                  {value.icon && (
                    <p className="text-3xl text-accent mb-4">{value.icon}</p>
                  )}
                  <h3 className="font-serif text-lg text-text-primary mb-3">{value.title}</h3>
                  {value.description && (
                    <p className="font-sans text-sm text-text-muted leading-relaxed">{value.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="container-content text-center">
          <h2 className="font-serif text-display-md text-text-primary mb-6">
            Pronto para personalizar?
          </h2>
          <p className="font-sans text-base text-text-muted mb-10 max-w-lg mx-auto">
            Entre em contato e vamos conversar sobre o seu próximo projeto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Falar no WhatsApp
            </a>
            <Link href="/catalogo" className="btn-outline">
              Ver Catálogo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

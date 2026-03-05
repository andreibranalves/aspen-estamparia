import Link from 'next/link'

interface FooterProps {
  siteName: string
  navigationLinks: { label: string; href: string }[]
  contactEmail?: string
  contactPhone?: string
  contactWhatsApp?: string
  contactAddress?: string
  socialLinks?: { platform: string; url: string }[]
  footerText?: string
}

export function Footer({
  siteName,
  navigationLinks,
  contactEmail,
  contactPhone,
  contactWhatsApp,
  contactAddress,
  socialLinks,
  footerText,
}: FooterProps) {
  const waLink = contactWhatsApp
    ? `https://wa.me/${contactWhatsApp}?text=Olá! Gostaria de solicitar um orçamento.`
    : undefined

  return (
    <footer id="contato" className="bg-text-primary text-background">
      <div className="container-content py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-2xl tracking-wide mb-4">{siteName}</p>
            <p className="font-sans text-sm text-background/60 leading-relaxed max-w-xs">
              Têxteis personalizados de alta qualidade para marcas corporativas exigentes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label-tag text-background/40 mb-6">Navegação</p>
            <nav className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-background/70 hover:text-background transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="label-tag text-background/40 mb-6">Contato</p>
            <div className="flex flex-col gap-3">
              {contactEmail && (
                <a href={`mailto:${contactEmail}`} className="font-sans text-sm text-background/70 hover:text-background transition-colors">
                  {contactEmail}
                </a>
              )}
              {contactPhone && (
                <a href={`tel:${contactPhone.replace(/\D/g, '')}`} className="font-sans text-sm text-background/70 hover:text-background transition-colors">
                  {contactPhone}
                </a>
              )}
              {waLink && (
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-background/70 hover:text-background transition-colors">
                  WhatsApp
                </a>
              )}
              {contactAddress && (
                <p className="font-sans text-sm text-background/50 leading-relaxed">{contactAddress}</p>
              )}
            </div>

            {socialLinks && socialLinks.length > 0 && (
              <div className="mt-8 flex gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs tracking-widest uppercase text-background/50 hover:text-background transition-colors"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-background/30">
            {footerText || `© ${new Date().getFullYear()} ${siteName}. Todos os direitos reservados.`}
          </p>
          <p className="font-sans text-xs text-background/20">
            B2B Textile Customization
          </p>
        </div>
      </div>
    </footer>
  )
}

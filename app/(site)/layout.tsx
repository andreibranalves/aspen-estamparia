export const revalidate = 60

import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactSection } from '@/components/home/ContactSection'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)

  const siteName = settings?.siteName || 'Aspen Estamparia'
  const navLinks = settings?.navigationLinks || [
    { label: 'Produtos', href: '/catalogo' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <>
      <Header
        siteName={siteName}
        navigationLinks={navLinks}
        contactWhatsApp={settings?.contactWhatsApp}
      />
      <main className="pt-[73px]">{children}</main>
      <ContactSection />
      <Footer
        siteName={siteName}
        navigationLinks={navLinks}
        contactEmail={settings?.contactEmail}
        contactPhone={settings?.contactPhone}
        contactWhatsApp={settings?.contactWhatsApp}
        contactAddress={settings?.contactAddress}
        socialLinks={settings?.socialLinks}
        footerText={settings?.footerText}
      />
    </>
  )
}

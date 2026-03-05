'use client'

import Link from 'next/link'
import { useState } from 'react'

interface NavLink {
  label: string
  href: string
}

interface HeaderProps {
  siteName: string
  navigationLinks: NavLink[]
  contactWhatsApp?: string
}

export function Header({ siteName, navigationLinks, contactWhatsApp }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const waLink = contactWhatsApp
    ? `https://wa.me/${contactWhatsApp}?text=Olá! Gostaria de solicitar um orçamento.`
    : '#contato'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-accent/20">
      <div className="container-content flex items-center justify-between h-18 py-4">
        {/* Logo / Brand */}
        <Link href="/" className="font-serif text-xl tracking-wide text-text-primary hover:text-cta transition-colors">
          {siteName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-xs font-medium tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Solicitar Orçamento
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-text-primary transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-text-primary transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-text-primary transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-accent/20 px-6 py-8 flex flex-col gap-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm font-medium tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary mt-2 text-center">
            Solicitar Orçamento
          </a>
        </div>
      )}
    </header>
  )
}

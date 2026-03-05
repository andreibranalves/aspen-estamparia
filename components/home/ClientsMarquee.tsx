const LOGOS = [
  { src: '/logos-clientes/Logo-Lifesaver.svg', alt: 'Lifesaver' },
  { src: '/logos-clientes/Logo-Outbrain.svg', alt: 'Outbrain' },
  { src: '/logos-clientes/Logo-Moneo.svg', alt: 'Moneo' },
  { src: '/logos-clientes/Logo-Netflix.svg', alt: 'Netflix' },
  { src: '/logos-clientes/Logo-Sicoob.svg', alt: 'Sicoob' },
  { src: '/logos-clientes/Logo NFL.svg', alt: 'NFL' },
  { src: '/logos-clientes/Logo-BDG.svg', alt: 'BDG' },
]

export function ClientsMarquee() {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container-content mb-10 text-center">
        <p className="label-tag mb-4">Realizamos projetos para diversos segmentos</p>
        <h2 className="font-serif text-display-md text-text-primary">Alguns de nossos clientes</h2>
      </div>

      {/* Track with fade edges */}
      <div className="relative mx-auto" style={{ width: '70%' }}>
        <div
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--color-background), transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--color-background), transparent)' }}
        />

        <div className="flex marquee-track">
          {/* Duplicate for seamless loop */}
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center px-12"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-auto opacity-40 grayscale transition-all duration-500 hover:opacity-80 hover:grayscale-0" style={{ height: '100px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  {
    number: '01',
    title: 'Briefing',
    description: 'Compartilhe sua identidade visual, volume desejado e prazo. Nossa equipe analisa e propõe as melhores opções.',
  },
  {
    number: '02',
    title: 'Aprovação de Arte',
    description: 'Desenvolvemos a arte finalizada e enviamos para sua aprovação. Revisões ilimitadas até perfeição.',
  },
  {
    number: '03',
    title: 'Produção & Entrega',
    description: 'Com arte aprovada, produzimos com rigoroso controle de qualidade e entregamos no prazo acordado.',
  },
]

export function ProcessStrip() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-content">
        <div className="text-center mb-16">
          <p className="label-tag mb-4">Como Funciona</p>
          <h2 className="text-display-md font-serif text-text-primary">
            Simples do início ao fim
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative px-8 py-10 md:border-r border-accent/30 last:border-r-0 first:pl-0 last:pr-0"
            >
              {/* Step number */}
              <p className="font-serif text-6xl text-accent/40 mb-6 leading-none">{step.number}</p>

              {/* Connector line (hidden on mobile) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-[4.5rem] right-0 translate-x-1/2 w-3 h-3 rounded-full border-2 border-accent bg-surface z-10" />
              )}

              <h3 className="font-serif text-xl text-text-primary mb-3">{step.title}</h3>
              <p className="font-sans text-sm text-text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

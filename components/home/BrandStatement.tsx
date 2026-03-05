export function BrandStatement() {
  return (
    <section className="section-padding bg-background">
      <div className="container-content">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-tag mb-8">Nossa Proposta</p>
          <h2 className="text-display-md font-serif text-text-primary leading-tight mb-8">
            Cada peça conta a história{' '}
            <em className="font-normal text-text-muted not-italic">da sua marca</em>
          </h2>
          <p className="font-sans text-base lg:text-lg text-text-muted leading-relaxed">
            Desenvolvemos têxteis personalizados que unem qualidade artesanal com produção industrial —
            sem concessões. Atendemos marcas corporativas que entendem que um brinde bem-feito
            é um investimento em percepção de valor.
          </p>
        </div>

        {/* Stats strip */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-0 border-t border-accent/30 pt-12">
          {[
            { value: '+500', label: 'Clientes Corporativos' },
            { value: '15+', label: 'Anos de Experiência' },
            { value: '100%', label: 'Satisfação Garantida' },
          ].map((stat) => (
            <div key={stat.label} className="text-center lg:border-r lg:last:border-r-0 border-accent/20">
              <p className="font-serif text-4xl lg:text-5xl text-text-primary mb-2">{stat.value}</p>
              <p className="label-tag">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

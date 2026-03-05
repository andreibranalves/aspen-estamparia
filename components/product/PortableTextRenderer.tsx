import { PortableText, type PortableTextComponents } from 'next-sanity'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-sans text-base text-text-muted leading-relaxed mb-4 last:mb-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl text-text-primary mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl text-text-primary mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-6 my-6 font-serif text-lg text-text-muted italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} className="underline text-cta hover:text-cta-hover transition-colors">
        {children}
      </a>
    ),
  },
}

interface PortableTextRendererProps {
  value: unknown[]
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value as Parameters<typeof PortableText>[0]['value']} components={components} />
}

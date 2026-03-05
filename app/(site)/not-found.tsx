import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="font-serif text-8xl text-accent mb-6">404</p>
        <h1 className="font-serif text-display-md text-text-primary mb-4">Página não encontrada</h1>
        <p className="font-sans text-text-muted mb-10">
          A página que você procura não existe ou foi movida.
        </p>
        <Link href="/" className="btn-primary">
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}

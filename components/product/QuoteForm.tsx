'use client'

import { useState } from 'react'

interface QuoteFormProps {
  productName?: string
  products?: string[]
}

export function QuoteForm({ productName, products }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: productName || '',
    quantity: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', company: '', email: '', phone: '', product: productName || '', quantity: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-transparent border border-accent/40 px-4 py-3 font-sans text-sm text-text-primary placeholder-text-muted/60 focus:outline-none focus:border-cta transition-colors'

  if (status === 'success') {
    return (
      <div className="bg-cta/5 border border-cta/20 p-8 text-center">
        <p className="font-serif text-2xl text-text-primary mb-3">Solicitação enviada!</p>
        <p className="font-sans text-sm text-text-muted">
          Entraremos em contato em até 24 horas úteis com uma proposta personalizada.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Seu nome *"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Empresa *"
          required
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="email"
          placeholder="E-mail *"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClass}
        />
        <input
          type="tel"
          placeholder="Telefone / WhatsApp"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products && products.length > 0 ? (
          <select
            value={formData.product}
            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            className={inputClass}
          >
            <option value="">Produto de interesse</option>
            {products.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
            <option value="Outros">Outros</option>
          </select>
        ) : (
          <input
            type="text"
            placeholder="Produto de interesse"
            value={formData.product}
            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            className={inputClass}
          />
        )}
        <input
          type="number"
          placeholder="Quantidade estimada"
          min={1}
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className={inputClass}
        />
      </div>

      <textarea
        placeholder="Conte-nos sobre o seu projeto, referências, prazo desejado..."
        rows={4}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={`${inputClass} resize-none`}
      />

      {status === 'error' && (
        <p className="font-sans text-sm text-red-600">
          Ocorreu um erro. Por favor, tente novamente ou entre em contato pelo WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Enviando...' : 'Solicitar Orçamento'}
      </button>

      <p className="font-sans text-xs text-text-muted text-center">
        Resposta em até 24 horas úteis. Sem compromisso.
      </p>
    </form>
  )
}

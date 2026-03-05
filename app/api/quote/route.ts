import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, company, email, phone, product, quantity, message } = body

  if (!name || !email) {
    return NextResponse.json({ error: 'Nome e e-mail são obrigatórios.' }, { status: 400 })
  }

  const resendKey = process.env.RESEND_API_KEY
  const toEmail = process.env.RESEND_TO_EMAIL || 'contato@aspenestamparia.com.br'

  if (!resendKey) {
    // Dev mode: log and return success
    console.log('[Quote Form Submission]', { name, company, email, phone, product, quantity, message })
    return NextResponse.json({ ok: true })
  }

  const emailBody = `
Nova solicitação de orçamento recebida pelo site Aspen Estamparia.

Nome: ${name}
Empresa: ${company || '—'}
E-mail: ${email}
Telefone: ${phone || '—'}
Produto de interesse: ${product || '—'}
Quantidade estimada: ${quantity || '—'}

Mensagem:
${message || '—'}
  `.trim()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: 'Aspen Estamparia <noreply@aspenestamparia.com.br>',
      to: [toEmail],
      reply_to: email,
      subject: `Orçamento: ${product || 'Produto não especificado'} — ${company || name}`,
      text: emailBody,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('[Resend error]', err)
    return NextResponse.json({ error: 'Falha ao enviar e-mail.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

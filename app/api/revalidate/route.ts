import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/', 'layout')
  revalidatePath('/catalogo')
  revalidatePath('/sobre')
  revalidatePath('/produtos/[slug]', 'page')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}

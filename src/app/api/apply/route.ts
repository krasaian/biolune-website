import { NextResponse } from 'next/server'
import { runSpamChecks } from '@/lib/anti-spam'

export const dynamic = 'force-dynamic'

// This route is a thin proxy to biolune-app's central /api/public/apply
// endpoint. All business logic (DB insert, Resend emails, validation) lives
// in biolune-app so the service role key only exists in one place.
//
// Required env vars on biolune-websitev2 (Vercel):
//   - APPLY_PROXY_SECRET: shared secret matching biolune-app
//   - APPLY_ENDPOINT_URL: (optional) override of the upstream URL
const DEFAULT_UPSTREAM = 'https://biolune-app.vercel.app/api/public/apply'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
    }

    // Spam protection at the edge: honeypot + per-IP rate limit on this
    // proxy means we don't even forward bot traffic to the upstream app.
    const spam = runSpamChecks(req, body as Record<string, unknown>, { endpoint: 'apply' })
    if (!spam.ok) {
      if (spam.error === 'silent-drop') return NextResponse.json({ success: true })
      return NextResponse.json({ error: spam.error }, { status: spam.status })
    }

    const { name, email } = body as Record<string, string | undefined>
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const upstreamUrl = process.env.APPLY_ENDPOINT_URL || DEFAULT_UPSTREAM
    const secret = process.env.APPLY_PROXY_SECRET

    if (!secret) {
      console.error('APPLY_PROXY_SECRET is not configured')
      return NextResponse.json({ error: 'Server misconfigured.' }, { status: 500 })
    }

    const upstream = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Apply-Secret': secret,
      },
      body: JSON.stringify(body),
    })

    const result = await upstream.json().catch(() => ({ error: 'Invalid upstream response' }))

    if (!upstream.ok) {
      console.error('Upstream apply error:', upstream.status, result)
      return NextResponse.json(
        { error: result.error || 'Failed to submit. Please try again.' },
        { status: upstream.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Apply proxy error:', error)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}

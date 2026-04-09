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

// W48: per-process in-memory rate limiter. Each Vercel lambda gets its own
// Map, so this is not a hard cluster-wide cap — but it stops the dumb case of
// a stuck client retrying 100×/sec or a script hammering the endpoint from
// one IP. The upstream apply route in biolune-app does its own DB-backed
// dedup; this layer is just to keep abusive traffic from reaching it. We key
// on IP only (not IP+email) so an attacker can't sidestep the limit by
// rotating the email field.
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 3 // max requests per window per IP
const ipBuckets = new Map<string, number[]>()

function clientIp(req: Request): string {
  // Vercel sets x-forwarded-for to a comma-separated chain; the leftmost
  // value is the original client. Fallback to 'unknown' so the bucket still
  // groups requests with no header (which is itself a soft cap).
  const xff = req.headers.get('x-forwarded-for') || ''
  const first = xff.split(',')[0]?.trim()
  if (first) return first
  return req.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const bucket = (ipBuckets.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  bucket.push(now)
  ipBuckets.set(ip, bucket)
  return bucket.length > RATE_LIMIT_MAX
}

export async function POST(req: Request) {
  try {
    const ip = clientIp(req)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'You sent this form a moment ago. Please wait a minute and try again.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      )
    }

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

    // W-Wave-2: the apply form is now a 6-step ritual. Two new fields
    // come in alongside the legacy 5: `vision` (the reflective 12-months
    // answer) and `tried` (the loss-frame answer). Both are forwarded
    // upstream as part of `body`. biolune-app will surface them in the
    // admin queue once its own W-Wave-2 cutover lands; until then they
    // still ride along in the row payload so nothing is lost.
    const { name, email, plan, location, objective, vision, tried, acceptedTos } = body as Record<string, string | boolean | undefined>
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }
    // W47: ToS is enforced server-side too — the client checkbox is required,
    // but anyone can hit the endpoint directly with curl. No ToS, no submit.
    if (acceptedTos !== true) {
      return NextResponse.json({ error: 'You must accept the terms of service to submit.' }, { status: 400 })
    }
    // W17: enforce plan server-side too. The client form has `required`
    // on the select but a determined caller can still POST without it,
    // and we want every row in the upstream `applications` table to
    // carry a tier so the admin queue is sortable.
    if (typeof plan !== 'string' || !plan.trim()) {
      return NextResponse.json({ error: 'Please pick a plan that interests you.' }, { status: 400 })
    }
    // W18: location + objective are also required by the form. Mirror
    // the same enforcement at the proxy edge so the upstream row never
    // ends up half-populated.
    if (typeof location !== 'string' || !location.trim()) {
      return NextResponse.json({ error: 'Please tell us where you\'re located.' }, { status: 400 })
    }
    if (typeof objective !== 'string' || !objective.trim()) {
      return NextResponse.json({ error: 'Please pick a primary objective.' }, { status: 400 })
    }
    // W-Wave-2 ritual validation: keep these soft. The client enforces
    // minimum lengths (vision ≥20 chars, tried ≥10 chars) so the ritual
    // can't be fast-clicked. The proxy accepts anything non-empty so
    // older clients without the new fields still work if we ever need
    // to revert the ritual in a hurry.
    if (vision !== undefined && typeof vision !== 'string') {
      return NextResponse.json({ error: 'Invalid vision field.' }, { status: 400 })
    }
    if (tried !== undefined && typeof tried !== 'string') {
      return NextResponse.json({ error: 'Invalid tried field.' }, { status: 400 })
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

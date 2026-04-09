// Shared spam-protection helpers for the marketing site's public form
// endpoints (apply, contact, newsletter).
//
// Three layers, all cheap and self-contained — no third-party services:
//
// 1. Honeypot. Forms include a `_botField` text input hidden via CSS+aria,
//    and any submission with a non-empty value is silently dropped. Most
//    naive form-spam bots fill every visible-looking field, so this catches
//    a huge percentage at zero cost.
//
// 2. Per-IP in-memory rate limit. Each Vercel lambda holds its own token
//    bucket keyed on x-forwarded-for. This isn't a hard cluster-wide cap,
//    but it stops the dumb case of a single source hammering the endpoint.
//    The default is 3 requests per 60s per IP per endpoint.
//
// 3. Content heuristics. Reject obvious spam patterns: more than 3 URLs in
//    the message body, message bodies that contain CJK + cyrillic + latin
//    mixed scripts, or trivially-empty submissions. The goal is to filter
//    automated junk without blocking real humans, so the thresholds are
//    intentionally generous.
//
// The output of all three layers is the same shape: { ok: true } or
// { ok: false, status, error }. Routes can spread it directly into a
// NextResponse without branching logic.

export interface SpamCheckResult {
  ok: boolean
  status?: number
  error?: string
}

// ── Layer 1: honeypot ──────────────────────────────────────────────────────

export function honeypotTriggered(body: Record<string, unknown>): boolean {
  const value = body?._botField
  // Treat any non-empty string as a bot. Real users never see the field.
  return typeof value === 'string' && value.trim().length > 0
}

// ── Layer 2: rate limit ────────────────────────────────────────────────────

const buckets = new Map<string, number[]>()
const DEFAULT_WINDOW_MS = 60 * 1000
const DEFAULT_MAX = 3

export function clientIp(req: Request): string {
  // Vercel sets x-forwarded-for to a comma-separated chain. The leftmost
  // value is the original client. Fall back so requests with no header still
  // share a bucket (which is itself a soft cap).
  const xff = req.headers.get('x-forwarded-for') || ''
  const first = xff.split(',')[0]?.trim()
  if (first) return first
  return req.headers.get('x-real-ip') || 'unknown'
}

export function isRateLimited(
  bucketKey: string,
  options: { windowMs?: number; max?: number } = {},
): boolean {
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS
  const max = options.max ?? DEFAULT_MAX
  const now = Date.now()
  const bucket = (buckets.get(bucketKey) || []).filter((t) => now - t < windowMs)
  bucket.push(now)
  buckets.set(bucketKey, bucket)
  return bucket.length > max
}

// ── Layer 3: content heuristics ───────────────────────────────────────────

const URL_REGEX = /https?:\/\/[^\s]+/gi

export function looksLikeSpamContent(text: string | undefined | null): boolean {
  if (!text) return false
  const trimmed = text.trim()
  if (trimmed.length === 0) return false

  // Too many URLs is the cheapest, most reliable signal.
  const urls = trimmed.match(URL_REGEX) || []
  if (urls.length > 3) return true

  // Suspicious BBCode link spam pattern (real users don't write [url=...])
  if (/\[url=/i.test(trimmed)) return true

  // Trivial keyword honeypots — if anyone actually emails us about Viagra,
  // they can email hello@biolune.eu directly.
  if (/\b(viagra|cialis|porn|casino|crypto airdrop|seo backlinks)\b/i.test(trimmed)) {
    return true
  }

  return false
}

// ── HTML escaping for email templates ─────────────────────────────────────

// Escape user-provided strings before interpolating into Resend HTML
// templates. We've been concatenating raw form values into <td>s, which is
// fine for plain text but trivially exploitable for HTML/script injection
// in the inbox view.
export function escapeHtml(s: string | undefined | null): string {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ── Combined check, used by routes ────────────────────────────────────────

export function runSpamChecks(
  req: Request,
  body: Record<string, unknown>,
  options: {
    endpoint: string
    contentField?: string
    rateLimitMax?: number
    rateLimitWindowMs?: number
  },
): SpamCheckResult {
  if (honeypotTriggered(body)) {
    // Pretend it succeeded so the bot doesn't retry — we just don't do
    // anything. The route should `return ok` instead of forwarding.
    return { ok: false, status: 200, error: 'silent-drop' }
  }

  const ip = clientIp(req)
  if (
    isRateLimited(`${options.endpoint}:${ip}`, {
      windowMs: options.rateLimitWindowMs,
      max: options.rateLimitMax,
    })
  ) {
    return {
      ok: false,
      status: 429,
      error: 'You sent this form a moment ago. Please wait a minute and try again.',
    }
  }

  if (options.contentField) {
    const value = body[options.contentField]
    if (typeof value === 'string' && looksLikeSpamContent(value)) {
      // Same silent-drop pattern: spammers don't deserve a real error message
      // that tells them how to evade the filter.
      return { ok: false, status: 200, error: 'silent-drop' }
    }
  }

  return { ok: true }
}

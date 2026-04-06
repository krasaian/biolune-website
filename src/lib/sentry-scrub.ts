// Sentry beforeSend hook for biolune-website.
//
// The marketing site is mostly public content, but the apply form
// collects PII (name, email, phone, age, plan choice, free-text
// answers about health goals). None of that should ever land in
// Sentry — it would defeat the GDPR posture of the rest of the stack.
//
// This module recursively walks every Sentry event and redacts any
// field whose key matches a PII pattern. It scrubs request bodies,
// breadcrumbs, contexts, extras, and user objects. If anything throws
// during scrubbing the entire event is dropped — leaking is worse
// than losing telemetry.
//
// Patterns are intentionally broad. Add new ones over time as we
// discover form fields we missed; never remove patterns without
// explicit review.

import type { Event, EventHint } from '@sentry/nextjs'

const REDACTED = '[REDACTED]'
const MAX_DEPTH = 10

const SENSITIVE_KEY_PATTERNS: RegExp[] = [
  // Generic credentials
  /password/i,
  /passwd/i,
  /secret/i,
  /token/i,
  /api[_-]?key/i,
  /authorization/i,
  /cookie/i,
  /session/i,

  // Apply form personal identifiers
  /^name$/i,
  /first[_-]?name/i,
  /last[_-]?name/i,
  /full[_-]?name/i,
  /email/i,
  /phone/i,
  /mobile/i,
  /tel(ephone)?/i,
  /address/i,
  /city/i,
  /country/i,
  /postal/i,
  /zip/i,
  /dob/i,
  /birth/i,
  /age/i,

  // Apply form health-context fields
  /goal/i,
  /symptom/i,
  /condition/i,
  /medication/i,
  /supplement/i,
  /sleep/i,
  /stress/i,
  /diet/i,
  /weight/i,
  /height/i,
  /bmi/i,

  // Free-text answer fields
  /message/i,
  /notes?$/i,
  /comments?$/i,
  /answer/i,
  /response/i,
  /reason/i,
]

function isSensitiveKey(key: string): boolean {
  return SENSITIVE_KEY_PATTERNS.some((pattern) => pattern.test(key))
}

function scrubObject(obj: unknown, depth = 0): unknown {
  if (depth > MAX_DEPTH) return REDACTED
  if (obj == null) return obj
  if (typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    return obj.map((item) => scrubObject(item, depth + 1))
  }

  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (isSensitiveKey(key)) {
      result[key] = REDACTED
    } else {
      result[key] = scrubObject(value, depth + 1)
    }
  }
  return result
}

export function scrubFormPII(event: Event, _hint: EventHint): Event | null {
  try {
    if (event.request) {
      if (event.request.data) {
        event.request.data = scrubObject(event.request.data) as typeof event.request.data
      }
      if (event.request.cookies) {
        event.request.cookies = REDACTED as unknown as typeof event.request.cookies
      }
      if (event.request.headers) {
        const headers = { ...event.request.headers } as Record<string, string>
        for (const k of Object.keys(headers)) {
          if (isSensitiveKey(k)) headers[k] = REDACTED
        }
        event.request.headers = headers
      }
      if (event.request.query_string) {
        event.request.query_string = REDACTED as unknown as typeof event.request.query_string
      }
    }

    if (event.user) {
      // Keep id (uuid), drop everything else
      event.user = { id: event.user.id }
    }

    if (event.extra) {
      event.extra = scrubObject(event.extra) as typeof event.extra
    }
    if (event.contexts) {
      event.contexts = scrubObject(event.contexts) as typeof event.contexts
    }

    if (event.breadcrumbs) {
      event.breadcrumbs = event.breadcrumbs.map((b) =>
        b.data ? { ...b, data: scrubObject(b.data) as typeof b.data } : b,
      )
    }

    return event
  } catch {
    // If scrubbing throws for any reason, drop the event entirely.
    // Losing one error report is acceptable; leaking PII is not.
    return null
  }
}

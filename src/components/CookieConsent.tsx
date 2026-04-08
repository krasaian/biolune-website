'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// GDPR cookie consent banner.
//
// Why a custom banner: we don't need a 12-vendor TCF flow — we run Google
// Analytics 4 only, so this is a binary "analytics on/off" choice. Default
// state in src/app/layout.tsx is `analytics_storage: 'denied'`, and this
// component flips it to `'granted'` on accept by calling gtag('consent','update').
// Reject keeps it denied, which causes GA4 to drop hits client-side without
// ever fetching the script payload.
//
// Persistence: we store the choice in localStorage under
// `biolune-cookie-consent` (`'accepted' | 'rejected'`). The banner re-appears
// only if no choice is recorded. There's a "Cookie settings" link in the
// footer that clears the choice and re-opens this banner.

const STORAGE_KEY = 'biolune-cookie-consent'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    biolune_openCookieSettings?: () => void
  }
}

type Choice = 'accepted' | 'rejected'

function readChoice(): Choice | null {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'accepted' || v === 'rejected' ? v : null
  } catch {
    return null
  }
}

function writeChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Storage may be blocked (private mode, etc) — non-fatal: the banner will
    // simply re-appear on next visit, which is the correct GDPR fallback.
  }
}

function applyConsent(choice: Choice) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    analytics_storage: choice === 'accepted' ? 'granted' : 'denied',
  })
}

export default function CookieConsent() {
  // Hidden by default — only show after we've checked localStorage on mount,
  // so we never flash the banner to users who already chose.
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const choice = readChoice()
    if (choice === null) {
      setVisible(true)
    } else {
      // Re-apply the persisted choice on every page load — we default to
      // denied in the layout, so accepted users need this update to re-grant.
      applyConsent(choice)
    }

    // Expose a global hook so the footer "Cookie settings" link can re-open
    // this banner without an extra route. Cleared on unmount.
    window.biolune_openCookieSettings = () => setVisible(true)
    return () => {
      delete window.biolune_openCookieSettings
    }
  }, [])

  const decide = (choice: Choice) => {
    writeChoice(choice)
    applyConsent(choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        right: 16,
        maxWidth: 720,
        margin: '0 auto',
        background: 'var(--bg, #1a1916)',
        color: 'var(--text, #fef9ef)',
        border: '1px solid var(--border, rgba(254,249,239,0.15))',
        borderRadius: 12,
        padding: '20px 24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
        zIndex: 9999,
        fontFamily: '"Jost", system-ui, sans-serif',
        fontSize: 14,
        lineHeight: 1.55,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div>
        <strong style={{ display: 'block', marginBottom: 6, fontSize: 15 }}>
          We use cookies
        </strong>
        <span style={{ opacity: 0.85 }}>
          We use a single first-party analytics cookie (Google Analytics 4) to
          understand which pages help people the most. No advertising, no
          third-party tracking, no profile-building. You can change your mind
          anytime via &ldquo;Cookie settings&rdquo; in the footer. See our{' '}
          <Link
            href="/legal/cookie-policy"
            style={{ color: 'var(--gold, #c8a84b)', textDecoration: 'underline' }}
          >
            cookie policy
          </Link>
          .
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }}
      >
        <button
          type="button"
          onClick={() => decide('rejected')}
          style={{
            background: 'transparent',
            color: 'inherit',
            border: '1px solid var(--border, rgba(254,249,239,0.3))',
            borderRadius: 6,
            padding: '10px 18px',
            fontFamily: 'inherit',
            fontSize: 13,
            letterSpacing: 1,
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => decide('accepted')}
          style={{
            background: 'var(--gold, #c8a84b)',
            color: 'var(--bg, #1a1916)',
            border: '1px solid var(--gold, #c8a84b)',
            borderRadius: 6,
            padding: '10px 18px',
            fontFamily: 'inherit',
            fontSize: 13,
            letterSpacing: 1,
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}

// W33: minimal client-side helper for GA4 custom events. Wraps the
// `gtag` global so callsites don't have to typeguard `window` everywhere.
//
// Usage:
//   import { trackEvent } from '@/lib/analytics'
//   trackEvent('cta_click', { location: 'navbar', label: 'Apply for access' })
//
// All events are no-ops if gtag is missing (e.g. SSR, ad-blockers, or
// before the cookie banner has been accepted in our consent setup).

type GtagFn = (
  command: 'event',
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
) => void

declare global {
  interface Window {
    gtag?: GtagFn
  }
}

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean | undefined> = {},
): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  try {
    window.gtag('event', eventName, params)
  } catch (err) {
    // Silently swallow analytics errors so they never break the UI.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[analytics] trackEvent failed', err)
    }
  }
}

export function trackCtaClick(label: string, location: string): void {
  trackEvent('cta_click', { label, location })
}

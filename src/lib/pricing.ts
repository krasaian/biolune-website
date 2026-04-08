// Marketing-site pricing fetcher.
//
// The single source of truth for pricing lives in biolune-app's
// /api/public/pricing route (backed by biolune-app/src/lib/pricing.ts). The
// website fetches it via Next.js ISR with a 5-minute revalidation, and falls
// back to a hardcoded snapshot if the API is unreachable so a marketing
// deploy is never blocked on the app being up.
//
// Feature lists stay on the website (they're marketing copy and change with
// the website narrative, not the price), and are keyed by tier id so they
// render alongside whichever tier the API returns.

export type TierId = 'protocol' | 'precision' | 'elite'

export interface ApiTier {
  id: TierId
  name: string
  priceEUR: number
  amountCents: number
  tagline: string
  gated: boolean
  ctaPath: string
}

export interface PricingResponse {
  currency: string
  interval: string
  tiers: ApiTier[]
  generatedAt: string
}

const PRICING_API = process.env.NEXT_PUBLIC_BIOLUNE_APP_URL
  ? `${process.env.NEXT_PUBLIC_BIOLUNE_APP_URL}/api/public/pricing`
  : 'https://biolune-app.vercel.app/api/public/pricing'

// Hardcoded fallback. Mirrors biolune-app/src/lib/pricing.ts as of 2026-04-08.
// Keep in sync if pricing copy changes — the API is still the source of truth
// at runtime, this is just the build-time safety net.
export const PRICING_FALLBACK: PricingResponse = {
  currency: 'EUR',
  interval: 'month',
  generatedAt: '',
  tiers: [
    {
      id: 'protocol',
      name: 'Protocol',
      priceEUR: 149,
      amountCents: 14900,
      tagline:
        'Your personalised longevity protocol with DNA personalization — adapted weekly by AI.',
      gated: false,
      ctaPath: '/apply?tier=protocol',
    },
    {
      id: 'precision',
      name: 'Precision',
      priceEUR: 299,
      amountCents: 29900,
      tagline:
        'Autonomous AI that adapts your protocol to your biology — in real time.',
      gated: false,
      ctaPath: '/apply?tier=precision',
    },
    {
      id: 'elite',
      name: 'Elite',
      priceEUR: 549,
      amountCents: 54900,
      tagline:
        'Precision medicine meets personal coaching. Blood work, biomarkers, and direct collaboration with Korosh.',
      gated: true,
      ctaPath: '/apply?tier=elite',
    },
  ],
}

export async function fetchPricing(): Promise<PricingResponse> {
  try {
    const res = await fetch(PRICING_API, { next: { revalidate: 300 } })
    if (!res.ok) throw new Error(`pricing API returned ${res.status}`)
    const data = (await res.json()) as PricingResponse
    if (!Array.isArray(data?.tiers) || data.tiers.length === 0) {
      throw new Error('pricing API returned empty tiers')
    }
    return data
  } catch (err) {
    // Don't block a marketing deploy on the app being reachable.
    console.warn(
      '[pricing] failed to fetch /api/public/pricing, using fallback:',
      err,
    )
    return PRICING_FALLBACK
  }
}

export function tierById(
  pricing: PricingResponse,
  id: TierId,
): ApiTier {
  return (
    pricing.tiers.find((t) => t.id === id) ??
    (PRICING_FALLBACK.tiers.find((t) => t.id === id) as ApiTier)
  )
}

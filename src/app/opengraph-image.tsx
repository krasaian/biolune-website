import { ImageResponse } from 'next/og'

// Next.js convention: any app/opengraph-image.tsx file is automatically
// wired into the OG/Twitter meta tags for that route segment. Putting
// it at app/ level makes it the default for the whole site, replacing
// the previous static /public/og-image.png placeholder reference.
//
// Implementation uses next/og's ImageResponse (Satori-based) so we can
// generate the image at the edge with no design tooling, no Figma export
// step, and no risk of the static file going stale. Same library R24
// uses for the share-stack image in biolune-app, so the rendering stack
// is consistent across both repos.
//
// Per BIOLUNE_DECISIONS_NEEDED Q7: agent generates a clean text-only OG
// image with the headline + biolune.eu URL on the cream brand background.
// Korosh can replace this with a designed asset later by adding a
// /public/og-image.png and pointing the layout metadata back at it.

export const runtime = 'edge'
export const alt = 'Biolune — Precision longevity protocol built on your biology'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand tokens duplicated here because the edge runtime cannot import
// from globals.css. Keep these in sync with src/app/globals.css if the
// brand palette changes.
const COLORS = {
  bg: '#FEF9EF',
  text: '#1a1916',
  textMuted: '#8b8a85',
  gold: '#A89879',
  border: '#d9d4c8',
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: COLORS.bg,
          padding: '80px 100px',
          fontFamily: 'serif',
        }}
      >
        {/* ── Top: wordmark + tagline ───────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {/* Crescent moon glyph */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: COLORS.gold,
                position: 'relative',
                display: 'flex',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: -8,
                  width: 40,
                  height: 48,
                  borderRadius: '50%',
                  background: COLORS.bg,
                }}
              />
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 300,
                letterSpacing: 4,
                color: COLORS.text,
                display: 'flex',
              }}
            >
              biolune
            </div>
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: 6,
              color: COLORS.gold,
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Precision Longevity
          </div>
        </div>

        {/* ── Middle: headline ─────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 76,
            fontWeight: 300,
            lineHeight: 1.1,
            color: COLORS.text,
            maxWidth: 1000,
          }}
        >
          <div style={{ display: 'flex' }}>One daily protocol.</div>
          <div style={{ display: 'flex' }}>
            Built on{' '}
            <span style={{ color: COLORS.gold, fontStyle: 'italic', marginLeft: 16 }}>
              your biology.
            </span>
          </div>
        </div>

        {/* ── Bottom: divider + URL ────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 20,
          }}
        >
          <div
            style={{
              width: '100%',
              height: 1,
              background: COLORS.border,
              display: 'flex',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: COLORS.textMuted,
                letterSpacing: 1,
                display: 'flex',
              }}
            >
              biolune.eu
            </div>
            <div
              style={{
                fontSize: 18,
                color: COLORS.textMuted,
                letterSpacing: 2,
                textTransform: 'uppercase',
                display: 'flex',
              }}
            >
              HRV · Hormones · Biomarkers
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}

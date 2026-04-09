import type { Metadata } from 'next'
import * as Sentry from '@sentry/nextjs'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'

// Converted from `export const metadata` to `generateMetadata()` so we
// can spread Sentry.getTraceData() into the `other` field. This injects
// the meta tags Sentry needs to correlate browser pageloads with
// server-side traces — without it, distributed tracing is broken.
export function generateMetadata(): Metadata {
  return {
    title: 'Biolune — Precision Longevity Protocol',
    description: 'Biolune builds a precision longevity protocol from your HRV, hormones, and biomarkers. Rebuilt every Sunday from your data. For people who take their body as seriously as their work.',
    metadataBase: new URL('https://www.biolune.eu'),
    openGraph: {
      title: 'Biolune — Precision Longevity Protocol',
      description: 'A precision longevity protocol built from your HRV, hormones, and biomarkers. Rebuilt every Sunday from your data.',
      url: 'https://www.biolune.eu',
      siteName: 'Biolune',
      type: 'website',
      // OG image is generated dynamically by app/opengraph-image.tsx via
      // next/og's Satori-based ImageResponse. Next.js auto-wires that
      // file into the openGraph + twitter image meta tags for every
      // route, so we no longer need to reference a static file here.
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Biolune — Precision Longevity Protocol',
      description: 'Precision longevity protocol for high-performers. Built on your biology.',
    },
    // W34: explicit favicon set. Falls back to /favicon.ico in /public.
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png',
    },
    other: {
      ...Sentry.getTraceData(),
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HealthAndBeautyBusiness',
              name: 'Biolune',
              url: 'https://www.biolune.eu',
              logo: 'https://www.biolune.eu/og-image.png',
              description: 'A precision longevity protocol built from your HRV, hormones, and biomarkers. Rebuilt every Sunday from your data.',
              email: 'hello@biolune.eu',
              // W30: filled-out organisation + founder schema. Search engines
              // can now show authorship cards, social profile links, and the
              // founder's credentials in rich results.
              sameAs: [
                'https://x.com/biolune',
                'https://www.instagram.com/biolune',
                'https://www.linkedin.com/company/biolune',
              ],
              founder: {
                '@type': 'Person',
                name: 'Korosh Rasaian',
                jobTitle: 'Founder',
                image: 'https://www.biolune.eu/founder.jpg',
                url: 'https://www.biolune.eu/about',
                sameAs: [
                  'https://www.linkedin.com/in/koroshrasaian',
                  'https://x.com/koroshrasaian',
                ],
                knowsAbout: [
                  'Heart Rate Variability',
                  'Longevity protocols',
                  'Hormonal balance',
                  'Precision nutrition',
                  'Sleep architecture',
                ],
              },
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'EUR',
                lowPrice: '149',
                highPrice: '549',
                offerCount: '3',
              },
            }),
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YMC268HCZ8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              // GDPR: default to denied. CookieConsent.tsx flips this to
              // 'granted' on Accept and re-applies the persisted choice on
              // every page load. Without explicit consent, GA4 drops hits
              // client-side and never identifies the visitor.
              gtag('consent', 'default', {
                'analytics_storage': 'denied'
              });
              gtag('config', 'G-YMC268HCZ8');
            `,
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}

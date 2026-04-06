import type { Metadata } from 'next'
import * as Sentry from '@sentry/nextjs'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Converted from `export const metadata` to `generateMetadata()` so we
// can spread Sentry.getTraceData() into the `other` field. This injects
// the meta tags Sentry needs to correlate browser pageloads with
// server-side traces — without it, distributed tracing is broken.
export function generateMetadata(): Metadata {
  return {
    title: 'Biolune — Precision Longevity Protocol',
    description: 'Biolune builds a precision longevity protocol from your HRV, hormones, and biomarkers — adapted weekly by AI. Designed for high-performers who want measurable results.',
    metadataBase: new URL('https://www.biolune.eu'),
    openGraph: {
      title: 'Biolune — Precision Longevity Protocol',
      description: 'Biolune builds a precision longevity protocol from your HRV, hormones, and biomarkers — adapted weekly by AI.',
      url: 'https://www.biolune.eu',
      siteName: 'Biolune',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Biolune — Precision Longevity Protocol',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Biolune — Precision Longevity Protocol',
      description: 'Precision longevity protocol for high-performers. Built on your biology.',
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
              description: 'Biolune builds a precision longevity protocol from your HRV, hormones, and biomarkers — adapted weekly. Designed for high-performers.',
              email: 'hello@biolune.eu',
              sameAs: [],
              founder: {
                '@type': 'Person',
                name: 'Korosh',
                jobTitle: 'Founder',
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
              gtag('consent', 'default', {
                'analytics_storage': 'granted'
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
      </body>
    </html>
  )
}

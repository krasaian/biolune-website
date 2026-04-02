import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('biolune-theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
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
                lowPrice: '99',
                highPrice: '799',
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
        <ThemeToggle />
      </body>
    </html>
  )
}

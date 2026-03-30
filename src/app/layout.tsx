import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biolune — Precision Longevity Protocol',
    description: 'Precision longevity protocol for high-performers. Built on your biology.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

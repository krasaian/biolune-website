'use client'
import { useState } from 'react'
import Link from 'next/link'

const BioluneLogo = () => (
  <Link href="/" style={{ display: 'inline-block', lineHeight: 0 }}>
    <svg viewBox="0 0 400 120" width="120" height="36" aria-label="Biolune">
      <path d="M30 60 Q30 28 48 28 Q36 38 36 60 Q36 82 48 92 Q30 92 30 60Z" fill="#A89879"/>
      <path d="M48 28 Q66 28 66 60 Q66 92 48 92 Q60 82 60 60 Q60 38 48 28Z" fill="none" stroke="#A89879" strokeWidth="1.2"/>
      <text x="82" y="58" fontFamily="Cormorant Garamond,Georgia,serif" fontSize="42" fontWeight="300" letterSpacing="2" fill="#1a1916">biolune</text>
      <line x1="82" y1="68" x2="370" y2="68" stroke="#A89879" strokeWidth="0.6" opacity="0.6"/>
      <text x="82" y="84" fontFamily="Jost,Arial,sans-serif" fontSize="10" fontWeight="300" letterSpacing="5.5" fill="#A89879">PRECISION LONGEVITY</text>
    </svg>
  </Link>
)

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p style={{ color: 'var(--gold)', fontSize: 14, letterSpacing: 1, marginTop: 28 }}>
        You're subscribed. First issue arrives this week.
      </p>
    )
  }

  return (
    <form className="newsletter-form" style={{ marginTop: 28 }} onSubmit={handleSubmit}>
      <input
        type="email"
        className="newsletter-input"
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        className="btn btn-gold"
        disabled={status === 'loading'}
        style={{ opacity: status === 'loading' ? 0.7 : 1 }}
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p style={{ width: '100%', color: '#c0392b', fontSize: 12, marginTop: 8 }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link { font-size: 14px; color: var(--text-muted); transition: color 0.2s; display: block; }
        .footer-link:hover { color: var(--text); }
        .newsletter-input {
          padding: 13px 20px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: var(--bg);
          font-size: 14px;
          font-family: 'Jost', sans-serif;
          color: var(--text);
          width: 260px;
          outline: none;
        }
        .newsletter-input:focus { border-color: var(--gold); }
        .newsletter-input::placeholder { color: var(--text-muted); }
      `}</style>

      {/* Newsletter */}
      <div className="newsletter">
        <div className="container" style={{ textAlign: 'center' }}>
          <BioluneLogo />
          <div style={{ marginTop: 24 }}>
            <h3 className="serif">The protocol. In your inbox. Weekly.</h3>
            <p style={{ marginTop: 8 }}>Join 1,200+ high-performers getting weekly insights on HRV, longevity, and precision recovery. No noise — only signal.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-alt)',
        borderTop: '1px solid var(--border)',
        padding: '56px 0 32px',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '40px 32px',
            marginBottom: 48,
          }}>
            <div>
              <p style={{ fontFamily: 'Jost,sans-serif', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Navigation</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link href="/about" className="footer-link">About</Link>
                <Link href="/pricing" className="footer-link">Pricing</Link>
                <Link href="/contact" className="footer-link">Contact</Link>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'Jost,sans-serif', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Resources</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link href="/news" className="footer-link">News</Link>
                <Link href="/success-stories" className="footer-link">Success Stories</Link>
                <Link href="/pricing#faq" className="footer-link">FAQs</Link>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'Jost,sans-serif', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Social</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="https://x.com/biolune" target="_blank" rel="noopener noreferrer" className="footer-link">X / Twitter</a>
                <a href="https://instagram.com/biolune" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
                <a href="https://linkedin.com/company/biolune" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'Jost,sans-serif', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Legal</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link href="/legal/privacy-policy" className="footer-link">Privacy Policy</Link>
                <Link href="/legal/terms-of-service" className="footer-link">Terms of Service</Link>
                <Link href="/legal/cookie-policy" className="footer-link">Cookie Policy</Link>
                <button
                  type="button"
                  className="footer-link"
                  style={{ background: 'none', border: 0, padding: 0, textAlign: 'left', cursor: 'pointer', font: 'inherit' }}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      try { window.localStorage.removeItem('biolune-cookie-consent') } catch {}
                      const open = (window as unknown as { biolune_openCookieSettings?: () => void }).biolune_openCookieSettings
                      if (typeof open === 'function') open()
                    }
                  }}
                >
                  Cookie Settings
                </button>
                <Link href="/legal/licensing-agreement" className="footer-link">Licensing Agreement</Link>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>© 2026 Biolune. All rights reserved.</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Biolune is a precision longevity protocol, not medical treatment. Always consult your physician.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

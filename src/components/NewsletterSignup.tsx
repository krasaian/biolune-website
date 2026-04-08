'use client'
import { useState } from 'react'

// W26: single canonical newsletter form. Footer.tsx and the blog pages both
// render this component instead of duplicating the fetch/form/state logic.
// The `variant` prop swaps the styling between the centered inline blog
// version and the footer's pill-input + button-row layout.
type Variant = 'inline' | 'footer'

interface Props {
  variant?: Variant
  className?: string
}

export default function NewsletterSignup({ variant = 'inline', className }: Props) {
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
      <p
        style={{
          color: 'var(--gold)',
          fontSize: 14,
          letterSpacing: 1,
          marginTop: variant === 'footer' ? 28 : 8,
        }}
      >
        You&rsquo;re subscribed. First issue arrives this week.
      </p>
    )
  }

  if (variant === 'footer') {
    return (
      <form
        className={`newsletter-form ${className ?? ''}`}
        style={{ marginTop: 28 }}
        onSubmit={handleSubmit}
      >
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

  return (
    <div
      className={className}
      style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            padding: '13px 20px',
            borderRadius: '100px',
            border: '1px solid var(--border)',
            background: 'var(--bg-alt)',
            fontSize: '14px',
            fontFamily: 'Jost, sans-serif',
            color: 'var(--text)',
            width: '260px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          className="btn btn-gold"
          disabled={status === 'loading'}
          style={{ opacity: status === 'loading' ? 0.7 : 1 }}
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p style={{ width: '100%', textAlign: 'center', color: '#c0392b', fontSize: 12, marginTop: 4 }}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}

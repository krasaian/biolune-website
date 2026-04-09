'use client'
import { useState } from 'react'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

export default function ApplyForm() {
  const [form, setForm] = useState({ name: '', email: '', location: '', objective: '', plan: '', _botField: '' })
  const [acceptedTos, setAcceptedTos] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rate-limited'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // W47: ToS must be ticked before we even POST. The button is also
    // `disabled` until acceptedTos flips, so this guard is the belt-and-braces.
    if (!acceptedTos) {
      setErrorMessage('Please confirm you accept the terms of service before submitting.')
      setStatus('error')
      return
    }
    setErrorMessage(null)
    setStatus('loading')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, acceptedTos }),
      })
      if (res.ok) {
        // W33: GA4 conversion event for successful applications. The plan
        // and location dimensions let us segment which protocol tier and
        // which geography are converting best.
        trackEvent('apply_submitted', { plan: form.plan || 'unspecified', location: form.location || 'unspecified' })
        setStatus('success')
      } else if (res.status === 429) {
        // W48: rate-limited by the proxy — surface the human-readable cooldown.
        const data = await res.json().catch(() => ({}))
        setErrorMessage(data?.error || 'You sent this form a moment ago. Please wait a minute and try again.')
        setStatus('rate-limited')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMessage(data?.error || null)
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--gold)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5 9-9" stroke="#fef9ef" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h3 className="serif" style={{ fontSize: 24, marginBottom: 12 }}>Application received.</h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: 380, margin: '0 auto', lineHeight: 1.7 }}>
          We review every application personally. You will hear from us within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Honeypot — hidden from real users; bots that auto-fill text inputs
          will populate this and the server silently drops the submission. */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}
      >
        <label htmlFor="apply-_botField">Leave this field empty</label>
        <input
          id="apply-_botField"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form._botField}
          onChange={(e) => setForm((prev) => ({ ...prev, _botField: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Your name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Full name"
          required
          value={form.name}
          onChange={set('name')}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-input"
          placeholder="you@example.com"
          required
          value={form.email}
          onChange={set('email')}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Where are you located?</label>
        <select className="form-select" required value={form.location} onChange={set('location')}>
          <option value="">Select country…</option>
          <option>Netherlands</option>
          <option>United Kingdom</option>
          <option>Germany</option>
          <option>France</option>
          <option>Belgium</option>
          <option>United Arab Emirates</option>
          <option>United States</option>
          <option>Canada</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">What is your primary objective?</label>
        <select className="form-select" required value={form.objective} onChange={set('objective')}>
          <option value="">Select objective…</option>
          <option>Longevity</option>
          <option>Performance</option>
          <option>Recovery</option>
          <option>Biomarker Tracking</option>
          <option>Hormonal Optimisation</option>
          <option>HRV Coaching</option>
          <option>Custom Protocol</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Which protocol interests you?</label>
        <select className="form-select" required value={form.plan} onChange={set('plan')}>
          <option value="">Select plan…</option>
          <option>Protocol</option>
          <option>Precision</option>
          <option>Elite</option>
          <option>Not sure yet</option>
        </select>
      </div>

      <div className="form-group" style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <input
          id="apply-tos"
          type="checkbox"
          checked={acceptedTos}
          onChange={(e) => setAcceptedTos(e.target.checked)}
          style={{ marginTop: 4, width: 16, height: 16, accentColor: 'var(--gold)' }}
          required
        />
        <label htmlFor="apply-tos" style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
          I have read and agree to the <Link href="/legal/terms-of-service">terms of service</Link> and
          {' '}<Link href="/legal/privacy-policy">privacy policy</Link>. I understand Biolune is a precision longevity protocol, not medical treatment.
        </label>
      </div>

      {(status === 'error' || status === 'rate-limited') && (
        <p style={{ color: '#c0392b', fontSize: 13, marginBottom: 16 }}>
          {errorMessage || 'Something went wrong. Please try again or email us directly at hello@biolune.eu.'}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-gold form-submit"
        disabled={status === 'loading' || !acceptedTos}
        style={{ opacity: status === 'loading' || !acceptedTos ? 0.7 : 1 }}
      >
        {status === 'loading' ? 'Sending…' : 'Request access'}
      </button>
    </form>
  )
}

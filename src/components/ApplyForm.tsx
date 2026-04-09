'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ApplyForm() {
  const [form, setForm] = useState({ name: '', email: '', location: '', objective: '', plan: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        let upstream = ''
        try {
          const data = await res.json()
          if (data && typeof data.error === 'string') upstream = data.error
        } catch {}
        setErrorMsg(upstream || 'Something went wrong. Please try again or email us directly at hello@biolune.eu.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again, or email us at hello@biolune.eu.')
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
        <select className="form-select" value={form.location} onChange={set('location')}>
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
        <select className="form-select" value={form.objective} onChange={set('objective')}>
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
        <select className="form-select" value={form.plan} onChange={set('plan')}>
          <option value="">Select plan…</option>
          <option>Protocol — €149/month</option>
          <option>Precision — €299/month</option>
          <option>Elite — €549/month</option>
          <option>Not sure yet</option>
        </select>
      </div>

      {status === 'error' && (
        <p style={{ color: '#c0392b', fontSize: 13, marginBottom: 16 }}>
          {errorMsg || 'Something went wrong. Please try again or email us directly at hello@biolune.eu.'}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-gold form-submit"
        disabled={status === 'loading'}
        style={{ opacity: status === 'loading' ? 0.7 : 1 }}
      >
        {status === 'loading' ? 'Sending…' : 'Request access'}
      </button>
      <p className="form-disclaimer">
        By submitting, you agree to our <Link href="/legal/terms-of-service">terms of service</Link>.
      </p>
    </form>
  )
}

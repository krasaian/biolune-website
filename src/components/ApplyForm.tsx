'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

/* ──────────────────────────────────────────────────────────────────
   ApplyForm — WOW Wave 2: the apply ritual.

   Before W-Wave-2 this was a flat 5-field form. It converted, but it
   felt like a contact form. After: a 6-step ritual that uses the
   psychology levers from WOW_STRATEGY.md.

   - Specificity as proof: the reflective "12 months from now" question
     forces the applicant to name a concrete outcome. They invest effort
     and the effort makes them value what's on the other side (IKEA
     effect / effort justification).
   - Loss aversion: the "what have you already tried that didn't work"
     prompt surfaces the pain before the pitch.
   - Peak-end rule: the 50% interstitial and the final "I'll read this
     tonight" screen are the two peaks. The final screen is the end.
   - Founder-led trust: Korosh reads each one personally. The final
     screen names the three books I read through when I review.

   Progress bar is visible the whole time. State is flat on purpose —
   no reducer, no context. Keeps the diff small and the ritual fast.
   ────────────────────────────────────────────────────────────────── */

const TIER_TO_PLAN: Record<string, string> = {
  protocol: 'Protocol',
  precision: 'Precision',
  elite: 'Elite',
}

type Step =
  | 'start'        // 1: name + email
  | 'vision'       // 2: reflective year-from-now question
  | 'location'     // 3: location
  | 'objective'    // 4: primary objective
  | 'interstitial' // 5: 50% peak moment
  | 'tried'        // 6: what hasn't worked
  | 'plan'         // 7: plan + ToS
  | 'success'      // 8: final peak

const STEP_ORDER: Step[] = ['start', 'vision', 'location', 'objective', 'interstitial', 'tried', 'plan']

export default function ApplyForm() {
  const searchParams = useSearchParams()
  const tierParam = searchParams?.get('tier')?.toLowerCase() ?? ''
  const initialPlan = TIER_TO_PLAN[tierParam] ?? ''

  const [step, setStep] = useState<Step>('start')
  const [form, setForm] = useState({
    name: '',
    email: '',
    vision: '',
    location: '',
    objective: '',
    tried: '',
    plan: initialPlan,
    _botField: '',
  })
  const [acceptedTos, setAcceptedTos] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'rate-limited'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const stepIndex = STEP_ORDER.indexOf(step)
  const totalSteps = STEP_ORDER.length
  const progress = step === 'success' ? 100 : Math.round(((stepIndex + 1) / totalSteps) * 100)

  const goNext = () => {
    const next = STEP_ORDER[stepIndex + 1]
    if (next) setStep(next)
  }
  const goBack = () => {
    const prev = STEP_ORDER[stepIndex - 1]
    if (prev) setStep(prev)
  }

  // Validation per step — keep it simple, no zod.
  const canAdvance = (): boolean => {
    switch (step) {
      case 'start':
        return form.name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(form.email)
      case 'vision':
        return form.vision.trim().length >= 20 // force a real answer
      case 'location':
        return form.location.length > 0
      case 'objective':
        return form.objective.length > 0
      case 'interstitial':
        return true
      case 'tried':
        return form.tried.trim().length >= 10
      case 'plan':
        return form.plan.length > 0 && acceptedTos
      default:
        return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTos) {
      setErrorMessage('Please confirm you accept the terms of service before submitting.')
      setStatus('error')
      return
    }
    setErrorMessage(null)
    setStatus('loading')
    try {
      // We keep the API shape backwards compatible: the existing
      // /api/apply route reads name/email/location/objective/plan.
      // We tack on `vision` and `tried` so /api/apply can surface
      // them in the notification email without breaking anything.
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, acceptedTos }),
      })
      if (res.ok) {
        trackEvent('apply_submitted', {
          plan: form.plan || 'unspecified',
          location: form.location || 'unspecified',
        })
        setStatus('idle')
        setStep('success')
      } else if (res.status === 429) {
        const data = await res.json().catch(() => ({}))
        setErrorMessage(
          data?.error || 'You sent this form a moment ago. Please wait a minute and try again.'
        )
        setStatus('rate-limited')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMessage(
          (data && typeof data.error === 'string' && data.error) ||
            'Something went wrong. Please try again or email us directly at hello@biolune.eu.'
        )
        setStatus('error')
      }
    } catch {
      setErrorMessage(
        'Network error. Please check your connection and try again, or email us at hello@biolune.eu.'
      )
      setStatus('error')
    }
  }

  /* ── SUCCESS: the final peak. No stock "application received" card.
        This is the last thing they see from the site on this visit, so
        by the peak-end rule it's the memory they walk away with. ── */
  if (step === 'success') {
    return (
      <div className="apply-ritual-success">
        <style>{`
          .apply-ritual-success { padding: 24px 0 8px; }
          .ars-tag { display: block; font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
          .ars-headline { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(26px, 3.4vw, 34px); line-height: 1.15; margin-bottom: 16px; }
          .ars-body { font-size: 15px; line-height: 1.75; color: var(--text-muted); margin-bottom: 14px; }
          .ars-body strong { color: var(--text); font-weight: 500; }
          .ars-signature { font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 17px; margin: 24px 0 4px; color: var(--text); }
          .ars-signature-role { font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-muted); }
          .ars-reading { margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border); }
          .ars-reading-label { font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
          .ars-reading-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
          .ars-reading-item { font-size: 14px; color: var(--text); font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; }
          .ars-reading-item span { font-family: 'Jost', sans-serif; font-style: normal; font-size: 12px; color: var(--text-muted); display: block; margin-top: 2px; }
        `}</style>
        <span className="ars-tag">Application received</span>
        <h3 className="ars-headline">I'll read this tonight. You'll hear from me by tomorrow evening.</h3>
        <p className="ars-body">
          Not an auto-reply. A real reply, from me, with a yes or a no and the
          reason either way.
        </p>
        <p className="ars-body">
          I cap this at <strong>four new protocol consultations a week</strong> so I can
          actually read every word you wrote. If we're full this week I'll tell
          you and I'll hold your spot for the next one.
        </p>
        <p className="ars-signature">— Korosh</p>
        <p className="ars-signature-role">Founder, Biolune</p>

        <div className="ars-reading">
          <p className="ars-reading-label">What I'm reading when I review your answers</p>
          <ul className="ars-reading-list">
            <li className="ars-reading-item">
              Peter Attia — Outlive
              <span>ApoB, VO₂max, and the four horsemen framework</span>
            </li>
            <li className="ars-reading-item">
              Andrew Huberman — Protocols
              <span>Sleep architecture, light exposure, and recovery</span>
            </li>
            <li className="ars-reading-item">
              Matthew Walker — Why We Sleep
              <span>Why sleep debt is the quietest thing killing you</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  /* ── THE RITUAL ── */
  return (
    <form onSubmit={step === 'plan' ? handleSubmit : (e) => { e.preventDefault(); if (canAdvance()) goNext() }}>
      <style>{`
        .ar-progress { margin-bottom: 28px; }
        .ar-progress-meta { display: flex; justify-content: space-between; align-items: baseline; font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; }
        .ar-progress-meta strong { color: var(--gold); font-weight: 500; }
        .ar-progress-bar { height: 2px; background: var(--border); border-radius: 1px; overflow: hidden; }
        .ar-progress-fill { height: 100%; background: var(--gold); transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .ar-step-prompt { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(22px, 2.8vw, 28px); line-height: 1.2; margin-bottom: 8px; color: var(--text); }
        .ar-step-hint { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px; }
        .ar-textarea { width: 100%; min-height: 120px; padding: 14px 16px; border: 1px solid var(--border); border-radius: 4px; background: var(--bg); color: var(--text); font-family: 'Jost', sans-serif; font-size: 15px; line-height: 1.6; resize: vertical; transition: border-color 0.2s; }
        .ar-textarea:focus { outline: none; border-color: var(--gold); }
        .ar-nav { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 24px; }
        .ar-back { background: none; border: none; color: var(--text-muted); font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; padding: 8px 0; }
        .ar-back:hover { color: var(--gold); }
        .ar-back:disabled { opacity: 0; pointer-events: none; }
        .ar-interstitial { text-align: center; padding: 8px 0; }
        .ar-interstitial-tag { display: block; font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
        .ar-interstitial-headline { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(26px, 3.6vw, 34px); line-height: 1.15; margin-bottom: 16px; color: var(--text); }
        .ar-interstitial-body { font-size: 15px; line-height: 1.75; color: var(--text-muted); max-width: 420px; margin: 0 auto 8px; }
      `}</style>

      {/* Honeypot — invisible to humans, bots fill it, server drops. */}
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

      {/* ── Progress bar — visible the whole ritual. ── */}
      <div className="ar-progress">
        <div className="ar-progress-meta">
          <span>
            Step <strong>{Math.min(stepIndex + 1, totalSteps)}</strong> of {totalSteps}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="ar-progress-bar">
          <div className="ar-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* ── STEP 1: name + email ── */}
      {step === 'start' && (
        <>
          <p className="ar-step-prompt">Let's start with who you are.</p>
          <p className="ar-step-hint">I read every application myself. This is the first thing I'll see.</p>
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
        </>
      )}

      {/* ── STEP 2: the reflective question. This is the IKEA effect. ── */}
      {step === 'vision' && (
        <>
          <p className="ar-step-prompt">
            What does a really good year look like for your body, 12 months from now?
          </p>
          <p className="ar-step-hint">
            Don't write what sounds right. Write what you actually want. HRV,
            sleep, how you feel at 06:00 on a Tuesday, what you can do with your
            kids. Whatever it is. Specific is better than polished.
          </p>
          <div className="form-group">
            <textarea
              className="ar-textarea"
              placeholder="In twelve months I want to…"
              required
              value={form.vision}
              onChange={set('vision')}
            />
          </div>
        </>
      )}

      {/* ── STEP 3: location ── */}
      {step === 'location' && (
        <>
          <p className="ar-step-prompt">Where are you based?</p>
          <p className="ar-step-hint">
            So I can work out timezone, bloodwork partners, and whether Travel
            Mode needs to be on from day one.
          </p>
          <div className="form-group">
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
        </>
      )}

      {/* ── STEP 4: primary objective ── */}
      {step === 'objective' && (
        <>
          <p className="ar-step-prompt">What are you here to fix first?</p>
          <p className="ar-step-hint">
            Pick the one that's loudest right now. We'll get to the rest once
            the protocol is live.
          </p>
          <div className="form-group">
            <select className="form-select" required value={form.objective} onChange={set('objective')}>
              <option value="">Select the loudest problem…</option>
              <option>Longevity</option>
              <option>Performance</option>
              <option>Recovery</option>
              <option>Biomarker tracking</option>
              <option>Hormonal balance</option>
              <option>HRV coaching</option>
              <option>Custom protocol</option>
            </select>
          </div>
        </>
      )}

      {/* ── STEP 5: the 50% peak moment. No form fields. Just a beat. ── */}
      {step === 'interstitial' && (
        <div className="ar-interstitial">
          <span className="ar-interstitial-tag">You're halfway</span>
          <p className="ar-interstitial-headline">Most people skip the next question. Don't.</p>
          <p className="ar-interstitial-body">
            The thing that doesn't work for you is more useful to me than the
            thing that does. It tells me where your protocol actually starts.
          </p>
        </div>
      )}

      {/* ── STEP 6: loss frame — what has already not worked. ── */}
      {step === 'tried' && (
        <>
          <p className="ar-step-prompt">
            What have you already tried that didn't work?
          </p>
          <p className="ar-step-hint">
            Diets, coaches, apps, supplements, sleep stacks, anything. What
            looked good on paper and then didn't hold when your week got real.
            This is the most important answer in the form.
          </p>
          <div className="form-group">
            <textarea
              className="ar-textarea"
              placeholder="I tried…"
              required
              value={form.tried}
              onChange={set('tried')}
            />
          </div>
        </>
      )}

      {/* ── STEP 7: plan + ToS ── */}
      {step === 'plan' && (
        <>
          <p className="ar-step-prompt">Which protocol are you leaning toward?</p>
          <p className="ar-step-hint">
            If you're not sure, pick that. The first thing I'll do is tell you
            which one actually fits.
          </p>
          <div className="form-group">
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
              I have read and agree to the <Link href="/legal/terms-of-service">terms of service</Link>{' '}
              and <Link href="/legal/privacy-policy">privacy policy</Link>. I understand Biolune is a
              precision longevity protocol, not medical treatment.
            </label>
          </div>

          {(status === 'error' || status === 'rate-limited') && (
            <p style={{ color: '#c0392b', fontSize: 13, marginBottom: 16 }}>
              {errorMessage ||
                'Something went wrong. Please try again or email us directly at hello@biolune.eu.'}
            </p>
          )}
        </>
      )}

      {/* ── NAV ── */}
      <div className="ar-nav">
        <button type="button" className="ar-back" onClick={goBack} disabled={stepIndex === 0}>
          ← Back
        </button>

        {step === 'plan' ? (
          <button
            type="submit"
            className="btn btn-gold form-submit"
            disabled={status === 'loading' || !canAdvance()}
            style={{ opacity: status === 'loading' || !canAdvance() ? 0.7 : 1 }}
          >
            {status === 'loading' ? 'Sending…' : 'Send it to Korosh'}
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-gold form-submit"
            disabled={!canAdvance()}
            style={{ opacity: !canAdvance() ? 0.5 : 1 }}
          >
            {step === 'interstitial' ? 'I\'m ready →' : 'Continue →'}
          </button>
        )}
      </div>
    </form>
  )
}

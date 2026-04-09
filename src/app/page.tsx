import type { Metadata } from 'next'
import Link from 'next/link'
import Faq from '@/components/Faq'
import AppShowcase from '@/components/AppShowcase'
import { fetchPricing, tierById } from '@/lib/pricing'

// Revalidate every 5 minutes so pricing changes propagate without a manual
// rebuild — same TTL the public pricing API uses on its CDN cache.
export const revalidate = 300

export const metadata: Metadata = {
  title: 'Biolune — Precision Longevity Protocol',
  description: 'Biolune builds a precision longevity protocol from your HRV, hormones, and biomarkers — adapted weekly by AI. Designed for high-performers who want measurable results.',
}

const faqs = [
  { q: 'What exactly is a "precision longevity protocol"?', a: "It's a personalised health system built from your biological data — HRV, hormones, sleep patterns, and lifestyle. Unlike generic advice, it's specific to you and adapts weekly based on how your body responds." },
  { q: 'How is Biolune different from a regular health coach?', a: "A coach gives you advice. Biolune gives you a living protocol built on your actual biomarkers — and updates it every week using AI-driven adaptation. There are no generic templates and no guesswork." },
  { q: 'Is this medical advice?', a: "No. Biolune is a performance optimisation protocol, not medical treatment. We work alongside your existing healthcare team, not in place of it. Always consult your physician for medical decisions." },
  { q: 'What results can I expect in the first 30 days?', a: "Most members report noticeable improvements in sleep quality and morning energy within the first two weeks. HRV trends typically stabilise by week three, and cognitive clarity tends to follow shortly after. Measurable biomarker changes appear at 60–90 days." },
  { q: 'Do I need a wearable device to use Biolune?', a: "Not required. You can log data manually each morning in under 60 seconds. That said, a wearable like Oura or Whoop gives the AI more to work with — and produces more precise weekly adaptations." },
  { q: 'How much time does this require each week?', a: "About 5–10 minutes per week. A daily morning log (60 seconds), a weekly check-in (5 minutes), and reading your updated protocol. The protocol fits around your schedule — not the other way around." },
  { q: 'Can I cancel or pause my subscription?', a: "Yes. Cancel or pause anytime from your dashboard with no penalties. We don't lock you in because we don't need to — most members stay because the protocol works." },
  { q: 'Is my health data private and secure?', a: "Your data is encrypted, never sold, and only accessible by you. We follow GDPR-compliant data handling. Your biological data is yours — we use it only to improve your protocol." },
]

// W7: testimonials are now an empty array. The previous 6 hardcoded
// quotes were unverified pre-beta copy. The home page renders a
// "beta cohort in progress" message until real verified outcomes
// land here. The schema is preserved so re-populating is a simple
// data swap — eventually this should move to a JSON file or CMS
// (BIOLUNE_BACKLOG W7) but for the launch the empty state is the
// honest move.
type Testimonial = { name: string; role: string; stat: string; quote: string }
const testimonials: Testimonial[] = []

const steps = [
  { n: '01', title: 'Apply & get assessed', body: "Fill in your intake form. We assess your health goals, lifestyle, travel schedule, and stress profile to build your starting baseline." },
  { n: '02', title: 'Receive your protocol', body: "Built from your HRV baseline, hormonal data, and biomarkers. Your personalised sleep, nutrition, training, and recovery protocol is ready within 48 hours." },
  { n: '03', title: 'Weekly AI adaptation', body: "The protocol evolves as your body does. Better data in, better protocol out — every single week. No generic plans that go stale after month one." },
  { n: '04', title: 'Track measurable results', body: "HRV trends, biological age shift, energy levels, sleep quality. All tracked, compared week-on-week, and reflected in your next protocol update." },
]

const whyItems = [
  { title: 'Built on your biomarkers', body: 'Not generic advice from an app. A protocol engineered from your HRV, cortisol, and sleep data — specific to you, updated weekly.' },
  { title: 'Proactive, not reactive', body: 'Most people see a doctor when something breaks. Biolune catches the signal before it becomes a symptom — and adjusts your protocol accordingly.' },
  { title: 'One integrated system', body: 'Sleep tracker, meal plan, gym program — all disconnected. Biolune integrates HRV, hormones, nutrition, and recovery into a single protocol that talks to itself.' },
]

export default async function Home() {
  const pricing = await fetchPricing()
  const tProtocol = tierById(pricing, 'protocol')
  const tPrecision = tierById(pricing, 'precision')
  const tElite = tierById(pricing, 'elite')
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }

        /* Hero */
        .hero {
          position: relative;
          min-height: calc(100vh - var(--nav-h));
          display: flex;
          align-items: center;
          overflow: hidden;
          /* W9: even if the hero video fails to load (Framer CDN outage,
             corp firewall, slow mobile connection), the hero falls back
             to a deep luxe gradient instead of a flat empty rectangle.
             The video sits on top with opacity 0.18, so the gradient
             still shows through during normal playback too. */
          background:
            radial-gradient(120% 80% at 20% 10%, rgba(168, 152, 121, 0.10), transparent 60%),
            radial-gradient(80% 60% at 80% 90%, rgba(168, 152, 121, 0.06), transparent 60%),
            var(--bg);
        }
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.18;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 780px;
        }
        .hero h1 {
          font-size: clamp(38px, 6.5vw, 80px);
          font-weight: 600;
          line-height: 1.05;
          margin-bottom: 24px;
        }
        .hero p {
          font-size: clamp(16px, 2vw, 19px);
          color: var(--text-muted);
          max-width: 520px;
          line-height: 1.65;
          margin-bottom: 36px;
        }
        .hero-ctas { display: flex; gap: 20px; flex-wrap: wrap; align-items: center; }
        .hero-text-link {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--text);
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.2s;
        }
        .hero-text-link:hover { color: var(--gold); }
        .hero-stats {
          display: flex;
          gap: 40px;
          margin-top: 64px;
          flex-wrap: wrap;
        }
        .stat-item {}
        .stat-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 36px;
          font-weight: 600;
          color: var(--gold);
          line-height: 1;
        }
        .stat-label {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        /* Steps grid */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 32px;
        }
        .step-card {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px 28px;
        }
        .step-num {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: var(--gold);
          margin-bottom: 16px;
        }
        .step-card h3 { font-size: 20px; margin-bottom: 10px; }
        .step-card p { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

        /* Why us */
        .why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .why-items { display: flex; flex-direction: column; gap: 32px; }
        .why-item h3 { font-size: 20px; margin-bottom: 8px; }
        .why-item p { font-size: 15px; color: var(--text-muted); line-height: 1.65; }

        /* Testimonials */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .testimonial-card {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px;
        }
        .testimonial-card blockquote {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-muted);
          font-style: italic;
          margin-bottom: 20px;
        }
        .testimonial-name { font-weight: 500; font-size: 14px; }
        .testimonial-role { font-size: 13px; color: var(--text-muted); }
        .testimonial-stat {
          display: inline-block;
          margin-top: 10px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(168,152,121,0.1);
          padding: 4px 12px;
          border-radius: 100px;
        }

        /* Pricing preview */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }
        .price-card {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px;
          display: flex;
          flex-direction: column;
        }
        .price-card.featured {
          background: var(--text);
          color: var(--bg);
          border-color: var(--text);
        }
        .price-tier {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .price-card.featured .price-tier { color: var(--gold); }
        .price-card:not(.featured) .price-tier { color: var(--gold); }
        .price-badge {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          background: var(--gold);
          color: var(--bg);
          padding: 3px 10px;
          border-radius: 100px;
          margin-bottom: 12px;
          width: fit-content;
        }
        .price-amount {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 48px;
          font-weight: 600;
          line-height: 1;
          margin-bottom: 4px;
        }
        .price-period { font-size: 14px; opacity: 0.6; margin-bottom: 24px; }
        .price-features { list-style: none; flex: 1; }
        .price-features li {
          font-size: 14px;
          padding: 8px 0;
          border-bottom: 1px solid;
          border-color: rgba(26,25,22,0.08);
          display: flex;
          gap: 10px;
          align-items: baseline;
          line-height: 1.4;
        }
        .price-card.featured .price-features li { border-color: rgba(254,249,239,0.12); }
        .price-features li::before { content: '—'; color: var(--gold); flex-shrink: 0; font-size: 12px; }
        .price-cta { margin-top: 28px; }
        .price-card.featured .price-cta .btn { background: var(--bg); color: var(--text); }
        .price-card.featured .price-cta .btn:hover { background: var(--bg-alt); }
        .price-card:not(.featured) .price-muted { color: var(--text-muted); }

        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr; }
          .hero-stats { gap: 24px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          src="https://framerusercontent.com/assets/videos/hero-bg.mp4"
        />
        <div className="container">
          <div className="hero-content">
            <p className="label" style={{ marginBottom: 20 }}>Precision Longevity</p>
            <h1 className="serif">
              The protocol I built because the one I needed didn&rsquo;t exist.
            </h1>
            <p>
              I&rsquo;m Korosh, founder of Biolune. One daily routine shaped by your HRV,
              hormones, and biomarkers &mdash; adapted weekly as your biology changes. Built
              for the people generic health plans were never written for.
            </p>
            <div className="hero-ctas">
              <Link href="/apply" className="btn btn-gold">Start your protocol →</Link>
              <Link href="/about" className="hero-text-link">Read my story</Link>
            </div>
            {/*
              Hero stats (+31% HRV / -12yr biological age / 94% retention)
              removed pending verifiable source data per
              BIOLUNE_KOROSH_BLOCKERS.md Block 4. The founder-first hero
              archetype carries credibility through the founder voice; we
              re-add real cohort numbers once the first 5 testers complete
              their first cycle and we have actual delta data to cite.
            */}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-header">
            <p className="label">HOW IT WORKS</p>
            <h2 className="serif">From intake to optimised in 48 hours.</h2>
          </div>
          <div className="steps-grid">
            {steps.map(s => (
              <div key={s.n} className="step-card">
                <div className="step-num">{s.n}</div>
                <h3 className="serif">{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP SHOWCASE ── */}
      <AppShowcase />

      {/* ── WHY US ── */}
      <section className="section">
        <div className="container">
          <div className="why-grid">
            <div>
              <p className="label">Why us?</p>
              <h2 className="serif" style={{ marginTop: 12, fontSize: 'clamp(28px, 4vw, 44px)' }}>Not another health app. A system built on your biology.</h2>
              <p style={{ marginTop: 20, color: 'var(--text-muted)', lineHeight: 1.7 }}>Most people follow generic advice and wonder why they're still exhausted. Biolune builds a living protocol from your actual biomarkers — and updates it every week as your body changes.</p>
              <div className="divider" style={{ marginTop: 28 }} />
              <p style={{ fontSize: 14, color: 'var(--text-muted)', fontStyle: 'italic' }}>Our mission: while others react to symptoms, Biolune optimises proactively.</p>
            </div>
            <div className="why-items">
              {whyItems.map(w => (
                <div key={w.title} className="why-item">
                  <h3 className="serif">{w.title}</h3>
                  <p>{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-alt)' }}>
          <div className="container">
            <div className="section-header">
              <p className="label">CLIENT RESULTS</p>
              <h2 className="serif">Real people. Measurable results.</h2>
            </div>
            <div className="testimonials-grid">
              {testimonials.map(t => (
                <div key={t.name} className="testimonial-card">
                  <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                  <span className="testimonial-stat">{t.stat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRICING PREVIEW ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="label">Your investment in decades</p>
            <h2 className="serif">Three protocols. One system. Built around your biology.</h2>
          </div>
          <div className="pricing-grid">
            {/* Protocol */}
            <div className="price-card">
              <div className="price-tier">{tProtocol.name}</div>
              <div className="price-amount">€{tProtocol.priceEUR}</div>
              <div className="price-period price-muted">/{pricing.interval}</div>
              <ul className="price-features">
                <li>Complete AI protocol (90 days)</li>
                <li>Lune AI coach (25 msgs/day)</li>
                <li>Raw DNA upload + genetic personalization</li>
                <li>Morning + Evening + Sleep stacks</li>
                <li>IF protocol + Apple Health sync</li>
              </ul>
              <div className="price-cta">
                <Link href="/apply" className="btn btn-outline" style={{ width: '100%' }}>Start your protocol</Link>
              </div>
            </div>
            {/* Precision */}
            <div className="price-card featured">
              <div className="price-badge">Most popular</div>
              <div className="price-tier">{tPrecision.name}</div>
              <div className="price-amount">€{tPrecision.priceEUR}</div>
              <div className="price-period">/{pricing.interval}</div>
              <ul className="price-features">
                <li>Everything in Protocol</li>
                <li>Unlimited Lune with autonomous actions</li>
                <li>Decision engine (6 adaptive modes)</li>
                <li>Pattern intelligence + correlations</li>
                <li>Travel mode + proactive alerts</li>
              </ul>
              <div className="price-cta">
                <Link href="/apply" className="btn btn-gold" style={{ width: '100%' }}>Start your protocol</Link>
              </div>
            </div>
            {/* Elite */}
            <div className="price-card">
              <div className="price-tier" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{tElite.name} <span style={{ fontSize: '9px', letterSpacing: '1.5px', opacity: 0.6 }}>INVITE ONLY</span></div>
              <div className="price-amount">€{tElite.priceEUR}</div>
              <div className="price-period price-muted">/{pricing.interval}</div>
              <ul className="price-features">
                <li>Everything in Precision</li>
                <li>Blood work analysis + biomarker tracking</li>
                <li>Personal coaching with Korosh (2×/mo)</li>
                <li>Priority WhatsApp + PDF reports</li>
                <li>Custom protocol adjustments</li>
              </ul>
              <div className="price-cta">
                <Link href="/apply" className="btn btn-outline" style={{ width: '100%' }}>Request Access</Link>
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: 'var(--text-muted)' }}>
            Biolune is a precision longevity protocol for high performers. Science-backed. AI-personalised. Built to last decades.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" id="faq" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <p className="label">COMMON QUESTIONS</p>
              <h2 className="serif" style={{ marginTop: 12 }}>Everything you need to know before applying.</h2>
            </div>
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-sm" style={{ textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <p className="label" style={{ marginBottom: 16 }}>Ready to begin?</p>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 24 }}>Your biology is unique.<br/>Your protocol should be too.</h2>
          <Link href="/apply" className="btn btn-dark">Start your protocol</Link>
        </div>
      </section>
    </>
  )
}

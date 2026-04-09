import type { Metadata } from 'next'
import Link from 'next/link'
import Faq from '@/components/Faq'

export const metadata: Metadata = {
  title: 'Pricing — Biolune',
  description: 'Three precision longevity tiers. Protocol €149/month, Precision €299/month, Elite €549/month (invite only). Built around your biology.',
}

const faqs = [
  { q: 'How do I prepare for my initial biomarker test?', a: 'Fast for 8–12 hours before your blood draw. Stay well-hydrated with water, avoid intense exercise the day before, and get your normal amount of sleep.' },
  { q: 'Is my personal health data kept private and secure?', a: 'Yes. All data is encrypted in transit and at rest, stored under GDPR-compliant protocols, and never sold or shared with third parties.' },
  { q: 'How long does it take to receive my health results?', a: 'Your initial protocol is ready within 48 hours of completing your intake. Biomarker results from lab partners typically arrive within 5–7 business days.' },
  { q: 'Can I share my reports with my primary care physician?', a: 'Yes. All reports are exportable as PDFs. We encourage sharing with your physician — Biolune is designed to complement, not replace, your existing healthcare team.' },
  { q: 'Do I need a wearable device to use the platform?', a: 'Not required. Manual daily logging takes under 60 seconds. A wearable gives the AI richer data, but many members start without one.' },
  { q: 'How often should I re-test my biological markers?', a: 'We recommend a full panel every 90 days for the first year, then bi-annually once your protocol stabilises.' },
]

export default function Pricing() {
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }
        .pricing-hero {
          background: var(--bg);
          padding: 96px 0 80px;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        .pricing-hero h1 { font-size: clamp(36px, 5.5vw, 72px); margin-top: 12px; }
        .pricing-hero p { font-size: 18px; color: var(--text-muted); margin-top: 16px; }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: start;
        }
        .plan-card {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
        }
        .plan-card.featured {
          background: var(--text);
          color: var(--bg);
          border-color: var(--text);
          transform: scale(1.02);
          box-shadow: 0 20px 60px rgba(26,25,22,0.15);
        }
        .plan-tier {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 8px;
        }
        .plan-badge {
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
        .plan-price {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 56px;
          font-weight: 600;
          line-height: 1;
        }
        .plan-period { font-size: 16px; opacity: 0.6; margin-bottom: 8px; }
        .plan-tagline { font-size: 14px; color: var(--text-muted); margin-bottom: 28px; line-height: 1.5; }
        .plan-card.featured .plan-tagline { color: rgba(254,249,239,0.65); }
        .plan-divider { height: 1px; background: var(--border); margin-bottom: 24px; }
        .plan-card.featured .plan-divider { background: rgba(254,249,239,0.15); }
        .plan-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .plan-features li {
          font-size: 14px;
          display: flex;
          gap: 10px;
          align-items: baseline;
          line-height: 1.4;
        }
        .plan-features li .check { color: var(--gold); flex-shrink: 0; }
        .plan-cta { margin-top: 32px; }
        .plan-card.featured .plan-cta .btn { background: var(--bg); color: var(--text); }
        .plan-card.featured .plan-cta .btn:hover { background: var(--bg-alt); }

        @media (max-width: 900px) {
          .plans-grid { grid-template-columns: 1fr; }
          .plan-card.featured { transform: none; }
        }
      `}</style>

      {/* Hero */}
      <section className="pricing-hero">
        <div className="container">
          <p className="label">Your investment in decades</p>
          <h1 className="serif">Three protocols. One system. Built around your biology.</h1>
          <p>No long-term lock-in. Cancel or pause anytime.</p>
        </div>
      </section>

      {/* Plans */}
      <section className="section">
        <div className="container">
          <div className="plans-grid">
            {/* Protocol */}
            <div className="plan-card">
              <div className="plan-tier">Protocol</div>
              <div className="plan-price">€149</div>
              <div className="plan-period">/month</div>
              <p className="plan-tagline">Your personalised longevity protocol with DNA personalization — adapted weekly by AI.</p>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li><span className="check">✓</span> Complete AI protocol (90 days)</li>
                <li><span className="check">✓</span> Lune AI coach (25 msgs/day)</li>
                <li><span className="check">✓</span> Raw DNA upload + genetic personalization</li>
                <li><span className="check">✓</span> Morning + Evening + Sleep supplement stacks</li>
                <li><span className="check">✓</span> IF protocol + meal timing</li>
                <li><span className="check">✓</span> Apple Health sync + weekly review</li>
              </ul>
              <div className="plan-cta">
                <Link href="/apply" className="btn btn-outline" style={{ width: '100%' }}>Start your protocol</Link>
              </div>
            </div>

            {/* Precision */}
            <div className="plan-card featured">
              <div className="plan-badge">Most popular</div>
              <div className="plan-tier">Precision</div>
              <div className="plan-price">€299</div>
              <div className="plan-period">/month</div>
              <p className="plan-tagline">Autonomous AI that adapts your protocol to your biology — in real time.</p>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li><span className="check">✓</span> Everything in Protocol</li>
                <li><span className="check">✓</span> Unlimited Lune with autonomous actions</li>
                <li><span className="check">✓</span> Decision engine (6 adaptive modes)</li>
                <li><span className="check">✓</span> Pattern intelligence + correlations</li>
                <li><span className="check">✓</span> Travel mode with circadian reset</li>
                <li><span className="check">✓</span> Proactive alerts + progress reports</li>
              </ul>
              <div className="plan-cta">
                <Link href="/apply" className="btn btn-gold" style={{ width: '100%' }}>Start your protocol</Link>
              </div>
            </div>

            {/* Elite */}
            <div className="plan-card">
              <div className="plan-badge" style={{ background: 'rgba(168,152,121,0.15)', color: 'var(--gold)' }}>Invite Only</div>
              <div className="plan-tier">Elite</div>
              <div className="plan-price">€549</div>
              <div className="plan-period">/month</div>
              <p className="plan-tagline">Precision medicine meets personal coaching. Blood work, biomarkers, and direct collaboration with Korosh.</p>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li><span className="check">✓</span> Everything in Precision</li>
                <li><span className="check">✓</span> Blood work analysis + AI interpretation</li>
                <li><span className="check">✓</span> Biomarker tracking over time (ApoB, HbA1c)</li>
                <li><span className="check">✓</span> Personal coaching with Korosh (2×/month)</li>
                <li><span className="check">✓</span> Priority WhatsApp line</li>
                <li><span className="check">✓</span> PDF reports + custom protocol adjustments</li>
              </ul>
              <div className="plan-cta">
                <Link href="/apply" className="btn btn-outline" style={{ width: '100%' }}>Request Access</Link>
              </div>
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: 40, fontSize: 13, color: 'var(--text-muted)' }}>
            Biolune is a precision longevity protocol, not medical treatment. Always consult your physician.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
            <div>
              <p className="label">FAQ</p>
              <h2 className="serif" style={{ marginTop: 12, fontSize: 'clamp(24px, 3vw, 36px)' }}>Need Help?</h2>
              <p style={{ marginTop: 12, color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.65 }}>We aim to provide absolute clarity regarding your biological data and personalized wellness protocols.</p>
              <div style={{ marginTop: 24 }}>
                <Link href="/contact" className="btn btn-outline" style={{ padding: '11px 24px', fontSize: '11px' }}>Contact us</Link>
              </div>
            </div>
            <Faq items={faqs} />
          </div>
        </div>
      </section>
    </>
  )
}

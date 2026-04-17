import type { Metadata } from 'next'
import Link from 'next/link'
import Faq from '@/components/Faq'
import AppShowcase from '@/components/AppShowcase'
import ProtocolContrast from '@/components/ProtocolContrast'
import ScrollReveal from '@/components/ScrollReveal'
import HeroReveal, { HeroFadeUp } from '@/components/HeroReveal'
import TierCarousel from '@/components/TierCarousel'
import { fetchPricing, tierById } from '@/lib/pricing'

// Revalidate every 5 minutes so pricing changes propagate without a manual
// rebuild — same TTL the public pricing API uses on its CDN cache.
export const revalidate = 300

export const metadata: Metadata = {
  title: 'Biolune — Precision Longevity Protocol',
  description: 'A precision longevity protocol built from your HRV, hormones, and biomarkers. Updated weekly based on how your body actually responds. Built by a pilot-athlete-traveler-father who needed it himself.',
}

const faqs = [
  { q: 'What exactly is a "precision longevity protocol"?', a: "A health system built from your own data. HRV, hormones, sleep, training, lifestyle. Unlike generic advice, it's specific to you and updates every week based on how your body actually responds." },
  { q: 'How is Biolune different from a regular health coach?', a: "A coach gives you advice. Biolune gives you referenced science matched to your real biomarkers — updated every week as your data changes. The interpretation is yours. The sources are always visible." },
  { q: 'Is this medical advice?', a: "No. Biolune is an evidence aggregation platform. We surface peer-reviewed research and recognised expert statements that are relevant to your biomarker profile. We do not diagnose, treat, or generate original medical recommendations. Every insight is sourced and referenced. Always consult your physician before making changes to your health routine." },
  { q: 'What results can I expect in the first 30 days?', a: "Most people notice better sleep and sharper mornings in the first two weeks. HRV trends usually stabilise by week three and cognitive clarity follows shortly after. Measurable biomarker changes show up at 60 to 90 days." },
  { q: 'Do I need a wearable device to use Biolune?', a: "Not required. You can log data manually each morning in under 60 seconds. That said, an Oura or Whoop gives Lune more to work with and sharpens the weekly adjustments." },
  { q: 'How much time does this require each week?', a: "About 5 to 10 minutes. A daily morning log (60 seconds), a weekly check-in (5 minutes), and reading your updated protocol. The protocol fits around your schedule, not the other way around." },
  { q: 'Can I cancel or pause my subscription?', a: "Yes. Cancel or pause anytime from your dashboard, no penalties. We don't lock you in because we don't need to. Most people stay because the protocol works." },
  { q: 'Is my health data private and secure?', a: "Your data is encrypted at rest (AES-256) and in transit (TLS 1.3). We process health and biometric data exclusively as special category data under GDPR Article 9, with your explicit consent. We operate under a full GDPR compliance framework including a Data Protection Impact Assessment and Record of Processing Activities. Your data is never sold. You can export, correct, or delete your data at any time." },
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
  { n: '02', title: 'Receive your protocol', body: "Matched to your HRV baseline, hormonal data, and biomarkers. Lune surfaces what peer-reviewed research says about people with your profile — across sleep, nutrition, training, and recovery." },
  { n: '03', title: 'Weekly adjustment', body: "The protocol evolves as your body does. Better data in, better protocol out, every single week. No generic plans that go stale after month one." },
  { n: '04', title: 'Track measurable results', body: "HRV trends, energy levels, sleep quality. All tracked week-on-week so you can see how your data evolves — and which peer-reviewed research becomes relevant as it does." },
]

const whyItems = [
  { title: 'Built on your biomarkers', body: 'Not generic content. Peer-reviewed science matched to your actual biomarkers. Every insight shows the source — so you can verify it yourself.' },
  { title: 'Proactive, not reactive', body: 'Most people see a doctor when something breaks. Biolune shows you what the research says about early signals in your data — so you can have an informed conversation with your physician before something breaks.' },
  { title: 'One integrated system', body: 'Sleep data, hormones, nutrition, recovery — connected in one place. Biolune surfaces the science that\u2019s relevant across all of them. One system. Every insight referenced.' },
]

export default async function Home() {
  const pricing = await fetchPricing()
  const tProtocol = tierById(pricing, 'protocol')
  const tPrecision = tierById(pricing, 'precision')
  const tElite = tierById(pricing, 'elite')

  const tierSlides = [
    {
      plate: 'Plate I',
      label: 'Foundation',
      tier: tProtocol.name,
      price: String(tProtocol.priceEUR),
      interval: pricing.interval,
      headline: 'Your data. Your protocol. Updated weekly.',
      body: 'The complete system for high performers who want precision over guesswork.',
      features: [
        'Full protocol (90 days)',
        'Lune (25 messages/day)',
        'Raw DNA upload + genetic layer',
        'Morning + Evening + Sleep stacks',
        'IF protocol + Apple Health sync',
      ],
      href: '/apply?tier=protocol',
    },
    {
      plate: 'Plate II',
      label: 'Most popular',
      tier: tPrecision.name,
      price: String(tPrecision.priceEUR),
      interval: pricing.interval,
      headline: 'Autonomous intelligence. Zero guesswork.',
      body: 'Everything in Protocol, plus a system that thinks ahead.',
      features: [
        'Everything in Protocol',
        'Unlimited Lune with autonomous actions',
        'Decision engine (6 adaptive modes)',
        'Pattern intelligence + correlations',
        'Travel mode + proactive alerts',
      ],
      href: '/apply?tier=precision',
      featured: true,
    },
    {
      plate: 'Plate III',
      label: 'Invite only',
      tier: tElite.name,
      price: String(tElite.priceEUR),
      interval: pricing.interval,
      headline: 'Quarterly performance review with Korosh. Your data, discussed in context.',
      body: 'The full system with a human layer. Applied coaching, peer-reviewed context, and direct access.',
      features: [
        'Everything in Precision',
        'Quarterly performance review with Korosh',
        'Bloodwork + biomarker tracking over time',
        'DNA analysis with genetic insights',
        'Monthly coaching call + PDF reports',
      ],
      href: '/apply?tier=elite',
    },
  ]

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
          background:
            radial-gradient(120% 80% at 20% 10%, rgba(168, 152, 121, 0.10), transparent 60%),
            radial-gradient(80% 60% at 80% 90%, rgba(168, 152, 121, 0.06), transparent 60%),
            var(--bg);
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
        .hero-scarcity {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 16px;
          font-style: italic;
          color: var(--text-muted);
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          max-width: 420px;
          line-height: 1.5;
        }

        /* Founder block */
        .founder-block {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .founder-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 72px;
          align-items: center;
        }
        .founder-copy h2 {
          font-size: clamp(28px, 3.8vw, 42px);
          line-height: 1.15;
          margin-top: 12px;
          margin-bottom: 24px;
        }
        .founder-body {
          font-size: 16px;
          line-height: 1.75;
          color: var(--text-muted);
          margin-bottom: 24px;
        }
        .founder-link {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          text-decoration: none;
          border-bottom: 1px solid var(--gold);
          padding-bottom: 3px;
          transition: opacity 0.2s;
        }
        .founder-link:hover { opacity: 0.75; }
        .founder-card {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 40px 36px;
          position: relative;
        }
        .founder-tag {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          color: var(--gold);
          margin-bottom: 12px;
        }
        .founder-role {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          color: var(--text);
          line-height: 1.3;
          margin-bottom: 28px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }
        .founder-quote {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 19px;
          font-style: italic;
          line-height: 1.5;
          color: var(--text-muted);
        }

        /* Loss frame */
        .loss-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .loss-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 36px 32px;
          position: relative;
          transition: border-color 0.3s, transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .loss-card:hover {
          border-color: rgba(168, 152, 121, 0.35);
          transform: translateY(-4px);
        }
        .loss-metric {
          font-size: 42px;
          font-weight: 600;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 20px;
        }
        .loss-metric sub {
          font-size: 0.58em;
          font-weight: 500;
          vertical-align: baseline;
        }
        .loss-headline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 20px;
          line-height: 1.35;
          color: var(--text);
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }
        .loss-body {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-muted);
        }
        .loss-footer {
          text-align: center;
          margin-top: 56px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 20px;
          font-style: italic;
          color: var(--text-muted);
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 900px) {
          .founder-grid { grid-template-columns: 1fr; gap: 40px; }
          .loss-grid { grid-template-columns: 1fr; }
        }
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
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s;
        }
        .step-card:hover {
          transform: translateY(-3px);
          border-color: rgba(168, 152, 121, 0.3);
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

        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr; }
          .hero-stats { gap: 24px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <HeroFadeUp delay={100}>
              <p className="label" style={{ marginBottom: 20 }}>Precision Longevity</p>
            </HeroFadeUp>
            <HeroReveal
              text="A precision longevity protocol for people who take their body as seriously as their work."
            />
            <HeroFadeUp delay={900}>
              <p>
                Built from your HRV, bloodwork, and raw DNA. Every insight is matched
                to your biomarker profile using peer-reviewed research and recognised
                expert sources. You see the science behind every recommendation. You
                make the call.
              </p>
            </HeroFadeUp>
            <HeroFadeUp delay={1100}>
              <div className="hero-ctas">
                <Link href="/apply" className="btn btn-gold">Apply for the protocol →</Link>
                <Link href="/about" className="hero-text-link">Why I built this</Link>
              </div>
            </HeroFadeUp>
            <HeroFadeUp delay={1300}>
              <p className="hero-scarcity">
                I review every application personally. Limited to 50 founding members.
              </p>
            </HeroFadeUp>
          </div>
        </div>
      </section>

      {/* ── WHY I BUILT THIS (founder trust block) ── */}
      <section className="section founder-block">
        <div className="container">
          <div className="founder-grid">
            <ScrollReveal direction="up" duration={900}>
              <div className="founder-copy">
                <p className="label" style={{ marginBottom: 16 }}>WHY I BUILT THIS</p>
                <h2 className="serif">
                  I couldn&rsquo;t find a system that actually used my data. So I built one.
                </h2>
                <p className="founder-body">
                  I&rsquo;m a pilot. I&rsquo;m an athlete. I&rsquo;m a father of two.
                  Three years ago my HRV sat at 34 and every longevity brand on the
                  internet wanted to sell me a generic stack or a $10,000 consult that
                  never looked at my numbers twice. Biolune is what I built because I
                  needed it myself.
                </p>
                <Link href="/about" className="founder-link">Read the full story →</Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200} duration={900}>
              <div className="founder-card">
                <p className="founder-tag">KOROSH</p>
                <p className="founder-role">Pilot. Athlete. Traveler. Father of two.</p>
                <p className="founder-quote">
                  &ldquo;If it isn&rsquo;t grounded in your data, it&rsquo;s just marketing.&rdquo;
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── LOSS FRAME ── */}
      <section className="section loss-frame" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <ScrollReveal direction="up" duration={900}>
            <div className="section-header" style={{ maxWidth: 720, margin: '0 auto 56px', textAlign: 'center' }}>
              <p className="label">THE THREE NUMBERS YOU DON&rsquo;T KNOW</p>
              <h2 className="serif" style={{ marginTop: 12 }}>What you lose every week you don&rsquo;t measure.</h2>
            </div>
          </ScrollReveal>
          <div className="loss-grid">
            <ScrollReveal direction="up" delay={0} duration={800}>
              <div className="loss-card">
                <p className="loss-metric serif">ApoB</p>
                <p className="loss-headline">The cardiovascular number your annual bloodwork doesn&rsquo;t print.</p>
                <p className="loss-body">
                  Peter Attia: &ldquo;I don&rsquo;t see a reason to have ApoB north of 60.&rdquo;
                  Most labs report LDL-C instead, which underestimates cardiovascular
                  risk by 30% or more. You&rsquo;ve probably never seen your ApoB.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={150} duration={800}>
              <div className="loss-card">
                <p className="loss-metric serif">VO<sub>2</sub>max</p>
                <p className="loss-headline">The single strongest predictor of when you die.</p>
                <p className="loss-body">
                  Rhonda Patrick&rsquo;s data: every 1-unit increase in VO<sub>2</sub>max
                  buys you roughly 45 days of life expectancy. Most people have
                  never measured theirs. If you train without tracking it, you&rsquo;re
                  flying blind on the most important number in longevity.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300} duration={800}>
              <div className="loss-card">
                <p className="loss-metric serif">HRV trend</p>
                <p className="loss-headline">The earliest warning system your body has.</p>
                <p className="loss-body">
                  HRV drops 3 to 5 days before you feel sick, burned out, or
                  overtrained. Without a 7-day trend line, you only find out
                  after the fact. With one, you adjust before the damage lands.
                </p>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="none" delay={500} duration={1000}>
            <p className="loss-footer">
              Biolune reads all three. Lune builds the protocol. Korosh reviews the call.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PROTOCOL CONTRAST (peak moment) ── */}
      <ScrollReveal direction="up" distance={60} duration={1000}>
        <ProtocolContrast />
      </ScrollReveal>

      {/* ── HOW IT WORKS ── */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <ScrollReveal direction="up" duration={900}>
            <div className="section-header">
              <p className="label">HOW IT WORKS</p>
              <h2 className="serif">From intake to your first protocol in 48 hours.</h2>
            </div>
          </ScrollReveal>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <ScrollReveal key={s.n} direction="up" delay={i * 120} duration={800}>
                <div className="step-card">
                  <div className="step-num">{s.n}</div>
                  <h3 className="serif">{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP SHOWCASE ── */}
      <ScrollReveal direction="up" distance={50} duration={1000}>
        <AppShowcase />
      </ScrollReveal>

      {/* ── WHY US ── */}
      <section className="section">
        <div className="container">
          <div className="why-grid">
            <ScrollReveal direction="left" duration={900}>
              <div>
                <p className="label">Why us?</p>
                <h2 className="serif" style={{ marginTop: 12, fontSize: 'clamp(28px, 4vw, 44px)' }}>Not another health app. A system built on your biology.</h2>
                <p style={{ marginTop: 20, color: 'var(--text-muted)', lineHeight: 1.7 }}>Most people follow generic advice and wonder why they&rsquo;re still tired. Biolune builds a living protocol from your actual biomarkers. Then it updates every week as your body changes.</p>
                <div className="divider" style={{ marginTop: 28 }} />
                <p style={{ fontSize: 14, color: 'var(--text-muted)', fontStyle: 'italic' }}>Most programs react to symptoms. This one moves before them.</p>
              </div>
            </ScrollReveal>
            <div className="why-items">
              {whyItems.map((w, i) => (
                <ScrollReveal key={w.title} direction="up" delay={i * 150} duration={800}>
                  <div className="why-item">
                    <h3 className="serif">{w.title}</h3>
                    <p>{w.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-alt)' }}>
          <div className="container">
            <ScrollReveal direction="up">
              <div className="section-header">
                <p className="label">CLIENT RESULTS</p>
                <h2 className="serif">Real people. Measurable results.</h2>
              </div>
            </ScrollReveal>
            <div className="testimonials-grid">
              {testimonials.map((t, i) => (
                <ScrollReveal key={t.name} direction="up" delay={i * 120}>
                  <div className="testimonial-card">
                    <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                    <span className="testimonial-stat">{t.stat}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRICING — HORIZONTAL CAROUSEL (Artbase-style) ── */}
      <TierCarousel slides={tierSlides} />

      {/* ── FAQ ── */}
      <section className="section" id="faq" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <ScrollReveal direction="up" duration={900}>
              <div className="section-header" style={{ textAlign: 'center' }}>
                <p className="label">COMMON QUESTIONS</p>
                <h2 className="serif" style={{ marginTop: 12 }}>Everything you need to know before applying.</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200} duration={800}>
              <Faq items={faqs} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-sm" style={{ textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <ScrollReveal direction="up" duration={900}>
            <p className="label" style={{ marginBottom: 16 }}>Ready to begin?</p>
            <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 24 }}>Your biology is unique.<br/>Your protocol should be too.</h2>
            <Link href="/apply" className="btn btn-dark">Start your protocol</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import Carousel from '@/components/Carousel'
import Faq from '@/components/Faq'

export const metadata: Metadata = {
  title: 'About — Biolune',
  description: 'The story behind Biolune — built from real life, not theory. Precision longevity for people who carry real responsibility.',
}

const faqs = [
  { q: 'How do I prepare for my initial biomarker test?', a: 'Fast for 8–12 hours before your blood draw. Stay well-hydrated with water, avoid intense exercise the day before, and get your normal amount of sleep. Your intake form will give you specific guidance.' },
  { q: 'Is my personal health data kept private and secure?', a: 'Yes. All data is encrypted in transit and at rest, stored under GDPR-compliant protocols, and never sold or shared with third parties. Your biological data is yours — we only use it to improve your protocol.' },
  { q: 'How long does it take to receive my health results?', a: 'Your initial protocol is ready within 48 hours of completing your intake. Biomarker results from lab partners typically arrive within 5–7 business days.' },
  { q: 'Can I share my reports with my primary care physician?', a: 'Yes. All reports are exportable as PDFs. We encourage sharing with your physician — Biolune is designed to complement, not replace, your existing healthcare team.' },
  { q: 'Do I need a wearable device to use the platform?', a: 'Not required. Manual daily logging takes under 60 seconds. A wearable like Oura or Whoop gives the AI richer data and produces more precise weekly adaptations, but many members start without one.' },
  { q: 'How often should I re-test my biological markers?', a: 'We recommend a full panel every 90 days for the first year, then bi-annually once your protocol stabilises. Your protocol will flag when a re-test is beneficial.' },
]

export default function About() {
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }

        .about-hero {
          background: var(--bg-alt);
          padding: 96px 0 80px;
          border-bottom: 1px solid var(--border);
        }
        .about-hero h1 {
          font-size: clamp(36px, 5.5vw, 64px);
          max-width: 700px;
          margin-bottom: 0;
        }

        .founder-story {
          max-width: 680px;
        }
        .founder-story p {
          font-size: 17px;
          line-height: 1.8;
          color: var(--text);
          margin-bottom: 20px;
        }
        .founder-story p:last-child { margin-bottom: 0; }

        .integrity-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .integrity-items { display: flex; flex-direction: column; gap: 32px; }
        .integrity-item h3 { font-size: 18px; margin-bottom: 8px; }
        .integrity-item p { font-size: 15px; color: var(--text-muted); line-height: 1.65; }

        .team-card {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 40px;
          max-width: 440px;
        }
        .team-photo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 12px;
          color: var(--text-muted);
          font-family: 'Jost', sans-serif;
          letter-spacing: 1px;
          text-align: center;
          font-size: 10px;
        }
        .team-name { font-size: 22px; margin-bottom: 4px; }
        .team-title { font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
        .team-bio { font-size: 15px; color: var(--text-muted); line-height: 1.65; }

        @media (max-width: 768px) {
          .integrity-grid { grid-template-columns: 1fr; }
          .about-hero { padding: 64px 0 56px; }
          .founder-story p { font-size: 16px; }
        }
      `}</style>

      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <p className="label" style={{ marginBottom: 16 }}>We build</p>
          <h1 className="serif">Built from real life. Not theory.</h1>
        </div>
      </section>

      {/* Founder story */}
      <section className="section">
        <div className="container">
          <div className="founder-story">
            <p>I didn't build Biolune in a lab. I built it because I had no other choice.</p>
            <p>Flying across time zones, coming home to two kids, training Brazilian Jiu-Jitsu, and trying to stay sharp enough to perform at the highest level — I kept hitting the same wall. Not burnout exactly. More like friction. The feeling that my body and my life were constantly working against each other.</p>
            <p>Every system I tried was built for someone with perfect conditions. Fixed sleep schedule. Same timezone every week. Time to meal prep. That person is not me. And I suspect that person is not you either.</p>
            <p>So I stopped following systems and started building one.</p>
            <p>I spent years combining what I was learning about HRV, hormonal health, intermittent fasting, sleep science, and longevity research — not as separate experiments, but as one connected approach. The filter was always the same: does this actually work when life is demanding? When you're running on six hours of sleep after a transatlantic flight? When your schedule changes every week?</p>
            <p>If the answer was no, it didn't make the cut.</p>
            <p>What came out of that process is Biolune. Not a collection of biohacking tricks. Not another wellness program. A precision protocol that adapts to your biology — because your biology doesn't care about your calendar.</p>
            <p>I built this for people who carry real responsibility. Who travel, who lead, who train, who build things. People who refuse to choose between performing today and being healthy in twenty years.</p>
            <p>Because that choice shouldn't exist.</p>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="section-sm" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 32 }}>
            <p className="label">What we stand for</p>
            <h2 className="serif" style={{ marginTop: 12, fontSize: 'clamp(28px, 4vw, 40px)' }}>Five principles. One protocol.</h2>
          </div>
          <Carousel />
        </div>
      </section>

      {/* Biological integrity */}
      <section className="section">
        <div className="container">
          <div className="integrity-grid">
            <div>
              <p className="label">Why us?</p>
              <h2 className="serif" style={{ marginTop: 12, fontSize: 'clamp(28px, 4vw, 44px)' }}>Biological integrity in every layer.</h2>
              <p style={{ marginTop: 20, color: 'var(--text-muted)', lineHeight: 1.7 }}>We aim to provide the high-fidelity foundation for your complex systems. High-performance health should be mathematically precise — our framework empowers you to deploy complex wellness protocols.</p>
            </div>
            <div className="integrity-items">
              <div className="integrity-item">
                <h3 className="serif">Biological Precision</h3>
                <p>We prioritize analytical rigour to ensure every recommendation serves your body. No assumptions, no guesswork — only what your data supports.</p>
              </div>
              <div className="integrity-item">
                <h3 className="serif">Systemic Growth</h3>
                <p>We build scalable architectures that evolve alongside your biology's complex needs. A protocol that compounds over years, not months.</p>
              </div>
              <div className="integrity-item">
                <h3 className="serif">Integrated Delivery</h3>
                <p>We eliminate friction to help you launch data-driven wellness routines. Your protocol fits your life — not the other way around.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-sm" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <p className="label">Our team</p>
            <h2 className="serif" style={{ marginTop: 12, fontSize: 'clamp(24px, 3.5vw, 36px)' }}>The Mind Behind the Mission</h2>
            <p style={{ marginTop: 8, color: 'var(--text-muted)' }}>One system. Built from experience, not theory.</p>
          </div>
          <div className="team-card">
            <div className="team-photo">Photo<br/>coming soon</div>
            <h3 className="serif team-name">Korosh</h3>
            <div className="team-title">Founder of Biolune</div>
            <p className="team-bio">Built this between cockpits, time zones, and training mats. Pilot. Athlete. Father of two. Obsessed with what the human body is capable of.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
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

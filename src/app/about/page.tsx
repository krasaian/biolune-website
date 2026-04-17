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
  { q: 'How long until I get my first protocol?', a: 'Your initial protocol is ready within 48 hours of completing your intake. Biomarker results from lab partners typically arrive within 5–7 business days.' },
  { q: 'Can I share my reports with my primary care physician?', a: 'Yes. All reports are exportable as PDFs. We encourage sharing with your physician — Biolune is designed to complement, not replace, your existing healthcare team.' },
  { q: 'Do I need a wearable device to use the platform?', a: 'Not required. Manual daily logging takes under 60 seconds. A wearable like Oura or Whoop gives the AI richer data and produces more precise weekly adaptations, but many members start without one.' },
  { q: 'How often should I re-test my biological markers?', a: 'Most members do a full panel every 90 days for the first year, then bi-annually once their protocol stabilises. Your dashboard will flag when a re-test could be useful.' },
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
            <p>Korosh is a commercial airline pilot, athlete, and the founder of Biolune. He built this platform because he needed it himself — and couldn't find anything on the market that actually used his data.</p>
            <p>Flying across time zones, coming home to two kids, training Brazilian Jiu-Jitsu, and trying to stay sharp enough to perform at the highest level. He kept hitting the same wall. Not burnout exactly. More like friction. Body and life constantly working against each other.</p>
            <p>Every system he tried was built for someone with perfect conditions. Fixed sleep schedule. Same timezone every week. Time to meal prep. That person is not him. And he suspects that person is not you either.</p>
            <p>So he stopped following systems and started building one.</p>
            <p>His background in performance and hormonal optimisation is hands-on and applied. He completed the full Overload Worldwide certification track — TOP A, TOP B, Mylogenics (Activation, Release, Rehab), and Personal Hormonal Profiling (PHP) — a practitioner programme used by coaches and trainers across the Netherlands focused on hormonal balance, training load management, and body composition through natural optimisation.</p>
            <p>Beyond formal training, Korosh has spent years studying the primary literature: Attia, Walker, Huberman, Patrick, and the underlying research they reference. He has tracked his own HRV, sleep, bloodwork, and hormonal markers for over three years — the same data Biolune now helps others understand.</p>
            <p>What came out of that process is Biolune. Not a collection of biohacking tricks. Not another wellness program. An evidence aggregation platform that adapts to your biology, because your biology doesn't care about your calendar.</p>
            <p>He built this for people who carry real responsibility. Who travel, who lead, who train, who build things. People who refuse to choose between performing today and being healthy in twenty years.</p>
            <p>That choice shouldn't exist.</p>
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
              <h2 className="serif" style={{ marginTop: 12, fontSize: 'clamp(28px, 4vw, 44px)' }}>Precision, not wellness LARPing.</h2>
              <p style={{ marginTop: 20, color: 'var(--text-muted)', lineHeight: 1.7 }}>High-performance health should be as precise as the cockpit. Every recommendation traces back to a specific signal in your data. No horoscopes, no guesswork, no generic templates.</p>
            </div>
            <div className="integrity-items">
              <div className="integrity-item">
                <h3 className="serif">Biological Precision</h3>
                <p>Every recommendation starts from a number in your data. No assumptions. No guesswork. Only what your biology supports.</p>
              </div>
              <div className="integrity-item">
                <h3 className="serif">Compounding returns</h3>
                <p>A protocol that evolves with your biology. Gets sharper over years, not months. Built for the long game, not the hype cycle.</p>
              </div>
              <div className="integrity-item">
                <h3 className="serif">Fits your life</h3>
                <p>Your protocol fits your schedule, not the other way around. Morning stack in 90 seconds. Weekly check-in in five minutes. That's the deal.</p>
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
            <h2 className="serif" style={{ marginTop: 12, fontSize: 'clamp(24px, 3.5vw, 36px)' }}>Who built this</h2>
            <p style={{ marginTop: 8, color: 'var(--text-muted)' }}>One system. Built from experience, not theory.</p>
          </div>
          <div className="team-card">
            <div className="team-photo">Photo<br/>coming soon</div>
            <h3 className="serif team-name">Korosh</h3>
            <div className="team-title">Founder of Biolune</div>
            <p className="team-bio">Commercial airline pilot, athlete, father of two. Certified in hormonal profiling and advanced training methodology (Overload Worldwide: TOP A, TOP B, Mylogenics, PHP). Built Biolune between cockpits, time zones, and training mats — because he needed it himself.</p>
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
              <p style={{ marginTop: 12, color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.65 }}>Questions about the data, the protocol, or the process. Ask directly.</p>
              <div style={{ marginTop: 24 }}>
                {/* W27: this used to point at /contact, leaking visitors out of the funnel.
                    The about page is high-intent — push them straight to /apply instead. */}
                <Link href="/apply" className="btn btn-outline" style={{ padding: '11px 24px', fontSize: '11px' }}>Apply for access</Link>
              </div>
            </div>
            <Faq items={faqs} />
          </div>
        </div>
      </section>
    </>
  )
}

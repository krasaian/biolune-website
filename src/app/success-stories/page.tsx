import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Success Stories — Biolune',
  description: 'Real results from Biolune members. Measurable improvements in HRV, biological age, sleep, and recovery — backed by biomarker data.',
}

const stories = [
  {
    name: 'L. van der Berg',
    role: 'Managing Director, Amsterdam',
    tag: 'Biological age −11 years',
    plan: 'Precision',
    duration: '8 months',
    story: 'I was sceptical. I had tried every executive health programme — the supplements, the cold plunges, the coaches. None of it moved my numbers. After eight months on Precision, my biological age marker dropped eleven years according to my bloodwork. My GP asked what I changed. I told him I stopped guessing.',
    metrics: ['+28% HRV', '−11yr biological age', 'Sleep efficiency 89%'],
  },
  {
    name: 'T. Fischer',
    role: 'Competitive cyclist, Berlin',
    tag: 'Recovery score 94% avg',
    plan: 'Elite',
    duration: '6 months',
    story: 'Coming back from a knee injury, I needed a recovery framework that was built around my actual physiology — not a generic return-to-sport protocol. Biolune built my entire recovery around my HRV patterns and hormonal profile. I came back stronger than pre-injury and haven\'t had a setback since.',
    metrics: ['Recovery 94% avg', 'Zero injury recurrence', 'Power output +19%'],
  },
  {
    name: 'Dr. S. Okafor',
    role: 'Emergency physician, London',
    tag: 'Cortisol normalised · focus sustained',
    plan: 'Precision',
    duration: '5 months',
    story: 'Working 60-hour weeks in emergency medicine, I had normalised feeling depleted. After my biomarker panel revealed chronically elevated cortisol and suppressed testosterone, Biolune restructured my entire recovery protocol around my shift pattern. Five months later my colleagues asked if I\'d changed something. I had.',
    metrics: ['Cortisol normalised', '+35% deep sleep', 'Focus sustained 12hr shifts'],
  },
  {
    name: 'A. Johansson',
    role: 'Venture partner, Stockholm',
    tag: 'HRV: 41 → 67',
    plan: 'Protocol',
    duration: '12 weeks',
    story: 'I travel every week and my HRV was a disaster. I started with Protocol because I was unsure — within 12 weeks my HRV went from 41 to 67. The travel protocol alone was worth it. I now recover from long-haul flights in under a day. That used to take me a full week.',
    metrics: ['HRV 41 → 67', 'Jetlag recovery: 5 days → <1', 'Morning energy up'],
  },
  {
    name: 'M. Dubois',
    role: 'Semi-professional triathlete, Paris',
    tag: 'Training load +22% · zero overtraining',
    plan: 'Elite',
    duration: '10 months',
    story: 'My previous coach used the same periodisation blocks for every athlete. Biolune introduced me to HRV-guided training load — I now train harder when my body is ready and back off when it isn\'t. My race times improved and I finished my first full Ironman without injury for the first time in three attempts.',
    metrics: ['Training load +22%', 'Zero overtraining events', 'Ironman PB'],
  },
  {
    name: 'R. Al-Rashid',
    role: 'CEO, Dubai',
    tag: 'Biological age −9 years · energy transformed',
    plan: 'Elite',
    duration: '7 months',
    story: 'Running a company across three time zones had aged me. My biological age markers said I was 14 years older than my chronological age. Seven months in, the gap is down to 5. My cognitive clarity in board meetings is sharper than it was ten years ago. Biolune is not wellness — it is infrastructure.',
    metrics: ['Biological age gap: 14yr → 5yr', 'HRV +41%', 'Sleep latency −60%'],
  },
]

export default function SuccessStories() {
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }
        .stories-hero {
          background: var(--bg-alt);
          padding: 96px 0 80px;
          border-bottom: 1px solid var(--border);
          text-align: center;
        }
        .stories-hero h1 { font-size: clamp(36px, 5vw, 64px); margin-top: 12px; max-width: 640px; margin-left: auto; margin-right: auto; }
        .stories-hero p { font-size: 17px; color: var(--text-muted); margin-top: 16px; }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 24px;
        }
        .story-card {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
        }
        .story-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(168,152,121,0.1);
          padding: 5px 12px;
          border-radius: 100px;
          margin-bottom: 20px;
          width: fit-content;
        }
        .story-quote {
          font-size: 15px;
          line-height: 1.75;
          color: var(--text);
          font-style: italic;
          flex: 1;
          margin-bottom: 24px;
        }
        .story-name { font-weight: 500; font-size: 15px; }
        .story-role { font-size: 13px; color: var(--text-muted); margin-top: 2px; margin-bottom: 16px; }
        .story-meta {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .story-meta span {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid var(--border);
          color: var(--text-muted);
        }
        .story-metrics {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }
        .story-metric {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(168,152,121,0.08);
          padding: 4px 10px;
          border-radius: 100px;
        }

        @media (max-width: 768px) {
          .stories-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="stories-hero">
        <div className="container">
          <p className="label">Client Results</p>
          <h1 className="serif">Real people. Measurable results.</h1>
          <p>Every story here is backed by biomarker data — not marketing claims.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stories-grid">
            {stories.map(s => (
              <div key={s.name} className="story-card">
                <div className="story-tag">{s.tag}</div>
                <blockquote className="story-quote">"{s.story}"</blockquote>
                <div className="story-name">{s.name}</div>
                <div className="story-role">{s.role}</div>
                <div className="story-meta">
                  <span>{s.plan}</span>
                  <span>{s.duration}</span>
                </div>
                <div className="story-metrics">
                  {s.metrics.map(m => <span key={m} className="story-metric">{m}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <p className="label" style={{ marginBottom: 16 }}>Ready?</p>
          <h2 className="serif" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: 24 }}>Your results start with an application.</h2>
          <Link href="/apply" className="btn btn-dark">Apply for access</Link>
        </div>
      </section>
    </>
  )
}

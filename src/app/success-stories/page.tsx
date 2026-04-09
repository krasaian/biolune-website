import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Success Stories — Biolune',
  description: 'Real results from Biolune members. Measurable improvements in HRV, biological age, sleep, and recovery — backed by biomarker data.',
}

// W6: empty shell. The 6 hardcoded testimonials this used to render were
// unverified pre-beta copy and risked being read as fabricated by anyone
// who could see the launch date. Real tester results get back-filled here
// during the day-7+ beta cohort review (see BIOLUNE_KOROSH_BLOCKERS).
//
// Schema is preserved so re-populating is a 1-line append.
type Story = {
  name: string
  role: string
  tag: string
  plan: string
  duration: string
  story: string
  metrics: string[]
}
const stories: Story[] = []

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
          {stories.length === 0 ? (
            <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto', padding: '48px 24px' }}>
              <p className="label" style={{ marginBottom: 16 }}>Beta cohort in progress</p>
              <h2 className="serif" style={{ fontSize: 'clamp(22px, 3vw, 32px)', marginBottom: 16 }}>
                Real results land here as our first cohort completes their protocol.
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 15 }}>
                We will not publish testimonials we cannot back with biomarker data. Our beta members
                started in April 2026 — their verified outcomes will be added here as they reach
                3-, 6-, and 12-month milestones.
              </p>
              <p style={{ marginTop: 24 }}>
                <Link href="/apply" className="btn btn-dark">Apply for access</Link>
              </p>
            </div>
          ) : (
            <div className="stories-grid">
              {stories.map(s => (
                <div key={s.name} className="story-card">
                  <div className="story-tag">{s.tag}</div>
                  <blockquote className="story-quote">&ldquo;{s.story}&rdquo;</blockquote>
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
          )}
        </div>
      </section>

      <section className="section-sm" style={{ textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <p className="label" style={{ marginBottom: 16 }}>Ready?</p>
          <h2 className="serif" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: 24 }}>Your results start with an application.</h2>
          <Link href="/apply" className="btn btn-dark">Start your protocol</Link>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Protocol — Biolune',
  description: 'What your first 30 days inside Biolune look like. A precision longevity protocol built from your biology — adapted weekly.',
}

export default function Protocol() {
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }

        .protocol-hero {
          background: var(--bg-alt);
          padding: 96px 0 80px;
          border-bottom: 1px solid var(--border);
        }
        .protocol-hero h1 {
          font-size: clamp(36px, 5.5vw, 64px);
          max-width: 700px;
          margin-bottom: 0;
        }

        .protocol-intro {
          max-width: 680px;
        }
        .protocol-intro p {
          font-size: 17px;
          line-height: 1.8;
          color: var(--text);
          margin-bottom: 20px;
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 720px;
          position: relative;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 23px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--border);
        }

        .timeline-item {
          display: flex;
          gap: 32px;
          padding: 32px 0;
          position: relative;
        }
        .timeline-item:not(:last-child) {
          border-bottom: none;
        }

        .timeline-marker {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bg-alt);
          border: 1px solid var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--gold);
          letter-spacing: 0.5px;
          z-index: 1;
        }

        .timeline-content h3 {
          font-size: 20px;
          margin-bottom: 8px;
        }
        .timeline-content p {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 12px;
        }
        .timeline-content p:last-child {
          margin-bottom: 0;
        }
        .timeline-detail {
          font-size: 13px;
          color: var(--gold);
          font-family: 'Jost', sans-serif;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .protocol-pillars {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 32px;
        }
        .pillar-card {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px;
        }
        .pillar-card h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }
        .pillar-card p {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.65;
        }
        .pillar-number {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
          font-weight: 600;
        }

        .protocol-cta {
          background: var(--bg-alt);
          border-top: 1px solid var(--border);
          text-align: center;
        }
        .protocol-cta h2 {
          font-size: clamp(28px, 4vw, 44px);
          margin-bottom: 16px;
        }
        .protocol-cta p {
          color: var(--text-muted);
          font-size: 17px;
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto 32px;
        }

        @media (max-width: 768px) {
          .protocol-hero { padding: 64px 0 56px; }
          .protocol-intro p { font-size: 16px; }
          .protocol-pillars { grid-template-columns: 1fr; }
          .timeline-item { gap: 20px; }
          .timeline::before { left: 23px; }
        }
      `}</style>

      {/* Hero */}
      <section className="protocol-hero">
        <div className="container">
          <p className="label" style={{ marginBottom: 16 }}>The protocol</p>
          <h1 className="serif">Your first 30 days.</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container">
          <div className="protocol-intro">
            <p>Biolune is not a course, a challenge, or a wellness programme. It is a precision protocol — built from your biology and adapted as your biology changes.</p>
            <p>The first 30 days are the most important. This is when we establish your baseline, build your protocol from scratch, and begin the feedback loop that makes everything work.</p>
            <p>Here is exactly what happens.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-sm" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 48 }}>
            <p className="label">Week by week</p>
            <h2 className="serif" style={{ marginTop: 12, fontSize: 'clamp(28px, 4vw, 40px)' }}>The 30-day onboarding</h2>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker">D1</div>
              <div className="timeline-content">
                <div className="timeline-detail">Day 1 — Application review</div>
                <h3 className="serif">We read every application personally.</h3>
                <p>This is not an automated funnel. Your application is reviewed by a human to ensure genuine fit. If the protocol cannot meaningfully improve your situation, we will tell you.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">D2</div>
              <div className="timeline-content">
                <div className="timeline-detail">Day 2–3 — Intake & baseline</div>
                <h3 className="serif">A complete biological snapshot.</h3>
                <p>You complete a detailed intake covering sleep patterns, training history, stress load, dietary habits, and health goals. If you have recent bloodwork, we integrate it. If not, we arrange it.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">D5</div>
              <div className="timeline-content">
                <div className="timeline-detail">Day 5 — Protocol delivery</div>
                <h3 className="serif">Your protocol is built. From scratch.</h3>
                <p>No templates. No one-size-fits-all. Your protocol covers nutrition timing, supplementation, sleep architecture, training integration, and recovery — all calibrated to your data.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">W2</div>
              <div className="timeline-content">
                <div className="timeline-detail">Week 2 — First adaptation</div>
                <h3 className="serif">The protocol begins to learn.</h3>
                <p>Using daily HRV data, subjective logging, and early compliance patterns, we make the first set of micro-adjustments. This is where generic programmes fail and Biolune starts to compound.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">W3</div>
              <div className="timeline-content">
                <div className="timeline-detail">Week 3 — Deep review</div>
                <h3 className="serif">We sit down with your data.</h3>
                <p>A structured review of your first two weeks — what is moving, what is not, and what needs to change. Premium and Elite members have a direct strategy call. Essential members receive a written analysis.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">W4</div>
              <div className="timeline-content">
                <div className="timeline-detail">Week 4 — Locked in</div>
                <h3 className="serif">Your protocol is now yours.</h3>
                <p>By day 30, the protocol has adapted three times. You have a clear baseline, measurable direction, and a system that improves without adding complexity to your life. This is the foundation everything else builds on.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 48 }}>
            <p className="label">The framework</p>
            <h2 className="serif" style={{ marginTop: 12, fontSize: 'clamp(28px, 4vw, 40px)' }}>Three pillars. One system.</h2>
          </div>

          <div className="protocol-pillars">
            <div className="pillar-card">
              <div className="pillar-number">Pillar 01</div>
              <h3 className="serif">Hormonal Optimisation</h3>
              <p>Your hormones dictate energy, recovery, mood, and longevity. We track key markers — cortisol rhythm, testosterone, thyroid, insulin sensitivity — and build interventions that address root causes, not symptoms.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-number">Pillar 02</div>
              <h3 className="serif">Adaptive Nutrition</h3>
              <p>No fixed meal plans. Your nutrition framework adapts to your training load, travel schedule, sleep quality, and hormonal state — recalibrated weekly based on real data.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-number">Pillar 03</div>
              <h3 className="serif">Recovery Architecture</h3>
              <p>Sleep is not rest — it is biological repair. We optimise sleep architecture, HRV recovery windows, and nervous system regulation to ensure your body rebuilds faster than it breaks down.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section protocol-cta">
        <div className="container">
          <h2 className="serif">Ready to begin.</h2>
          <p>Applications are reviewed within 48 hours. No obligation. No automated upsells. Just a conversation about whether Biolune is right for you.</p>
          <Link href="/apply" className="btn btn-gold" style={{ padding: '14px 36px', fontSize: '12px' }}>Apply now</Link>
        </div>
      </section>
    </>
  )
}

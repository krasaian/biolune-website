import type { Metadata } from 'next'
import { Suspense } from 'react'
import ApplyForm from '@/components/ApplyForm'

export const metadata: Metadata = {
  title: 'Apply for Access — Biolune',
  description: 'Apply for your precision longevity protocol. Built on your biology — HRV, hormones, and biomarkers — adapted weekly by AI.',
}

export default function Apply() {
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }
        .apply-page {
          min-height: calc(100vh - var(--nav-h));
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: stretch;
        }
        .apply-left {
          background: var(--bg-alt);
          border-right: 1px solid var(--border);
          padding: 96px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .apply-left h1 { font-size: clamp(32px, 4vw, 52px); margin-bottom: 20px; }
        .apply-left p { font-size: 16px; color: var(--text-muted); line-height: 1.7; margin-bottom: 16px; }
        .apply-stat {
          display: flex;
          align-items: baseline;
          gap: 12px;
          padding: 16px 0;
          border-bottom: 1px solid var(--border);
        }
        .apply-stat:first-of-type { border-top: 1px solid var(--border); margin-top: 32px; }
        .apply-stat-num { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; font-weight: 600; color: var(--gold); }
        .apply-stat-label { font-size: 13px; color: var(--text-muted); }

        .apply-right {
          background: var(--bg);
          padding: 96px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .apply-right h2 { font-size: 28px; margin-bottom: 8px; }
        .apply-right .sub { font-size: 14px; color: var(--text-muted); margin-bottom: 36px; }

        .form-group { margin-bottom: 20px; }
        .form-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .form-input, .form-select {
          width: 100%;
          padding: 13px 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-alt);
          font-size: 15px;
          font-family: 'Jost', sans-serif;
          color: var(--text);
          outline: none;
          transition: border-color 0.2s;
          appearance: none;
        }
        .form-input:focus, .form-select:focus { border-color: var(--gold); }
        .form-input::placeholder { color: var(--text-muted); opacity: 0.6; }

        .form-submit {
          width: 100%;
          padding: 15px;
          margin-top: 8px;
        }
        .form-disclaimer {
          font-size: 12px;
          color: var(--text-muted);
          text-align: center;
          margin-top: 12px;
          line-height: 1.5;
        }
        .form-disclaimer a { color: var(--gold); }

        @media (max-width: 900px) {
          .apply-page { grid-template-columns: 1fr; }
          .apply-left { padding: 64px 24px; border-right: none; border-bottom: 1px solid var(--border); }
          .apply-right { padding: 48px 24px; }
        }
      `}</style>

      <div className="apply-page">
        <div className="apply-left">
          <p className="label" style={{ marginBottom: 16 }}>Apply for access</p>
          <h1 className="serif">Design your health.</h1>
          <p>Connect with our wellness experts to explore how Biolune can build a personalized system based on your unique biological data.</p>
          <p style={{ fontStyle: 'italic', fontSize: 15 }}>"Biolune provided the high-fidelity foundation required for me to take full control of my long-term health."</p>
          <p style={{ fontSize: 13, color: 'var(--gold)' }}>— A. Martin, Founder</p>
          <div>
            <div className="apply-stat">
              <span className="apply-stat-num">+31%</span>
              <span className="apply-stat-label">Average HRV improvement in 12 weeks</span>
            </div>
            <div className="apply-stat">
              <span className="apply-stat-num">−12yr</span>
              <span className="apply-stat-label">Average biological age shift at 6 months</span>
            </div>
            <div className="apply-stat">
              <span className="apply-stat-num">94%</span>
              <span className="apply-stat-label">Member retention after 12 months</span>
            </div>
          </div>
        </div>

        <div className="apply-right">
          <h2 className="serif">Start your application</h2>
          <p className="sub">We review every application personally. Expect a response within 48 hours.</p>

          {/*
            ApplyForm reads ?tier= via useSearchParams to preselect the
            plan dropdown when arriving from /quiz. Next 14 requires
            useSearchParams consumers to live inside a Suspense boundary,
            otherwise the route is forced to client-side rendering.
          */}
          <Suspense fallback={null}>
            <ApplyForm />
          </Suspense>
        </div>
      </div>
    </>
  )
}

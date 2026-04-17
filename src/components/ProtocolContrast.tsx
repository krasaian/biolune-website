/**
 * ProtocolContrast.tsx — the homepage peak moment.
 *
 * Two columns side by side: the same user on two different days.
 * Left: a red HRV day (PROTECT SLEEP mode).
 * Right: a green HRV day (TRAIN HARD mode).
 *
 * The point of this component is to make it immediately obvious that
 * Biolune is not a static wellness plan. Same person, two days, two
 * completely different protocols — different supplements, different
 * training, different morning routine.
 *
 * This is what separates Biolune from every other longevity brand on
 * the internet. We show the work.
 *
 * v1 — static hardcoded data from a real red/green pair. v2 will pull
 * from a live cohort once we have beta data we can safely surface.
 */

type DayBlock = { time: string; action: string }

type Day = {
  mode: 'PROTECT SLEEP' | 'TRAIN HARD'
  accent: 'red' | 'green'
  hrv: number
  sleepHours: number
  sleepLabel: string
  modeReason: string
  blocks: DayBlock[]
  footer: string
}

const redDay: Day = {
  mode: 'PROTECT SLEEP',
  accent: 'red',
  hrv: 32,
  sleepHours: 5.8,
  sleepLabel: 'poor (43% deep, late bedtime)',
  modeReason: 'HRV 18% below baseline. Sleep under 6h. Body is not in a place to train hard. Today is recovery.',
  blocks: [
    { time: '06:45', action: '10 min outdoor light. No phone. No caffeine yet.' },
    { time: '07:30', action: 'Electrolytes + creatine 10g. Fat-soluble supplements pushed to 12:00 with first meal.' },
    { time: '08:30', action: 'Zone 1 walk, 40 min. No HIIT. No heavy lifting.' },
    { time: '13:00', action: 'High-protein lunch, 45g. Omega-3, vitamin D3, K2, magnesium glycinate.' },
    { time: '20:00', action: 'Last meal. No alcohol. No screens after 21:30.' },
    { time: '21:30', action: 'Sleep stack: Mg L-Threonate 2g, Glycine 3g, L-Theanine 200mg, Apigenin 50mg.' },
  ],
  footer: 'Research insight: studies suggest people with this HRV and sleep profile respond well to recovery-focused movement. See referenced sources.',
}

const greenDay: Day = {
  mode: 'TRAIN HARD',
  accent: 'green',
  hrv: 48,
  sleepHours: 7.6,
  sleepLabel: 'strong (62% deep, consistent timing)',
  modeReason: 'HRV 14% above baseline. Sleep over 7h, high deep-sleep percentage. Today is a training day.',
  blocks: [
    { time: '06:30', action: '10 min outdoor light. Cold shower 2 min.' },
    { time: '07:15', action: 'Electrolytes + creatine 5g. Alpha-GPC 300mg. Caffeine delayed to 09:00.' },
    { time: '09:30', action: 'Zone 2 block, 50 min. Nasal breathing. HR 130–145.' },
    { time: '13:00', action: 'High-protein lunch, 45g. Omega-3, vitamin D3, K2, creatine 5g.' },
    { time: '17:00', action: 'Strength session, 45 min. Compound lifts, 4–8 rep range.' },
    { time: '21:30', action: 'Standard sleep stack. No Tongkat Ali today (cycle week 9, on pause).' },
  ],
  footer: 'Research insight: studies suggest people with this HRV and sleep profile are primed for training adaptation. See referenced sources.',
}

function Column({ day }: { day: Day }) {
  const accentColor = day.accent === 'red' ? '#c86a5a' : '#7fa878'
  const accentBg =
    day.accent === 'red'
      ? 'rgba(200, 106, 90, 0.08)'
      : 'rgba(127, 168, 120, 0.08)'
  const accentBorder =
    day.accent === 'red'
      ? 'rgba(200, 106, 90, 0.28)'
      : 'rgba(127, 168, 120, 0.28)'

  return (
    <div className="pc-col">
      <div
        className="pc-mode"
        style={{ color: accentColor, background: accentBg, borderColor: accentBorder }}
      >
        {day.mode}
      </div>

      <div className="pc-metrics">
        <div className="pc-metric">
          <div className="pc-metric-num serif" style={{ color: accentColor }}>
            {day.hrv}
          </div>
          <div className="pc-metric-label">HRV rmssd</div>
        </div>
        <div className="pc-metric">
          <div className="pc-metric-num serif" style={{ color: accentColor }}>
            {day.sleepHours}h
          </div>
          <div className="pc-metric-label">Sleep</div>
        </div>
      </div>

      <p className="pc-reason">{day.modeReason}</p>

      <div className="pc-timeline">
        {day.blocks.map((b, i) => (
          <div key={i} className="pc-block">
            <div
              className="pc-time"
              style={{ color: accentColor, borderColor: accentBorder }}
            >
              {b.time}
            </div>
            <div className="pc-action">{b.action}</div>
          </div>
        ))}
      </div>

      <div className="pc-footer-note">{day.footer}</div>
    </div>
  )
}

export default function ProtocolContrast() {
  return (
    <section className="section pc-section">
      <style>{`
        .pc-section {
          position: relative;
          overflow: hidden;
        }
        .pc-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(60% 50% at 25% 20%, rgba(200, 106, 90, 0.05), transparent 70%),
            radial-gradient(60% 50% at 75% 80%, rgba(127, 168, 120, 0.05), transparent 70%);
          pointer-events: none;
        }
        .pc-header {
          max-width: 720px;
          margin: 0 auto 56px;
          text-align: center;
          position: relative;
        }
        .pc-header p.label {
          margin-bottom: 16px;
        }
        .pc-header h2 {
          font-size: clamp(30px, 4.5vw, 52px);
          line-height: 1.1;
          margin-bottom: 18px;
        }
        .pc-header .pc-sub {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 560px;
          margin: 0 auto;
        }
        .pc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          position: relative;
          max-width: 1040px;
          margin: 0 auto;
        }
        .pc-col {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 36px 32px 32px;
          display: flex;
          flex-direction: column;
        }
        .pc-mode {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid;
          align-self: flex-start;
          margin-bottom: 24px;
        }
        .pc-metrics {
          display: flex;
          gap: 48px;
          margin-bottom: 20px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }
        .pc-metric-num {
          font-size: 56px;
          font-weight: 600;
          line-height: 1;
        }
        .pc-metric-label {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 6px;
        }
        .pc-reason {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-muted);
          margin-bottom: 28px;
          font-style: italic;
        }
        .pc-timeline {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
          margin-bottom: 24px;
        }
        .pc-block {
          display: grid;
          grid-template-columns: 70px 1fr;
          gap: 16px;
          align-items: flex-start;
        }
        .pc-time {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;
          padding: 4px 8px;
          border: 1px solid;
          border-radius: 4px;
          text-align: center;
        }
        .pc-action {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text);
        }
        .pc-footer-note {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 16px;
          font-style: italic;
          color: var(--text-muted);
          padding-top: 20px;
          border-top: 1px solid var(--border);
          line-height: 1.5;
        }
        .pc-caption {
          text-align: center;
          margin-top: 40px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 19px;
          font-style: italic;
          color: var(--text-muted);
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.55;
          position: relative;
        }
        .pc-caption strong {
          color: var(--gold);
          font-weight: 500;
          font-style: normal;
        }
        @media (max-width: 820px) {
          .pc-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .pc-metrics { gap: 32px; }
          .pc-metric-num { font-size: 44px; }
          .pc-col { padding: 28px 24px; }
        }
      `}</style>
      <div className="container">
        <div className="pc-header">
          <p className="label">TWO DAYS. SAME PERSON.</p>
          <h2 className="serif">Your body is not the same on Monday as it was on Friday. Your protocol shouldn&rsquo;t be either.</h2>
          <p className="pc-sub">
            A real protocol from a real week. Left: a day after poor sleep and stress.
            Right: a day after full recovery. Same person. Two different mornings. Two
            different stacks. This is what the weekly update actually does.
          </p>
        </div>

        <div className="pc-grid">
          <Column day={redDay} />
          <Column day={greenDay} />
        </div>

        <p className="pc-caption">
          Most longevity plans hand you a static PDF and call it personalised.
          This is the difference. <strong>Lune reads your data every morning and rebuilds the day around it.</strong>
        </p>
      </div>
    </section>
  )
}

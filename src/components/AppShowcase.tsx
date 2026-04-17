'use client'

import { useState, useEffect, useRef } from 'react'

/* ── Feature data representing real app capabilities ── */
const features = [
  {
    id: 'briefing',
    label: 'MORNING BRIEFING',
    title: 'Lune greets you with a fresh daily protocol.',
    description: 'Every morning, Lune reads your overnight HRV, sleep score, and resting heart rate — then surfaces what peer-reviewed research says about people with your numbers today. You see the science. You make the call.',
    card: {
      type: 'briefing' as const,
      greeting: 'Good morning, Korosh.',
      mode: 'TRAIN HARD',
      modeColor: '#27AE60',
      message: 'Your HRV is 14% above baseline. Sleep efficiency hit 93%. Your body is ready to train hard today. Full intensity session, then a cold plunge at 16:00.',
      metrics: [
        { label: 'HRV', value: '68', change: '+14%', positive: true },
        { label: 'Sleep', value: '7.8h', change: '93% eff.', positive: true },
        { label: 'RHR', value: '52', change: '-2', positive: true },
      ],
    },
  },
  {
    id: 'supplements',
    label: 'SUPPLEMENT TRACKING',
    title: 'Your morning and evening stack, built and tracked.',
    description: 'Biolune doesn\'t just recommend supplements. It structures them into morning and evening stacks based on absorption timing, nutrient interactions, and your protocol goals. One tap to log. Full compliance tracked weekly.',
    card: {
      type: 'supplements' as const,
      morning: [
        { name: 'Vitamin D3 + K2', dose: '5,000 IU + 90mcg', checked: true },
        { name: 'Omega-3 (EPA+DHA)', dose: '2g combined', checked: true },
        { name: 'Creatine Monohydrate', dose: '10g (5g + 5g lunch)', checked: false },
        { name: 'Tongkat Ali', dose: '400mg', checked: true },
      ],
      evening: [
        { name: 'Magnesium L-Threonate', dose: '2,000mg', checked: false },
        { name: 'L-Theanine', dose: '200mg', checked: false },
        { name: 'Apigenin', dose: '50mg', checked: false },
      ],
      compliance: 78,
    },
  },
  {
    id: 'adaptation',
    label: 'WEEKLY ADAPTATION',
    title: 'Your protocol evolves every 7 days.',
    description: 'Every Sunday, Lune reviews your biometric trends, supplement compliance, sleep architecture, and training load. Next week\'s protocol gets rebuilt from what actually happened this week. Not repeated. That\'s the difference between a plan and a system.',
    card: {
      type: 'adaptation' as const,
      week: 'Week 6 → Week 7',
      changes: [
        { action: 'Increased', item: 'Magnesium dose', detail: '300mg → 400mg', reason: 'Sleep latency still >20min' },
        { action: 'Added', item: 'Cold plunge protocol', detail: '2min @ 12°C', reason: 'HRV plateau detected' },
        { action: 'Shifted', item: 'Training window', detail: '7:00 → 6:00', reason: 'Catches the cortisol peak' },
        { action: 'Maintained', item: 'Fasting window', detail: '16:8', reason: 'Metabolic markers stable' },
      ],
      trend: { hrv: '+31%', sleep: '+1.2h', bio_age: '-4yr' },
    },
  },
  {
    id: 'travel',
    label: 'TRAVEL PROTOCOL',
    title: 'Jetlag recovery in hours, not days.',
    description: 'Flying across time zones breaks your circadian rhythm, cortisol, melatonin, and gut timing. Lune builds a pre-flight, in-flight, and arrival protocol for your exact destination. Light exposure windows, meal timing shifts, supplement adjustments. You land ready.',
    card: {
      type: 'travel' as const,
      route: 'Amsterdam → Tokyo',
      offset: '+8h',
      phases: [
        { phase: 'PRE-FLIGHT', items: ['Shift sleep 1h earlier for 3 nights', 'Begin light exposure protocol', 'Load magnesium + melatonin micro-dose'] },
        { phase: 'IN-FLIGHT', items: ['Fast for first 6 hours', 'Hydrate 500ml per 2h', 'Compression + movement every 90min'] },
        { phase: 'ARRIVAL', items: ['Morning sunlight within 30min', 'Resume local meal timing', 'Evening magnesium at destination bedtime'] },
      ],
    },
  },
]

function BriefingCard({ card }: { card: typeof features[0]['card'] }) {
  if (card.type !== 'briefing') return null
  return (
    <div className="feature-card-inner briefing-card">
      <div className="fc-greeting">{card.greeting}</div>
      <div className="fc-mode" style={{ color: card.modeColor, borderColor: card.modeColor + '40', background: card.modeColor + '12' }}>
        {card.mode}
      </div>
      <div className="fc-metrics">
        {card.metrics.map(m => (
          <div key={m.label} className="fc-metric">
            <span className="fc-metric-val">{m.value}</span>
            <span className="fc-metric-label">{m.label}</span>
            <span className={`fc-metric-change ${m.positive ? 'pos' : 'neg'}`}>{m.change}</span>
          </div>
        ))}
      </div>
      <div className="fc-lune-msg">
        <span className="fc-lune-tag">LUNE</span>
        <p>{card.message}</p>
      </div>
    </div>
  )
}

function SupplementsCard({ card }: { card: typeof features[1]['card'] }) {
  if (card.type !== 'supplements') return null
  return (
    <div className="feature-card-inner supps-card">
      <div className="fc-stack-header">
        <span className="fc-stack-label">MORNING STACK</span>
        <span className="fc-stack-count">{card.morning.filter(s => s.checked).length}/{card.morning.length}</span>
      </div>
      {card.morning.map(s => (
        <div key={s.name} className={`fc-supp-row ${s.checked ? 'done' : ''}`}>
          <div className={`fc-check ${s.checked ? 'checked' : ''}`}>{s.checked ? '\u2713' : ''}</div>
          <div className="fc-supp-info">
            <span className="fc-supp-name">{s.name}</span>
            <span className="fc-supp-dose">{s.dose}</span>
          </div>
        </div>
      ))}
      <div className="fc-stack-header" style={{ marginTop: 16 }}>
        <span className="fc-stack-label">EVENING STACK</span>
        <span className="fc-stack-count">0/{card.evening.length}</span>
      </div>
      {card.evening.map(s => (
        <div key={s.name} className={`fc-supp-row ${s.checked ? 'done' : ''}`}>
          <div className={`fc-check ${s.checked ? 'checked' : ''}`}>{s.checked ? '\u2713' : ''}</div>
          <div className="fc-supp-info">
            <span className="fc-supp-name">{s.name}</span>
            <span className="fc-supp-dose">{s.dose}</span>
          </div>
        </div>
      ))}
      <div className="fc-compliance">
        <span>Weekly compliance</span>
        <div className="fc-compliance-bar"><div style={{ width: `${card.compliance}%` }} /></div>
        <span className="fc-compliance-pct">{card.compliance}%</span>
      </div>
    </div>
  )
}

function AdaptationCard({ card }: { card: typeof features[2]['card'] }) {
  if (card.type !== 'adaptation') return null
  return (
    <div className="feature-card-inner adapt-card">
      <div className="fc-week-label">{card.week}</div>
      <div className="fc-adapt-list">
        {card.changes.map(c => (
          <div key={c.item} className="fc-adapt-row">
            <span className={`fc-adapt-action ${c.action.toLowerCase()}`}>{c.action}</span>
            <div className="fc-adapt-detail">
              <span className="fc-adapt-item">{c.item}</span>
              <span className="fc-adapt-spec">{c.detail}</span>
            </div>
            <span className="fc-adapt-reason">{c.reason}</span>
          </div>
        ))}
      </div>
      <div className="fc-trend-row">
        {Object.entries(card.trend).map(([k, v]) => (
          <div key={k} className="fc-trend-item">
            <span className="fc-trend-val">{v}</span>
            <span className="fc-trend-label">{k === 'bio_age' ? 'Bio Age' : k.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TravelCard({ card }: { card: typeof features[3]['card'] }) {
  if (card.type !== 'travel') return null
  return (
    <div className="feature-card-inner travel-card">
      <div className="fc-route">
        <span className="fc-route-cities">{card.route}</span>
        <span className="fc-route-offset">{card.offset} timezone shift</span>
      </div>
      {card.phases.map(p => (
        <div key={p.phase} className="fc-phase">
          <span className="fc-phase-label">{p.phase}</span>
          <div className="fc-phase-items">
            {p.items.map((item, i) => (
              <div key={i} className="fc-phase-item">
                <span className="fc-phase-dash">&mdash;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AppShowcase() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startAutoRotate = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % features.length)
    }, 6000)
  }

  useEffect(() => {
    startAutoRotate()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const handleTab = (i: number) => {
    setActive(i)
    startAutoRotate()
  }

  const feat = features[active]

  return (
    <>
      <style>{`
        .showcase {
          padding: 100px 0;
          background: var(--bg);
        }
        .showcase-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        .showcase-left { position: sticky; top: 120px; }
        .showcase-tabs {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 32px;
        }
        .showcase-tab {
          text-align: left;
          padding: 16px 0;
          border-bottom: 1px solid var(--border);
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }
        .showcase-tab::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        .showcase-tab.active {
          color: var(--text);
        }
        .showcase-tab.active::after {
          width: 100%;
        }
        .showcase-tab:hover:not(.active) {
          color: var(--gold);
        }
        .showcase-text h2 {
          font-size: clamp(24px, 3vw, 36px);
          line-height: 1.15;
          margin-bottom: 16px;
        }
        .showcase-text p {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.7;
        }

        /* ── Right side: feature card ── */
        .showcase-right {
          background: #0D0B08;
          border-radius: 16px;
          padding: 32px;
          min-height: 480px;
          color: #F5F0E8;
          box-shadow: 0 24px 64px rgba(26, 25, 22, 0.18);
        }
        .feature-card-inner {
          animation: fadeInCard 0.35s ease-out;
        }
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Briefing card ── */
        .fc-greeting {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 400;
          margin-bottom: 16px;
          color: #F5F0E8;
        }
        .fc-mode {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 3px;
          border: 1px solid;
          margin-bottom: 20px;
        }
        .fc-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        .fc-metric {
          background: rgba(196, 169, 106, 0.06);
          border: 1px solid rgba(196, 169, 106, 0.15);
          border-radius: 8px;
          padding: 14px 12px;
          text-align: center;
        }
        .fc-metric-val {
          display: block;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 26px;
          font-weight: 600;
          line-height: 1;
          margin-bottom: 4px;
        }
        .fc-metric-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #8A8275;
        }
        .fc-metric-change {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          margin-top: 4px;
        }
        .fc-metric-change.pos { color: #27AE60; }
        .fc-metric-change.neg { color: #E74C3C; }
        .fc-lune-msg {
          background: rgba(196, 169, 106, 0.08);
          border-left: 2px solid #A89879;
          padding: 14px;
          border-radius: 4px;
        }
        .fc-lune-tag {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #A89879;
          margin-bottom: 6px;
        }
        .fc-lune-msg p {
          font-size: 13px;
          line-height: 1.55;
          color: #d4cfc5;
        }

        /* ── Supplements card ── */
        .fc-stack-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .fc-stack-label {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          color: #A89879;
        }
        .fc-stack-count {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          color: #8A8275;
        }
        .fc-supp-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(196, 169, 106, 0.06);
        }
        .fc-supp-row.done { opacity: 0.5; }
        .fc-check {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1px solid rgba(196, 169, 106, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: #A89879;
          flex-shrink: 0;
        }
        .fc-check.checked {
          background: rgba(168, 152, 121, 0.2);
          border-color: #A89879;
        }
        .fc-supp-info {
          display: flex;
          justify-content: space-between;
          flex: 1;
          gap: 8px;
        }
        .fc-supp-name { font-size: 13px; color: #F5F0E8; }
        .fc-supp-dose { font-size: 12px; color: #8A8275; white-space: nowrap; }
        .fc-compliance {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(196, 169, 106, 0.1);
          font-size: 11px;
          color: #8A8275;
        }
        .fc-compliance-bar {
          flex: 1;
          height: 4px;
          background: rgba(196, 169, 106, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        .fc-compliance-bar div {
          height: 100%;
          background: #A89879;
          border-radius: 2px;
        }
        .fc-compliance-pct {
          font-weight: 500;
          color: #A89879;
        }

        /* ── Adaptation card ── */
        .fc-week-label {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #A89879;
          margin-bottom: 20px;
        }
        .fc-adapt-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 24px;
        }
        .fc-adapt-row {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 8px 12px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(196, 169, 106, 0.06);
        }
        .fc-adapt-action {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 3px;
          text-align: center;
          align-self: start;
        }
        .fc-adapt-action.increased { background: rgba(39, 174, 96, 0.12); color: #27AE60; }
        .fc-adapt-action.added { background: rgba(52, 152, 219, 0.12); color: #3498DB; }
        .fc-adapt-action.shifted { background: rgba(243, 156, 18, 0.12); color: #F39C12; }
        .fc-adapt-action.maintained { background: rgba(196, 169, 106, 0.12); color: #A89879; }
        .fc-adapt-detail { display: flex; flex-direction: column; gap: 2px; }
        .fc-adapt-item { font-size: 13px; color: #F5F0E8; }
        .fc-adapt-spec { font-size: 12px; color: #8A8275; }
        .fc-adapt-reason {
          grid-column: 2;
          font-size: 11px;
          color: #6b6960;
          font-style: italic;
        }
        .fc-trend-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid rgba(196, 169, 106, 0.1);
        }
        .fc-trend-item { text-align: center; }
        .fc-trend-val {
          display: block;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 600;
          color: #27AE60;
          line-height: 1;
        }
        .fc-trend-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #8A8275;
          margin-top: 4px;
        }

        /* ── Travel card ── */
        .fc-route {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(196, 169, 106, 0.1);
        }
        .fc-route-cities {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 20px;
          font-weight: 600;
        }
        .fc-route-offset {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          color: #A89879;
          letter-spacing: 1px;
        }
        .fc-phase {
          margin-bottom: 20px;
        }
        .fc-phase:last-child { margin-bottom: 0; }
        .fc-phase-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #A89879;
          margin-bottom: 8px;
        }
        .fc-phase-items {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .fc-phase-item {
          display: flex;
          gap: 8px;
          font-size: 13px;
          color: #d4cfc5;
          line-height: 1.4;
        }
        .fc-phase-dash {
          color: #A89879;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .showcase { padding: 64px 0; }
          .showcase-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .showcase-left { position: static; }
          .showcase-right { min-height: auto; padding: 24px; }
          .fc-adapt-row { grid-template-columns: 1fr; }
          .fc-adapt-action { width: fit-content; }
          .fc-adapt-reason { grid-column: 1; }
        }
      `}</style>

      <section className="showcase">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <p className="label">THE SYSTEM</p>
            <h2 className="serif">Not another dashboard. A living protocol.</h2>
          </div>

          <div className="showcase-inner">
            <div className="showcase-left">
              <div className="showcase-tabs">
                {features.map((f, i) => (
                  <button
                    key={f.id}
                    className={`showcase-tab ${active === i ? 'active' : ''}`}
                    onClick={() => handleTab(i)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="showcase-text">
                <h2 className="serif">{feat.title}</h2>
                <p>{feat.description}</p>
              </div>
            </div>

            <div className="showcase-right" key={active}>
              {feat.card.type === 'briefing' && <BriefingCard card={feat.card} />}
              {feat.card.type === 'supplements' && <SupplementsCard card={feat.card as any} />}
              {feat.card.type === 'adaptation' && <AdaptationCard card={feat.card as any} />}
              {feat.card.type === 'travel' && <TravelCard card={feat.card as any} />}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

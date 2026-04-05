'use client'

import { useState, useEffect } from 'react'

type Scenario = 'bad' | 'good'

interface ScenarioData {
  mode: string
  modeColor: string
  hrv: number
  hrvChange: string
  sleep: number
  sleepChange: string
  rhr: number
  rhrChange: string
  message: string
}

const scenarios: Record<Scenario, ScenarioData> = {
  bad: {
    mode: 'PROTECT SLEEP',
    modeColor: '#E74C3C',
    hrv: 28,
    hrvChange: '-34%',
    sleep: 4.8,
    sleepChange: '-2.7h',
    rhr: 72,
    rhrChange: '+8',
    message: 'Your HRV dropped 34%. Training cancelled. Recovery protocol activated.',
  },
  good: {
    mode: 'TRAIN HARD',
    modeColor: '#27AE60',
    hrv: 72,
    hrvChange: '+18%',
    sleep: 8.2,
    sleepChange: '+0.7h',
    rhr: 52,
    rhrChange: '-3',
    message: 'Peak performance day. Full strength session at RPE 8-9 activated.',
  },
}

const timelineItems = {
  bad: [
    { time: '06:00', label: 'Wake', color: '#E74C3C' },
    { time: '08:30', label: 'Recovery walk', color: '#E74C3C' },
    { time: '18:00', label: 'Early sleep', color: '#E74C3C' },
  ],
  good: [
    { time: '05:45', label: 'Warm-up', color: '#27AE60' },
    { time: '07:00', label: 'Strength block', color: '#27AE60' },
    { time: '16:00', label: 'Cold plunge', color: '#27AE60' },
  ],
}

export default function AppShowcase() {
  const [scenario, setScenario] = useState<Scenario>('good')
  const [displayValues, setDisplayValues] = useState(scenarios['good'])
  const [messageText, setMessageText] = useState('')

  const data = scenarios[scenario]

  // Animate counter values when scenario changes
  useEffect(() => {
    const targetHrv = data.hrv
    const targetSleep = data.sleep
    const targetRhr = data.rhr
    const duration = 600 // 600ms animation

    const startTime = Date.now()

    const prevData = scenario === 'good' ? scenarios.bad : scenarios.good
    const startHrv = prevData.hrv
    const startSleep = prevData.sleep
    const startRhr = prevData.rhr

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setDisplayValues({
        ...data,
        hrv: Math.round(startHrv + (targetHrv - startHrv) * easeOut),
        sleep: Number((startSleep + (targetSleep - startSleep) * easeOut).toFixed(1)),
        rhr: Math.round(startRhr + (targetRhr - startRhr) * easeOut),
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [scenario, data])

  // Typewriter effect for message
  useEffect(() => {
    const fullMessage = data.message
    let index = 0
    setMessageText('')

    const typeInterval = setInterval(() => {
      if (index <= fullMessage.length) {
        setMessageText(fullMessage.substring(0, index))
        index++
      } else {
        clearInterval(typeInterval)
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [scenario, data.message])

  return (
    <>
      <style>{`
        .app-showcase {
          padding: 100px 0;
          background: var(--bg);
        }

        .showcase-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .showcase-header .label {
          margin-bottom: 16px;
        }

        .showcase-header h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 600;
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .toggle-scenarios {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 48px;
        }

        .scenario-btn {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 12px 28px;
          border-radius: 4px;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--text);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .scenario-btn.active {
          background: var(--gold);
          color: var(--bg);
          border-color: var(--gold);
        }

        .scenario-btn:hover:not(.active) {
          border-color: var(--gold);
          color: var(--gold);
        }

        .showcase-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .phone-frame {
          position: relative;
          width: 320px;
          height: 640px;
          background: #1a1a1a;
          border: 12px solid #0a0a0a;
          border-radius: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .phone-frame::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 150px;
          height: 24px;
          background: #000;
          border-radius: 0 0 24px 24px;
          z-index: 10;
        }

        .phone-content {
          flex: 1;
          padding: 40px 20px 24px;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #0D0B08 0%, #161310 100%);
          color: #F5F0E8;
          overflow: hidden;
        }

        .mode-badge {
          display: inline-block;
          width: fit-content;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 3px;
          margin-bottom: 20px;
          transition: all 0.4s ease;
        }

        .mode-badge.bad {
          background: rgba(231, 76, 60, 0.15);
          color: #E74C3C;
          border: 1px solid rgba(231, 76, 60, 0.3);
        }

        .mode-badge.good {
          background: rgba(39, 174, 96, 0.15);
          color: #27AE60;
          border: 1px solid rgba(39, 174, 96, 0.3);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .metric-card {
          background: rgba(196, 169, 106, 0.05);
          border: 1px solid rgba(196, 169, 106, 0.2);
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          transition: all 0.4s ease;
        }

        .metric-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 24px;
          font-weight: 600;
          color: #F5F0E8;
          line-height: 1;
          margin-bottom: 4px;
          display: block;
          transition: all 0.4s ease;
        }

        .metric-label {
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #8A8275;
        }

        .metric-change {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          margin-top: 4px;
          display: block;
          transition: all 0.4s ease;
        }

        .metric-change.bad {
          color: #E74C3C;
        }

        .metric-change.good {
          color: #27AE60;
        }

        .lune-briefing {
          background: rgba(196, 169, 106, 0.08);
          border-left: 2px solid var(--gold);
          padding: 12px;
          margin-bottom: 20px;
          border-radius: 4px;
          flex: 0;
        }

        .lune-label {
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 6px;
          display: block;
        }

        .lune-message {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          line-height: 1.4;
          color: #F5F0E8;
          min-height: 32px;
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid rgba(196, 169, 106, 0.1);
        }

        .timeline-item {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 11px;
          transition: all 0.3s ease;
        }

        .timeline-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .timeline-item.bad .timeline-dot {
          background: #E74C3C;
        }

        .timeline-item.good .timeline-dot {
          background: #27AE60;
        }

        .timeline-time {
          font-family: 'Jost', sans-serif;
          font-weight: 600;
          color: #F5F0E8;
          min-width: 32px;
        }

        .timeline-label {
          color: #8A8275;
          font-size: 10px;
        }

        @media (max-width: 768px) {
          .app-showcase {
            padding: 64px 0;
          }

          .showcase-header {
            margin-bottom: 48px;
          }

          .phone-frame {
            width: 280px;
            height: 560px;
            border-width: 10px;
            border-radius: 32px;
          }

          .phone-content {
            padding: 36px 16px 20px;
          }

          .metrics-grid {
            gap: 10px;
            margin-bottom: 20px;
          }

          .metric-value {
            font-size: 20px;
          }
        }
      `}</style>

      <section className="app-showcase">
        <div className="container">
          <div className="showcase-header">
            <p className="label">APP SHOWCASE</p>
            <h2>See the protocol in action</h2>
          </div>

          <div className="toggle-scenarios">
            <button
              className={`scenario-btn ${scenario === 'bad' ? 'active' : ''}`}
              onClick={() => setScenario('bad')}
            >
              Bad Day
            </button>
            <button
              className={`scenario-btn ${scenario === 'good' ? 'active' : ''}`}
              onClick={() => setScenario('good')}
            >
              Good Day
            </button>
          </div>

          <div className="showcase-container">
            <div className="phone-frame">
              <div className="phone-content">
                <div className={`mode-badge ${scenario}`}>
                  {displayValues.mode}
                </div>

                <div className="metrics-grid">
                  <div className="metric-card">
                    <span className="metric-value">{displayValues.hrv}</span>
                    <span className="metric-label">HRV</span>
                    <span className={`metric-change ${scenario}`}>
                      {displayValues.hrvChange}
                    </span>
                  </div>
                  <div className="metric-card">
                    <span className="metric-value">{displayValues.sleep}</span>
                    <span className="metric-label">Sleep</span>
                    <span className={`metric-change ${scenario}`}>
                      {displayValues.sleepChange}
                    </span>
                  </div>
                  <div className="metric-card">
                    <span className="metric-value">{displayValues.rhr}</span>
                    <span className="metric-label">RHR</span>
                    <span className={`metric-change ${scenario}`}>
                      {displayValues.rhrChange}
                    </span>
                  </div>
                </div>

                <div className="lune-briefing">
                  <span className="lune-label">Lune AI</span>
                  <p className="lune-message">{messageText}</p>
                </div>

                <div className="timeline">
                  {timelineItems[scenario].map((item, idx) => (
                    <div key={idx} className={`timeline-item ${scenario}`}>
                      <div className="timeline-dot" />
                      <span className="timeline-time">{item.time}</span>
                      <span className="timeline-label">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

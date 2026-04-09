'use client'
import { useState } from 'react'
import Link from 'next/link'

/**
 * "Find your tier" recommender (W23).
 *
 * Repurposed from the original Longevity Readiness Score quiz. Same UX
 * scaffolding (intro → questions → email capture → result), but the
 * scoring is now a tier vote. Each answer votes for one of three tiers
 * — Protocol, Precision, or Elite — and the final recommendation is
 * the tier with the most votes (ties break to Precision, the
 * "most popular" middle option).
 *
 * The result CTA deep-links into /apply?tier=<protocol|precision|elite>
 * which preselects the matching plan in ApplyForm. This preserves
 * Max's "keep the site alive and kicking" feedback while collapsing
 * two parallel funnels (quiz + apply) into one continuous path.
 */

type Tier = 'protocol' | 'precision' | 'elite'

type Question = {
  id: number
  label: string
  question: string
  options: { text: string; tier: Tier }[]
}

const questions: Question[] = [
  {
    id: 1,
    label: 'Coaching Style',
    question: 'How much hands-on coaching do you actually want?',
    options: [
      {
        text: "Give me a clear protocol I can run on my own — I'll execute.",
        tier: 'protocol',
      },
      {
        text: 'Adapt the plan to me weekly, but I prefer software over conversations.',
        tier: 'precision',
      },
      {
        text: 'I want a real human in the loop. Calls, biomarkers, and direct feedback.',
        tier: 'elite',
      },
    ],
  },
  {
    id: 2,
    label: 'Bloodwork',
    question: 'How current is your bloodwork?',
    options: [
      {
        text: "I haven't had a panel in years — or ever.",
        tier: 'protocol',
      },
      {
        text: 'I have something recent but I want it interpreted properly.',
        tier: 'precision',
      },
      {
        text: 'I run regular panels and want hormones, ApoB, and HbA1c tracked over time.',
        tier: 'elite',
      },
    ],
  },
  {
    id: 3,
    label: 'Biometric Data',
    question: 'What kind of daily data do you already collect?',
    options: [
      {
        text: 'None, or just step count from my phone.',
        tier: 'protocol',
      },
      {
        text: 'A wearable (Apple Watch, Oura, WHOOP) — but I rarely act on the numbers.',
        tier: 'precision',
      },
      {
        text: 'Continuous data plus context — and I want pattern correlations across all of it.',
        tier: 'elite',
      },
    ],
  },
  {
    id: 4,
    label: 'Lifestyle Complexity',
    question: 'How complex is your day-to-day?',
    options: [
      {
        text: "Mostly routine. Same city, same schedule. I need to start somewhere.",
        tier: 'protocol',
      },
      {
        text: 'Variable training load and some travel. I need a plan that adapts.',
        tier: 'precision',
      },
      {
        text: 'Heavy travel, high-stakes work, multiple time zones. I need real-time adjustments.',
        tier: 'elite',
      },
    ],
  },
  {
    id: 5,
    label: 'Commitment',
    question: 'What level of investment fits you right now?',
    options: [
      {
        text: 'Entry point. Prove the system works before I scale up.',
        tier: 'protocol',
      },
      {
        text: 'Serious — this matters and I want the autonomous version.',
        tier: 'precision',
      },
      {
        text: 'Premium. I want direct access to the founder and the deepest layer of the system.',
        tier: 'elite',
      },
    ],
  },
]

type TierMeta = {
  badge: string
  name: string
  price: string
  headline: string
  body: string
  detail: string
  cta: string
  href: string
}

const TIER_META: Record<Tier, TierMeta> = {
  protocol: {
    badge: 'PROTOCOL · €149/MONTH',
    name: 'Protocol',
    price: '€149/month',
    headline: 'Start with Protocol.',
    body: "You're at the start of a real, structured approach, and that's exactly the right place to be. Protocol gives you a full daily routine built from your DNA, your training load, and your goals. Run it for 90 days, see what changes in your body, then decide where to go next.",
    detail: 'Full 90-day protocol built from your biology. Lune in your pocket (25 messages a day). Raw DNA upload read into your plan. Morning, evening, and sleep stacks. Fasting window and meal timing that fits your week. Apple Health sync and a weekly Sunday review.',
    cta: 'Start your Protocol',
    href: '/apply?tier=protocol',
  },
  precision: {
    badge: 'PRECISION · €299/MONTH · MOST POPULAR',
    name: 'Precision',
    price: '€299/month',
    headline: 'Precision is built for you.',
    body: "You already collect the data. You just haven't found a system that actually reads it. Precision rebuilds your protocol in real time from your HRV, sleep, training, and stress. You stay in the driver's seat. The plan keeps moving with you.",
    detail: 'Everything in Protocol, plus unlimited Lune with room to act on your day, six adaptive modes for how your week actually runs, pattern reads across sleep, HRV, training, and stress, Travel Mode with circadian reset, and proactive alerts and weekly progress reports.',
    cta: 'Start your Precision protocol',
    href: '/apply?tier=precision',
  },
  elite: {
    badge: 'ELITE · €549/MONTH · INVITE ONLY',
    name: 'Elite',
    price: '€549/month',
    headline: 'Elite is where you belong.',
    body: 'You want the deepest layer of the system. Precision medicine, real biomarker tracking, and a human in the loop. Elite is invite-only. It pairs the adaptive protocol with direct work with me. Calls, bloodwork read in plain language, and custom adjustments tied to your trajectory.',
    detail: 'Everything in Precision, plus full bloodwork read in plain language, long-term biomarker tracking (ApoB, HbA1c, hormones), two private calls a month with Korosh, a priority WhatsApp line straight to me, and PDF reports with protocol adjustments on demand.',
    cta: 'Request Elite access',
    href: '/apply?tier=elite',
  },
}

function recommendTier(votes: Tier[]): Tier {
  const counts: Record<Tier, number> = { protocol: 0, precision: 0, elite: 0 }
  for (const v of votes) counts[v] += 1
  const max = Math.max(counts.protocol, counts.precision, counts.elite)
  // Tie breaker: prefer Precision (the "most popular" middle tier),
  // then Protocol (lower commitment), then Elite (gated upper tier).
  if (counts.precision === max) return 'precision'
  if (counts.protocol === max) return 'protocol'
  return 'elite'
}

export default function QuizClient() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'capture' | 'result'>('intro')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Tier[]>([])
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  const recommendedTier = recommendTier(answers)
  const meta = TIER_META[recommendedTier]
  const progress = step === 'quiz' ? ((current + 1) / questions.length) * 100 : 0

  const selectAnswer = (tier: Tier) => {
    const newAnswers = [...answers, tier]
    setAnswers(newAnswers)
    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      setStep('capture')
    }
  }

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailStatus('loading')
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'tier-quiz',
          tier: recommendTier(answers),
        }),
      })
    } catch {
      // Still show the result even if capture fails
    }
    setEmailStatus('done')
    setStep('result')
  }

  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }

        .quiz-wrap {
          min-height: calc(90vh - var(--nav-h));
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 64px 20px;
        }
        .quiz-container {
          max-width: 600px;
          width: 100%;
        }

        /* Intro */
        .quiz-intro { text-align: center; }
        .quiz-intro h1 {
          font-size: clamp(32px, 5vw, 52px);
          margin-bottom: 16px;
        }
        .quiz-intro p {
          font-size: 17px;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Progress bar */
        .quiz-progress {
          height: 2px;
          background: var(--border);
          margin-bottom: 48px;
          border-radius: 2px;
          overflow: hidden;
        }
        .quiz-progress-fill {
          height: 100%;
          background: var(--gold);
          transition: width 0.4s ease;
        }

        /* Question */
        .quiz-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .quiz-step {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .quiz-category {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 500;
        }
        .quiz-question {
          font-size: clamp(22px, 3.5vw, 28px);
          line-height: 1.3;
          margin-bottom: 32px;
        }

        /* Options */
        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .quiz-option {
          width: 100%;
          text-align: left;
          padding: 18px 24px;
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          color: var(--text);
          line-height: 1.5;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .quiz-option:hover {
          border-color: var(--gold);
          background: var(--bg);
          transform: translateY(-1px);
        }

        /* Email capture */
        .quiz-capture { text-align: center; }
        .quiz-capture h2 {
          font-size: clamp(24px, 4vw, 36px);
          margin-bottom: 12px;
        }
        .quiz-capture p {
          font-size: 16px;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 28px;
          max-width: 440px;
          margin-left: auto;
          margin-right: auto;
        }
        .capture-form {
          display: flex;
          gap: 12px;
          max-width: 420px;
          margin: 0 auto;
        }
        .capture-form input {
          flex: 1;
          padding: 14px 18px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-alt);
          font-size: 15px;
          font-family: 'Jost', sans-serif;
          color: var(--text);
          outline: none;
        }
        .capture-form input:focus { border-color: var(--gold); }
        .capture-form input::placeholder { color: var(--text-muted); opacity: 0.6; }
        .capture-micro {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 12px;
        }
        .skip-link {
          display: inline-block;
          margin-top: 20px;
          font-size: 13px;
          color: var(--text-muted);
          cursor: pointer;
          border: none;
          background: none;
          font-family: 'Jost', sans-serif;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .skip-link:hover { color: var(--gold); }

        /* Result */
        .quiz-result { text-align: center; }
        .result-badge {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          border: 1px solid var(--gold);
          padding: 8px 20px;
          border-radius: 4px;
          margin-bottom: 24px;
        }
        .quiz-result h2 {
          font-size: clamp(24px, 4vw, 38px);
          margin-bottom: 16px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        .result-body {
          font-size: 16px;
          color: var(--text-muted);
          line-height: 1.8;
          max-width: 520px;
          margin: 0 auto 24px;
        }
        .result-detail {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px 28px;
          text-align: left;
          font-size: 15px;
          color: var(--text);
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto 32px;
        }
        .result-detail-label {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 10px;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .capture-form { flex-direction: column; }
          .capture-form input { width: 100%; }
          .quiz-option { padding: 16px 20px; font-size: 14px; }
        }
      `}</style>

      <div className="quiz-wrap">
        <div className="quiz-container">

          {/* Intro */}
          {step === 'intro' && (
            <div className="quiz-intro">
              <p className="label" style={{ marginBottom: 16 }}>2-minute recommender</p>
              <h1 className="serif">Find your tier.</h1>
              <p>Five questions about how you live, train, and track your biology — and we&rsquo;ll tell you which Biolune protocol fits you right now. No guessing, no upsell.</p>
              <button
                className="btn btn-gold"
                style={{ padding: '16px 40px', fontSize: '12px' }}
                onClick={() => setStep('quiz')}
              >
                Find my tier
              </button>
            </div>
          )}

          {/* Quiz */}
          {step === 'quiz' && (
            <div>
              <div className="quiz-progress">
                <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="quiz-meta">
                <span className="quiz-step">{current + 1} / {questions.length}</span>
                <span className="quiz-category">{questions[current].label}</span>
              </div>
              <h2 className="serif quiz-question">{questions[current].question}</h2>
              <div className="quiz-options">
                {questions[current].options.map((opt, i) => (
                  <button
                    key={i}
                    className="quiz-option"
                    onClick={() => selectAnswer(opt.tier)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Email capture */}
          {step === 'capture' && (
            <div className="quiz-capture">
              <p className="label" style={{ marginBottom: 16 }}>Your tier is ready</p>
              <h2 className="serif">Your tier is ready.</h2>
              <p>Enter your email to see your recommendation, the full breakdown, and a deep link straight into the application.</p>
              <form className="capture-form" onSubmit={submitEmail}>
                <input
                  type="email"
                  placeholder="Your best email address"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{ padding: '14px 28px', fontSize: '12px', whiteSpace: 'nowrap' }}
                  disabled={emailStatus === 'loading'}
                >
                  {emailStatus === 'loading' ? 'Loading...' : 'Show my tier'}
                </button>
              </form>
              <p className="capture-micro">No spam. No hard sell. Unsubscribe any time.</p>
              <button className="skip-link" onClick={() => setStep('result')}>
                Skip — show my tier without email
              </button>
            </div>
          )}

          {/* Result */}
          {step === 'result' && (
            <div className="quiz-result">
              <div className="result-badge">{meta.badge}</div>
              <h2 className="serif">{meta.headline}</h2>
              <p className="result-body">{meta.body}</p>
              <div className="result-detail">
                <div className="result-detail-label">What&rsquo;s included</div>
                {meta.detail}
              </div>
              <Link
                href={meta.href}
                className="btn btn-gold"
                style={{ padding: '16px 40px', fontSize: '12px' }}
              >
                {meta.cta}
              </Link>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

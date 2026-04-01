'use client'
import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 1,
    label: 'Sleep Quality',
    question: 'How would you describe your sleep over the past month?',
    options: [
      { text: '7–9 hours, consistent timing, wake refreshed', points: 3 },
      { text: '6–7 hours, some variability, usually OK', points: 2 },
      { text: 'Under 6 hours, irregular, often tired on waking', points: 0 },
    ],
  },
  {
    id: 2,
    label: 'HRV Tracking',
    question: 'Do you track your HRV (Heart Rate Variability) in the morning?',
    options: [
      { text: 'Yes, daily — and I understand what the numbers mean', points: 3 },
      { text: 'I track it occasionally but don\'t use the data', points: 1 },
      { text: 'No — I don\'t track HRV', points: 0 },
    ],
  },
  {
    id: 3,
    label: 'Energy & Cognition',
    question: 'How is your afternoon energy and mental clarity on a typical weekday?',
    options: [
      { text: 'Sharp and consistent throughout the day', points: 3 },
      { text: 'Notable dip after lunch, need caffeine to push through', points: 1 },
      { text: 'Chronically low, hard to focus for more than 60 minutes', points: 0 },
    ],
  },
  {
    id: 4,
    label: 'Training & Recovery',
    question: 'How do you determine whether to train hard or recover on a given day?',
    options: [
      { text: 'I use biometric data (HRV, sleep score) to decide', points: 3 },
      { text: 'I follow a fixed program regardless of how I feel', points: 1 },
      { text: 'I train when motivated, rest when I\'m too tired', points: 0 },
    ],
  },
  {
    id: 5,
    label: 'Stress & Nervous System',
    question: 'How often do you feel in a state of sustained stress or low-grade anxiety?',
    options: [
      { text: 'Rarely — I have clear strategies to regulate', points: 3 },
      { text: 'Several times a week, I manage it', points: 1 },
      { text: 'Almost daily — it feels like the default state', points: 0 },
    ],
  },
  {
    id: 6,
    label: 'Nutrition & Timing',
    question: 'How structured is your nutrition protocol?',
    options: [
      { text: 'I eat strategically — timing, macros, and composition are deliberate', points: 3 },
      { text: 'I eat reasonably well but without a clear structure', points: 1 },
      { text: 'I eat reactively — convenience and cravings drive most decisions', points: 0 },
    ],
  },
  {
    id: 7,
    label: 'Biomarker Tracking',
    question: 'When did you last test your key biomarkers (hormones, inflammation, metabolic panel)?',
    options: [
      { text: 'In the last 6 months, with follow-up action taken', points: 3 },
      { text: '1–2 years ago, but I haven\'t acted on the results', points: 1 },
      { text: 'I\'ve never tested, or it\'s been over 2 years', points: 0 },
    ],
  },
  {
    id: 8,
    label: 'Longevity Orientation',
    question: 'How would you describe your current health investment?',
    options: [
      { text: 'I\'m proactively building long-term physiological capital', points: 3 },
      { text: 'I\'m managing symptoms and trying to stay healthy day-to-day', points: 1 },
      { text: 'I\'m mostly reactive — I only focus on health when something goes wrong', points: 0 },
    ],
  },
]

type Tier = {
  badge: string
  headline: string
  body: string
  detail: string
  cta: string
}

function getTier(score: number): Tier {
  if (score >= 17) {
    return {
      badge: 'LONGEVITY-READY',
      headline: 'You\'re already operating at the top 10%.',
      body: 'Your biology is in a strong state of readiness. Your habits, data, and daily decisions are working in your favour. The question now isn\'t how to start — it\'s how to maintain and extend your edge as demands increase.',
      detail: 'Weekly protocol refinement based on your biometric trends. AI-guided coaching that catches what you miss — before it becomes a problem. The infrastructure to stay optimised through travel, stress, and age.',
      cta: 'Apply for the Biolune Protocol',
    }
  }
  if (score >= 8) {
    return {
      badge: 'BUILDING YOUR BASELINE',
      headline: 'You\'re doing more than most — but there\'s a gap.',
      body: 'You have some strong foundations, but there are clear areas where your biology is leaking performance. The good news: gaps at this tier are the most responsive to a structured protocol. Small, targeted interventions here produce outsized results.',
      detail: 'Start tracking HRV every morning — it will change how you make decisions. Get a full biomarker panel if you haven\'t in the last year. Structure your nutrition around your training load, not the other way around.',
      cta: 'See how Biolune can close the gap',
    }
  }
  return {
    badge: 'GROUND ZERO',
    headline: 'Your biology is running on autopilot.',
    body: 'That\'s not a judgement — it\'s a starting point. Most high-performers are in exactly this position: performing well on willpower and discipline while their biology quietly accumulates debt. The fact that you took this quiz means you\'re ready to change that.',
    detail: 'Your highest-leverage move right now is visibility. You need to see what your body is actually doing — not what you think it\'s doing. HRV tracking, a baseline blood panel, and a structured sleep protocol are where every Biolune member starts.',
    cta: 'Start with a Biolune consultation',
  }
}

export default function QuizClient() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'capture' | 'result'>('intro')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  const totalScore = answers.reduce((a, b) => a + b, 0)
  const tier = getTier(totalScore)
  const progress = step === 'quiz' ? ((current + 1) / questions.length) * 100 : 0

  const selectAnswer = (points: number) => {
    const newAnswers = [...answers, points]
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
        body: JSON.stringify({ email, source: 'quiz', score: totalScore }),
      })
    } catch {
      // Still show results even if email capture fails
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
        .result-score {
          font-size: clamp(48px, 8vw, 72px);
          color: var(--gold);
          margin-bottom: 8px;
        }
        .result-max {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          color: var(--text-muted);
          letter-spacing: 1px;
          margin-bottom: 32px;
        }
        .quiz-result h2 {
          font-size: clamp(22px, 3.5vw, 32px);
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
              <p className="label" style={{ marginBottom: 16 }}>90-second diagnostic</p>
              <h1 className="serif">Most people are optimising the wrong things.</h1>
              <p>Your biology has a readiness score — and right now, you don't know what it is. This quiz analyses 8 key longevity markers and tells you exactly where you stand.</p>
              <button
                className="btn btn-gold"
                style={{ padding: '16px 40px', fontSize: '12px' }}
                onClick={() => setStep('quiz')}
              >
                Find my score
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
                    onClick={() => selectAnswer(opt.points)}
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
              <p className="label" style={{ marginBottom: 16 }}>Your score is ready</p>
              <h2 className="serif">Your Longevity Score is ready.</h2>
              <p>Enter your email to see your score, your tier breakdown, and a personalised action recommendation.</p>
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
                  {emailStatus === 'loading' ? 'Loading...' : 'Show my score'}
                </button>
              </form>
              <p className="capture-micro">No spam. No hard sell. Unsubscribe any time.</p>
              <button className="skip-link" onClick={() => setStep('result')}>
                Skip — show my score without email
              </button>
            </div>
          )}

          {/* Result */}
          {step === 'result' && (
            <div className="quiz-result">
              <div className="result-badge">{tier.badge}</div>
              <h1 className="serif result-score">{totalScore}</h1>
              <p className="result-max">out of 24</p>
              <h2 className="serif">{tier.headline}</h2>
              <p className="result-body">{tier.body}</p>
              <div className="result-detail">
                <div className="result-detail-label">What to focus on</div>
                {tier.detail}
              </div>
              <Link
                href="/apply"
                className="btn btn-gold"
                style={{ padding: '16px 40px', fontSize: '12px' }}
              >
                {tier.cta}
              </Link>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

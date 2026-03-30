import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'News — Biolune',
  description: 'Latest insights on precision longevity, HRV, hormonal health, and AI-driven performance protocols from the Biolune team.',
}

const articles = [
  {
    date: 'March 2026',
    tag: 'HRV Science',
    title: 'Why HRV Is the Most Underrated Metric in High-Performance Health',
    excerpt: 'Heart Rate Variability predicts recovery, stress resilience, and biological age more accurately than almost any other single marker. Here\'s how we use it to anchor your entire protocol.',
    readTime: '6 min read',
  },
  {
    date: 'February 2026',
    tag: 'Longevity',
    title: 'Biological Age vs Chronological Age: What Your Bloodwork Is Actually Telling You',
    excerpt: 'Your birthdate is fixed. Your biological age isn\'t. We break down the biomarkers that determine how fast you\'re ageing — and what the protocol does to reverse that trajectory.',
    readTime: '8 min read',
  },
  {
    date: 'February 2026',
    tag: 'Travel Protocol',
    title: 'The Jetlag Problem: How We Engineer Recovery for Long-Haul Travelers',
    excerpt: 'Frequent flying is a chronobiological assault. We explain how Biolune\'s travel protocol uses light exposure, meal timing, and HRV trends to cut recovery time by 60–80%.',
    readTime: '5 min read',
  },
  {
    date: 'January 2026',
    tag: 'Hormonal Health',
    title: 'Cortisol Is Not Your Enemy. Chronic Cortisol Elevation Is.',
    excerpt: 'Most high-performers have dysregulated cortisol and don\'t know it. We outline the markers, the patterns, and the protocol adjustments that bring the stress hormone back into balance.',
    readTime: '7 min read',
  },
  {
    date: 'January 2026',
    tag: 'AI & Adaptation',
    title: 'How the Biolune Adaptation Engine Works',
    excerpt: 'Every week, the system ingests your data — sleep, HRV, activity, subjective scores — and produces an updated protocol. Here\'s the logic behind the adaptation loop.',
    readTime: '6 min read',
  },
  {
    date: 'December 2025',
    tag: 'Sleep Science',
    title: 'Deep Sleep Architecture: The Metric Most Wearables Get Wrong',
    excerpt: 'Not all sleep is equal. We explain the difference between sleep quantity and sleep architecture — and how we optimise for slow-wave and REM stages, not just total hours.',
    readTime: '5 min read',
  },
]

export default function News() {
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }
        .news-hero {
          background: var(--bg-alt);
          padding: 96px 0 80px;
          border-bottom: 1px solid var(--border);
        }
        .news-hero h1 { font-size: clamp(36px, 5vw, 60px); margin-top: 12px; }
        .news-hero p { font-size: 17px; color: var(--text-muted); margin-top: 16px; max-width: 480px; }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }
        .article-card {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s;
          cursor: pointer;
        }
        .article-card:hover { border-color: var(--gold); }
        .article-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .article-tag {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(168,152,121,0.1);
          padding: 3px 10px;
          border-radius: 100px;
        }
        .article-date { font-size: 12px; color: var(--text-muted); }
        .article-title { font-size: 20px; margin-bottom: 12px; line-height: 1.3; }
        .article-excerpt { font-size: 14px; color: var(--text-muted); line-height: 1.65; flex: 1; }
        .article-read { margin-top: 20px; font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold); }

        @media (max-width: 768px) { .news-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="news-hero">
        <div className="container">
          <p className="label">Insights</p>
          <h1 className="serif">The signal, not the noise.</h1>
          <p>Weekly insights on HRV, longevity, hormonal health, and precision performance from the Biolune team.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="news-grid">
            {articles.map(a => (
              <article key={a.title} className="article-card">
                <div className="article-meta">
                  <span className="article-tag">{a.tag}</span>
                  <span className="article-date">{a.date}</span>
                </div>
                <h2 className="serif article-title">{a.title}</h2>
                <p className="article-excerpt">{a.excerpt}</p>
                <span className="article-read">{a.readTime} →</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <p className="label" style={{ marginBottom: 16 }}>Get it weekly</p>
          <h2 className="serif" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: 8 }}>The protocol. In your inbox.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Join 1,200+ high-performers. No noise — only signal.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <input type="email" placeholder="Your email address" style={{ padding: '13px 20px', borderRadius: '100px', border: '1px solid var(--border)', background: 'var(--bg-alt)', fontSize: '14px', fontFamily: 'Inter, sans-serif', color: 'var(--text)', width: '260px', outline: 'none' }} />
            <button className="btn btn-dark">Subscribe</button>
          </div>
        </div>
      </section>
    </>
  )
}

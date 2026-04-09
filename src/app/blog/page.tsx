import type { Metadata } from 'next'
import Link from 'next/link'
import NewsletterSignup from '@/components/NewsletterSignup'
import { getAllBlogArticles } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'Blog — Biolune',
  description: 'Precision health knowledge base. In-depth articles on HRV, metabolism, fasting, autophagy, sleep science, and supplements for high-performance longevity.',
  openGraph: {
    title: 'Blog — Biolune',
    description: 'Precision health knowledge base on HRV, metabolism, fasting, autophagy, sleep science, and supplements.',
    url: 'https://www.biolune.eu/blog',
    type: 'website',
  },
}

export default function Blog() {
  // W38: sort by ISO date so adding a new article doesn't require
  // updating a hardcoded dateOrder array. Newest first.
  const articles = getAllBlogArticles().sort((a, b) => b.dateIso.localeCompare(a.dateIso))
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }
        .blog-hero {
          background: var(--bg-alt);
          padding: 96px 0 80px;
          border-bottom: 1px solid var(--border);
        }
        .blog-hero h1 { font-size: clamp(36px, 5vw, 60px); margin-top: 12px; }
        .blog-hero p { font-size: 17px; color: var(--text-muted); margin-top: 16px; max-width: 480px; }

        .blog-grid {
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
          transition: border-color 0.2s, transform 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .article-card:hover { border-color: var(--gold); transform: translateY(-1px); }
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

        @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="blog-hero">
        <div className="container">
          <p className="label">Knowledge Base</p>
          <h1 className="serif">The signal, not the noise.</h1>
          <p>In-depth articles on HRV, metabolism, fasting, autophagy, sleep science, and supplements for precision health.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {articles.map(article => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="article-card">
                <div className="article-meta">
                  <span className="article-tag">{article.tag}</span>
                  <span className="article-date">{article.date}</span>
                </div>
                <h2 className="serif article-title">{article.title}</h2>
                <p className="article-excerpt">{article.excerpt}</p>
                <span className="article-read">{article.readTime} min read →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <p className="label" style={{ marginBottom: 16 }}>Get it weekly</p>
          <h2 className="serif" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', marginBottom: 8 }}>The protocol. In your inbox.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Join 1,200+ high performers. No noise. Just signal.</p>
          <NewsletterSignup />
        </div>
      </section>
    </>
  )
}

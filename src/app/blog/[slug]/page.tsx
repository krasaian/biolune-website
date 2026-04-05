import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogArticle, getAllBlogSlugs } from '@/lib/blog-data'
import NewsletterSignup from '@/components/NewsletterSignup'
import ShareButtons from '@/components/ShareButtons'

type PageProps = {
  params: { slug: string }
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getBlogArticle(params.slug)

  if (!article) {
    return {
      title: 'Article Not Found — Biolune',
    }
  }

  return {
    title: `${article.title} — Biolune`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.biolune.eu/blog/${article.slug}`,
      type: 'article',
      publishedTime: (() => {
        try {
          const d = new Date(article.date + ' 1')
          return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString()
        } catch { return new Date().toISOString() }
      })(),
      tags: [article.tag],
      images: [
        {
          url: 'https://www.biolune.eu/og-image.png',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: ['https://www.biolune.eu/og-image.png'],
    },
  }
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map(slug => ({
    slug,
  }))
}

export default function BlogArticle({ params }: PageProps) {
  const article = getBlogArticle(params.slug)

  if (!article) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <p>Article not found</p>
        <Link href="/blog" className="btn btn-dark" style={{ marginTop: '20px' }}>
          Back to Blog
        </Link>
      </div>
    )
  }

  // Extract headings from content
  const headingRegex = /^## (.+?)$/gm
  const tableOfContents: Array<{ id: string; text: string }> = []
  let match
  while ((match = headingRegex.exec(article.content)) !== null) {
    const text = match[1]
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    tableOfContents.push({ id, text })
  }

  // Parse markdown content into sections
  const sections = article.content.split(/^## /m).slice(1)
  const slug = params.slug

  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }
        .article-page {
          display: grid;
          grid-template-columns: 1fr 250px;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px;
        }
        .article-content { flex: 1; }
        .article-header {
          margin-bottom: 60px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 40px;
        }
        .article-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 24px;
          text-decoration: none;
          transition: gap 0.2s;
        }
        .article-back:hover { gap: 12px; }
        .article-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          color: var(--text-muted);
        }
        .article-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
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
          display: inline-block;
        }
        .article-title {
          font-size: clamp(32px, 5vw, 48px);
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .article-excerpt {
          font-size: 17px;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 600px;
        }

        .article-body {
          font-size: 18px;
          line-height: 1.8;
          color: var(--text);
        }
        .article-body h2 {
          font-size: 28px;
          margin-top: 48px;
          margin-bottom: 24px;
          line-height: 1.2;
        }
        .article-body h3 {
          font-size: 22px;
          margin-top: 32px;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .article-body p {
          margin-bottom: 20px;
        }
        .article-body strong {
          font-weight: 600;
          color: var(--text);
        }
        .article-body em {
          font-style: italic;
          color: var(--text-muted);
        }

        .sidebar {
          position: sticky;
          top: calc(var(--nav-h) + 40px);
          height: fit-content;
        }
        .toc {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          margin-bottom: 24px;
        }
        .toc-title {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
        }
        .toc-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .toc-list a {
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
          border-left: 2px solid transparent;
          padding-left: 10px;
        }
        .toc-list a:hover {
          color: var(--gold);
          border-left-color: var(--gold);
        }

        .share-buttons {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
        }
        .share-title {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
        }
        .share-buttons-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: transparent;
          color: var(--text);
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .share-btn:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: rgba(168,152,121,0.05);
        }

        .article-cta {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 48px 40px;
          margin: 80px 0;
          text-align: center;
        }
        .article-cta h3 {
          font-size: 28px;
          margin-bottom: 12px;
        }
        .article-cta p {
          font-size: 15px;
          color: var(--text-muted);
          margin-bottom: 24px;
        }
        .article-cta .btn {
          margin: 0 auto;
        }

        .newsletter-section {
          background: var(--bg-alt);
          border-top: 1px solid var(--border);
          padding: 80px 0;
          margin-top: 80px;
          text-align: center;
        }
        .newsletter-section h2 {
          font-size: clamp(24px, 3.5vw, 40px);
          margin-bottom: 8px;
        }
        .newsletter-section p {
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        @media (max-width: 1024px) {
          .article-page {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 60px 24px;
          }
          .sidebar {
            position: static;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .toc, .share-buttons { margin-bottom: 0; }
        }

        @media (max-width: 640px) {
          .article-page { padding: 40px 20px; }
          .article-title { font-size: clamp(24px, 5vw, 32px); }
          .article-body { font-size: 16px; }
          .article-body h2 { font-size: 24px; margin-top: 32px; }
          .sidebar {
            grid-template-columns: 1fr;
          }
          .article-cta {
            padding: 32px 20px;
            margin: 60px 0;
          }
        }
      `}</style>

      <article className="article-page">
        <div className="article-content">
          <div className="article-header">
            <Link href="/blog" className="article-back">
              ← Back to Blog
            </Link>
            <div className="article-meta">
              <span className="article-tag">{article.tag}</span>
              <span className="article-meta-item">
                <span>{article.date}</span>
              </span>
              <span className="article-meta-item">
                <span>{article.readTime} min read</span>
              </span>
            </div>
            <h1 className="serif article-title">{article.title}</h1>
            {article.author && (
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 8, fontFamily: 'Jost, sans-serif', letterSpacing: '0.5px' }}>
                By {article.author}
              </p>
            )}
            <p className="article-excerpt">{article.excerpt}</p>
          </div>

          <div className="article-body serif">
            {sections.map((section: string, idx: number) => {
              const lines = section.split('\n').filter((l: string) => l.trim())
              const heading = lines[0] || `Section ${idx + 1}`
              const headingId = heading.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
              const content = lines.slice(1).join('\n\n')

              return (
                <div key={idx}>
                  <h2 id={headingId}>{heading}</h2>
                  {content.split('\n\n').map((paragraph: string, pIdx: number) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <p key={pIdx}>
                          <strong>{paragraph.slice(2, -2)}</strong>
                        </p>
                      )
                    }
                    // Handle inline formatting
                    const formattedPara = paragraph
                      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.+?)\*/g, '<em>$1</em>')

                    return (
                      <p
                        key={pIdx}
                        dangerouslySetInnerHTML={{ __html: formattedPara }}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>

          <div className="article-cta">
            <h3 className="serif">Ready to apply?</h3>
            <p>Build a personalized precision health protocol adapted to your biology.</p>
            <Link href="/apply" className="btn btn-gold">
              Start Your Application
            </Link>
          </div>
        </div>

        <div className="sidebar">
          {tableOfContents.length > 0 && (
            <div className="toc">
              <div className="toc-title">Table of Contents</div>
              <ul className="toc-list">
                {tableOfContents.map(heading => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`}>{heading.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="share-buttons">
            <div className="share-title">Share</div>
            <div className="share-buttons-grid">
              <ShareButtons slug={slug} title={article.title} />
            </div>
          </div>
        </div>
      </article>

      <section className="newsletter-section">
        <div className="container">
          <p className="label" style={{ marginBottom: 16 }}>Get it weekly</p>
          <h2 className="serif">The protocol. In your inbox.</h2>
          <p>Join 1,200+ high-performers. No noise — only signal.</p>
          <NewsletterSignup />
        </div>
      </section>
    </>
  )
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }
        .not-found {
          min-height: calc(80vh - var(--nav-h));
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 64px 20px;
        }
        .not-found-inner { max-width: 480px; }
        .not-found h1 {
          font-size: clamp(48px, 8vw, 96px);
          color: var(--gold);
          margin-bottom: 8px;
        }
        .not-found h2 {
          font-size: clamp(20px, 3vw, 28px);
          margin-bottom: 16px;
        }
        .not-found p {
          color: var(--text-muted);
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 32px;
        }
      `}</style>

      <div className="not-found">
        <div className="not-found-inner">
          <h1 className="serif">404</h1>
          <h2 className="serif">Page not found.</h2>
          <p>The page you are looking for does not exist or has been moved.</p>
          <Link href="/" className="btn btn-gold" style={{ padding: '14px 36px', fontSize: '12px' }}>
            Back to homepage
          </Link>
        </div>
      </div>
    </>
  )
}

'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }
        .error-page {
          min-height: calc(80vh - var(--nav-h));
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 64px 20px;
        }
        .error-inner { max-width: 480px; }
        .error-inner h1 {
          font-size: clamp(24px, 4vw, 36px);
          margin-bottom: 16px;
        }
        .error-inner p {
          color: var(--text-muted);
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 32px;
        }
      `}</style>

      <div className="error-page">
        <div className="error-inner">
          <h1 className="serif">Something went wrong.</h1>
          <p>An unexpected error occurred. Please try again or return to the homepage.</p>
          <button onClick={reset} className="btn btn-gold" style={{ padding: '14px 36px', fontSize: '12px' }}>
            Try again
          </button>
        </div>
      </div>
    </>
  )
}

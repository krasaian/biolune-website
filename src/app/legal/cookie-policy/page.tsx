import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy — Biolune',
  description: 'How Biolune uses cookies on biolune.eu.',
}

export default function CookiePolicy() {
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }
        .legal-page { max-width: 720px; margin: 0 auto; padding: 80px 40px; }
        .legal-page h1 { font-size: clamp(28px, 4vw, 44px); margin-bottom: 8px; }
        .legal-meta { font-size: 13px; color: var(--text-muted); margin-bottom: 48px; }
        .legal-page h2 { font-size: 20px; margin-top: 40px; margin-bottom: 12px; }
        .legal-page p, .legal-page li { font-size: 15px; line-height: 1.75; color: var(--text-muted); margin-bottom: 12px; }
        .legal-page ul { padding-left: 20px; margin-bottom: 12px; }
        .legal-page a { color: var(--gold); }
        table { width: 100%; border-collapse: collapse; margin: 16px 0 24px; font-size: 14px; }
        th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--border); }
        th { font-weight: 500; color: var(--text); background: var(--bg-alt); }
        td { color: var(--text-muted); }
        @media (max-width: 768px) { .legal-page { padding: 48px 20px; } }
      `}</style>

      <div className="legal-page">
        <p className="label" style={{ marginBottom: 12 }}>Legal</p>
        <h1 className="serif">Cookie Policy</h1>
        <p className="legal-meta">Last updated: January 2026 · Biolune B.V., Netherlands</p>

        <p>This Cookie Policy explains what cookies are, which cookies Biolune uses, and how you can manage your cookie preferences.</p>

        <h2 className="serif">What Are Cookies?</h2>
        <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and understand how you use the site.</p>

        <h2 className="serif">Cookies We Use</h2>
        <p>Biolune uses a minimal cookie set. We do not use advertising or tracking cookies.</p>
        <table>
          <thead>
            <tr><th>Cookie</th><th>Type</th><th>Purpose</th><th>Duration</th></tr>
          </thead>
          <tbody>
            <tr><td>session</td><td>Essential</td><td>Maintains your login session on the platform</td><td>Session</td></tr>
            <tr><td>csrf_token</td><td>Essential</td><td>Security — prevents cross-site request forgery</td><td>Session</td></tr>
            <tr><td>consent</td><td>Functional</td><td>Remembers your cookie preferences</td><td>1 year</td></tr>
          </tbody>
        </table>

        <h2 className="serif">Essential Cookies</h2>
        <p>Essential cookies are required for the website and platform to function correctly. They cannot be disabled. They do not collect personal information beyond what is necessary for the service.</p>

        <h2 className="serif">Analytics</h2>
        <p>We use privacy-first analytics (no third-party tracking). No data is shared with advertising networks.</p>

        <h2 className="serif">Managing Cookies</h2>
        <p>You can control cookies through your browser settings. Disabling essential cookies may affect your ability to use the Biolune platform. For guidance, visit your browser's help documentation.</p>

        <h2 className="serif">Changes to This Policy</h2>
        <p>We may update this policy as our cookie use changes. The "last updated" date above reflects the most recent revision.</p>

        <h2 className="serif">Contact</h2>
        <p>Questions: <a href="mailto:privacy@biolune.eu">privacy@biolune.eu</a></p>
      </div>
    </>
  )
}

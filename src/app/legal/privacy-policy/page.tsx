import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Biolune',
  description: 'How Biolune collects, stores, and protects your personal and health data. GDPR-compliant.',
}

export default function PrivacyPolicy() {
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
        @media (max-width: 768px) { .legal-page { padding: 48px 20px; } }
      `}</style>

      <div className="legal-page">
        <p className="label" style={{ marginBottom: 12 }}>Legal</p>
        <h1 className="serif">Privacy Policy</h1>
        <p className="legal-meta">Last updated: January 2026 · Biolune B.V., Netherlands</p>

        <p>Biolune B.V. ("Biolune", "we", "us") is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website (biolune.eu) and our platform.</p>

        <h2 className="serif">1. Who We Are</h2>
        <p>Biolune B.V. is the data controller for personal data collected through this website. We are registered in the Netherlands and operate under EU General Data Protection Regulation (GDPR).</p>

        <h2 className="serif">2. What Data We Collect</h2>
        <p>We collect the following categories of data:</p>
        <ul>
          <li><strong>Identity data:</strong> name, date of birth</li>
          <li><strong>Contact data:</strong> email address, location</li>
          <li><strong>Health data:</strong> HRV readings, biomarker results, sleep data, hormonal data, and other biological information you provide voluntarily</li>
          <li><strong>Usage data:</strong> how you interact with our platform (page views, session duration)</li>
          <li><strong>Technical data:</strong> IP address, browser type, device type</li>
        </ul>

        <h2 className="serif">3. How We Use Your Data</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Build and adapt your precision longevity protocol</li>
          <li>Communicate updates, reports, and support via email or WhatsApp</li>
          <li>Improve our AI adaptation system (in aggregate, anonymised form)</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="serif">4. Legal Basis for Processing</h2>
        <p>We process your data on the following legal bases under GDPR Article 6 and Article 9:</p>
        <ul>
          <li><strong>Contract performance:</strong> to deliver your protocol</li>
          <li><strong>Legitimate interest:</strong> to improve our services</li>
          <li><strong>Explicit consent:</strong> for health/special category data, we obtain your explicit consent during onboarding</li>
        </ul>

        <h2 className="serif">5. Data Sharing</h2>
        <p>We never sell your data. We may share data with:</p>
        <ul>
          <li>Lab partners (for biomarker testing), under strict data processing agreements</li>
          <li>Infrastructure providers (e.g. Vercel, Supabase) under GDPR-compliant terms</li>
          <li>Regulatory authorities if legally required</li>
        </ul>

        <h2 className="serif">6. Data Retention</h2>
        <p>We retain your personal data for as long as your account is active plus 2 years. Health data can be deleted at any time upon request. Account data is deleted within 30 days of a deletion request.</p>

        <h2 className="serif">7. Your Rights</h2>
        <p>Under GDPR you have the right to: access, rectify, erase, restrict, and port your data, and to object to processing. To exercise any right, email: <a href="mailto:privacy@biolune.eu">privacy@biolune.eu</a></p>

        <h2 className="serif">8. Cookies</h2>
        <p>We use essential cookies only. For more detail, see our <a href="/legal/cookie-policy">Cookie Policy</a>.</p>

        <h2 className="serif">9. Contact</h2>
        <p>Questions about this policy: <a href="mailto:privacy@biolune.eu">privacy@biolune.eu</a></p>
      </div>
    </>
  )
}

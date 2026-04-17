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
        .legal-page h3 { font-size: 16px; margin-top: 24px; margin-bottom: 8px; color: var(--gold); }
        .legal-page p, .legal-page li { font-size: 15px; line-height: 1.75; color: var(--text-muted); margin-bottom: 12px; }
        .legal-page ul { padding-left: 20px; margin-bottom: 12px; }
        .legal-page a { color: var(--gold); }
        .legal-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .legal-table th, .legal-table td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--border); font-size: 14px; line-height: 1.6; }
        .legal-table th { color: var(--gold); font-weight: 600; font-size: 13px; }
        .legal-table td { color: var(--text-muted); }
        @media (max-width: 768px) { .legal-page { padding: 48px 20px; } }
      `}</style>

      <div className="legal-page">
        <p className="label" style={{ marginBottom: 12 }}>Privacy</p>
        <h1 className="serif">Privacy Policy</h1>
        <p className="legal-meta">biolune.eu &mdash; Last updated: April 17, 2026</p>

        <h2 className="serif">1. Data Controller</h2>
        <p>Biolune, Netherlands. Email: <a href="mailto:privacy@biolune.eu">privacy@biolune.eu</a>. We are responsible for your personal data and committed to full GDPR compliance.</p>

        <h2 className="serif">2. What Data We Collect</h2>

        <h3>Standard Personal Data</h3>
        <p>Name, email, age, professional background, subscription and billing information.</p>

        <h3>Health Data (Special Category &mdash; GDPR Art. 9)</h3>
        <p>Self-reported symptoms, lifestyle data, sleep patterns, energy levels, health history, bloodwork values (Elite tier).</p>

        <h3>Biometric Data (Special Category &mdash; GDPR Art. 9)</h3>
        <p>HRV, sleep quality and duration, resting heart rate, activity metrics &mdash; collected via wearable devices (Oura, Garmin, Whoop, Apple Health) through the Terra integration platform, where you choose to connect a device.</p>

        <h3>Genetic Data (Special Category &mdash; GDPR Art. 9)</h3>
        <p>SNP data, APOE status, and related genetic markers &mdash; for Precision and Elite subscribers who voluntarily upload genetic data. Strictly optional, separate explicit consent required.</p>

        <h3>AI Interaction Data</h3>
        <p>Coaching session records and dialogue with the Lune AI. These records contain health context and are treated as high-sensitivity data.</p>

        <h3>Usage and Technical Data</h3>
        <p>Device type, IP address, app version, crash logs, feature usage &mdash; used for service reliability and security.</p>

        <h2 className="serif">3. Legal Basis for Processing</h2>
        <ul>
          <li><strong>Standard personal and payment data:</strong> contract performance (GDPR Art. 6(1)(b)) and legal obligation (Art. 6(1)(c))</li>
          <li><strong>Health, biometric, and AI interaction data:</strong> explicit consent (GDPR Art. 9(2)(a))</li>
          <li><strong>Genetic data:</strong> explicit consent via separate opt-in (GDPR Art. 9(2)(a))</li>
          <li><strong>Error monitoring and service security:</strong> legitimate interest (GDPR Art. 6(1)(f))</li>
        </ul>
        <p>You may withdraw consent for special category data at any time via Settings &rarr; Data &amp; Privacy or by emailing <a href="mailto:privacy@biolune.eu">privacy@biolune.eu</a>. Withdrawal does not affect the lawfulness of prior processing.</p>

        <h2 className="serif">4. How We Use Your Data</h2>
        <p>To deliver personalised biomarker-matched research insights via the Lune AI system. To surface peer-reviewed research relevant to your profile. To process subscription payments. To send transactional and coaching communications. To maintain service security and reliability. We do not use your data for advertising, profiling for third parties, or sale to any party.</p>

        <h2 className="serif">5. Third-Party Data Processors</h2>
        <p>All processors have signed Data Processing Agreements (DPAs) ensuring GDPR compliance.</p>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Processor</th>
              <th>Role</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>Supabase</strong></td><td>Primary data storage, AES-256 encryption at rest</td><td>EU</td></tr>
            <tr><td><strong>Vercel</strong></td><td>Application infrastructure, EU-US DPF certified</td><td>US/EU</td></tr>
            <tr><td><strong>Anthropic</strong></td><td>AI processing via Claude API; not used for model training without consent</td><td>US (SCCs)</td></tr>
            <tr><td><strong>Stripe</strong></td><td>Payment processing, PCI DSS Level 1 compliant</td><td>US/EU</td></tr>
            <tr><td><strong>Terra</strong></td><td>Wearable device integration, biometric data sync</td><td>UK</td></tr>
            <tr><td><strong>Resend</strong></td><td>Transactional and coaching email, EU-US DPF certified</td><td>US</td></tr>
            <tr><td><strong>Sentry</strong></td><td>Error monitoring, auto-redacts health data from logs</td><td>US</td></tr>
          </tbody>
        </table>
        <p>We do not sell your data. We do not share your data with advertisers.</p>

        <h2 className="serif">6. International Data Transfers</h2>
        <p>Several processors are US-based. All US transfers are conducted under Standard Contractual Clauses (SCCs) approved by the European Commission and/or EU-US Data Privacy Framework (DPF) certification. Terra (UK) operates under UK GDPR post-Brexit adequacy arrangements. You may request information about specific transfer mechanisms at <a href="mailto:privacy@biolune.eu">privacy@biolune.eu</a>.</p>

        <h2 className="serif">7. Data Retention</h2>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Data Type</th>
              <th>Retention Period</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Health and biometric data</td><td>Active subscription + 90 days post-cancellation</td></tr>
            <tr><td>AI coaching session records</td><td>Active subscription + 180 days</td></tr>
            <tr><td>Genetic data</td><td>Until explicitly deleted by you; not retained after account deletion</td></tr>
            <tr><td>Payment and billing records</td><td>7 years per Dutch accounting law</td></tr>
            <tr><td>Error logs</td><td>90 days</td></tr>
          </tbody>
        </table>
        <p>All health-related data is permanently deleted within 30 days of a verified deletion request.</p>

        <h2 className="serif">8. Your GDPR Rights</h2>
        <p>Right of access (Art. 15), right to rectification (Art. 16), right to erasure (Art. 17), right to data portability (Art. 20), right to restrict processing (Art. 18), right to object (Art. 21), right to withdraw consent.</p>
        <p>To exercise any right, email <a href="mailto:privacy@biolune.eu">privacy@biolune.eu</a> with the subject &ldquo;Data Subject Request.&rdquo; We respond within 30 days.</p>
        <p>You may also lodge a complaint with the Dutch supervisory authority: Autoriteit Persoonsgegevens at <a href="https://www.autoriteitpersoonsgegevens.nl/" target="_blank" rel="noopener noreferrer">autoriteitpersoonsgegevens.nl</a>.</p>

        <h2 className="serif">9. Security</h2>
        <ul>
          <li>Encryption at rest (AES-256) and in transit (TLS 1.3)</li>
          <li>Row-level security ensuring users cannot access each other&rsquo;s data</li>
          <li>JWT authentication with token rotation</li>
          <li>Rate limiting and DDoS protection</li>
          <li>Sentry error monitoring with automatic health data redaction</li>
          <li>72-hour breach notification to supervisory authority and affected users</li>
          <li>Annual security assessment</li>
        </ul>

        <h2 className="serif">10. Cookies</h2>
        <p>We use minimal, functional cookies only: session token, language preference, theme. Optional anonymised analytics via Vercel Analytics. No third-party tracking, no advertising pixels, no health data sent to ad networks.</p>

        <h2 className="serif">11. Contact</h2>
        <p>Privacy enquiries: <a href="mailto:privacy@biolune.eu">privacy@biolune.eu</a>. Data Protection: <a href="mailto:dpo@biolune.eu">dpo@biolune.eu</a>. Response time: within 30 days.</p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 40, borderTop: '1px solid var(--border)', paddingTop: 20 }}>&copy; 2026 Biolune. All rights reserved. Based in the Netherlands.</p>
      </div>
    </>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Licensing Agreement — Biolune',
  description: 'Licensing terms for Biolune content, methodology, and platform.',
}

export default function LicensingAgreement() {
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
        <h1 className="serif">Licensing Agreement</h1>
        <p className="legal-meta">Last updated: January 2026 · Biolune B.V., Netherlands</p>

        <p>This Licensing Agreement governs your rights to use content, methodologies, reports, and software made available through the Biolune platform.</p>

        <h2 className="serif">1. Grant of Licence</h2>
        <p>Biolune grants you a personal, non-exclusive, non-transferable, revocable licence to access and use the Biolune platform and its outputs solely for your own personal health optimisation. This licence does not allow you to:</p>
        <ul>
          <li>Resell, sublicense, or redistribute Biolune content or methodology</li>
          <li>Use Biolune's protocol framework to build competing products</li>
          <li>Share protocol reports with third parties for commercial purposes</li>
          <li>Reverse-engineer the Biolune adaptation algorithm</li>
        </ul>

        <h2 className="serif">2. Intellectual Property</h2>
        <p>All content on the Biolune platform — including but not limited to protocol templates, adaptation algorithms, report formats, and educational content — is the exclusive intellectual property of Biolune B.V. and is protected by EU and international copyright law.</p>

        <h2 className="serif">3. Your Content</h2>
        <p>Health data, logs, and information you submit to the platform remain your property. By submitting it, you grant Biolune a limited licence to process this data for the purpose of generating and improving your protocol. This licence ends when you delete your account.</p>

        <h2 className="serif">4. Protocol Reports</h2>
        <p>Protocol reports generated for your use are licensed for personal use only. You may share reports with your physician or healthcare team for the purpose of coordinating your care.</p>

        <h2 className="serif">5. Termination</h2>
        <p>This licence terminates automatically if you breach these terms. Biolune reserves the right to suspend or terminate access to the platform without notice in cases of material breach.</p>

        <h2 className="serif">6. No Warranty</h2>
        <p>The platform and its outputs are provided "as is". Biolune makes no warranties, express or implied, regarding the completeness or fitness for purpose of any protocol output.</p>

        <h2 className="serif">7. Governing Law</h2>
        <p>This agreement is governed by Dutch law. Disputes shall be resolved exclusively in the courts of Amsterdam, Netherlands.</p>

        <h2 className="serif">8. Contact</h2>
        <p>Licensing queries: <a href="mailto:legal@biolune.eu">legal@biolune.eu</a></p>
      </div>
    </>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Biolune',
  description: 'Terms governing your use of the Biolune evidence aggregation platform.',
}

export default function TermsOfService() {
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
        .legal-disclaimer { padding: 16px; border-left: 4px solid var(--gold); background: rgba(196,169,106,0.08); margin-bottom: 24px; }
        .legal-disclaimer p { color: var(--text); font-weight: 600; }
        @media (max-width: 768px) { .legal-page { padding: 48px 20px; } }
      `}</style>

      <div className="legal-page">
        <p className="label" style={{ marginBottom: 12 }}>Legal</p>
        <h1 className="serif">Terms of Service</h1>
        <p className="legal-meta">biolune.eu &mdash; Effective April 17, 2026</p>

        <h2 className="serif">1. About Biolune</h2>
        <p>Biolune is an AI-powered evidence aggregation platform. We process self-reported and wearable-derived biomarker data to surface relevant peer-reviewed research and expert insights tailored to your profile. Biolune is not a medical practice. We do not employ licensed healthcare professionals in a clinical capacity. This is a wellness and performance information service, not medical treatment.</p>

        <h2 className="serif">2. Acceptance of Terms</h2>
        <p>By accessing biolune.eu or the Biolune app, you agree to these Terms. If you do not agree, do not use the service. These Terms are governed by Dutch law and applicable EU regulations including GDPR and the EU Consumer Rights Directive.</p>

        <h2 className="serif">3. Medical Disclaimer &mdash; CRITICAL</h2>
        <div className="legal-disclaimer">
          <p>IMPORTANT: Biolune is NOT a medical service and does NOT provide medical advice.</p>
        </div>
        <p>Biolune surfaces peer-reviewed research and recognised expert statements matched to your biomarker profile. All content is sourced and referenced. Nothing on this website, in the app, or in any communication from Biolune constitutes medical advice, diagnosis, or treatment.</p>
        <p>You must consult a qualified healthcare professional before:</p>
        <ul>
          <li>Starting any supplementation regimen</li>
          <li>Beginning any exercise or lifestyle program</li>
          <li>Making significant dietary changes</li>
          <li>If you have existing medical conditions, take medications, or are pregnant or nursing</li>
          <li>If you experience any adverse reactions</li>
        </ul>
        <p>You assume full responsibility for health decisions made based on information provided by Biolune. Biolune is not liable for any health-related consequences arising from your use of the service.</p>

        <h2 className="serif">4. Service Description</h2>
        <p>Biolune is a precision longevity platform offering three subscription tiers:</p>
        <ul>
          <li><strong>Protocol &mdash; &euro;149/month:</strong> Personalised biomarker-matched research, lifestyle insights, Lune AI (25 messages/day), DNA upload, Apple Health sync</li>
          <li><strong>Precision &mdash; &euro;299/month:</strong> Everything in Protocol plus unlimited Lune with autonomous actions, decision engine, pattern intelligence, travel mode</li>
          <li><strong>Elite &mdash; &euro;549/month:</strong> Everything in Precision plus quarterly performance review call with Korosh &mdash; certified in hormonal profiling and advanced training methodology (Overload Worldwide: TOP A, TOP B, Mylogenics, PHP) &mdash; bloodwork and biomarker review discussed in context of hormonal balance, training load, and recovery, DNA analysis with genetic insights, personal coaching with Korosh (2&times;/month), priority support. Review calls are performance and lifestyle coaching sessions, not medical consultations.</li>
        </ul>

        <h2 className="serif">5. Subscription, Billing &amp; Cancellation</h2>
        <p>Subscriptions are billed monthly in advance via Stripe. You may cancel at any time via your account settings or by emailing <a href="mailto:support@biolune.eu">support@biolune.eu</a>. Cancellation is effective at the end of the current billing period. No charges are made after cancellation.</p>

        <h2 className="serif">6. Right of Withdrawal &mdash; EU Consumer Right</h2>
        <p>If you are an EU consumer, you have the right to withdraw from this agreement within 14 days of your subscription start date without giving any reason.</p>
        <p>To exercise this right, notify us at <a href="mailto:support@biolune.eu">support@biolune.eu</a> within 14 days of your first payment with the subject line &ldquo;Withdrawal Request.&rdquo;</p>
        <p>By explicitly requesting immediate access to the Biolune platform upon subscription, you acknowledge that the service begins before the 14-day period expires. In accordance with Article 16(m) of the EU Consumer Rights Directive, you agree that the right of withdrawal lapses once you have accessed and used the platform&rsquo;s digital services. If you withdraw before accessing the platform, you are entitled to a full refund.</p>

        <h2 className="serif">7. 30-Day Money-Back Guarantee</h2>
        <p>In addition to the statutory withdrawal right above, Biolune offers a 30-day money-back guarantee on your initial subscription month. Email <a href="mailto:support@biolune.eu">support@biolune.eu</a> with &ldquo;Refund Request&rdquo; in the subject line within 30 days. No explanation required. Refunds are processed within 5&ndash;7 business days.</p>

        <h2 className="serif">8. Special Category Data Processing</h2>
        <p>Biolune processes health, biometric, and genetic data as special category personal data under GDPR Article 9. This processing occurs exclusively on the basis of your explicit consent provided during onboarding. You may withdraw consent at any time via Settings &rarr; Data &amp; Privacy or by emailing <a href="mailto:privacy@biolune.eu">privacy@biolune.eu</a>. Full details are in our <a href="/legal/privacy-policy">Privacy Policy</a>.</p>

        <h2 className="serif">9. Intellectual Property</h2>
        <p>All content, algorithms, and methodologies are owned by Biolune and protected under applicable intellectual property law. You are granted a limited, non-exclusive, non-transferable licence to use the service for personal, non-commercial purposes only.</p>

        <h2 className="serif">10. Limitation of Liability</h2>
        <p>To the maximum extent permitted by Dutch and EU law, Biolune is not liable for indirect, incidental, or consequential damages. Biolune&rsquo;s total liability shall not exceed the amount paid in the 12 months preceding any claim. Mandatory consumer protection rights under Dutch and EU law are not affected by this limitation.</p>

        <h2 className="serif">11. Governing Law</h2>
        <p>These Terms are governed by the laws of the Netherlands. EU consumers retain the right to bring disputes before their local consumer protection authority and may use the EU Online Dispute Resolution platform at <a href="https://ec.europa.eu/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/odr</a>.</p>

        <h2 className="serif">12. Contact</h2>
        <p>Email: <a href="mailto:support@biolune.eu">support@biolune.eu</a> | Website: <a href="https://biolune.eu">biolune.eu</a> | Headquarters: Netherlands, EU</p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 40, borderTop: '1px solid var(--border)', paddingTop: 20 }}>Last updated: April 17, 2026 &mdash; &copy; 2026 Biolune. All rights reserved.</p>
      </div>
    </>
  )
}

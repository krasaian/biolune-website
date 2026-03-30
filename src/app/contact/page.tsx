import type { Metadata } from 'next'
import Faq from '@/components/Faq'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Biolune',
  description: 'Get in touch with Biolune. Connect with our team to explore how Biolune can build your precision longevity protocol.',
}

const faqs = [
  { q: 'How do I prepare for my initial biomarker test?', a: 'Fast for 8–12 hours before your blood draw. Stay well-hydrated with water, avoid intense exercise the day before, and get your normal amount of sleep.' },
  { q: 'Is my personal health data kept private and secure?', a: 'Yes. All data is encrypted in transit and at rest, stored under GDPR-compliant protocols, and never sold or shared with third parties.' },
  { q: 'How long does it take to receive my health results?', a: 'Your initial protocol is ready within 48 hours of completing your intake. Biomarker results from lab partners typically arrive within 5–7 business days.' },
  { q: 'Can I share my reports with my primary care physician?', a: 'Yes. All reports are exportable as PDFs and designed to be shared with your healthcare team.' },
  { q: 'Do I need a wearable device to use the platform?', a: 'Not required. Manual daily logging takes under 60 seconds. A wearable gives the AI richer data, but many members start without one.' },
  { q: 'How often should I re-test my biological markers?', a: 'We recommend a full panel every 90 days for the first year, then bi-annually once your protocol stabilises.' },
]

export default function Contact() {
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }
        .contact-page {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(80vh - var(--nav-h));
        }
        .contact-left {
          background: var(--bg-alt);
          border-right: 1px solid var(--border);
          padding: 96px 64px;
        }
        .contact-left h1 { font-size: clamp(32px, 4vw, 52px); margin-bottom: 16px; }
        .contact-left p { font-size: 16px; color: var(--text-muted); line-height: 1.7; margin-bottom: 32px; }
        .contact-form-wrap { padding: 0; }
        .contact-right { background: var(--bg); padding: 96px 64px; }

        .form-group { margin-bottom: 20px; }
        .form-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 13px 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg);
          font-size: 15px;
          font-family: 'Jost', sans-serif;
          color: var(--text);
          outline: none;
          transition: border-color 0.2s;
          appearance: none;
        }
        .form-textarea { min-height: 120px; resize: vertical; }
        .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--gold); }
        .form-input::placeholder, .form-textarea::placeholder { color: var(--text-muted); opacity: 0.6; }
        .form-submit { width: 100%; padding: 15px; margin-top: 8px; }
        .form-disclaimer { font-size: 12px; color: var(--text-muted); text-align: center; margin-top: 12px; }
        .form-disclaimer a { color: var(--gold); }

        @media (max-width: 900px) {
          .contact-page { grid-template-columns: 1fr; }
          .contact-left { padding: 64px 24px; border-right: none; border-bottom: 1px solid var(--border); }
          .contact-right { padding: 48px 24px; }
        }
      `}</style>

      <div className="contact-page">
        <div className="contact-left">
          <p className="label" style={{ marginBottom: 16 }}>Get started</p>
          <h1 className="serif">Design your health.</h1>
          <p>Connect with our wellness experts to explore how Biolune can build a personalized system based on your unique biological data.</p>
          <ContactForm />
        </div>

        <div className="contact-right">
          <p className="label" style={{ marginBottom: 16 }}>FAQ</p>
          <h2 className="serif" style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: 8 }}>Need Help?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 32 }}>We aim to provide absolute clarity regarding your biological data and personalized wellness protocols.</p>
          <Faq items={faqs} />
        </div>
      </div>
    </>
  )
}

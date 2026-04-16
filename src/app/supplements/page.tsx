import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Biolune Protocol Stack — Evidence-Based Supplements',
  description: 'Evidence-based supplement recommendations curated by Lune from 7 world-leading health experts. Stacks built around sleep, longevity, performance, and foundation health.',
}

interface SupplementCard {
  name: string
  dose: string
  timing: string
  benefit: string
  experts: string[]
  tier: 'foundation' | 'sleep' | 'longevity' | 'performance'
  shopUrl: string
  brand: string
}

const SupplementCard = ({ card }: { card: SupplementCard }) => (
  <div className="supp-card">
    <h3 className="serif supp-card-name">{card.name}</h3>
    <div className="supp-card-details">
      <div className="supp-detail">
        <span className="supp-label">Dose</span>
        <span className="supp-value">{card.dose}</span>
      </div>
      <div className="supp-detail">
        <span className="supp-label">Timing</span>
        <span className="supp-value">{card.timing}</span>
      </div>
    </div>
    <p className="supp-benefit">{card.benefit}</p>
    <div className="supp-experts">
      {card.experts.join(' · ')}
    </div>
    <div className="supp-brand">{card.brand}</div>
    <a href={card.shopUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold supp-shop-btn">
      View Product →
    </a>
  </div>
)

const sections = [
  {
    id: 'foundation',
    title: 'Foundation Stack',
    subtitle: 'The essentials every protocol starts with — backed by all 7 experts.',
    tier: 'TIER 1 — UNIVERSAL',
    cards: [
      {
        name: 'Vitamin D3 + K2',
        dose: '4,000–5,000 IU D3 + 90 mcg K2',
        timing: 'Morning with breakfast',
        benefit: 'Most people are deficient and don\'t know it. D3 covers the gap. K2 makes sure the calcium goes to your bones, not your arteries.',
        experts: ['Huberman', 'Patrick', 'Brecka'],
        tier: 'foundation' as const,
        brand: 'Thorne — Vitamin D + K2 Liquid',
        shopUrl: 'https://www.iherb.com/pr/thorne-vitamin-d-k2-1-fl-oz-30-ml/23517',
      },
      {
        name: 'Omega-3 (EPA+DHA)',
        dose: '2–3g combined EPA+DHA',
        timing: 'With meals (morning or evening)',
        benefit: 'The single most agreed-upon supplement in longevity research. Covers inflammation, brain function, and cardiovascular markers in one dose.',
        experts: ['Patrick', 'Attia', 'Huberman'],
        tier: 'foundation' as const,
        brand: 'Nordic Naturals — Ultimate Omega 180ct',
        shopUrl: 'https://www.iherb.com/pr/nordic-naturals-ultimate-omega-great-lemon-180-soft-gels-640-mg-per-soft-gel/12949',
      },
      {
        name: 'Magnesium (Threonate or Glycinate)',
        dose: '300–400mg elemental Mg',
        timing: 'Evening, 2 hours before bed',
        benefit: 'Most adults are low in magnesium. It\'s involved in over 300 processes, but you\'ll feel the difference in sleep and recovery first.',
        experts: ['Huberman', 'Walker', 'Attia'],
        tier: 'foundation' as const,
        brand: 'Thorne — Magnesium Bisglycinate',
        shopUrl: 'https://www.iherb.com/pr/thorne-magnesium-bisglycinate-6-5-oz-187-g/72886',
      },
      {
        name: 'Creatine Monohydrate',
        dose: '5g daily (no loading phase)',
        timing: 'Any time, consistent daily',
        benefit: 'The most studied sports supplement in history. Cheap, effective, well-tolerated. Builds strength and increasingly linked to cognitive performance.',
        experts: ['Huberman', 'Attia', 'Patrick'],
        tier: 'foundation' as const,
        brand: 'Nutricost — Creapure® Creatine',
        shopUrl: 'https://www.iherb.com/pr/nutricost-performance-creatine-monohydrate-made-with-creapure-unflavored-35-3-oz-1-kg/136791',
      },
    ],
  },
  {
    id: 'sleep',
    title: 'Sleep Optimization',
    subtitle: 'Sleep is the single most effective performance enhancer. These support deep, restorative rest.',
    tier: 'TIER 2 — GOAL-BASED',
    cards: [
      {
        name: 'Magnesium L-Threonate',
        dose: '2,000mg (~144mg elemental Mg)',
        timing: '30–60 min before bed',
        benefit: 'The only form that crosses the blood-brain barrier efficiently. If you\'re taking magnesium for sleep, this is the one that actually reaches your brain.',
        experts: ['Huberman', 'Walker'],
        tier: 'sleep' as const,
        brand: 'Life Extension — Neuro-Mag',
        shopUrl: 'https://www.iherb.com/pr/life-extension-neuro-mag-magnesium-l-threonate-90-vegetarian-capsules-48-mg-per-capsule/40244',
      },
      {
        name: 'L-Theanine',
        dose: '100–200mg',
        timing: 'Evening with magnesium',
        benefit: 'Takes the edge off without making you groggy. Quiets the mind before bed. No sedation, no morning hangover.',
        experts: ['Huberman', 'Walker'],
        tier: 'sleep' as const,
        brand: 'Thorne — L-Theanine',
        shopUrl: 'https://www.iherb.com/pr/thorne-theanine-90-capsules-200-mg-per-capsule/18542',
      },
      {
        name: 'Apigenin',
        dose: '50–100mg',
        timing: '30–60 min before bed',
        benefit: 'A flavonoid from chamomile that Huberman credits with deeper, longer sleep. Low dose, no dependency, no tolerance buildup.',
        experts: ['Huberman', 'Walker'],
        tier: 'sleep' as const,
        brand: 'Havasu Nutrition — Apigenin',
        shopUrl: 'https://www.iherb.com/pr/havasu-nutrition-apigenin-50-mg-60-capsules/137135',
      },
    ],
  },
  {
    id: 'longevity',
    title: 'Longevity & Anti-Aging',
    subtitle: 'Target the biological mechanisms of aging — from NAD+ to senescent cell clearance.',
    tier: 'TIER 3 — ADVANCED',
    cards: [
      {
        name: 'NMN (Nicotinamide Mononucleotide)',
        dose: '500–1,000mg',
        timing: 'Morning, fasted or light meal',
        benefit: 'Your NAD+ levels drop as you age. NMN tops them back up. Sinclair\'s flagship molecule for mitochondrial function and DNA repair.',
        experts: ['Sinclair', 'Attia'],
        tier: 'longevity' as const,
        brand: 'ProHealth Longevity — NMN Pro 1000',
        shopUrl: 'https://www.iherb.com/pr/prohealth-longevity-nmn-pro-1000-60-capsules-500-mg-per-capsule/114167',
      },
      {
        name: 'Sulforaphane',
        dose: '10–20mg (broccoli sprout extract)',
        timing: 'Morning with breakfast',
        benefit: 'Flips on your body\'s own antioxidant system (the Nrf2 pathway). Broccoli sprout extract is the easiest delivery method.',
        experts: ['Sinclair', 'Patrick'],
        tier: 'longevity' as const,
        brand: 'Jarrow Formulas — BroccoMax',
        shopUrl: 'https://www.iherb.com/pr/jarrow-formulas-vegan-broccomax-60-veggie-capsules-17-50-mg-per-capsule/4297',
      },
      {
        name: 'Fisetin',
        dose: '100–150mg',
        timing: 'Morning with fat-containing meal',
        benefit: 'Targets the "zombie cells" that pile up with age and drive chronic inflammation. One of the few compounds with real senolytic data behind it.',
        experts: ['Sinclair', 'Attia'],
        tier: 'longevity' as const,
        brand: 'Life Extension — Bio-Fisetin',
        shopUrl: 'https://www.iherb.com/pr/life-extension-bio-fisetin-30-vegetarian-capsules/113500',
      },
      {
        name: 'Resveratrol',
        dose: '250–500mg',
        timing: 'Morning with fat source',
        benefit: 'Sinclair\'s go-to for sirtuin activation. Pairs well with NMN. Take it with a fat source or it won\'t absorb.',
        experts: ['Sinclair'],
        tier: 'longevity' as const,
        brand: 'Source Naturals',
        shopUrl: 'https://www.iherb.com/pr/source-naturals-resveratrol-500-500-mg-120-tablets/119527',
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance & Hormones',
    subtitle: 'Support natural hormone production, focus, and physical output.',
    tier: 'TIER 2 — GOAL-BASED',
    cards: [
      {
        name: 'Tongkat Ali (Eurycoma longifolia)',
        dose: '200–400mg standardized extract',
        timing: 'Morning or post-workout',
        benefit: 'The natural testosterone support that actually has research behind it. Lowers SHBG, which frees up what your body already produces.',
        experts: ['Huberman', 'Brecka'],
        tier: 'performance' as const,
        brand: 'Solaray',
        shopUrl: 'https://www.iherb.com/pr/solaray-tongkat-ali-400-mg-60-vegcaps/99983',
      },
      {
        name: 'Alpha-GPC',
        dose: '300–600mg',
        timing: 'Morning or 30 min pre-workout',
        benefit: 'Pre-workout focus in a capsule. Feeds the neurotransmitter responsible for attention and mind-muscle connection.',
        experts: ['Huberman', 'Johnson'],
        tier: 'performance' as const,
        brand: 'Jarrow Formulas — Alpha GPC',
        shopUrl: 'https://www.iherb.com/pr/jarrow-formulas-alpha-gpc-300-mg-60-veggie-capsules/176',
      },
      {
        name: 'Ashwagandha (KSM-66)',
        dose: '300–600mg',
        timing: 'Morning or evening',
        benefit: 'The adaptogen with the most clinical backing. Lowers cortisol when stress is high. KSM-66 is the extract with the best data.',
        experts: ['Huberman', 'Attia'],
        tier: 'performance' as const,
        brand: 'Jarrow Formulas — KSM-66 Ashwagandha',
        shopUrl: 'https://www.iherb.com/pr/jarrow-formulas-ashwagandha-300-mg-120-veggie-capsules/3302',
      },
    ],
  },
]

const sectionNav = [
  { id: 'foundation', label: 'Foundation' },
  { id: 'sleep', label: 'Sleep' },
  { id: 'longevity', label: 'Longevity' },
  { id: 'performance', label: 'Performance' },
  { id: 'testing', label: 'Testing' },
]

export default function Supplements() {
  return (
    <>
      <style>{`
        body { padding-top: var(--nav-h); }

        /* Hero */
        .supp-hero {
          background: var(--bg);
          padding: 96px 0 64px;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        .supp-hero h1 { font-size: clamp(36px, 5.5vw, 72px); margin-top: 12px; }
        .supp-hero .subtitle { font-size: 18px; color: var(--text-muted); margin-top: 16px; max-width: 560px; margin-left: auto; margin-right: auto; line-height: 1.6; }

        /* Section nav */
        .supp-nav {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 40px;
          flex-wrap: wrap;
        }
        .supp-nav a {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 10px 24px;
          border: 1px solid var(--border);
          border-radius: 100px;
          color: var(--text-muted);
          transition: all 0.25s ease;
        }
        .supp-nav a:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        /* How it works */
        .supp-how {
          padding: 80px 0;
          border-bottom: 1px solid var(--border);
        }
        .supp-how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-top: 48px;
        }
        .supp-how-step {
          text-align: center;
          padding: 0 16px;
        }
        .supp-how-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 48px;
          font-weight: 300;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 16px;
        }
        .supp-how-step h3 {
          font-size: 18px;
          margin-bottom: 8px;
        }
        .supp-how-step p {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* Sections */
        .supp-section {
          padding: 80px 0;
          border-bottom: 1px solid var(--border);
        }
        .supp-section:last-of-type {
          border-bottom: none;
        }

        .supp-section-header {
          margin-bottom: 48px;
        }
        .supp-section-header .label {
          display: block;
          margin-bottom: 8px;
        }
        .supp-section-header h2 {
          font-size: clamp(28px, 4vw, 48px);
          margin-bottom: 4px;
        }
        .supp-section-header .subtitle {
          font-size: 15px;
          color: var(--text-muted);
          margin-top: 8px;
          max-width: 540px;
          line-height: 1.6;
        }

        .supp-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .supp-brand {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          color: var(--gold);
          font-weight: 500;
          letter-spacing: 0.3px;
          margin-bottom: 16px;
        }

        .supp-shop-btn {
          width: 100%;
          margin-top: auto;
          font-size: 11px;
          padding: 12px 24px;
        }

        /* CTA Banner */
        .supp-cta {
          padding: 80px 0;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        .supp-cta-inner {
          background: var(--bg-alt);
          border: 1px solid var(--border-gold);
          border-radius: var(--radius);
          padding: 64px 40px;
          max-width: 720px;
          margin: 0 auto;
        }
        .supp-cta-inner h2 {
          font-size: clamp(24px, 3.5vw, 40px);
          margin-bottom: 16px;
        }
        .supp-cta-inner p {
          font-size: 16px;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 520px;
          margin: 0 auto 32px;
        }
        .supp-cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Safety note */
        .supp-safety {
          padding: 64px 0;
          border-bottom: 1px solid var(--border);
        }
        .supp-safety-inner {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .supp-safety h3 {
          font-size: 24px;
          margin-bottom: 12px;
        }
        .supp-safety p {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.7;
        }
        .supp-safety-list {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 2;
        }

        /* Sources */
        .supp-sources {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 40px;
          text-align: center;
          margin: 80px 0 0;
        }
        .supp-sources h3 {
          font-size: 20px;
          margin-bottom: 12px;
        }
        .supp-sources p {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Disclaimers */
        .supp-disclaimers {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .supp-disclaimer {
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px 32px;
          font-size: 13px;
          line-height: 1.7;
          color: var(--text-muted);
        }
        .supp-disclaimer strong {
          color: var(--text);
          display: block;
          margin-bottom: 6px;
          font-size: 13px;
          letter-spacing: 0.5px;
        }

        /* Partner links */
        .partner-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border: 1px solid var(--border);
          border-radius: 10px;
          text-decoration: none;
          color: var(--text);
          font-size: 13px;
          line-height: 1.4;
          transition: border-color 0.2s, background 0.2s;
        }
        .partner-link:hover {
          border-color: var(--gold);
          background: rgba(168,152,121,0.04);
        }
        .partner-link strong {
          color: var(--text);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .supp-hero { padding: 64px 0 48px; }
          .supp-nav { gap: 6px; }
          .supp-nav a { padding: 8px 16px; font-size: 11px; }
          .supp-how { padding: 56px 0; }
          .supp-how-grid { grid-template-columns: 1fr; gap: 32px; }
          .supp-section { padding: 56px 0; }
          .supp-section-header { margin-bottom: 32px; }
          .supp-cards-grid { grid-template-columns: 1fr; }
          .supp-cta { padding: 56px 0; }
          .supp-cta-inner { padding: 40px 24px; }
          .supp-safety-inner { grid-template-columns: 1fr; gap: 24px; padding: 28px 24px; }
          .supp-sources { padding: 28px 20px; }
          .supp-disclaimer { padding: 24px 20px; }
          .partner-link { flex-direction: column; align-items: flex-start; gap: 4px; }
        }
      `}</style>

      {/* Hero */}
      <section className="supp-hero">
        <div className="container">
          <p className="label">SUPPLEMENTS</p>
          <h1 className="serif">The Biolune Protocol Stack</h1>
          <p className="subtitle">
            14 evidence-based supplements from 7 world-leading health experts.
            Not random pills. A structured protocol, built by Lune around your biology.
          </p>

          {/* Section navigation pills */}
          <nav className="supp-nav">
            {sectionNav.map(item => (
              <a key={item.id} href={`#${item.id}`}>{item.label}</a>
            ))}
          </nav>
        </div>
      </section>

      {/* How It Works */}
      <section className="supp-how">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <p className="label">HOW IT WORKS</p>
            <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '12px' }}>
              Your Stack, Your Biology
            </h2>
          </div>
          <div className="supp-how-grid">
            <div className="supp-how-step">
              <div className="supp-how-num">01</div>
              <h3 className="serif">Take the Quiz</h3>
              <p>Answer 15 questions about your goals, lifestyle, diet, and health history. Takes 3 minutes.</p>
            </div>
            <div className="supp-how-step">
              <div className="supp-how-num">02</div>
              <h3 className="serif">Lune Analyses</h3>
              <p>Lune reads your profile against protocols from Huberman, Attia, Patrick, Walker, Sinclair, Brecka, and Johnson. Then flags what matches your goals, your biology, and your budget.</p>
            </div>
            <div className="supp-how-step">
              <div className="supp-how-num">03</div>
              <h3 className="serif">Get Your Stack</h3>
              <p>A morning and evening stack built around your data. What to take, what to skip, and why. Every supplement tells you why it's in your stack.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supplement Sections */}
      {sections.map(section => (
        <section key={section.id} id={section.id} className="supp-section">
          <div className="container">
            <div className="supp-section-header">
              <p className="label">{section.tier}</p>
              <h2 className="serif">{section.title}</h2>
              <p className="subtitle">{section.subtitle}</p>
            </div>
            <div className="supp-cards-grid">
              {section.cards.map(card => (
                <SupplementCard key={card.name} card={card} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Banner */}
      <section className="supp-cta">
        <div className="container">
          <div className="supp-cta-inner">
            <p className="label">PERSONALIZATION</p>
            <h2 className="serif">Not Sure Where to Start?</h2>
            <p>
              These are the protocols — but not everyone needs all of them.
              Lune builds your personal stack based on your biology, goals, and lifestyle.
            </p>
            <div className="supp-cta-buttons">
              <Link href="/quiz" className="btn btn-dark">Take the Free Quiz</Link>
              <Link href="/apply" className="btn btn-outline">Apply for Full Access</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Contraindications */}
      <section className="supp-safety">
        <div className="container">
          <div className="supp-safety-inner">
            <div>
              <p className="label" style={{ marginBottom: '12px' }}>BUILT-IN AWARENESS</p>
              <h3 className="serif">Lune Flags What Matters</h3>
              <p>
                Supplements can interact with medications and conditions.
                Lune flags potential conflicts based on what you tell us in your intake —
                then suggests you confirm with your doctor before starting. Not a replacement for medical advice. A starting point for a smarter conversation.
              </p>
            </div>
            <div>
              <div className="supp-safety-list">
                Blood thinners → flags Omega-3 and Vitamin K2 for review<br/>
                Thyroid medication → notes timing conflicts to discuss with your doctor<br/>
                Pregnancy / nursing → excludes compounds not considered safe<br/>
                Autoimmune conditions → highlights immune-stimulating ingredients<br/>
                MTHFR variant → suggests alternative folate forms<br/>
                Statins → notes potential CoQ10 interaction for your physician
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloodwork & DNA Testing Partners */}
      <section className="supp-section" id="testing">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p className="label" style={{ marginBottom: '12px' }}>COMPLETE THE PICTURE</p>
            <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '16px' }}>Test. Upload. Optimise.</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
              Your protocol gets sharper with real data. Order a blood panel or DNA kit, upload your results, and Lune adapts your stack to your biology.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {/* Bloodwork */}
            <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px' }}>
              <p className="label" style={{ color: 'var(--gold)', marginBottom: '12px' }}>BLOODWORK</p>
              <h3 className="serif" style={{ fontSize: '24px', marginBottom: '12px' }}>Know your numbers</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                A full longevity panel covers ApoB, HbA1c, hsCRP, Vitamin D, hormones, and more. Biolune reads 15+ biomarkers and adjusts your protocol accordingly.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="https://www.bloedwaardentest.nl" target="_blank" rel="noopener noreferrer" className="partner-link">
                  <span><strong>Bloedwaardentest.nl</strong> — Comprehensive panels in NL</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>€89–€199</span>
                </a>
                <a href="https://www.bloodvalues.nl" target="_blank" rel="noopener noreferrer" className="partner-link">
                  <span><strong>Blood Values</strong> — At-home kits in NL</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>€49–€149</span>
                </a>
                <a href="https://www.letsgetchecked.com" target="_blank" rel="noopener noreferrer" className="partner-link">
                  <span><strong>LetsGetChecked</strong> — At-home testing, worldwide</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>€69–€199</span>
                </a>
                <a href="https://www.insidetracker.com" target="_blank" rel="noopener noreferrer" className="partner-link">
                  <span><strong>InsideTracker</strong> — AI-powered biomarker analysis</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>$189–$589</span>
                </a>
                <a href="https://www.marekhealth.com" target="_blank" rel="noopener noreferrer" className="partner-link">
                  <span><strong>Marek Health</strong> — Male health & longevity panels</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>$199–$499</span>
                </a>
              </div>
            </div>

            {/* DNA */}
            <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px' }}>
              <p className="label" style={{ color: 'var(--gold)', marginBottom: '12px' }}>RAW DNA</p>
              <h3 className="serif" style={{ fontSize: '24px', marginBottom: '12px' }}>Read your genetic code</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                Upload your raw DNA file and Lune analyses genetic variants that affect methylation, detox pathways, nutrient metabolism, and more.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="https://www.ancestry.com/dna" target="_blank" rel="noopener noreferrer" className="partner-link">
                  <span><strong>AncestryDNA</strong> — Saliva kit, raw data download</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>€99</span>
                </a>
                <a href="https://www.23andme.com" target="_blank" rel="noopener noreferrer" className="partner-link">
                  <span><strong>23andMe</strong> — Health + ancestry, raw data compatible</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>€119–€229</span>
                </a>
                <a href="https://nebula.org" target="_blank" rel="noopener noreferrer" className="partner-link">
                  <span><strong>Nebula Genomics</strong> — Whole genome sequencing</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>€249–€499</span>
                </a>
                <a href="https://www.myheritage.com/dna" target="_blank" rel="noopener noreferrer" className="partner-link">
                  <span><strong>MyHeritage DNA</strong> — Affordable kit across Europe</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>€49–€79</span>
                </a>
              </div>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            Once you have your results, upload them in the Biolune app. Lune reads the data and adjusts your protocol within 48 hours.
          </p>
        </div>
      </section>

      {/* Expert Sources + Disclaimers */}
      <section className="supp-section">
        <div className="container">
          <div className="supp-sources">
            <h3 className="serif">Expert Sources</h3>
            <p>
              Every recommendation is synthesized from the published protocols of: <strong>Andrew Huberman</strong> (Stanford Neuroscience), <strong>Peter Attia</strong> (Longevity Medicine), <strong>Rhonda Patrick</strong> (Biomedical Science), <strong>Matthew Walker</strong> (Sleep Science), <strong>David Sinclair</strong> (Genetics, Harvard), <strong>Gary Brecka</strong> (Human Biology), and <strong>Bryan Johnson</strong> (Blueprint Protocol).
            </p>
          </div>

          <div className="supp-disclaimers">
            <div className="supp-disclaimer">
              <strong>Affiliate Disclosure (EU Transparency)</strong>
              This page contains affiliate links, which means Biolune may earn a commission if you purchase through these links, at no additional cost to you. This is clearly disclosed in accordance with EU consumer protection regulations and the Dutch Advertising Code (NRC). Affiliate relationships do not influence our recommendations — all supplements are selected based on scientific evidence and expert protocols.
            </div>

            <div className="supp-disclaimer">
              <strong>Medical Disclaimer</strong>
              Biolune supplements and protocols are not medical treatments, diagnostic tools, or replacements for professional medical advice. In accordance with EC Regulation 1924/2006, no health claims are made beyond what is substantiated by the European Food Safety Authority (EFSA). Always consult your physician before starting any supplement protocol, especially if you are pregnant, nursing, taking medication, or managing existing health conditions. Individual results vary.
            </div>

            <div className="supp-disclaimer">
              <strong>Not a Substitute for Medical Care</strong>
              Lune is a protocol assistant, not a medical professional. It does not diagnose, treat, or prescribe. If you experience adverse reactions to any supplement, stop use immediately and contact your healthcare provider. In case of emergency, call 112 (EU) or your local emergency number.
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

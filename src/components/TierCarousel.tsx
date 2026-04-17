'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface TierSlide {
  plate: string
  label: string
  tier: string
  price: string
  interval: string
  headline: string
  body: string
  features: string[]
  href: string
  featured?: boolean
}

interface TierCarouselProps {
  slides: TierSlide[]
}

export default function TierCarousel({ slides }: TierCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  /* Horizontal scroll ↔ wheel on desktop */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handler = (e: WheelEvent) => {
      // Only hijack vertical scroll when the carousel is mostly in view
      const rect = track.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4
      if (!inView) return
      if (Math.abs(e.deltaY) < 5) return

      e.preventDefault()
      track.scrollBy({ left: e.deltaY * 2.5, behavior: 'smooth' })
    }

    track.addEventListener('wheel', handler, { passive: false })
    return () => track.removeEventListener('wheel', handler)
  }, [])

  /* Track active slide for indicator */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onScroll = () => {
      const children = Array.from(track.children) as HTMLElement[]
      const center = track.scrollLeft + track.clientWidth / 2
      let closest = 0
      let minDist = Infinity
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft + child.clientWidth / 2 - center)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      setActive(closest)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (dir: 'prev' | 'next') => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = (track.firstElementChild as HTMLElement)?.offsetWidth ?? 400
    track.scrollBy({ left: dir === 'next' ? cardWidth + 24 : -(cardWidth + 24), behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        .tier-carousel-section {
          padding: 100px 0 80px;
          overflow: hidden;
        }
        .tier-carousel-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          max-width: var(--max-w);
          margin: 0 auto 48px;
          padding: 0 40px;
        }
        .tier-carousel-header h2 {
          font-size: clamp(28px, 4vw, 46px);
          line-height: 1.08;
          max-width: 520px;
        }
        .tier-carousel-header h2 em {
          font-style: italic;
          font-weight: 400;
        }
        .tier-carousel-nav {
          display: flex;
          gap: 10px;
        }
        .tier-carousel-nav button {
          width: 44px;
          height: 44px;
          border: 1px solid var(--border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: var(--text);
          transition: all 0.25s;
          background: transparent;
          cursor: pointer;
        }
        .tier-carousel-nav button:hover {
          background: var(--text);
          color: var(--bg);
          border-color: var(--text);
        }

        .tier-carousel-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 0 40px;
          padding-bottom: 12px;
        }
        .tier-carousel-track::-webkit-scrollbar { display: none; }

        .tier-slide {
          flex: 0 0 min(440px, 82vw);
          scroll-snap-align: center;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          min-height: 520px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 40px 36px;
          cursor: grab;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .tier-slide::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }
        .tier-slide:hover::before { opacity: 1; }
        .tier-slide:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 20px 60px rgba(26, 25, 22, 0.25);
        }
        .tier-slide:active { cursor: grabbing; }

        /* Backgrounds: earthy tones matching Biolune */
        .tier-slide--0 {
          background: linear-gradient(165deg, #c2b89b 0%, #a89879 50%, #8a7a5e 100%);
          color: #fef9ef;
        }
        .tier-slide--1 {
          background: linear-gradient(165deg, #2c2a24 0%, #1a1916 60%, #0d0c0a 100%);
          color: #fef9ef;
        }
        .tier-slide--2 {
          background: linear-gradient(165deg, #5c6b5a 0%, #3a4a38 50%, #1e2c1d 100%);
          color: #fef9ef;
        }

        .tier-slide__plate {
          position: absolute;
          top: 32px;
          left: 36px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          opacity: 0.55;
        }
        .tier-slide__label-tag {
          position: absolute;
          top: 32px;
          right: 36px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.6;
        }
        .tier-slide__price-block {
          margin-bottom: 20px;
        }
        .tier-slide__tier-name {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          opacity: 0.7;
          margin-bottom: 6px;
        }
        .tier-slide__price {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 56px;
          font-weight: 600;
          line-height: 1;
        }
        .tier-slide__interval {
          font-size: 14px;
          opacity: 0.5;
          margin-top: 2px;
        }
        .tier-slide__headline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 26px;
          font-weight: 500;
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .tier-slide__features {
          list-style: none;
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.8;
          margin-bottom: 24px;
        }
        .tier-slide__features li {
          padding: 4px 0;
        }
        .tier-slide__features li::before {
          content: '— ';
          opacity: 0.5;
        }
        .tier-slide__cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: inherit;
          padding-bottom: 3px;
          border-bottom: 1px solid rgba(255,255,255,0.4);
          transition: border-color 0.3s, gap 0.3s, padding-bottom 0.3s;
          width: fit-content;
          position: relative;
          z-index: 2;
        }
        .tier-slide__cta:hover {
          border-color: rgba(255,255,255,0.8);
          gap: 10px;
          padding-bottom: 5px;
        }

        /* Indicators */
        .tier-carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 32px;
        }
        .tier-carousel-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--border);
          transition: all 0.3s;
        }
        .tier-carousel-dot.active {
          background: var(--gold);
          width: 24px;
          border-radius: 3px;
        }

        /* Tier card name below */
        .tier-slide__bottom-label {
          text-align: center;
          margin-top: 12px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: var(--text-muted);
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .tier-carousel-header { flex-direction: column; align-items: flex-start; gap: 20px; }
          .tier-slide { flex: 0 0 85vw; min-height: 480px; padding: 32px 28px; }
          .tier-slide__price { font-size: 44px; }
        }
      `}</style>

      <section className="tier-carousel-section">
        <div className="tier-carousel-header">
          <div>
            <p className="label" style={{ marginBottom: 14 }}>Your investment in decades</p>
            <h2 className="serif">
              Three protocols.<br/><em>One system.</em>
            </h2>
          </div>
          <div className="tier-carousel-nav">
            <button onClick={() => scrollTo('prev')} aria-label="Previous">←</button>
            <button onClick={() => scrollTo('next')} aria-label="Next">→</button>
          </div>
        </div>

        <div className="tier-carousel-track" ref={trackRef}>
          {slides.map((slide, i) => (
            <div key={slide.tier}>
              <div className={`tier-slide tier-slide--${i}`}>
                <span className="tier-slide__plate">{slide.plate}</span>
                <span className="tier-slide__label-tag">{slide.label}</span>

                <div className="tier-slide__price-block">
                  <div className="tier-slide__tier-name">{slide.tier}</div>
                  <div className="tier-slide__price">€{slide.price}</div>
                  <div className="tier-slide__interval">/{slide.interval}</div>
                </div>

                <h3 className="tier-slide__headline">{slide.headline}</h3>

                <ul className="tier-slide__features">
                  {slide.features.map(f => <li key={f}>{f}</li>)}
                </ul>

                <Link href={slide.href} className="tier-slide__cta">
                  Start your protocol →
                </Link>
              </div>
              <p className="tier-slide__bottom-label">{slide.tier}</p>
            </div>
          ))}
        </div>

        <div className="tier-carousel-dots">
          {slides.map((_, i) => (
            <div key={i} className={`tier-carousel-dot ${i === active ? 'active' : ''}`} />
          ))}
        </div>
      </section>
    </>
  )
}

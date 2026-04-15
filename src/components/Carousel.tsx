'use client'
import { useState, useRef, useCallback, useEffect } from 'react'

interface CarouselItem {
  label: string
  title: string
  description: string
}

const items: CarouselItem[] = [
  {
    label: 'Biological Data',
    title: 'Biological Data',
    description: 'Lune reads your HRV, hormones, and sleep patterns and turns them into a protocol built for your actual biology. Not a generic template with your name on it.',
  },
  {
    label: 'Smart Longevity',
    title: 'Smart Longevity',
    description: 'A system built to help you live better and stay active longer. Not reactive medicine. Precision that keeps you ahead of decline.',
  },
  {
    label: 'Real-Time Tracking',
    title: 'Real-Time Tracking',
    description: 'We remove the guesswork by tracking your metrics around the clock. Every data point feeds the system. Better data in, better protocol out.',
  },
  {
    label: 'Evidence First',
    title: 'Evidence First',
    description: 'Every recommendation traces back to published research and your own numbers. No wellness trends. No guesswork. Only what the data supports.',
  },
  {
    label: 'Sustainable Growth',
    title: 'Sustainable Growth',
    description: 'Long game over quick fixes. A protocol that compounds over years. Not a sprint, a system.',
  },
]

export default function Carousel() {
  const [active, setActive] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragDeltaX = useRef(0)
  const [dragOffset, setDragOffset] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback((idx: number) => {
    setActive(Math.max(0, Math.min(items.length - 1, idx)))
    setDragOffset(0)
  }, [])

  const next = useCallback(() => goTo(active + 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1), [active, goTo])

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current)
    if (dy > Math.abs(dx)) return // vertical scroll, ignore
    e.preventDefault()
    setDragOffset(dx)
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx < -50) next()
    else if (dx > 50) prev()
    else setDragOffset(0)
    touchStartX.current = null
    touchStartY.current = null
  }

  // Mouse drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    dragStartX.current = e.clientX
    dragDeltaX.current = 0
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - dragStartX.current
    dragDeltaX.current = dx
    setDragOffset(dx)
  }
  const onMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    if (dragDeltaX.current < -60) next()
    else if (dragDeltaX.current > 60) prev()
    else setDragOffset(0)
  }

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setActive(a => (a + 1) % items.length)
    }, 5000)
    return () => clearInterval(id)
  }, [active])

  return (
    <div style={{ width: '100%' }}>
      <style>{`
        .carousel-track {
          display: flex;
          gap: 20px;
          cursor: grab;
          user-select: none;
        }
        .carousel-track:active { cursor: grabbing; }
        .carousel-card {
          flex: 0 0 100%;
          border-radius: 16px;
          padding: 40px 36px;
          border: 1px solid var(--border);
          min-height: 220px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          transition: background 0.4s;
        }
        .carousel-card.active-card {
          background: var(--bg-alt);
          border-color: var(--border-gold);
        }
        .carousel-card:not(.active-card) {
          background: var(--bg);
          opacity: 0.5;
        }
        .carousel-card h3 {
          font-size: 26px;
          margin-bottom: 12px;
        }
        .carousel-card p {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-muted);
        }

        /* Tab pills */
        .carousel-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .carousel-tab {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }
        .carousel-tab.active, .carousel-tab:hover {
          background: var(--text);
          color: var(--bg);
          border-color: var(--text);
        }

        /* Dots */
        .carousel-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 20px;
        }
        .carousel-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--border);
          cursor: pointer;
          transition: all 0.25s;
        }
        .carousel-dot.active {
          background: var(--gold);
          width: 20px;
          border-radius: 3px;
        }

        .carousel-nav {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 16px;
        }
        .carousel-arrow {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--text);
          font-size: 18px;
        }
        .carousel-arrow:hover:not(:disabled) {
          border-color: var(--gold);
          color: var(--gold);
        }
        .carousel-arrow:disabled { opacity: 0.3; cursor: default; }
      `}</style>

      {/* Tab pills for desktop */}
      <div className="carousel-tabs">
        {items.map((item, i) => (
          <button
            key={i}
            className={`carousel-tab${active === i ? ' active' : ''}`}
            onClick={() => goTo(i)}
          >{item.label}</button>
        ))}
      </div>

      {/* Sliding track */}
      <div
        style={{ overflow: 'hidden', borderRadius: 16 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          ref={trackRef}
          className="carousel-track"
          style={{
            transform: `translateX(calc(-${active * 100}% - ${active * 20}px + ${dragOffset}px))`,
            transition: isDragging.current ? 'none' : 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={`carousel-card${active === i ? ' active-card' : ''}`}
            >
              <p className="label" style={{ marginBottom: 16 }}>{item.label}</p>
              <h3 className="serif">{item.title}</h3>
              <p style={{ marginTop: 12 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dots + arrows */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
        <div className="carousel-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${active === i ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="carousel-nav">
          <button className="carousel-arrow" onClick={prev} disabled={active === 0} aria-label="Previous">←</button>
          <button className="carousel-arrow" onClick={next} disabled={active === items.length - 1} aria-label="Next">→</button>
        </div>
      </div>
    </div>
  )
}

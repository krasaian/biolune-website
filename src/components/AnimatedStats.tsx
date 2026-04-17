'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Stat {
  /** The target number to count up to */
  value: number
  /** Suffix displayed after the number (e.g. "+", "%") */
  suffix?: string
  /** Prefix displayed before the number (e.g. ">") */
  prefix?: string
  /** Label below the number */
  label: string
}

interface AnimatedStatsProps {
  stats: Stat[]
  /** Duration of the count-up animation in ms. Default: 2000 */
  duration?: number
  className?: string
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function useCountUp(target: number, duration: number, shouldStart: boolean): number {
  const [current, setCurrent] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!shouldStart) return

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      setCurrent(Math.round(easedProgress * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, shouldStart])

  return current
}

function StatItem({ stat, duration, shouldStart, delay }: {
  stat: Stat
  duration: number
  shouldStart: boolean
  delay: number
}) {
  const [delayedStart, setDelayedStart] = useState(false)
  const current = useCountUp(stat.value, duration, delayedStart)

  useEffect(() => {
    if (!shouldStart) return
    const timer = setTimeout(() => setDelayedStart(true), delay)
    return () => clearTimeout(timer)
  }, [shouldStart, delay])

  return (
    <div className="astat-item">
      <span className="astat-number serif">
        {stat.prefix ?? ''}{delayedStart ? current : 0}{stat.suffix ?? ''}
      </span>
      <span className="astat-label">{stat.label}</span>
    </div>
  )
}

export default function AnimatedStats({ stats, duration = 2000, className = '' }: AnimatedStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .astat-container {
          display: flex;
          justify-content: center;
          gap: 64px;
          flex-wrap: wrap;
          padding: 48px 0;
        }
        .astat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 140px;
        }
        .astat-number {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(40px, 5vw, 56px);
          font-weight: 600;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        .astat-label {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: var(--text-muted);
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        @media (max-width: 600px) {
          .astat-container { gap: 32px; }
          .astat-item { min-width: 100px; }
        }
      `}</style>

      <div ref={containerRef} className={`astat-container ${className}`}>
        {stats.map((stat, i) => (
          <StatItem
            key={stat.label}
            stat={stat}
            duration={duration}
            shouldStart={inView}
            delay={i * 200}
          />
        ))}
      </div>
    </>
  )
}

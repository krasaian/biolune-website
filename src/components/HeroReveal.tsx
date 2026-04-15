'use client'

import { useEffect, useRef } from 'react'

interface HeroRevealProps {
  text: string
  className?: string
}

/**
 * Splits headline text into words and reveals each one with a staggered
 * clip-path animation — similar to the Artbase hero text effect.
 */
export default function HeroReveal({ text, className = '' }: HeroRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Small delay so initial paint settles
    const timer = setTimeout(() => {
      el.querySelectorAll<HTMLSpanElement>('.hero-word-inner').forEach((word, i) => {
        word.style.transitionDelay = `${i * 70 + 200}ms`
        word.style.transform = 'translateY(0)'
        word.style.opacity = '1'
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const words = text.split(' ')

  return (
    <>
      <style>{`
        .hero-reveal-h1 {
          display: flex;
          flex-wrap: wrap;
          gap: 0 0.28em;
        }
        .hero-word-wrap {
          overflow: hidden;
          display: inline-flex;
        }
        .hero-word-inner {
          display: inline-block;
          transform: translateY(105%);
          opacity: 0;
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
      <h1 ref={containerRef} className={`serif ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="hero-word-wrap">
            <span className="hero-word-inner">{word}</span>
          </span>
        ))}
      </h1>
    </>
  )
}

/**
 * Fade-up label animation for the hero sub-elements
 */
export function HeroFadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const timer = setTimeout(() => {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(24px)',
        transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {children}
    </div>
  )
}

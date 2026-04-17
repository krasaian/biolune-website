'use client'

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

interface SectionFadeProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Render as a different element. Default: 'section' */
  as?: 'section' | 'div'
  /** IntersectionObserver threshold. Default: 0.08 */
  threshold?: number
}

/**
 * Wraps a section and fades it in when it enters the viewport.
 * Lighter-weight than ScrollReveal — meant for entire page sections
 * to give a subtle "page breathing" effect on scroll.
 */
export default function SectionFade({
  children,
  className = '',
  style,
  as: Tag = 'section',
  threshold = 0.08,
}: SectionFadeProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref as any}
      className={`section-fade ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}

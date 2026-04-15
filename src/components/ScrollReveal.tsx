'use client'

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface ScrollRevealProps {
  children: ReactNode
  /** Direction the element slides in from. Default: 'up' */
  direction?: Direction
  /** Delay in ms before the animation starts. Default: 0 */
  delay?: number
  /** Duration in ms. Default: 800 */
  duration?: number
  /** Distance in px the element travels. Default: 40 */
  distance?: number
  /** IntersectionObserver threshold. Default: 0.15 */
  threshold?: number
  /** Extra className */
  className?: string
  /** Render as a different element */
  as?: keyof JSX.IntrinsicElements
  /** Extra inline styles */
  style?: CSSProperties
}

const translate: Record<Direction, (d: number) => string> = {
  up:    d => `translateY(${d}px)`,
  down:  d => `translateY(${-d}px)`,
  left:  d => `translateX(${d}px)`,
  right: d => `translateX(${-d}px)`,
  none:  () => 'none',
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 800,
  distance = 40,
  threshold = 0.15,
  className = '',
  as: Tag = 'div',
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translate(0, 0)'
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const Component = Tag as any

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: translate[direction](distance),
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </Component>
  )
}

/** Stagger multiple children with increasing delay */
export function StaggerReveal({
  children,
  direction = 'up',
  stagger = 120,
  duration = 800,
  distance = 40,
  threshold = 0.12,
  className = '',
  style,
}: {
  children: ReactNode[]
  direction?: Direction
  stagger?: number
  duration?: number
  distance?: number
  threshold?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <div className={className} style={style}>
      {(Array.isArray(children) ? children : [children]).map((child, i) => (
        <ScrollReveal
          key={i}
          direction={direction}
          delay={i * stagger}
          duration={duration}
          distance={distance}
          threshold={threshold}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  )
}

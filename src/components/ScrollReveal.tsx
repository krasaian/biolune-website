'use client'

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'
type AnimationType = 'fade' | 'slide' | 'scale' | 'fade-slide'

interface ScrollRevealProps {
  children: ReactNode
  /** Direction the element slides in from. Default: 'up' */
  direction?: Direction
  /** Animation type. Default: 'fade-slide' (the original behavior) */
  animation?: AnimationType
  /** Delay in ms before the animation starts. Default: 0 */
  delay?: number
  /** Duration in ms. Default: 800 */
  duration?: number
  /** Distance in px the element travels. Default: 40 */
  distance?: number
  /** Scale start for 'scale' animation. Default: 0.92 */
  scaleFrom?: number
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

function getInitialTransform(
  animation: AnimationType,
  direction: Direction,
  distance: number,
  scaleFrom: number,
): string {
  switch (animation) {
    case 'fade':
      return 'none'
    case 'slide':
      return translate[direction](distance)
    case 'scale':
      return `scale(${scaleFrom})`
    case 'fade-slide':
    default:
      return translate[direction](distance)
  }
}

function getFinalTransform(animation: AnimationType): string {
  switch (animation) {
    case 'scale':
      return 'scale(1)'
    default:
      return 'translate(0, 0)'
  }
}

export default function ScrollReveal({
  children,
  direction = 'up',
  animation = 'fade-slide',
  delay = 0,
  duration = 800,
  distance = 40,
  scaleFrom = 0.92,
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
          el.style.transform = getFinalTransform(animation)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, animation])

  const Component = Tag as any
  const initialTransform = getInitialTransform(animation, direction, distance, scaleFrom)

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: initialTransform,
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
  animation = 'fade-slide',
  stagger = 120,
  duration = 800,
  distance = 40,
  scaleFrom = 0.92,
  threshold = 0.12,
  className = '',
  style,
}: {
  children: ReactNode[]
  direction?: Direction
  animation?: AnimationType
  stagger?: number
  duration?: number
  distance?: number
  scaleFrom?: number
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
          animation={animation}
          delay={i * stagger}
          duration={duration}
          distance={distance}
          scaleFrom={scaleFrom}
          threshold={threshold}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  )
}

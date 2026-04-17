'use client'

import { useEffect, useRef, useState } from 'react'

interface BiomarkerLine {
  /** Label shown in the legend */
  label: string
  /** Data points (normalized 0-1) */
  data: number[]
  /** Line color */
  color: string
  /** Whether this line trends down (like ApoB) or up (like HRV) */
  trending: 'up' | 'down'
}

interface BiomarkerPreviewProps {
  lines?: BiomarkerLine[]
  /** X-axis labels */
  xLabels?: string[]
  className?: string
}

const defaultLines: BiomarkerLine[] = [
  {
    label: 'HRV',
    data: [0.25, 0.30, 0.28, 0.38, 0.42, 0.50, 0.55, 0.62, 0.68, 0.72, 0.78, 0.82],
    color: '#27AE60',
    trending: 'up',
  },
  {
    label: 'ApoB',
    data: [0.85, 0.82, 0.80, 0.75, 0.68, 0.62, 0.55, 0.50, 0.45, 0.40, 0.35, 0.32],
    color: '#E67E5A',
    trending: 'down',
  },
]

const defaultXLabels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12']

function buildPath(data: number[], width: number, height: number, padding: { top: number; bottom: number; left: number; right: number }): string {
  const plotW = width - padding.left - padding.right
  const plotH = height - padding.top - padding.bottom
  const stepX = plotW / (data.length - 1)

  const points = data.map((val, i) => ({
    x: padding.left + i * stepX,
    y: padding.top + plotH - val * plotH,
  }))

  // Smooth curve using cubic bezier
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4
    const cpx2 = curr.x - (curr.x - prev.x) * 0.4
    d += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`
  }

  return d
}

export default function BiomarkerPreview({
  lines = defaultLines,
  xLabels = defaultXLabels,
  className = '',
}: BiomarkerPreviewProps) {
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
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const width = 560
  const height = 280
  const padding = { top: 24, bottom: 40, left: 48, right: 24 }
  const plotW = width - padding.left - padding.right
  const plotH = height - padding.top - padding.bottom

  // Grid lines
  const gridLines = [0, 0.25, 0.5, 0.75, 1]

  return (
    <>
      <style>{`
        .bio-preview {
          background: #0D0B08;
          border-radius: 16px;
          padding: 32px;
          color: #F5F0E8;
          box-shadow: 0 24px 64px rgba(26, 25, 22, 0.18);
        }
        .bio-preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .bio-preview-title {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #A89879;
        }
        .bio-preview-legend {
          display: flex;
          gap: 20px;
        }
        .bio-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          color: #8A8275;
        }
        .bio-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .bio-preview svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }
        .bio-grid-line {
          stroke: rgba(168, 152, 121, 0.08);
          stroke-width: 1;
        }
        .bio-x-label {
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          fill: #6b6960;
          text-anchor: middle;
        }
        .bio-y-label {
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          fill: #6b6960;
          text-anchor: end;
        }
        .bio-line {
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .bio-line-animate {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          transition: stroke-dashoffset 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .bio-line-animate.visible {
          stroke-dashoffset: 0;
        }
        .bio-area {
          opacity: 0;
          transition: opacity 1.5s ease 0.8s;
        }
        .bio-area.visible {
          opacity: 1;
        }
        .bio-endpoint {
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .bio-endpoint.visible {
          opacity: 1;
          transition-delay: 2s;
        }
        .bio-endpoint-pulse {
          animation: bioPulse 2s ease-in-out infinite;
        }
        @keyframes bioPulse {
          0%, 100% { r: 6; opacity: 0.3; }
          50% { r: 10; opacity: 0; }
        }
        .bio-preview-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(168, 152, 121, 0.1);
        }
        .bio-footer-stat {
          text-align: center;
        }
        .bio-footer-val {
          display: block;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 600;
          line-height: 1;
        }
        .bio-footer-val.positive { color: #27AE60; }
        .bio-footer-val.caution { color: #E67E5A; }
        .bio-footer-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #8A8275;
          margin-top: 4px;
        }
        @media (max-width: 768px) {
          .bio-preview { padding: 20px; }
        }
      `}</style>

      <div ref={containerRef} className={`bio-preview ${className}`}>
        <div className="bio-preview-header">
          <span className="bio-preview-title">12-Week Biomarker Trend</span>
          <div className="bio-preview-legend">
            {lines.map(line => (
              <div key={line.label} className="bio-legend-item">
                <span className="bio-legend-dot" style={{ background: line.color }} />
                {line.label}
              </div>
            ))}
          </div>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {gridLines.map(val => {
            const y = padding.top + plotH - val * plotH
            return (
              <line
                key={val}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                className="bio-grid-line"
              />
            )
          })}

          {/* Y-axis labels */}
          {gridLines.map(val => {
            const y = padding.top + plotH - val * plotH
            return (
              <text key={`y-${val}`} x={padding.left - 8} y={y + 3} className="bio-y-label">
                {Math.round(val * 100)}%
              </text>
            )
          })}

          {/* X-axis labels */}
          {xLabels.map((label, i) => {
            const x = padding.left + (plotW / (xLabels.length - 1)) * i
            return (
              <text key={label} x={x} y={height - 8} className="bio-x-label">
                {label}
              </text>
            )
          })}

          {/* Area fills */}
          {lines.map(line => {
            const linePath = buildPath(line.data, width, height, padding)
            const lastPoint = {
              x: padding.left + plotW,
              y: padding.top + plotH - line.data[line.data.length - 1] * plotH,
            }
            const firstPoint = {
              x: padding.left,
              y: padding.top + plotH - line.data[0] * plotH,
            }
            const areaPath = `${linePath} L ${lastPoint.x} ${padding.top + plotH} L ${firstPoint.x} ${padding.top + plotH} Z`
            return (
              <path
                key={`area-${line.label}`}
                d={areaPath}
                fill={`url(#gradient-${line.label})`}
                className={`bio-area ${inView ? 'visible' : ''}`}
              />
            )
          })}

          {/* Gradient definitions */}
          <defs>
            {lines.map(line => (
              <linearGradient key={`grad-${line.label}`} id={`gradient-${line.label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={line.color} stopOpacity="0.15" />
                <stop offset="100%" stopColor={line.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {/* Lines */}
          {lines.map(line => {
            const d = buildPath(line.data, width, height, padding)
            return (
              <path
                key={`line-${line.label}`}
                d={d}
                stroke={line.color}
                className={`bio-line bio-line-animate ${inView ? 'visible' : ''}`}
              />
            )
          })}

          {/* Endpoints */}
          {lines.map(line => {
            const lastVal = line.data[line.data.length - 1]
            const x = padding.left + plotW
            const y = padding.top + plotH - lastVal * plotH
            return (
              <g key={`endpoint-${line.label}`} className={`bio-endpoint ${inView ? 'visible' : ''}`}>
                <circle cx={x} cy={y} r={6} fill={line.color} opacity={0.3} className="bio-endpoint-pulse" />
                <circle cx={x} cy={y} r={3.5} fill={line.color} />
              </g>
            )
          })}
        </svg>

        <div className="bio-preview-footer">
          <div className="bio-footer-stat">
            <span className="bio-footer-val positive">+186%</span>
            <span className="bio-footer-label">HRV improvement</span>
          </div>
          <div className="bio-footer-stat">
            <span className="bio-footer-val caution">-62%</span>
            <span className="bio-footer-label">ApoB reduction</span>
          </div>
          <div className="bio-footer-stat">
            <span className="bio-footer-val positive">12 weeks</span>
            <span className="bio-footer-label">Protocol duration</span>
          </div>
        </div>
      </div>
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'

export default function CinematicIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // Check if already shown this session
    const shown = sessionStorage.getItem('cinematicIntroShown')
    if (shown) {
      setIsVisible(false)
      return
    }

    // Trigger fade-in after mount
    const fadeTimer = setTimeout(() => {
      setAnimate(true)
    }, 100)

    // Trigger split animation after 2.8 seconds
    const splitTimer = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem('cinematicIntroShown', 'true')
    }, 3600) // 2.8s + 0.8s animation

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(splitTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <style>{`
        @keyframes cinematic-fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer-pulse {
          0%, 100% {
            text-shadow: 0 0 20px rgba(196, 169, 106, 0.3),
                         0 0 40px rgba(196, 169, 106, 0.15);
          }
          50% {
            text-shadow: 0 0 30px rgba(196, 169, 106, 0.5),
                         0 0 60px rgba(196, 169, 106, 0.25);
          }
        }

        @keyframes split-left {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        @keyframes split-right {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .cinematic-intro {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #0D0B08;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .cinematic-intro::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.03) 0px,
              rgba(0, 0, 0, 0.03) 1px,
              transparent 1px,
              transparent 2px
            );
          pointer-events: none;
          z-index: 1;
        }

        .cinematic-content {
          position: relative;
          z-index: 2;
          text-align: center;
          opacity: 0;
          animation: cinematic-fade-in 0.8s cubic-bezier(0.23, 1, 0.320, 1) forwards;
        }

        .cinematic-logo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(64px, 12vw, 120px);
          font-weight: 600;
          color: #F5F0E8;
          letter-spacing: 8px;
          margin: 0;
          line-height: 1;
          animation: shimmer-pulse 3s ease-in-out infinite;
          animation-delay: 0.3s;
        }

        .cinematic-tagline {
          font-family: 'Jost', sans-serif;
          font-size: clamp(12px, 2.5vw, 16px);
          font-weight: 400;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #C4A96A;
          margin-top: 16px;
          opacity: 0.9;
        }

        .cinematic-split-left,
        .cinematic-split-right {
          position: absolute;
          inset: 0;
          z-index: 3;
        }

        .cinematic-split-left {
          left: 0;
          width: 50%;
          background: #0D0B08;
          animation: split-left 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 2.8s;
        }

        .cinematic-split-right {
          right: 0;
          width: 50%;
          background: #0D0B08;
          animation: split-right 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 2.8s;
        }
      `}</style>

      <div className="cinematic-intro">
        <div className="cinematic-content">
          <h1 className="cinematic-logo">BIOLUNE</h1>
          <p className="cinematic-tagline">PRECISION LONGEVITY</p>
        </div>
        <div className="cinematic-split-left" />
        <div className="cinematic-split-right" />
      </div>
    </>
  )
}

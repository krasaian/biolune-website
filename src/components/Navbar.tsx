'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BioluneLogo = () => (
  <Link href="/" style={{ display: 'block', lineHeight: 0 }}>
    <svg viewBox="0 0 400 120" width="130" height="40" aria-label="Biolune">
      <path d="M30 60 Q30 28 48 28 Q36 38 36 60 Q36 82 48 92 Q30 92 30 60Z" fill="#A89879"/>
      <path d="M48 28 Q66 28 66 60 Q66 92 48 92 Q60 82 60 60 Q60 38 48 28Z" fill="none" stroke="#A89879" strokeWidth="1.2"/>
      <text x="82" y="58" fontFamily="Cormorant Garamond,Georgia,serif" fontSize="42" fontWeight="300" letterSpacing="2" fill="#1a1916">biolune</text>
      <line x1="82" y1="68" x2="370" y2="68" stroke="#A89879" strokeWidth="0.6" opacity="0.6"/>
      <text x="82" y="84" fontFamily="Jost,Arial,sans-serif" fontSize="10" fontWeight="300" letterSpacing="5.5" fill="#A89879">PRECISION LONGEVITY</text>
    </svg>
  </Link>
)

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/supplements', label: 'Supplements' },
  { href: '/success-stories', label: 'Success Stories' },
  { href: '/news', label: 'News' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    document.body.style.overflow = ''
  }, [pathname])

  const toggleMenu = () => {
    setOpen(v => {
      document.body.style.overflow = !v ? 'hidden' : ''
      return !v
    })
  }

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9999;
          height: var(--nav-h);
          display: flex;
          align-items: center;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .navbar.scrolled {
          background: rgba(254,249,239,0.96);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 var(--border);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: var(--max-w);
          margin: 0 auto;
          padding: 0 40px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }
        .nav-links a {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: var(--text-muted);
          letter-spacing: 0.3px;
          transition: color 0.2s;
        }
        .nav-links a:hover,
        .nav-links a.active { color: var(--text); }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-login {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: var(--gold);
          font-weight: 400;
          transition: color 0.2s;
        }
        .nav-login:hover { color: var(--gold-dark); }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 6px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--text);
          border-radius: 2px;
          transition: all 0.25s;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile overlay */
        .mobile-overlay {
          display: none;
          position: fixed;
          top: var(--nav-h);
          left: 0; right: 0; bottom: 0;
          z-index: 9998;
          background: var(--bg);
          flex-direction: column;
          padding: 24px 20px;
          overflow-y: auto;
        }
        .mobile-overlay.open { display: flex; }
        .mobile-overlay a {
          display: block;
          font-size: 18px;
          font-family: 'Jost', sans-serif;
          color: var(--text);
          padding: 16px 0;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s;
        }
        .mobile-overlay a:hover { color: var(--gold); }
        .mobile-overlay .mob-login { color: var(--gold) !important; }
        .mobile-overlay .mob-cta {
          display: block;
          margin-top: 24px;
          text-align: center;
          background: var(--gold);
          color: var(--bg) !important;
          padding: 14px 24px;
          border-radius: 4px;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: 'Jost', sans-serif;
          border: none;
        }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .nav-actions .btn { display: none; }
          .hamburger { display: flex; }
          .navbar-inner { padding: 0 20px; }
        }
      `}</style>

      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          <BioluneLogo />
          <ul className="nav-links">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className={pathname === l.href ? 'active' : ''}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <a href="https://biolune-app.vercel.app" className="nav-login" target="_blank" rel="noopener noreferrer">Login</a>
            <Link href="/apply" className="btn btn-gold" style={{ fontSize: '11px', letterSpacing: '2px', padding: '11px 24px' }}>Apply for access</Link>
            <button className={`hamburger${open ? ' open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-overlay${open ? ' open' : ''}`}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/supplements">Supplements</Link>
        <Link href="/success-stories">Success Stories</Link>
        <Link href="/news">News</Link>
        <a href="https://biolune-app.vercel.app" className="mob-login" target="_blank" rel="noopener noreferrer">Login</a>
        <Link href="/apply" className="mob-cta">Apply for access</Link>
      </div>
    </>
  )
}

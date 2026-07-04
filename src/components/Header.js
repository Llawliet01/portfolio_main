'use client';
import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'hero',        label: 'Intro'    },
  { id: 'about',       label: 'About'    },
  { id: 'experience',  label: 'Work'     },
  { id: 'projects',    label: 'Projects' },
  { id: 'skills',      label: 'Skills'   },
  { id: 'contact',     label: 'Contact'  },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState('hero');
  const [theme, setTheme]         = useState('light');
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(stored);
    document.documentElement.setAttribute('data-theme', stored);

    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      // Active section detection
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) setActive(id);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.__lenis ? window.__lenis.scrollTo(y, { duration: 1.6 }) : window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`app-header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          {/* Logo */}
          <button className="logo" onClick={() => scrollTo('hero')} aria-label="Go to top">
            YUG<span>.</span>
          </button>

          {/* Desktop nav */}
          <nav className="header-nav nav-desktop" aria-label="Main navigation">
            {sections.slice(1).map(({ id, label }) => (
              <button
                key={id}
                className={`nav-link${active === id ? ' nav-link--active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Theme toggle */}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {theme === 'dark' ? (
                  <>
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </>
                ) : (
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                )}
              </svg>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>

            {/* Mobile hamburger */}
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <span style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 5px)' : '' }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -5px)' : '' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 490,
          background: 'var(--bg)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '2.5rem',
        }}>
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
                color: active === id ? 'var(--accent)' : 'var(--ink)',
                background: 'none', border: 'none',
                transition: 'color 0.3s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Sidebar rail */}
      <nav className="sidebar-rail" aria-label="Section navigation">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            className={`rail-item${active === id ? ' active' : ''}`}
            onClick={() => scrollTo(id)}
            aria-label={`Navigate to ${label}`}
          >
            <span className="rail-dot" />
            <span className="rail-label">{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}

'use client';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const eyebrowRef = useRef(null);
  const bottomRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  useEffect(() => {
    let gsapCtx;

    (async () => {
      const { gsap } = await import('gsap');

      gsapCtx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        // Eyebrow fade
        tl.fromTo(eyebrowRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });

        // Title lines
        [line1Ref, line2Ref, line3Ref].forEach((ref, i) => {
          if (!ref.current) return;
          tl.fromTo(
            ref.current.querySelector('span'),
            { y: '110%' },
            { y: '0%', duration: 1.1, ease: 'power4.out' },
            i === 0 ? '-=0.5' : '-=0.85'
          );
        });

        // Bottom meta
        tl.fromTo(bottomRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6');

        // Parallax orbs on mousemove
        const hero = heroRef.current;
        const onMouseMove = (e) => {
          const { left, top, width, height } = hero.getBoundingClientRect();
          const x = (e.clientX - left) / width - 0.5;
          const y = (e.clientY - top) / height - 0.5;
          gsap.to(orb1Ref.current, { x: x * 40, y: y * 40, duration: 1.8, ease: 'power2.out' });
          gsap.to(orb2Ref.current, { x: -x * 25, y: -y * 25, duration: 2.2, ease: 'power2.out' });
        };

        hero.addEventListener('mousemove', onMouseMove);

        return () => hero.removeEventListener('mousemove', onMouseMove);
      }, heroRef);
    })();

    return () => { if (gsapCtx) gsapCtx.revert(); };
  }, []);

  // Animated "Available for opportunities" badge
  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'var(--accent-light)',
    border: '1px solid var(--accent)',
    borderRadius: '100px',
    padding: '0.4rem 1rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.68rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    marginBottom: '1.75rem',
    opacity: 0,
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Background gradient orbs */}
      <div className="hero-orb hero-orb-1" ref={orb1Ref} />
      <div className="hero-orb hero-orb-2" ref={orb2Ref} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Eyebrow label */}
        <div className="hero-eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>
          <div className="eyebrow-line" />
          <span className="label">Computer Science · IIIT Surat · B.Tech 2027</span>
        </div>

        {/* Giant serif title */}
        <h1 className="hero-title">
          <span className="hero-title-line" ref={line1Ref}>
            <span>Building</span>
          </span>
          <span className="hero-title-line" ref={line2Ref}>
            <span className="hero-title-italic">Intelligent</span>
          </span>
          <span className="hero-title-line" ref={line3Ref}>
            <span>Products.</span>
          </span>
        </h1>

        {/* Bottom meta */}
        <div className="hero-bottom" ref={bottomRef} style={{ opacity: 0 }}>
          <div>
            <p className="hero-desc">
              I'm <strong>Yug Patel</strong> — a CS student specialising in AI, Full-Stack
              engineering, and competitive programming. I build products that think, scale,
              and delight.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse-border 2s infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>Available for opportunities</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>·  CGPA 8.68</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>·  403+ DSA solved</span>
            </div>
          </div>

          <div className="hero-cta-group">
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) window.__lenis ? window.__lenis.scrollTo(el, { duration: 1.6 }) : el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Say Hello
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a
              href="#projects"
              className="btn btn-outline"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('projects');
                if (el) window.__lenis ? window.__lenis.scrollTo(el, { duration: 1.6 }) : el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Work
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
}

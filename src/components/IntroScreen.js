'use client';
import { useEffect, useRef, useState } from 'react';

const WORDS         = ['Welcome,', "Let's", 'Explore'];
const WORD_DELAY    = 400;   // ms between each word
const HOLD_AFTER    = 2500;  // ms to hold after last word
const EXIT_DURATION = 2000;  // ms for the whole exit animation

export default function IntroScreen({ onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase]               = useState('idle'); // idle | revealing | holding | exiting | done
  const overlayRef  = useRef(null);
  const textRef     = useRef(null);
  const mouseRef    = useRef({ x: 0, y: 0 });

  // Track live mouse position at all times; default to screen centre
  useEffect(() => {
    mouseRef.current = {
      x: window.innerWidth  / 2,
      y: window.innerHeight / 2,
    };
    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';
    setPhase('revealing');

    const timers = [];

    // Reveal words one by one
    WORDS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), (i + 1) * WORD_DELAY));
    });

    // After all words + hold → trigger exit
    const holdStart = WORDS.length * WORD_DELAY + HOLD_AFTER;
    timers.push(setTimeout(() => triggerExit(), holdStart));

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const triggerExit = async () => {
    setPhase('exiting');

    const { gsap } = await import('gsap');

    const textEl    = textRef.current;
    const overlayEl = overlayRef.current;
    if (!textEl || !overlayEl) return;

    // Calculate where to fly: from text-block centre → cursor
    const rect        = textEl.getBoundingClientRect();
    const textCX      = rect.left + rect.width  / 2;
    const textCY      = rect.top  + rect.height / 2;
    const { x: mx, y: my } = mouseRef.current;
    const dx = mx - textCX;
    const dy = my - textCY;

    // 1) Text flies toward cursor and shrinks to nothing
    gsap.to(textEl, {
      x:        dx,
      y:        dy,
      scale:    0,
      opacity:  0,
      duration: EXIT_DURATION / 1000,        // 2 s
      ease:     'power3.in',
    });

    // 2) Overlay background fades out AFTER text is almost gone (1.2s delay)
    gsap.to(overlayEl, {
      opacity:  0,
      duration: 0.8,
      delay:    EXIT_DURATION / 1000 - 0.8,  // start 0.8s before end
      ease:     'power2.inOut',
      onComplete: () => {
        document.body.style.overflow = '';
        setPhase('done');
        if (onComplete) onComplete();
      },
    });
  };

  if (phase === 'done') return null;

  return (
    <div
      ref={overlayRef}
      className={`intro-screen${phase === 'exiting' ? ' intro-screen--exiting' : ''}`}
      aria-live="polite"
      aria-label="Welcome screen"
    >
      {/* Film grain */}
      <div className="intro-noise" aria-hidden="true" />

      {/* Corner brackets */}
      <span className="intro-corner intro-corner--tl" aria-hidden="true" />
      <span className="intro-corner intro-corner--tr" aria-hidden="true" />
      <span className="intro-corner intro-corner--bl" aria-hidden="true" />
      <span className="intro-corner intro-corner--br" aria-hidden="true" />

      {/* Word counter */}
      <p className="intro-counter" aria-hidden="true">
        {String(visibleCount).padStart(2, '0')} / {String(WORDS.length).padStart(2, '0')}
      </p>

      {/* ── MAIN TEXT — this is what flies into the cursor ── */}
      <div className="intro-text-wrap" ref={textRef}>
        {WORDS.map((word, i) => (
          <span
            key={word}
            className={`intro-word${i < visibleCount ? ' intro-word--visible' : ''}`}
            style={{ transitionDelay: `${i * 0.04}s` }}
          >
            {word}
          </span>
        ))}

        {/* Blinking caret — hides when exit starts */}
        <span
          className={`intro-caret${phase === 'exiting' ? ' intro-caret--hide' : ''}`}
          aria-hidden="true"
        />
      </div>

      {/* Bottom hint — appears once all words are shown */}
      <p
        className={`intro-hint${
          visibleCount === WORDS.length && phase !== 'exiting'
            ? ' intro-hint--visible'
            : ''
        }`}
      >
        Scroll to discover
      </p>
    </div>
  );
}

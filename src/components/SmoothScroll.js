'use client';
import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    let lenis;
    (async () => {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Expose lenis globally for GSAP ScrollTrigger
      window.__lenis = lenis;
    })();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return <div ref={wrapRef}>{children}</div>;
}

'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      inner.style.left = `${e.clientX}px`;
      inner.style.top = `${e.clientY}px`;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      outerPos.current.x = lerp(outerPos.current.x, pos.current.x, 0.1);
      outerPos.current.y = lerp(outerPos.current.y, pos.current.y, 0.1);
      outer.style.left = `${outerPos.current.x}px`;
      outer.style.top = `${outerPos.current.y}px`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMove);

    const hoverables = () => document.querySelectorAll('a, button, [data-cursor="hover"]');

    const addHover = () => {
      hoverables().forEach((el) => {
        el.addEventListener('mouseenter', () => {
          outer.classList.add('hovered');
          inner.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
          outer.classList.remove('hovered');
          inner.classList.remove('hovered');
        });
      });
    };

    const onDown = () => outer.classList.add('clicked');
    const onUp   = () => outer.classList.remove('clicked');

    addHover();
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    // Re-attach on DOM mutation (Next.js dynamic routes)
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor-outer" aria-hidden="true" />
      <div ref={innerRef} className="cursor-inner" aria-hidden="true" />
    </>
  );
}

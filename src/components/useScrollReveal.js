'use client';
import { useEffect } from 'react';

/**
 * useScrollReveal
 * Attach an IntersectionObserver to a container ref.
 * Any child with class .fade-up, .fade-in, .slide-left, .slide-right, .reveal-text
 * gets the .in-view class when it enters the viewport.
 */
export default function useScrollReveal(containerRef, threshold = 0.02) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const selectors = [
      '.fade-up', '.fade-in', '.slide-left', '.slide-right', '.reveal-text',
    ];

    const elements = container.querySelectorAll(selectors.join(','));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold, rootMargin: '0px 0px -20px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    // Fallback: If we scroll near the bottom of the page, immediately reveal all elements in this container
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPos = window.scrollY || window.pageYOffset;
      if (scrollHeight - clientHeight - scrollPos < 100) {
        elements.forEach((el) => el.classList.add('in-view'));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount in case we are already at the bottom
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, threshold]);
}

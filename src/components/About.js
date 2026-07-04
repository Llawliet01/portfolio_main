'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import useScrollReveal from './useScrollReveal';

// Force recompile of About component
export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  useScrollReveal(sectionRef);

  // Parallax on the image & word reveal
  useEffect(() => {
    let gsapCtx;
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsapCtx = gsap.context(() => {
        gsap.to(imageRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Word-by-word text reveal
        const paras = sectionRef.current.querySelectorAll('.about-reveal-para');
        paras.forEach((p) => {
          const words = p.textContent.trim().split(' ');
          p.innerHTML = words
            .map((w) => `<span class="word-wrap"><span class="word">${w}</span></span>`)
            .join(' ');

          gsap.fromTo(
            p.querySelectorAll('.word'),
            { y: '110%', opacity: 0 },
            {
              y: '0%',
              opacity: 1,
              stagger: 0.025,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: p,
                start: 'top 85%',
              },
            }
          );
        });
      }, sectionRef);
    })();

    return () => { if (gsapCtx) gsapCtx.revert(); };
  }, []);

  return (
    <section id="about" className="about-section section" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          {/* Left: image */}
          <div className="about-image-frame slide-right">
            <div className="image-placeholder" ref={imageRef}>
              {/* Blurred background photo layer */}
              <Image
                src="/images/developer_portrait_magicstudio_knf2q2duht.png"
                alt="Yug Patel Background"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{ objectFit: 'cover', objectPosition: 'center top', filter: 'blur(0px) brightness(0.65)', zIndex: 1 }}
              />
              {/* Transparent crisp foreground cutout layer */}
              <Image
                src="/images/developer_portrait_transparent.png"
                alt="Yug Patel"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{ objectFit: 'cover', objectPosition: 'center top', zIndex: 2 }}
              />
              {/* Decorative corners */}
              <div style={{ position:'absolute', top: '1rem', left:'1rem', width:'20px', height:'20px', borderTop:'2px solid var(--accent)', borderLeft:'2px solid var(--accent)', zIndex: 3 }} />
              <div style={{ position:'absolute', top: '1rem', right:'1rem', width:'20px', height:'20px', borderTop:'2px solid var(--accent)', borderRight:'2px solid var(--accent)', zIndex: 3 }} />
              <div style={{ position:'absolute', bottom: '1rem', left:'1rem', width:'20px', height:'20px', borderBottom:'2px solid var(--accent)', borderLeft:'2px solid var(--accent)', zIndex: 3 }} />
              <div style={{ position:'absolute', bottom: '1rem', right:'1rem', width:'20px', height:'20px', borderBottom:'2px solid var(--accent)', borderRight:'2px solid var(--accent)', zIndex: 3 }} />
            </div>
            {/* Floating badges */}
            <div className="floating-badge badge-1">
              <span className="badge-dot" />
              B.Tech CS Student
            </div>
            <div className="floating-badge badge-2">
              <span className="badge-dot" style={{ background: '#8b5cf6' }} />
              AI Enthusiast
            </div>
          </div>

          {/* Right: content */}
          <div className="about-content">
            <p className="label">01 — About Me</p>

            <h2 className="about-big-text">
              I turn ideas into <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>intelligent</em> software that actually ships.
            </h2>

            <p className="about-body about-reveal-para">
              I&apos;m a second-year B.Tech student at IIIT Surat, where I balance rigorous coursework with hands-on
              building. My sweet spot is the intersection of machine learning and scalable web engineering —
              whether that&apos;s training FastAPI-backed ML models or crafting React interfaces that users love.
            </p>
            <p className="about-body about-reveal-para" style={{ marginTop: '1rem' }}>
              Outside the editor, I&apos;m grinding competitive programming (403+ LeetCode problems, Global Rank
              2415 in a weekly contest), exploring neural architectures, and contributing to open-source
              projects. I believe great products come from curiosity, craft, and consistency.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">403<span style={{ fontSize: '0.5em' }}>+</span></span>
                <span className="stat-label">DSA Problems</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8.68</span>
                <span className="stat-label">CGPA / 10</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2k<span style={{ fontSize: '0.5em' }}>+</span></span>
                <span className="stat-label">Global Rank</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

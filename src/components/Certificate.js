'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import useScrollReveal from './useScrollReveal';

export default function Certificate() {
  const sectionRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  useScrollReveal(sectionRef);

  return (
    <>
      <section className="cert-section" ref={sectionRef}>
        <div className="container">
          <div className="cert-grid">
            {/* Card */}
            <div className="cert-card slide-right" onClick={() => setLightboxOpen(true)} data-cursor="hover">
              <div className="cert-card-img" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '380px' }}>
                <Image
                  src="/images/certificate_horizontal.png"
                  alt="Internship Certificate"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain', padding: '0.5rem' }}
                />
              </div>
              <div className="cert-hover-layer">
                <span className="cert-view-text">View Certificate</span>
              </div>
            </div>

            {/* Info */}
            <div className="cert-info slide-left">
              <p className="label" style={{ marginBottom: '1.25rem' }}>Recognition</p>
              <h2 className="cert-title">Front End Developer<br /><em style={{ fontStyle:'italic', color:'var(--accent)' }}>Internship Certificate</em></h2>
              <p className="cert-quote">
                "During the internship, Yug demonstrated strong self-motivation and a willingness to learn new skills. His performance exceeded our expectations, and we wish him a prosperous and bright future."
              </p>
              <div className="cert-badges">
                <span className="cert-badge">Front End Developer</span>
                <span className="cert-badge">May – Jun 2026</span>
                <span className="cert-badge">Technobits Digital</span>
                <span className="cert-badge">JS · Next.js</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div className={`lightbox${lightboxOpen ? ' active' : ''}`} onClick={() => setLightboxOpen(false)}>
        <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
          <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>✕ Close</button>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Image
              src="/images/certificate_horizontal.png"
              alt="Internship Certificate Full View"
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

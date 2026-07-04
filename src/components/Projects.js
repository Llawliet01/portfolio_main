'use client';
import { useRef, useState } from 'react';
import useScrollReveal from './useScrollReveal';

const projects = [
  {
    num: '001',
    title: 'AI-Powered Apparel Size Estimation System',
    tags: ['FastAPI', 'Python', 'OpenCV', 'YOLOv8', 'MediaPipe', 'MongoDB', 'WebSockets', 'NumPy', 'PyTorch'],
    desc: 'Real-time AI-powered shirt size estimation using computer vision and deep learning pipelines for automated apparel fitting analysis.',
    bullets: [
      'Developed a real-time AI-powered shirt size estimation system using computer vision and deep learning pipelines for automated apparel fitting analysis.',
      'Implemented a FastAPI backend with WebSocket-based real-time communication to process live video frames with low-latency inference and prediction streaming.',
      'Integrated YOLOv8 for person detection, MediaPipe for body landmark extraction, and custom measurement logic to estimate shirt sizes with confidence scoring and fit-type classification (Slim, Regular, Relaxed).',
      'Built an end-to-end processing pipeline with frame buffering, smoothing algorithms, annotated frame visualization, and MongoDB-based session tracking for storing prediction history and analytics.',
      'Optimized image preprocessing, resizing, and inference workflows using OpenCV, NumPy, and PyTorch to support scalable real-time performance across webcam/video inputs.',
    ],
    image: true,
    live: null,
    github: null,
    year: '2025',
  },
  {
    num: '002',
    title: 'Pizza Time',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    desc: 'Developed a responsive pizza ordering web application using React and JavaScript.',
    bullets: [
      'Developed a responsive pizza ordering web application using React and JavaScript.',
      'Implemented dynamic menu rendering, shopping cart management, and order processing workflows.',
      'Built reusable UI components and responsive layouts for desktop and mobile devices.',
      'Integrated state management for product selection, quantity updates, and price calculations.',
    ],
    image: true,
    live: null,
    github: null,
    year: '2024',
  },
  {
    num: '003',
    title: 'Myntra Clone',
    tags: ['HTML', 'CSS', 'JavaScript'],
    desc: 'Developed a responsive e-commerce web application inspired by Myntra using HTML, CSS, and JavaScript.',
    bullets: [
      'Developed a responsive e-commerce web application inspired by Myntra using HTML, CSS, and JavaScript.',
      'Implemented product filtering, sorting, shopping cart functionality, and dynamic content rendering.',
      'Built reusable UI components and optimized layouts for multiple screen sizes.',
      'Utilized local storage for user session and cart management.',
    ],
    image: true,
    live: null,
    github: null,
    year: '2024',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  useScrollReveal(sectionRef);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="projects" className="projects-section section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="projects-header">
          <div>
            <p className="label fade-up">03 — Selected Projects</p>
            <h2 className="display-lg fade-up delay-1">Things I've<br /><em style={{ fontStyle:'italic', color:'var(--accent)' }}>shipped</em></h2>
          </div>
          <span className="projects-count fade-in">0{projects.length}</span>
        </div>

        {/* Project list */}
        <div className="project-list fade-up delay-2">
          {projects.map((p, i) => (
            <div key={i}>
              <div
                className="project-row"
                onClick={() => toggle(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggle(i)}
                aria-expanded={openIndex === i}
                data-cursor="hover"
              >
                <span className="project-num">{p.num}</span>
                <div>
                  <p className="project-row-title">{p.title}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.25rem', fontStyle: 'italic' }}>{p.year}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div className="project-tags-inline">
                    {p.tags.slice(0, 3).map((t) => (
                      <span className="tag-chip" key={t}>{t}</span>
                    ))}
                  </div>
                  <svg
                    className="project-arrow"
                    width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: openIndex === i ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.4s var(--ease-out-expo)', flexShrink: 0, opacity: 1, color: 'var(--accent)' }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </div>

              {/* Expanded panel */}
              {openIndex === i && (
                <div className="project-expanded open">
                  <div className="project-expanded-grid">
                    {/* Image */}
                    <div className="project-image-placeholder">
                      📸 Project Screenshot / Demo<br />
                      <span style={{ fontSize: '0.65rem', display: 'block', marginTop: '0.5rem' }}>Add your image here</span>
                    </div>
                    {/* Details */}
                    <div>
                      <p className="project-detail-title">{p.title}</p>
                      <p className="project-detail-desc">{p.desc}</p>
                      <ul className="project-detail-bullets">
                        {p.bullets.map((b, j) => (
                          <li className="project-detail-bullet" key={j}>{b}</li>
                        ))}
                      </ul>
                      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                        {p.tags.map((t) => (
                          <span className="tag-chip" key={t}>{t}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.75rem' }}>
                        {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}>GitHub →</a>}
                        {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-accent" style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}>Live Demo →</a>}
                        {!p.github && !p.live && (
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            🔒 Private repo — available on request
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

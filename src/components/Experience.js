'use client';
import { useEffect, useRef } from 'react';
import useScrollReveal from './useScrollReveal';

const experience = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Evol Technobits Digital',
    date: 'May 2025 – Jul 2025',
    type: 'Internship',
    bullets: [
      'Built and deployed production-ready web features using React and Next.js, directly improving product usability for end users.',
      'Integrated RESTful APIs and optimised database queries in MySQL reducing average load time by ~30%.',
      'Collaborated in agile sprints, participating in code reviews, daily standups, and feature prioritisation discussions.',
      'Earned a Letter of Recommendation for delivering high-quality work and exceeding sprint targets.',
    ],
    techStack: ['React', 'Next.js', 'MySQL', 'REST APIs', 'Bootstrap'],
  },
];

const education = [
  {
    school: 'Indian Institute of Information Technology, Surat',
    degree: 'B.Tech in Computer Science & Engineering',
    dates: '2023 — 2027',
    cgpa: '8.68',
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  useScrollReveal(sectionRef);

  useEffect(() => {
    let gsapCtx;
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsapCtx = gsap.context(() => {
        // GSAP-powered counter animation for CGPA
        const obj = { val: 0 };
        const el = document.querySelector('.cgpa-counter');
        if (el) {
          gsap.to(obj, {
            val: 8.68,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true },
            onUpdate: () => { el.textContent = obj.val.toFixed(2); },
          });
        }
      }, sectionRef);
    })();
    return () => { if (gsapCtx) gsapCtx.revert(); };
  }, []);

  return (
    <section id="experience" className="experience-section section" ref={sectionRef}>
      <div className="container">

        {/* Section header */}
        <div className="exp-header">
          <div>
            <p className="label fade-up">02 — Experience & Education</p>
            <h2 className="display-lg fade-up delay-1">Where I've<br /><em style={{ fontStyle:'italic', color:'var(--accent)' }}>worked & learned</em></h2>
          </div>
          <p className="section-number fade-in" style={{ lineHeight: 1 }}>02</p>
        </div>

        {/* Timeline */}
        <div className="exp-timeline fade-in" ref={timelineRef}>
          {experience.map((exp, i) => (
            <div className="exp-entry fade-up" key={i}>
              <div className="exp-meta">
                <span className="exp-date">{exp.date}</span>
                <span className="exp-type-badge">{exp.type}</span>
              </div>
              <h3 className="exp-role">{exp.role}</h3>
              <p className="exp-company">{exp.company}</p>
              <ul className="exp-bullets">
                {exp.bullets.map((b, j) => (
                  <li className="exp-bullet" key={j}>{b}</li>
                ))}
              </ul>
              <div style={{ display:'flex', gap:'0.6rem', flexWrap:'wrap', marginTop:'1.5rem' }}>
                {exp.techStack.map((t) => (
                  <span className="tag-chip" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginTop: '2rem' }}>
          <p className="label fade-up" style={{ marginBottom: '1.5rem' }}>Education</p>
          {education.map((edu, i) => (
            <div className="edu-block fade-up delay-1" key={i}>
              <div>
                <p className="edu-school">{edu.school}</p>
                <p className="edu-degree">{edu.degree}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginTop: '0.5rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>{edu.dates}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="edu-cgpa cgpa-counter">0.00</span>
                <p className="edu-cgpa-label">CGPA / 10</p>
              </div>
            </div>
          ))}
        </div>

        {/* Courses */}
        <div className="fade-up delay-2" style={{ marginTop: '3rem' }}>
          <p className="label" style={{ marginBottom: '1.25rem' }}>Relevant Coursework</p>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {['Data Structures & Algorithms', 'Operating Systems', 'Web Development', 'Computer Networks', 'Machine Learning', 'Database Management'].map((c) => (
              <span className="skill-pill" key={c}><span>{c}</span></span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

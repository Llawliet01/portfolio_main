'use client';
import { useEffect, useRef } from 'react';
import useScrollReveal from './useScrollReveal';

const skills = {
  languages: ['Python', 'JavaScript', 'C++', 'SQL', 'HTML', 'CSS'],
  frameworks: ['React', 'Next.js', 'FastAPI', 'Bootstrap', 'Node.js'],
  aiml: ['Machine Learning', 'NumPy', 'Pandas', 'OpenCV', 'NLTK', 'Scikit-Learn'],
  databases: ['MySQL', 'PostgreSQL', 'MongoDB'],
  tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux', 'Figma'],
};

const achievements = [
  {
    icon: '🏆',
    title: 'LeetCode Global Rank 2415',
    desc: 'Achieved Global Rank 2415 in a LeetCode Weekly Contest, competing against 20,000+ participants worldwide.',
  },
  {
    icon: '🥇',
    title: 'LeetCode Global Rank 3636',
    desc: 'Consistent top-tier performance with a second Global Rank 3636 in a separate weekly contest.',
  },
  {
    icon: '🧩',
    title: '403+ DSA Problems Solved',
    desc: 'Systematic coverage of arrays, trees, graphs, DP, and more on LeetCode with a current streak and growing.',
  },
  {
    icon: '📜',
    title: 'Internship Letter of Recommendation',
    desc: 'Received an official LOR from Evol Technobits for outstanding performance and code quality during internship.',
  },
  {
    icon: '🎓',
    title: 'CGPA 8.68 / 10 at IIIT Surat',
    desc: 'Maintaining a strong academic record while actively pursuing extracurricular projects and competitions.',
  },
];

const progressBars = [
  { label: 'Problem Solving (DSA)', pct: 88 },
  { label: 'Full Stack Development', pct: 82 },
  { label: 'Machine Learning / AI', pct: 72 },
  { label: 'System Design', pct: 60 },
];

export default function Skills() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  // Animate progress bars
  useEffect(() => {
    let gsapCtx;
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsapCtx = gsap.context(() => {
        const bars = document.querySelectorAll('.progress-bar-fill');
        bars.forEach((bar) => {
          const target = bar.getAttribute('data-pct');
          gsap.to(bar, {
            width: `${target}%`,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: bar, start: 'top 85%', once: true },
          });
        });
      }, sectionRef);
    })();
    return () => { if (gsapCtx) gsapCtx.revert(); };
  }, []);

  return (
    <section id="skills" className="skills-section section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <p className="label fade-up">04 — Skills & Achievements</p>
            <h2 className="display-lg fade-up delay-1">My<br /><em style={{ fontStyle:'italic', color:'var(--accent)' }}>Toolbox</em></h2>
          </div>
          <p className="section-number fade-in">04</p>
        </div>

        <div className="skills-mega-grid">
          {/* Left col: Skills */}
          <div className="skills-col">
            <h3 className="skills-col-title fade-up">Technical Skills</h3>

            {[
              { heading: 'Languages', pills: skills.languages },
              { heading: 'Frameworks & Libraries', pills: skills.frameworks },
              { heading: 'AI / Machine Learning', pills: skills.aiml },
              { heading: 'Databases', pills: skills.databases },
              { heading: 'Tools & Platforms', pills: skills.tools },
            ].map(({ heading, pills }, gi) => (
              <div className={`skill-group fade-up delay-${gi + 1}`} key={heading}>
                <p className="skill-group-heading">{heading}</p>
                <div className="skill-pills">
                  {pills.map((p) => (
                    <span className="skill-pill" key={p}><span>{p}</span></span>
                  ))}
                </div>
              </div>
            ))}

            {/* Progress bars */}
            <div className="fade-up delay-3" style={{ marginTop: '2.5rem' }}>
              <p className="label" style={{ marginBottom: '1.5rem' }}>Proficiency</p>
              {progressBars.map((pb) => (
                <div key={pb.label} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{pb.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>{pb.pct}%</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" data-pct={pb.pct} style={{ width: 0 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right col: Achievements */}
          <div className="skills-col">
            <h3 className="skills-col-title fade-up">Achievements</h3>

            {/* LeetCode big card */}
            <div className="leet-stat-card fade-up delay-1">
              <span className="leet-big">403<sup style={{ fontSize: '0.4em', verticalAlign: 'super' }}>+</sup></span>
              <span className="leet-sub">Problems solved on LeetCode</span>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--accent)' }}>2415</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>Global Rank</p>
                </div>
                <div style={{ width: '1px', background: 'var(--border)' }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--accent)' }}>3636</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>Global Rank</p>
                </div>
              </div>
              <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: '1.5rem', fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}>
                View LeetCode Profile →
              </a>
            </div>

            {/* Achievement items */}
            <div className="achievements-panel" style={{ marginTop: '1.5rem' }}>
              {achievements.slice(0).map((ach, i) => (
                <div className={`achievement-item fade-up delay-${i + 2}`} key={i}>
                  <span className="achievement-icon">{ach.icon}</span>
                  <div className="achievement-body">
                    <p className="achievement-title">{ach.title}</p>
                    <p className="achievement-desc">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

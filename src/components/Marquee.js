const items = [
  'AI Engineer',
  'Full Stack Developer',
  'Problem Solver',
  'ML Enthusiast',
  'React Developer',
  'FastAPI Builder',
  'DSA Grinder',
  'CS Student 2027',
];

export default function Marquee() {
  // Duplicate for infinite scroll
  const all = [...items, ...items];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {[0, 1].map((rep) => (
          <div className="marquee-content" key={rep}>
            {items.map((item, i) => (
              <span className="marquee-item" key={i}>
                {item}
                <span className="marquee-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

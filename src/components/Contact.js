'use client';
import { useRef, useState } from 'react';
import useScrollReveal from './useScrollReveal';

const contacts = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'patelyug01234@gmail.com',
    action: 'Send an email',
    href: 'mailto:patelyug01234@gmail.com',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/yugpatel',
    action: 'Connect with me',
    href: 'https://linkedin.com',
  },
  {
    icon: '🧩',
    label: 'LeetCode',
    value: 'leetcode.com/yugpatel',
    action: 'See my solutions',
    href: 'https://leetcode.com',
  },
  {
    icon: '💻',
    label: 'GitHub',
    value: 'github.com/yugpatel',
    action: 'View repositories',
    href: 'https://github.com',
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+91 76005 98827',
    action: 'Call or WhatsApp',
    href: 'tel:+917600598827',
  },
  {
    icon: '🌐',
    label: 'GeeksforGeeks',
    value: 'geeksforgeeks.org/user/yugpatel',
    action: 'View profile',
    href: 'https://geeksforgeeks.org',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);
  useScrollReveal(sectionRef);

  const copyEmail = () => {
    navigator.clipboard.writeText('patelyug01234@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="contact-section section" ref={sectionRef}>
      <div className="container">
        {/* Mega text */}
        <div className="contact-mega">
          <p className="label fade-up" style={{ marginBottom: '1.5rem' }}>05 — Get in Touch</p>
          <h2 className="contact-big-text">
            <span className="reveal-wrap"><span className="reveal-text">Let's build</span></span>
            <br />
            <span className="reveal-wrap"><span className="reveal-text">something</span></span>
            <br />
            <span className="reveal-wrap"><span className="reveal-text" style={{ fontStyle: 'italic' }}>great</span></span>
          </h2>
          <p className="body-lg fade-up delay-2" style={{ maxWidth: '500px', margin: '1.5rem auto 0' }}>
            I'm actively looking for internship and full-time opportunities.
            Whether you have a project, a role, or just want to say hi — my inbox is always open.
          </p>

          {/* Copy email bar */}
          <div className="fade-up delay-3" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.25rem',
            marginTop: '2.5rem',
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: '100px',
            padding: '0.75rem 1rem 0.75rem 1.75rem',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--ink-3)' }}>
              patelyug01234@gmail.com
            </span>
            <button
              className={`btn-copy${copied ? ' copied' : ''}`}
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>

          <div className="contact-divider" />
        </div>

        {/* Contact grid */}
        <div className="contact-grid">
          {contacts.map((c, i) => (
            <a
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : '_self'}
              rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
              className={`contact-card fade-up delay-${i + 1}`}
              key={i}
            >
              <div className="contact-card-icon">{c.icon}</div>
              <p className="contact-card-label">{c.label}</p>
              <p className="contact-card-value">{c.value}</p>
              <p className="contact-card-action">
                {c.action}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </p>
            </a>
          ))}
        </div>

        {/* Bottom tagline */}
        <p className="fade-up delay-4" style={{
          textAlign: 'center',
          marginTop: '3.5rem',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
          color: 'var(--muted)',
        }}>
          "Great things are never done alone."
        </p>
      </div>
    </section>
  );
}

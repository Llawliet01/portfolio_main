"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "00 Intro" },
  { id: "experience", label: "01 Experience" },
  { id: "projects", label: "02 Projects" },
  { id: "skills", label: "03 Skills" },
  { id: "contact", label: "04 Contact" },
];

export default function SidebarRail() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Focus center viewport
      threshold: 0,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80, // Offset for Header
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className="sidebar-rail">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(e) => handleClick(e, section.id)}
          className={`rail-item ${activeSection === section.id ? "active" : ""}`}
        >
          <div className="rail-dot" />
          <span className="rail-label">{section.label}</span>
        </a>
      ))}
    </aside>
  );
}

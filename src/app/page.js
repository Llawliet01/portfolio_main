import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Experience from '../components/Experience';
import Certificate from '../components/Certificate';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

export const metadata = {
  title: 'Yug Patel — AI & Full Stack Engineer',
  description:
    'Portfolio of Yug Patel, CS student at IIIT Surat. AI, Full Stack, DSA — building intelligent, scalable software.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Certificate />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}

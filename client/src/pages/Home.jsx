import { useEffect } from 'react';
import Hero      from '../components/Hero';
import { About } from '../components/About';
import Skills    from '../components/Skills';
import LeetCode  from '../components/LeetCode';
import Projects  from '../components/Projects';
import Education from '../components/Education';
import Contact   from '../components/Contact';
import Footer    from '../components/Footer';

export default function Home({ onHover }) {
  useEffect(() => {
    const bar = document.getElementById('progress-bar');
    const bt  = document.getElementById('back-top');
    const fn  = () => {
      const st = window.scrollY, dh = document.body.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (st / dh * 100) + '%';
      if (bt)  bt.classList.toggle('show', st > 400);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <main>
      <div id="progress-bar" />
      <Hero      onHover={onHover} />
      <About     onHover={onHover} />
      <Skills    onHover={onHover} />
      <LeetCode  onHover={onHover} />
      <Projects  onHover={onHover} />
      <Education onHover={onHover} />
      <Contact   onHover={onHover} />
      <Footer />
      <button id="back-top"
        onClick={() => window.scrollTo({top:0,behavior:'smooth'})}
        onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}
        className="fixed bottom-8 right-7 w-10 h-10 bg-panel border border-c-border rounded-sm flex items-center justify-center text-sm text-sub z-[400] hover:border-teal hover:text-teal"
        aria-label="Back to top">↑</button>
    </main>
  );
}

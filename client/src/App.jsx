import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home   from './pages/Home';

const SNIPS = ['{}', '[]', '()', '</>', 'fn()', '=> {}', '//', '&&', '::', '<>', '...', 'async', '?.'];
let si = 0;

export default function App() {
  const mx = useRef(0), my = useRef(0), rx = useRef(0), ry = useRef(0);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const curMain  = document.getElementById('cur-main');
    const curRing  = document.getElementById('cur-ring');
    const curTrail = document.getElementById('cur-trail');

    const onMove = e => {
      mx.current = e.clientX; my.current = e.clientY;
      if (curMain)  { curMain.style.left  = e.clientX + 'px'; curMain.style.top  = e.clientY + 'px'; }
      if (curTrail) { curTrail.style.left = e.clientX + 'px'; curTrail.style.top = e.clientY + 'px'; }
    };

    const rafLoop = () => {
      rx.current += (mx.current - rx.current) * 0.1;
      ry.current += (my.current - ry.current) * 0.1;
      if (curRing) { curRing.style.left = rx.current + 'px'; curRing.style.top = ry.current + 'px'; }
      requestAnimationFrame(rafLoop);
    };

    const onClick = e => {
      const b = document.createElement('div');
      b.className = 'burst';
      b.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;`;
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 500);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    rafLoop();
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('click', onClick); };
  }, []);

  const onHover = entering => {
    if (window.innerWidth < 1024) return;
    const trail = document.getElementById('cur-trail');
    if (entering) {
      document.body.classList.add('cur-hover');
      if (trail) trail.textContent = SNIPS[si++ % SNIPS.length];
    } else {
      document.body.classList.remove('cur-hover');
    }
  };

  return (
    <>
      <div id="cur-main"  />
      <div id="cur-ring"  />
      <div id="cur-trail" />
      <Navbar onHover={onHover} />
      <Routes>
        <Route path="/" element={<Home onHover={onHover} />} />
      </Routes>
    </>
  );
}

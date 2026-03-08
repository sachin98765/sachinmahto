import { useState, useEffect } from 'react';
import { useScrollSpy, scrollTo } from '../hooks/useScrollSpy';

const LINKS = [
  { label:'About',     id:'about'     },
  { label:'Skills',    id:'skills'    },
  { label:'LeetCode',  id:'leetcode'  },
  { label:'Projects',  id:'projects'  },
  { label:'Education', id:'education' },
  { label:'Contact',   id:'contact'   },
];

export default function Navbar({ onHover }) {
  const active   = useScrollSpy();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = id => { scrollTo(id); setOpen(false); };

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <nav className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between
          bg-void/80 border-b border-white/[.04] backdrop-blur-2xl
          transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}
          px-5 md:px-[60px]`}>

        {/* Logo */}
        <button onClick={() => go('hero')}
          onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}
          className="font-display font-black text-lg grad-text">
          <span className="font-mono text-teal/40 font-light text-sm">[</span>Sachin Mahato<span className="font-mono text-teal/40 font-light text-sm">]</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}
              className={`relative text-[.65rem] tracking-[.18em] uppercase px-3.5 py-2 rounded transition-colors
                ${active === l.id ? 'text-teal' : 'text-sub hover:text-bright hover:bg-white/[.04]'}`}>
              {active === l.id && (
                <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] rounded-sm bg-teal"
                  style={{ boxShadow:'0 0 8px #00e5c8' }} />
              )}
              {l.label}
            </button>
          ))}
          <button /*onClick={() => alert('Resume downloads here!')} */
            onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}
            className="ml-3 text-[.65rem] tracking-[.15em] uppercase px-5 py-2 border border-teal-dim text-teal bg-teal/5 rounded transition-all hover:bg-teal/15 hover:shadow-[0_0_20px_rgba(0,229,200,.2)]">
            <a  target="_blank" rel="noopener noreferrer" href='/img/resume.pdf'> Resume ↓</a>
          </button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(o => !o)}
          onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}
          className="md:hidden flex flex-col gap-[5px] p-1" aria-label="Menu">
          {[0,1,2].map(i => (
            <span key={i} className={`block w-6 bg-txt transition-all duration-300 ${
              i===0 && open ? 'h-[1.5px] rotate-45 translate-y-[7px]' :
              i===1 && open ? 'h-[1.5px] opacity-0' :
              i===2 && open ? 'h-[1.5px] -rotate-45 -translate-y-[7px]' : 'h-[1.5px]'}`} />
          ))}
        </button>
      </nav>

      {/* ── Mobile Menu ── */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-void/97 backdrop-blur-2xl">
          <button onClick={() => setOpen(false)}
            className="absolute top-7 right-7 text-sub text-2xl hover:text-teal transition-colors">✕</button>
          {[{label:'Home',id:'hero'}, ...LINKS].map((l,i) => (
            <button key={l.id} onClick={() => go(l.id)}
              className={`flex items-center gap-4 px-8 py-2.5 w-64 rounded font-display font-extrabold text-2xl transition-all duration-200
                ${active===l.id ? 'text-teal' : 'text-sub hover:text-teal hover:translate-x-2'}`}>
              <span className="font-mono text-[.52rem] tracking-widest text-muted pt-1">0{i}</span>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

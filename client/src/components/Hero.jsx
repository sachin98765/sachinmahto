import { useEffect, useState } from 'react';
import { scrollTo } from '../hooks/useScrollSpy';

const CODE_SNIPPETS = [
  'const app = express();', 'mongoose.connect(uri);', 'useState(null)',
  'useEffect(()=>{},[])', 'router.get("/api")', 'jwt.verify(token)',
  'async/await', 'res.json(data)', 'npm run dev',
  'import React from "react"', '.find().populate()', 'bcrypt.hash(pwd,12)',
];
const ROLES = ['MERN Stack Developer','React.js Engineer','Node.js Backend Dev','Full-Stack Builder'];

export default function Hero({ onHover }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [counts, setCounts]   = useState({ proj:0, lc:0, tech:0, cgpa:'0.0' });

  useEffect(() => {
    const iv = setInterval(() => setRoleIdx(i => (i+1) % ROLES.length), 2800);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const targets = { proj:5, lc:160, tech:15, cgpa:7.5 };
    let step = 0; const total = 60;
    const iv = setInterval(() => {
      step++;
      setCounts({
        proj: Math.round(targets.proj * step/total),
        lc:   Math.round(targets.lc   * step/total),
        tech: Math.round(targets.tech * step/total),
        cgpa: (targets.cgpa * step/total).toFixed(1),
      });
      if (step >= total) clearInterval(iv);
    }, 1800/total);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient orbs */}
        {[
          { bg:'#00e5c8', size:'clamp(300px,55vw,700px)', pos:'top:-150px;left:-100px', dur:'14s' },
          { bg:'#7c5cfc', size:'clamp(250px,50vw,600px)', pos:'bottom:-150px;right:-80px', dur:'10s', dir:'alternate-reverse' },
          { bg:'#f5a623', size:'clamp(150px,30vw,400px)', pos:'top:40%;left:40%', dur:'8s', op:'.09' },
        ].map((o,i) => (
          <div key={i} className="absolute rounded-full animate-drift"
            style={{ background:o.bg, width:o.size, height:o.size, filter:'blur(100px)',
              opacity: o.op||'.16', animationDuration:o.dur,
              animationDirection:o.dir||'alternate', ...Object.fromEntries(o.pos.split(';').map(p=>p.split(':'))) }} />
        ))}
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage:'linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)',
          backgroundSize:'80px 80px',
          maskImage:'radial-gradient(ellipse at center,black 40%,transparent 80%)',
        }}/>
        {/* Floating code lines */}
        {CODE_SNIPPETS.map((line,i) => (
          <div key={i} className="absolute font-mono text-teal/[.055] whitespace-nowrap pointer-events-none animate-codeDrift"
            style={{ left:`${(i*9+3)%100}vw`, animationDuration:`${18+i*1.8}s`, animationDelay:`${-i*2.2}s`, fontSize:`${.5+(i%3)*.08}rem` }}>
            {line}
          </div>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container pt-28 pb-16">
        {/* Available badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-teal/25 rounded-full
            text-[.63rem] tracking-widest text-teal bg-teal/5 mb-7 animate-slideUp"
          style={{ animationDelay:'.1s' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulseDot inline-block"/>
          Available for opportunities
        </div>

        {/* Name */}
        <h1 className="font-display font-black leading-[.92] tracking-[-0.04em] text-bright mb-2 animate-slideUp"
          style={{ fontSize:'clamp(3rem,10vw,8rem)', animationDelay:'.2s' }}>
          Sachin<br/>
          <span className="grad-text">
            Mahato
            <span className="inline-block w-1 bg-teal ml-1 align-middle animate-blink rounded-sm"
              style={{ height:'.85em', boxShadow:'0 0 8px #00e5c8' }}/>
          </span>
        </h1>

        {/* Role */}
        <p className="font-serif italic text-sub mb-6 animate-slideUp"
          style={{ fontSize:'clamp(.95rem,3vw,1.9rem)', animationDelay:'.3s' }}>
          {ROLES[roleIdx]}
        </p>

        {/* Description */}
        <p className="font-mono text-sub leading-[1.9] max-w-[520px] mb-9 animate-slideUp"
          style={{ fontSize:'clamp(.76rem,1.5vw,.84rem)', animationDelay:'.4s' }}>
          Fresh CS graduate building full-stack web apps with <span className="text-teal">MongoDB, Express, React, Node.js, Java, Python, C &amp; PHP</span>.
          I turn complex problems into clean, performant solutions — from pixel-perfect UIs to scalable REST APIs.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-10 animate-slideUp" style={{ animationDelay:'.5s' }}>
          <button onClick={() => scrollTo('projects')}
            onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}
            className="inline-flex items-center gap-2.5 px-7 py-3 grad-teal text-void font-mono text-[.7rem] font-medium tracking-[.15em] uppercase rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,229,200,.35)]">
            View Projects →
          </button>
          <button onClick={() => scrollTo('contact')}
            onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}
            className="inline-flex items-center gap-2.5 px-7 py-3 border border-c-border text-txt font-mono text-[.7rem] tracking-[.15em] uppercase rounded-sm bg-transparent transition-all hover:border-violet hover:text-bright hover:bg-violet/8 hover:-translate-y-0.5">
            Let's Talk
          </button>
        </div>

        {/* Social icons */}
        <div className="flex gap-2.5 flex-wrap mb-12 animate-slideUp" style={{ animationDelay:'.6s' }}>
          {[['Git','https://github.com/sachin98765/'],['in','https://www.linkedin.com/in/sachinmahato/'],['✉','mailto:sm3938722@gmail.com'],['LC','https://leetcode.com/u/sachinmhato/']].map(([l,h]) => (
            <a key={l} href={h} target={h.startsWith('http')?'_blank':'_self'} rel="noreferrer"
              onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}
              className="w-10 h-10 border border-c-border rounded-sm flex items-center justify-center text-[.82rem] text-sub no-underline transition-all hover:border-teal hover:text-teal hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,229,200,.15)]">
              {l}
            </a>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid max-w-[500px] border border-c-border rounded overflow-hidden animate-slideUp"
          style={{ gridTemplateColumns:'repeat(4,1fr)', animationDelay:'.7s' }}>
          {[
            { n: counts.proj, l:'Projects'  },
            { n: counts.lc,   l:'LeetCode'  },
            { n: counts.tech, l:'Tech Stack' },
            { n: counts.cgpa, l:'CGPA'       },
          ].map(s => (
            <div key={s.l} className="bg-panel px-3 py-4 text-center border-r border-c-border last:border-r-0">
              <div className="font-display font-black text-[1.5rem] leading-none grad-text"> {s.l === 'LeetCode' ? `${s.n}+` : s.n}</div>
              <div className="text-[.52rem] tracking-[.15em] text-sub uppercase mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-[.56rem] tracking-widest uppercase" style={{ animation:'bounce2 2.5s ease-in-out infinite' }}>
        <span>scroll</span>
        <div className="w-px h-9" style={{ background:'linear-gradient(to bottom,#00e5c8,transparent)' }}/>
      </div>
      <style>{`@keyframes bounce2{0%,100%{transform:translateX(-50%) translateY(0);opacity:.4}50%{transform:translateX(-50%) translateY(8px);opacity:1}}`}</style>
    </section>
  );
}

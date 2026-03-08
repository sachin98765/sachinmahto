import { useEffect, useState, useRef } from 'react';
import { fetchSkills } from '../utils/api';
import { useInView } from '../hooks/useScrollSpy';

const TOOLS = [
  { e: '⚛️', l: 'React' },
  { e: '🟢', l: 'Node.js' },
  { e: '🍃', l: 'MongoDB' },
  { e: '⚡', l: 'Express' },
  { e: '🟨', l: 'JavaScript' },
  { e: '🔷', l: 'TypeScript' },
  { e: '🐙', l: 'Git/GitHub' },
  { e: '🎨', l: 'Tailwind' },
  { e: '🔄', l: 'Redux' },

  // Added technologies
  { e: '☕', l: 'Java' },
  { e: '🐍', l: 'Python' },
  { e: '💻', l: 'C' },
  { e: '🐘', l: 'PHP' },
  { e: '▲', l: 'Vercel' },
  { e: '🚀', l: 'Render' }
];
const DEFAULT={
  frontend:[{name:'React.js',icon:'⚛️',percentage:85,color:'teal'},{name:'JavaScript ES6+',icon:'🟨',percentage:88,color:'teal'},{name:'HTML5 & CSS3',icon:'🌐',percentage:90,color:'teal'},{name:'Tailwind CSS',icon:'🎨',percentage:82,color:'teal'},{name:'Redux Toolkit',icon:'🔄',percentage:72,color:'violet'}],
  backend:[{name:'Node.js & Express',icon:'🟢',percentage:78,color:'violet'},{name:'MongoDB & Mongoose',icon:'🍃',percentage:75,color:'violet'},{name:'REST API Design',icon:'🔗',percentage:80,color:'violet'},{name:'JWT & Auth',icon:'🔐',percentage:70,color:'amber'},{name:'Git & GitHub',icon:'🐙',percentage:85,color:'amber'}],
};
const FILL={teal:'linear-gradient(135deg,#00e5c8,#00a896)',violet:'linear-gradient(135deg,#7c5cfc,#5038c8)',amber:'linear-gradient(135deg,#f5a623,#ff4d6d)'};

function Bar({name,icon,percentage,color,animate}){
  return(
    <div className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-[.72rem] text-txt flex items-center gap-2"><span>{icon}</span>{name}</span>
        <span className="text-[.6rem] text-teal">{percentage}%</span>
      </div>
      <div className="h-[2px] bg-c-border rounded overflow-hidden">
        <div className={`skill-fill h-full rounded ${animate?'animate':''}`} style={{width:`${percentage}%`,background:FILL[color]||FILL.teal}}/>
      </div>
    </div>
  );
}

export default function Skills({ onHover }) {
  const [data,setData]=useState(DEFAULT);
  const ref=useRef(null);
  const inView=useInView(ref,.2);

  useEffect(()=>{
    fetchSkills().then(r=>{
      const d=r.data.data;
      if(d.frontend?.length||d.backend?.length) setData(d);
    }).catch(()=>{});
  },[]);

  return(
    <section id="skills" ref={ref} className="py-24 md:py-28" style={{background:'#060609'}}>
      <div className="container">
        <div className="section-eyebrow">02 — Skills</div>
        <h2 className="section-title mb-3">What I bring<br/>to the table</h2>
        <p className="font-mono text-[.78rem] leading-[1.9] text-sub max-w-[560px] mb-14">Full-stack proficiency across the MERN stack with a strong CS foundation, clean code practices. </p>
        <div className="grid md:grid-cols-2 gap-12 mb-14">
          <div>
            <div className="flex items-center gap-3 text-violet text-[.68rem] tracking-[.25em] uppercase mb-6">Frontend<span className="flex-1 h-px bg-c-border"/></div>
            {data.frontend?.map(s=><Bar key={s.name} {...s} animate={inView}/>)}
          </div>
          <div>
            <div className="flex items-center gap-3 text-violet text-[.68rem] tracking-[.25em] uppercase mb-6">Backend &amp; Database<span className="flex-1 h-px bg-c-border"/></div>
            {data.backend?.map(s=><Bar key={s.name} {...s} animate={inView}/>)}
          </div>
        </div>
        <div className="grid gap-2.5" style={{gridTemplateColumns:'repeat(auto-fill,minmax(88px,1fr))'}}>
          {TOOLS.map(t=>(
            <div key={t.l} onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)}
              className="relative overflow-hidden p-4 border border-c-border rounded bg-panel flex flex-col items-center gap-2 cursor-default transition-all hover:border-teal hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,.4)] group">
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 grad-hero"/>
              <div className="text-[1.4rem]">{t.e}</div>
              <div className="text-[.56rem] tracking-[.1em] text-sub uppercase text-center">{t.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

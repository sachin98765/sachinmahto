export default function Education({ onHover }) {
  const certs = [
  { i:'⚛️', n:'MERN Full Stack Development + Project', s:'Eduskills · 2026' },
  { i:'🔐', n:'Ethical Hacking (English Language)', s:'Eduskills · 2025' },
  { i:'☕', n:'Java Full Stack Developer', s:'Eduskills · 2025' },
  { i:'📱', n:'Google Android Developer', s:'Eduskills · 2024' },
  { i:'🤖', n:'Google AI-ML', s:'Google · 2024' },
  { i:'🎨', n:'Responsive Web Design', s:'freeCodeCamp · 2024' },
  { i:'🧠', n:'JavaScript Algorithms and Data Structures', s:'freeCodeCamp · 2024' },
  { i:'🐍', n:'Python Best Book Recommendation', s:'ARDENT · 2022' }
];
  return(
    <section id="education" className="py-24 md:py-28" style={{background:'#0b0d14'}}>
      <div className="container">
        <div className="section-eyebrow">05 — Education</div>
        <h2 className="section-title mb-14">Academic<br/>background</h2>
        <div className="grid md:grid-cols-2 gap-16">
          <div className="relative pl-6" style={{borderLeft:'1px solid',borderImage:'linear-gradient(to bottom,#00e5c8,#7c5cfc,transparent) 1'}}>
            {[{dot:'#00e5c8',dotGlow:'#00a896',year:'2023 — 2026',title:'B.Tech Computer Science and Engineering',inst:'DIT (Maulana Abul Kalam Azad University of Technology) · CGPA 7.5/10',desc:''},
            {dot:'#7c5cfc',dotGlow:'#5038c8',year:'2020 — 2023',title:'Diploma in Computer Science and Technology',inst:'Murarai Government Polytechnic · CGPA 8.2/10',desc:''}].map((item,i)=>(
              <div key={i} className="relative mb-8 pb-8 last:mb-0 last:pb-0">
                <div className="absolute left-[-29px] top-1 w-3 h-3 rounded-full" style={{background:item.dot,boxShadow:`0 0 0 4px #0b0d14, 0 0 0 5px ${item.dotGlow}`}}/>
                <div className="text-[.56rem] tracking-widest text-teal uppercase mb-1.5">{item.year}</div>
                <div className="font-display font-bold text-bright text-[1rem] mb-0.5">{item.title}</div>
                <div className="text-[.68rem] text-sub mb-2">{item.inst}</div>
                <div className="text-[.7rem] leading-[1.8] text-txt">{item.desc}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-3 text-amber text-[.68rem] tracking-[.25em] uppercase mb-5">Certifications<span className="flex-1 h-px bg-c-border"/></div>
            <div className="flex flex-col gap-2.5">
              {certs.map(c=>(
                <div key={c.n} onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)}
                  className="flex items-center gap-3.5 px-4 py-3 border border-c-border rounded bg-panel transition-all hover:border-amber hover:translate-x-1.5 hover:shadow-[-4px_0_0_#f5a623]">
                  <span className="text-xl">{c.i}</span>
                  <div><div className="text-[.71rem] text-bright mb-0.5">{c.n}</div><div className="text-[.58rem] text-sub">{c.s}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

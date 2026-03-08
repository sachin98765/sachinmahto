// ─────────────────────────────────────────────
//  About.jsx
// ─────────────────────────────────────────────
export function About({ onHover }) {
  const info = [
    ['Name','Sachin Mahato'],['Degree','B.Tech Computer Science and Engineering'],['Location','PRR, West Bengal, India'],
    ['Status','● Open to Work',true],['Availability','Immediate Joining'],['Work Mode','Full-time / Remote'],
  ];
  const tags = ['Problem Solver','Fast Learner','Team Player','Open Source','Code Artisan'];
  return (
    <section id="about" className="py-24 md:py-28" style={{background:'#0b0d14'}}>
      <div className="container">
        <div className="section-eyebrow">01 — About Me</div>
        <h2 className="section-title mb-14">The person behind<br/>the keyboard</h2>
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="relative max-w-[300px]">
              <div className="absolute inset-[-2px] rounded-lg opacity-55 z-10" style={{background:'linear-gradient(135deg,#00e5c8,#7c5cfc,#ff4d6d)',filter:'blur(18px)'}}/>
              <div className="relative z-20 aspect-square rounded bg-panel border border-c-border flex items-center justify-center overflow-hidden" style={{fontSize:'clamp(3.5rem,9vw,5.5rem)'}}>
                <div className="absolute inset-0" style={{background:'radial-gradient(circle at 30% 30%,rgba(0,229,200,.12),transparent 60%)'}}/>
                <img 
                src="/img/Capture.jpg" 
                alt="profile" 
                className=" h-full object-cover"
              />              
              </div>
              <div className="absolute top-[-8px] left-[-8px] w-14 h-14 border-teal border-t-[2px] border-l-[2px] z-30"/>
              <div className="absolute bottom-[-8px] right-[-8px] w-14 h-14 border-teal border-b-[2px] border-r-[2px] z-30"/>
            </div>
            <div className="flex flex-wrap gap-2 mt-5 max-w-[320px]">
              {tags.map(t=>(
                <span key={t} onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)}
                  className="text-[.6rem] tracking-[.1em] px-3.5 py-1.5 border border-c-border text-sub bg-surface rounded-sm transition-all hover:border-teal hover:text-teal cursor-default">{t}</span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-[.8rem] leading-[1.9] text-txt mb-4">I'm a <span className="text-teal">Computer Science graduate</span> obsessed with building things for the web. I started by cloning YouTube — today I build production-grade MERN applications.</p>
            <p className="text-[.8rem] leading-[1.9] text-txt mb-4">My superpower? Bridging <span className="text-teal">beautiful design</span> and <span className="text-teal">robust engineering</span>. I care deeply about UX, which drives me to write clean, accessible, performant code.</p>
            <p className="text-[.8rem] leading-[1.9] text-txt mb-6">When I'm not coding, I'm grinding LeetCode, contributing to open-source, or losing at chess online.</p>
            <div className="border-t border-c-border">
              {info.map(([k,v,teal])=>(
                <div key={k} className="flex gap-4 py-2.5 border-b border-c-border last:border-b-0 text-[.72rem]">
                  <span className="text-sub w-[105px] flex-shrink-0">{k}</span>
                  <span className={teal?'text-teal':'text-bright'}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

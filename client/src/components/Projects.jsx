import { useEffect, useState } from 'react';
import { fetchProjects } from '../utils/api';

const DEFAULT=[{
                _id:'1',
                title:'FreeFresherJobs — Service Platform',
                type:'Full Stack',
                emoji:'💼',
                description:'Complete MERN stack platform with JWT authentication, admin dashboard with real-time analytics, daily job updates, blog articles, resources section, and secure authentication system for managing job postings.',
                tags:['React','Node.js','MongoDB','Tailwind CSS','HTML'],
                featured:true,
                bgGradient:'linear-gradient(135deg,rgba(0,229,200,.08),rgba(124,92,252,.08))',
                githubUrl:'#',
                liveUrl:'#'
              },
              {
                _id:'2',
                title:'URL Shortener',
                type:'Full Stack',
                emoji:'🔗',
                description:'Full stack URL shortener that converts long links into short URLs, generates QR codes, includes an authentication system, and provides a dashboard showing real-time click analytics.',
                tags:['React','JavaScript','Supabase','Tailwind CSS','HTML'],
                featured:false,
                bgGradient:'linear-gradient(135deg,rgba(0,168,150,.08),rgba(124,92,252,.08))',
                githubUrl:'https://github.com/sachin98765/url-shortener',
                liveUrl:'https://url-shortener-lac-omega.vercel.app/'
              },              
              {
                _id:'3',
                title:'Notification Dashboard',
                type:'Full Stack',
                emoji:'🔔',
                description:'Full stack dashboard that displays real-time notifications and live data updates. Includes a dynamic UI for monitoring events, alerts, and activity logs.',
                tags:['React','JavaScript','MongoDB','HTML','CSS'],
                featured:false,
                bgGradient:'linear-gradient(135deg,rgba(255,77,109,.08),rgba(124,92,252,.08))',
                githubUrl:'https://github.com/sachin98765/notification-dashboard-fullstack',
                liveUrl:'https://reliable-malasada-4c5812.netlify.app/'
              },
              {
                _id:'4',
                title:'Password Generator',
                type:'Frontend',
                emoji:'🔑',
                description:'Frontend password generator that creates secure passwords of any length. Includes customizable options and acts like a recommendation system for generating strong passwords.',
                tags:['React','Tailwind CSS','HTML'],
                featured:false,
                bgGradient:'linear-gradient(135deg,rgba(0,229,200,.06),rgba(124,92,252,.08))',
                githubUrl:'https://reliable-malasada-4c5812.netlify.app/',
                liveUrl:'https://psw-generator-blush.vercel.app/'
              },
              {
                _id:'5',
                title:'Pinterest Clone',
                type:'Full Stack',
                emoji:'📌',
                description:'Full stack Pinterest-style platform with authentication system, user dashboard, account creation, and the ability to post images or videos. Includes feed browsing and content management.',
                tags:['React JS','Node JS','Express JS','MongoDB','Tailwind CSS','Bootstrap','HTML'],
                featured:false,
                bgGradient:'linear-gradient(135deg,rgba(255,77,109,.08),rgba(245,166,35,.08))',
                githubUrl:'https://github.com/sachin98765/pinterest',
                liveUrl:'#'
              },            ];

export default function Projects({ onHover }) {
  const [projects,setProjects]=useState(DEFAULT);
  useEffect(()=>{fetchProjects().then(r=>{if(r.data.data?.length)setProjects(r.data.data);}).catch(()=>{});},[]);

  return(
    <section id="projects" className="py-24 md:py-28" style={{background:'#060609'}}>
      <div className="container">
        <div className="section-eyebrow">04 — Projects</div>
        <h2 className="section-title mb-12">Things I've<br/>built &amp; shipped</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map(p=>(
            <div key={p._id} onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)}
              className={`border border-c-border rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-[0_24px_60px_rgba(0,0,0,.5),0_0_0_1px_rgba(0,229,200,.1)] group ${p.featured?'md:col-span-2':''}`}
              style={{background:'linear-gradient(145deg,#161a28 0%,#0f1220 100%)'}}>
              <div className={`relative overflow-hidden flex items-center justify-center ${p.featured?'h-[200px]':'h-[155px]'}`} style={{background:'#060609'}}>
                <div className="absolute inset-0 opacity-50" style={{background:p.bgGradient}}/>
                <div className="relative z-10 text-[2.6rem]" style={{filter:'drop-shadow(0 0 18px rgba(0,229,200,.4))'}}>{p.emoji||'🚀'}</div>
                <div className="absolute bottom-3 left-4 flex gap-1.5 z-10">
                  {['#ff5f56','#ffbd2e','#27c93f'].map(c=><div key={c} className="w-1.5 h-1.5 rounded-full" style={{background:c}}/>)}
                </div>
              </div>
              <div className="p-5">
                <span className={`inline-block text-[.54rem] tracking-widest uppercase px-2.5 py-1 rounded-sm mb-2.5 border ${p.type==='Frontend'?'text-violet bg-violet/10 border-violet/20':'text-teal bg-teal/10 border-teal/20'}`}>{p.type}</span>
                <h3 className="font-display font-bold text-bright text-[1rem] mb-2">{p.title}</h3>
                <p className="text-[.71rem] leading-[1.8] text-sub mb-3.5">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">{(p.tags||[]).map(t=><span key={t} className="text-[.54rem] px-2 py-0.5 border border-c-border text-sub rounded-sm bg-surface">{t}</span>)}</div>
                <div className="flex gap-4">
                  <a href={p.githubUrl||'#'} target="_blank" rel="noreferrer" className="text-[.62rem] tracking-[.12em] uppercase text-sub no-underline flex items-center gap-1 transition-colors hover:text-teal">⌥ GitHub</a>
                  <a href={p.liveUrl||'#'}   target="_blank" rel="noreferrer" className="text-[.62rem] tracking-[.12em] uppercase text-sub no-underline flex items-center gap-1 transition-colors hover:text-violet">↗ Live Demo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

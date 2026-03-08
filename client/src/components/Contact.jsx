import { useState } from 'react';
import { submitContact } from '../utils/api';

export default function Contact({ onHover }) {
  const [form,setForm]=useState({name:'',email:'',subject:'',message:''});
  const [status,setStatus]=useState('idle');
  const [err,setErr]=useState('');
  const set=e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
  const iCls='w-full bg-surface border border-c-border rounded-sm px-3.5 py-2.5 font-mono text-[.74rem] text-bright outline-none transition-all placeholder:text-muted focus:border-teal focus:shadow-[0_0_0_3px_rgba(0,229,200,.07)]';

  const handleSubmit=async()=>{
    if(!form.name.trim()||!form.email.trim()||!form.message.trim()){setErr('Name, email and message are required.');return;}
    setErr('');setStatus('loading');
    try{
      await submitContact(form);
      setStatus('success');
      setForm({name:'',email:'',subject:'',message:''});
      setTimeout(()=>setStatus('idle'),6000);
    }catch(e){
      setStatus('error');
      setErr(e.response?.data?.error||'Something went wrong. Please try again.');
      setTimeout(()=>{setStatus('idle');setErr('');},5000);
    }
  };

  return(
    <section id="contact" className="py-24 md:py-28 overflow-hidden relative" style={{background:'#060609'}}>
      <div className="absolute pointer-events-none" style={{bottom:'-300px',left:'50%',transform:'translateX(-50%)',width:'700px',height:'700px',background:'radial-gradient(circle,rgba(124,92,252,.09),transparent 70%)'}}/>
      <div className="container relative">
        <div className="section-eyebrow">06 — Contact</div>
        <h2 className="section-title mb-14">Got an opportunity?<br/>Let's talk.</h2>
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16">
          <div>
            <h3 className="font-display font-bold text-bright text-[1.1rem] mb-3 leading-snug">Open for roles,<br/>freelance &amp; collabs.</h3>
            <p className="text-[.74rem] leading-[1.9] text-sub mb-8">I'm actively looking for my first full-time MERN Stack role. Whether it's a job, freelance project, or just a chat — my inbox is always open.</p>
            {[['✉','Email','sm3938722@gmail.com'],['📍','Location','PRR, West Bengal, India (Remote OK)'],['⏱','Response Time','Within 24 hours']].map(([ico,lbl,val])=>(
              <div key={lbl} className="flex items-center gap-3.5 mb-3.5">
                <div className="w-9 h-9 border border-c-border rounded-sm flex items-center justify-center text-sm bg-surface flex-shrink-0">{ico}</div>
                <div><div className="text-[.54rem] tracking-[.15em] uppercase text-sub">{lbl}</div><div className="text-[.71rem] text-txt">{val}</div></div>
              </div>
            ))}
            <div className="flex gap-2.5 mt-7 flex-wrap">
              {[['GitHub','https://github.com'],['LinkedIn','https://linkedin.com'],['LeetCode','https://leetcode.com']].map(([l,h])=>(
                <a key={l} href={h} target="_blank" rel="noreferrer"
                  onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)}
                  className="px-4 py-2 border border-c-border rounded-sm text-[.6rem] tracking-[.12em] uppercase text-sub bg-surface no-underline transition-all hover:border-violet hover:text-violet hover:bg-violet/5">{l}</a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div><label className="block text-[.57rem] tracking-widest uppercase text-sub mb-1.5">Your Name</label><input name="name" value={form.name} onChange={set} placeholder="Enter Your Name" className={iCls}/></div>
              <div><label className="block text-[.57rem] tracking-widest uppercase text-sub mb-1.5">Email</label><input name="email" type="email" value={form.email} onChange={set} placeholder="Enter Your Email Address" className={iCls}/></div>
            </div>
            <div><label className="block text-[.57rem] tracking-widest uppercase text-sub mb-1.5">Subject</label><input name="subject" value={form.subject} onChange={set} placeholder="Job Opportunity / Collaboration" className={iCls}/></div>
            <div><label className="block text-[.57rem] tracking-widest uppercase text-sub mb-1.5">Message</label><textarea name="message" value={form.message} onChange={set} placeholder="Tell me about the opportunity…" rows={5} className={`${iCls} resize-y`}/></div>
            {err&&<p className="text-[.72rem] text-rose">{err}</p>}
            <button onClick={handleSubmit} disabled={status==='loading'}
              onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)}
              className="self-start px-8 py-3 grad-teal text-void font-mono text-[.68rem] font-medium tracking-widest uppercase rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,229,200,.35)] disabled:opacity-60 disabled:pointer-events-none">
              {status==='loading'?'Sending…':'Send Message →'}
            </button>
            {status==='success'&&(
              <div className="px-4 py-3.5 rounded border text-[.71rem] text-teal" style={{background:'rgba(0,229,200,.08)',borderColor:'rgba(0,229,200,.25)'}}>
                ✓ Message sent! I'll get back to you within 24 hours.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

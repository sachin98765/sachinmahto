import { useEffect, useState, useRef } from 'react';
import { fetchLeetcode } from '../utils/api';
import { useInView } from '../hooks/useScrollSpy';

const DIFF_CLS={Easy:'bg-lgreen/10 text-lgreen border-lgreen/20',Medium:'bg-amber/10 text-amber border-amber/20',Hard:'bg-rose/10 text-rose border-rose/20'};
const FALLBACK={totalSolved:0,easy:0,medium:0,hard:0,maxStreak:0,contestRating:0,globalRank:'Top 100%',
  profileUrl:'https://leetcode.com',topicStats:[{icon:'📋',name:'Arrays & Hashing',solved:28},
    {icon:'🪟',name:'Two Pointers',solved:15},{icon:'🪄',name:'Sliding Window',solved:12},{icon:'📚',name:'Stack & Queue',solved:18},{icon:'🔍',name:'Binary Search',solved:14},{icon:'🔗',name:'Linked Lists',solved:16},{icon:'🌲',name:'Trees & BST',solved:22},{icon:'🕸️',name:'Graphs BFS/DFS',solved:17},{icon:'⚡',name:'Dynamic Programming',solved:14},{icon:'🔢',name:'Heap/Priority Q',solved:9},{icon:'↩️',name:'Backtracking',solved:8},{icon:'🧮',name:'Bit Manipulation',solved:7}],recentSolves:[{problemId:1,title:'Two Sum',difficulty:'Easy',tags:['Array','Hash Map'],solvedAt:'2 days ago'},{problemId:15,title:'3Sum',difficulty:'Medium',tags:['Array','Two Pointers'],solvedAt:'3 days ago'},{problemId:42,title:'Trapping Rain Water',difficulty:'Hard',tags:['Array','Stack'],solvedAt:'4 days ago'},{problemId:200,title:'Number of Islands',difficulty:'Medium',tags:['BFS','Graph'],solvedAt:'5 days ago'},{problemId:70,title:'Climbing Stairs',difficulty:'Easy',tags:['DP','Math'],solvedAt:'6 days ago'},{problemId:124,title:'Binary Tree Max Path Sum',difficulty:'Hard',tags:['Tree','DFS'],solvedAt:'1 week ago'},{problemId:238,title:'Product of Array Except Self',difficulty:'Medium',tags:['Array'],solvedAt:'1 week ago'},{problemId:56,title:'Merge Intervals',difficulty:'Medium',tags:['Array','Sorting'],solvedAt:'1 week ago'}]};

function Heatmap(){
  return(
    <div className="overflow-x-auto pb-2" style={{scrollbarWidth:'thin'}}>
      <div className="flex gap-[3px]" style={{minWidth:'max-content'}}>
        {Array.from({length:26}).map((_,w)=>(
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({length:7}).map((_,d)=>{
              const r=Math.random();
              const bg=r>.65?[,'rgba(0,229,200,.18)','rgba(0,229,200,.42)','rgba(0,229,200,.68)','#00e5c8'][Math.floor(Math.random()*4)+1]:'#1e2438';
              return<div key={d} className="w-[11px] h-[11px] rounded-[2px] hover:scale-150 transition-transform cursor-default" style={{background:bg}}/>;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LeetCode({ onHover }) {
  const [data,setData]=useState(FALLBACK);
  const [counter,setCounter]=useState(0);
  const [rings,setRings]=useState({easy:502,medDash:'502',medOff:502,hardDash:'502',hardOff:502});
  const ref=useRef(null);
  const inView=useInView(ref,.25);
  const animated=useRef(false);

  useEffect(()=>{fetchLeetcode().then(r=>{if(r.data.data)setData(r.data.data);}).catch(()=>{});},[]);

  useEffect(()=>{
    if(!inView||animated.current)return;
    animated.current=true;
    const {totalSolved:T=0,easy:E=0,medium:M=0,hard:H=0}=data;
    const C=502;
    let c=0; const iv=setInterval(()=>{c+=3;setCounter(Math.min(c,T));if(c>=T)clearInterval(iv);},28);
    setTimeout(()=>{
      setRings({
        easy:C*(1-E/T),
        medDash:`${C*M/T} ${C*(1-M/T)}`,medOff:-(C*E/T)+C*(1-M/T),
        hardDash:`${C*H/T} ${C*(1-H/T)}`,hardOff:-(C*(E+M)/T)+C*(1-H/T),
      });
    },200);
  },[inView,data]);

  return(
    <section id="leetcode" ref={ref} className="py-24 md:py-28" style={{background:'#0b0d14'}}>
      <div className="container">
        <div className="section-eyebrow">03 — DSA &amp; Problem Solving</div>
        <h2 className="section-title mb-3">LeetCode <span className="grad-text" style={{backgroundImage:'linear-gradient(135deg,#f5a623,#ff4d6d)'}}>160+ Solved</span></h2>
        <p className="font-mono text-[.78rem] leading-[1.9] text-sub max-w-[560px] mb-12">Consistent problem-solving across arrays, sorting, string, two pointers, dynamic programming, divide and conquer  & more. </p>

        {/* Donut + Stats */}
        <div className="grid md:grid-cols-2 gap-9 mb-12">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-44 h-44">
              <svg viewBox="0 0 180 180" className="w-full h-full" style={{transform:'rotate(-90deg)'}}>
                <circle fill="none" stroke="#1e2438" strokeWidth="12" cx="90" cy="90" r="80"/>
                <circle fill="none" strokeWidth="12" strokeLinecap="round" cx="90" cy="90" r="80" stroke="#22c55e" strokeDasharray="502" strokeDashoffset={rings.easy} style={{transition:'stroke-dashoffset 1.8s cubic-bezier(.16,1,.3,1)'}}/>
                <circle fill="none" strokeWidth="12" strokeLinecap="round" cx="90" cy="90" r="80" stroke="#f5a623" strokeDasharray={rings.medDash} strokeDashoffset={rings.medOff} style={{transition:'stroke-dashoffset 1.8s cubic-bezier(.16,1,.3,1) .15s'}}/>
                <circle fill="none" strokeWidth="12" strokeLinecap="round" cx="90" cy="90" r="80" stroke="#ff4d6d" strokeDasharray={rings.hardDash} strokeDashoffset={rings.hardOff} style={{transition:'stroke-dashoffset 1.8s cubic-bezier(.16,1,.3,1) .3s'}}/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-display font-black text-[2.2rem] leading-none grad-text">{counter}+</div>
                <div className="text-[.55rem] tracking-widest text-sub uppercase mt-0.5">Solved</div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap justify-center">
              {[['#22c55e','114','Easy'],['#f5a623','48','Medium'],['#ff4d6d','2','Hard']].map(([c,n,l])=>(
                <div key={l} className="flex items-center gap-2 text-[.68rem]">
                  <div className="w-2.5 h-2.5 rounded-full" style={{background:c}}/><span className="text-bright font-medium">{n}</span><span className="text-sub">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[{cls:'border-l-[3px] border-l-lgreen',icon:'🟢',lbl:'Easy',num:data.easy||0,nc:'text-lgreen',sub:'/ 929 total'},
            {cls:'border-l-[3px] border-l-amber',icon:'🟡',lbl:'Medium',num:data.medium||0,nc:'text-amber',sub:'/ 2019 total'},
            {cls:'border-l-[3px] border-l-rose',icon:'🔴',lbl:'Hard',num:data.hard||0,nc:'text-rose',sub:'/ 912 total'}].map(s=>(
              <div key={s.lbl} onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)}
                className={`${s.cls} p-4 border border-c-border rounded bg-panel transition-all hover:-translate-y-1`}>
                <div className="flex items-center gap-2 mb-1.5"><span className="text-lg">{s.icon}</span><span className="text-[.56rem] tracking-widest uppercase text-sub">{s.lbl}</span></div>
                <div className={`font-display font-black text-[1.7rem] leading-none ${s.nc}`}>{s.num}</div>
                <div className="text-[.6rem] text-sub mt-0.5">{s.sub}</div>
              </div>
            ))}
            <div onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)}
              className="border-l-[3px] border-l-violet col-span-2 p-4 border border-c-border rounded bg-panel transition-all hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-1.5"><span className="text-lg">🔥</span><span className="text-[.56rem] tracking-widest uppercase text-sub">Max Streak</span></div>
              <div className="font-display font-black text-[1.7rem] leading-none" style={{background:'linear-gradient(135deg,#7c5cfc,#5038c8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{data.maxStreak||0} days</div>
              <div className="text-[.6rem] text-sub mt-0.5">{data.globalRank||'Top 100%'} globally · Rating: {data.contestRating||0}</div>
            </div>
          </div>
        </div>

        {/* Topics */}
        {/* <div className="mb-12">
          <div className="flex items-center gap-3 text-amber text-[.68rem] tracking-[.25em] uppercase mb-5">Topic Mastery<span className="flex-1 h-px bg-c-border"/></div>
          <div className="grid gap-2.5" style={{gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))'}}>
            {(data.topicStats||FALLBACK.topicStats).map(t=>(
              <div key={t.name} onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)}
                className="flex items-center gap-3 p-3.5 border border-c-border rounded bg-surface transition-all hover:border-violet hover:translate-x-1 cursor-default">
                <span className="text-base flex-shrink-0">{t.icon}</span>
                <div><div className="text-[.68rem] text-bright mb-0.5">{t.name}</div><div className="text-[.58rem] text-sub">{t.solved} solved</div></div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Heatmap */}
        {/* <div className="mb-12">
          <div className="flex items-center gap-3 text-violet text-[.68rem] tracking-[.25em] uppercase mb-5">Submission Activity — Last 6 Months<span className="flex-1 h-px bg-c-border"/></div>
          <Heatmap/>
        </div> */}

        {/* Recent solves */}
        {/* <div>
          <div className="flex items-center gap-3 text-teal text-[.68rem] tracking-[.25em] uppercase mb-5">Recent Solves<span className="flex-1 h-px bg-c-border"/></div>
          <div className="overflow-x-auto border border-c-border rounded bg-panel" style={{scrollbarWidth:'thin'}}>
            <table className="w-full border-collapse" style={{minWidth:'520px'}}>
              <thead><tr>{['#','Problem','Difficulty','Topics','When'].map(h=><th key={h} className="text-[.58rem] tracking-widest uppercase text-sub px-4 py-2.5 text-left border-b border-c-border whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody>
                {(data.recentSolves||FALLBACK.recentSolves).map(r=>(
                  <tr key={r.problemId} className="hover:bg-white/[.02] transition-colors">
                    <td className="px-4 py-3 text-[.62rem] text-sub border-b border-c-border/50">{r.problemId}</td>
                    <td className="px-4 py-3 text-[.72rem] text-bright font-medium border-b border-c-border/50">{r.title}</td>
                    <td className="px-4 py-3 border-b border-c-border/50"><span className={`text-[.53rem] tracking-widest uppercase px-2.5 py-1 rounded-sm border ${DIFF_CLS[r.difficulty]||''}`}>{r.difficulty}</span></td>
                    <td className="px-4 py-3 border-b border-c-border/50">{(r.tags||[]).map(t=><span key={t} className="text-[.53rem] px-2 py-0.5 border border-c-border text-sub rounded-sm mr-1 whitespace-nowrap">{t}</span>)}</td>
                    <td className="px-4 py-3 text-[.62rem] text-sub border-b border-c-border/50 whitespace-nowrap">{typeof r.solvedAt==='string'?r.solvedAt:new Date(r.solvedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <a href={data.profileUrl||'https://leetcode.com'} target="_blank" rel="noreferrer"
            onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)}
            className="inline-flex items-center gap-2.5 mt-6 px-6 py-3 border rounded text-amber text-[.66rem] tracking-[.15em] uppercase no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(245,166,35,.15)]"
            style={{borderColor:'rgba(245,166,35,.3)',background:'rgba(245,166,35,.05)'}}>
            View Full LeetCode Profile ↗
          </a>
        </div> */}
      </div>
    </section>
  );
}

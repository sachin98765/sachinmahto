import { scrollTo } from '../hooks/useScrollSpy';

export default function Footer() {
  return (
    <footer className="border-t border-c-border py-8 px-5 md:px-[60px] flex flex-col md:flex-row items-center justify-between flex-wrap gap-4" style={{background:'#060609'}}>
      <div className="font-display font-extrabold text-base grad-text">
        <span className="font-mono text-teal/40 font-light text-sm">[</span>Sachin Mahato<span className="font-mono text-teal/40 font-light text-sm">]</span>
      </div>
      <div className="text-[.6rem] tracking-[.1em] text-sub text-center">
        © 2026 Sachin Mahato · Built with <span className="text-teal">MERN Stack</span> &amp; ♥
      </div>
      <button onClick={() => scrollTo('hero')}
        className="text-[.58rem] tracking-[.15em] text-sub uppercase transition-colors hover:text-teal">
        Back to Top ↑
      </button>
    </footer>
  );
}

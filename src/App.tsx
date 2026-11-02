import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { projects, roles, type Project } from './data';

const sections = [{id:'intro',label:'Intro'},{id:'work',label:'Selected work'},{id:'experience',label:'Experience'},{id:'about',label:'About'},{id:'contact',label:'Contact'}];

const HERO_TITLE = 'Rodolph\nMesadieu.';

function TypewriterTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Skip animation for reduced-motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(HERO_TITLE.length);
      return;
    }

    let index = 0;
    let typingInterval: number | undefined;

    const startDelay = window.setTimeout(() => {
      typingInterval = window.setInterval(() => {
        index += 1;
        setCount(index);

        if (index >= HERO_TITLE.length) {
          window.clearInterval(typingInterval);
        }
      }, 90);
    }, 250);

    return () => {
      window.clearTimeout(startDelay);
      window.clearInterval(typingInterval);
    };
  }, []);

  const [firstLine, secondLine = ''] = HERO_TITLE
    .slice(0, count)
    .split('\n');

  const showPeriod = secondLine.endsWith('.');
  const lastName = showPeriod
    ? secondLine.slice(0, -1)
    : secondLine;

  const typing = count < HERO_TITLE.length;

  return (
    <h1
      aria-label="Rodolph Mesadieu"
      className="relative mb-10 text-[clamp(4.2rem,10.4vw,9.5rem)] font-normal leading-[.81] tracking-[-.095em]"
    >
      {/* Reserve space to prevent layout shifting */}
      <span aria-hidden="true" className="invisible select-none">
        Rodolph<br />
        Mesadieu<span className="text-blue">.</span>
      </span>

      {/* Animated text */}
      <span aria-hidden="true" className="absolute inset-0">
        {firstLine}

        {count > 'Rodolph'.length && (
          <>
            <br />
            {lastName}
            {showPeriod && (
              <span className="text-blue">.</span>
            )}
          </>
        )}

        {/* Blinking cursor */}
        {typing && (
          <span
            className="ml-[.05em] inline-block h-[.72em] w-[.045em] animate-pulse bg-blue align-[-.06em] motion-reduce:hidden"
          />
        )}
      </span>
    </h1>
  );
}

function useTheme() {
 const [dark,setDark]=useState(()=>localStorage.getItem('rm-theme')==='dark');
 useEffect(()=>{document.documentElement.classList.toggle('dark',dark);localStorage.setItem('rm-theme',dark?'dark':'light')},[dark]);
 return {dark,setDark};
}

function Wordmark(){
    return <a href="#intro" aria-label="Back to top" className="font-bold text-xl tracking-[-.08em] leading-none select-none">RM<span className="text-blue">.</span></a>
}

function ProjectArt({project}:{project:Project}){
    return <div className={`relative overflow-hidden aspect-square rounded-[5px] ${project.tint} flex items-center justify-center transition-colors duration-500`}>
        <div className="absolute inset-5 border border-black/10 dark:border-white/10 rounded-sm"/>
            <div className="absolute top-8 left-9 text-[10px] tracking-[.22em] uppercase font-semibold opacity-50">RM / {project.number}</div>
            <div className="text-[clamp(64px,8vw,116px)] font-semibold tracking-[-.11em] pr-4 text-ink/85 dark:text-white/85 transition-transform duration-500 group-hover:scale-110">{project.mark}</div>
            <div className="absolute bottom-8 left-9 right-9 flex justify-between text-[10px] tracking-[.15em] uppercase opacity-60"><span>{project.title}</span><span>↗</span></div>
        </div>
        }

function DetailModal({project,onClose}:{project:Project;onClose:()=>void})
{
 useEffect(()=>{
    const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose()        
    };
    window.addEventListener('keydown',fn);document.body.style.overflow='hidden';
    return()=>{
        window.removeEventListener('keydown',fn);document.body.style.overflow=''
    }
},[onClose]);

 return <div role="presentation" className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-start md:items-center justify-center overflow-y-auto p-3 sm:p-6" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div role="dialog" aria-modal="true" aria-label={project.title} className="w-full max-w-3xl bg-paper dark:bg-[#111] text-ink dark:text-white my-5 rounded-lg shadow-2xl overflow-hidden"><div className="p-5 flex justify-between border-b border-line"><span className="smallcaps">Project / {project.number}</span><button onClick={onClose} aria-label="Close project details" className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full"><X size={20}/></button></div><div className="p-6 md:p-10"><div className="max-w-[340px] mb-8"><ProjectArt project={project}/></div><div className="smallcaps text-blue mb-4">{project.eyebrow}</div><h2 className="text-5xl md:text-7xl tracking-[-.065em] mb-5">{project.title}</h2><p className="text-lg text-muted max-w-2xl leading-relaxed">{project.detail}</p><div className="mt-10 border-t border-line pt-8"><h3 className="text-2xl font-semibold tracking-tight mb-5">What I worked on</h3>{project.highlights.map(x=><p key={x} className="py-3 border-b border-line flex gap-4"><span className="text-blue">↗</span>{x}</p>)}</div><div className="flex flex-wrap gap-2 mt-7">{project.tags.map(t=><span key={t} className="tag">{t}</span>)}</div></div></div></div>
}

export default function App(){
 const {dark,setDark}=useTheme();
 const carousel=useRef<HTMLDivElement>(null);
 const [menu,setMenu]=useState(false);
 const [active,setActive]=useState('intro');
 const [progress,setProgress]=useState(0);
 const [selected,setSelected]=useState<Project|null>(null);

 useEffect(()=>{const update=()=>{
    const doc=document.documentElement;setProgress(doc.scrollHeight>innerHeight?window.scrollY/(doc.scrollHeight-innerHeight)*100:0);
    let current='intro';
    for(const x of sections){
        const el=document.getElementById(x.id);
        if(el&&el.getBoundingClientRect().top<innerHeight*.36)current=x.id
    }
    setActive(current)
};
update();
window.addEventListener('scroll',update,{passive:true});
return()=>window.removeEventListener('scroll',update)
},[]);
 function slide(direction:number){carousel.current?.scrollBy({left:direction*342,behavior:'smooth'})}
 
 return <div className="min-h-screen bg-paper dark:bg-[#101110] text-ink dark:text-[#f6f5f2] transition-colors duration-300">
 <div className="fixed z-[70] top-0 left-0 h-[3px] bg-blue transition-[width] duration-100" style={{width:`${progress}%`}}/>
 <header className="sticky top-0 z-50 border-b border-line bg-paper/95 dark:bg-[#101110]/95 backdrop-blur-lg"><div className="shell h-[72px] flex items-center gap-10 justify-between"><Wordmark/><nav aria-label="Main navigation" className="hidden md:flex items-center gap-9 mr-auto ml-16">{sections.slice(1).map(s=><a key={s.id} className="navlink" href={`#${s.id}`}>{s.label}</a>)}</nav><span className="hidden sm:block text-sm text-muted">New York, NY <span className="mx-1 text-blue">•</span> EST</span><button className="iconbtn" onClick={()=>setDark(!dark)} aria-label={`Switch to ${dark?'light':'dark'} mode`}>{dark?<Sun size={19}/>:<Moon size={19}/>}</button><button className="md:hidden iconbtn" onClick={()=>setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}>{menu?<X size={20}/>:<Menu size={20}/>}</button></div>{menu&&<nav className="md:hidden shell pb-5 flex flex-col gap-3" aria-label="Mobile navigation">{sections.map(s=><a onClick={()=>setMenu(false)} className="text-lg" key={s.id} href={`#${s.id}`}>{s.label}</a>)}</nav>}</header>
 <main>
 <section id="intro" className="shell pt-16 md:pt-28 pb-24 md:pb-32">
    <div className="grid md:grid-cols-[minmax(0,1fr)_270px] gap-14 items-end">
        <div>
            <div className="smallcaps mb-8 flex items-center gap-3">
                <span className="inline-block bg-blue w-2 h-2 rounded-full"/> 
                Software engineer / Designer
            </div>
            {TypewriterTitle()} 
            <p className="text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.65] max-w-[720px] text-muted">
                I bring digital products and the systems that make them work to life. Across backend infrastructure, healthcare technology, independent products and ambitious ideas, I make the complex feel effortless. Currently with <strong>Fitch Group</strong> and my New York Studio,  
                <strong> Soliloquy</strong>.
                 
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-9">
                <a className="inline-flex items-center gap-2 link-underline" href="#work">
                    Explore selected work <ArrowDown size={17}/>
                </a>
                <a className="inline-flex items-center gap-2 text-muted hover:text-blue" href="#contact">
                    Get in touch 
                    <ArrowUpRight size={17}/>
                </a>
                </div>
                </div>
                <div className="hidden md:block relative aspect-[4/5] overflow-hidden border border-line bg-[#e9e8e2] dark:bg-[#252626] rounded-sm">
                    <div className="absolute top-5 left-5 right-5 flex justify-between items-end">
                        <span className="smallcaps text-muted z-20">Engineering<br/>with intention.</span>
                        <span className="text-3xl text-blue">✳</span>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <img
                                src="/images/blk-white-hero.png"
                                alt="Rodolph Mesadieu"
                                className="w-full h-full z-10 object-contain object-bottom
                                            opacity-90 transition-all duration-700
                                            ease-in-out hover:opacity-100
                                            hover:scale-105"
                            />
                        <span className="text-[11rem] leading-none font-semibold tracking-[-.16em] mr-6 opacity-20 z-10">                            
                        </span>
                    </div>                    
                </div>
    </div>
    <div className="flex items-center gap-3 mt-16 text-xs tracking-[.2em] uppercase text-muted">
        <span className="w-8 h-px bg-current"/> 
        Scroll to explore
    </div>
</section>
 <section id="work" className="pb-24 md:pb-36 scroll-mt-24"><div className="shell flex justify-between items-end mb-6"><div><p className="smallcaps text-blue mb-3">01 / A selection of things I've built</p><h2 className="section-title">Selected work<span className="text-blue">.</span></h2></div><div className="hidden sm:flex gap-2"><button className="arrowbtn" aria-label="Scroll projects left" onClick={()=>slide(-1)}><ChevronLeft size={19}/></button><button className="arrowbtn" aria-label="Scroll projects right" onClick={()=>slide(1)}><ChevronRight size={19}/></button></div></div><div ref={carousel} className="work-scroller flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pl-[max(20px,calc((100vw-1200px)/2+20px))] pr-6 pb-7" tabIndex={0} aria-label="Selected projects, horizontally scrollable">{projects.map(p=><button key={p.title} onClick={()=>setSelected(p)} className="group w-[280px] sm:w-[316px] flex-shrink-0 snap-start text-left p-3 rounded-xl hover:bg-black/[.035] dark:hover:bg-white/[.06] hover:-translate-y-1 transition-all duration-300 focus-visible:outline-blue"><ProjectArt project={p}/><div className="mt-5 flex justify-between items-start gap-2"><div><p className="smallcaps text-muted mb-2">{p.eyebrow}</p><h3 className="text-[27px] tracking-[-.05em] font-semibold">{p.title}</h3></div><ArrowUpRight className="mt-2 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={20}/></div><p className="mt-3 text-[15px] leading-relaxed text-muted line-clamp-3">{p.description}</p><div className="flex flex-wrap gap-1.5 mt-4">{p.tags.slice(0,3).map(t=><span className="tag" key={t}>{t}</span>)}</div></button>)}</div><p className="shell mt-2 text-xs tracking-[.13em] uppercase text-muted">Scroll to explore projects <ArrowRight size={13} className="inline-block ml-1"/></p></section>
 <section id="experience" className="shell pb-28 scroll-mt-24"><p className="smallcaps text-blue mb-3">02 / Where I've made an impact</p><h2 className="section-title mb-12">Experience<span className="text-blue">.</span></h2><div className="border-t border-line">{roles.map((r,i)=><div key={r.company} className="grid md:grid-cols-[.8fr_1.2fr_1fr] gap-4 md:gap-10 py-9 border-b border-line"><div><span className="smallcaps text-muted">0{i+1} / {r.when}</span><h3 className="text-3xl tracking-[-.05em] mt-2">{r.company}</h3></div><div><p className="text-lg font-medium mb-3">{r.role}</p><p className="text-muted leading-relaxed">{r.detail}</p></div><div className="flex flex-wrap gap-2 md:justify-end md:content-start">{r.chips.map(c=><span className="tag h-fit" key={c}>{c}</span>)}</div></div>)}</div><div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12"><Stat big="24%" small="API latency reduction"/><Stat big="30%" small="Faster deployments"/><Stat big="27%" small="Lean GraphQL payloads"/><Stat big="25%" small="Release frequency gain"/></div></section>
 <section id="about" className="border-y border-line bg-[#f0efeb] dark:bg-[#181a18] scroll-mt-24"><div className="shell py-24 md:py-32 grid md:grid-cols-[.75fr_1.25fr] gap-12 md:gap-24"><div><p className="smallcaps text-blue mb-3">03 / A little about me</p><h2 className="section-title">Beyond<br/>the code<span className="text-blue">.</span></h2></div><div><p className="text-2xl md:text-[31px] leading-[1.45] tracking-[-.035em]">I'm a New York–based software engineer who loves the intersection of <span className="text-blue">engineering, design, and entrepreneurship.</span></p><p className="mt-8 text-muted text-lg leading-[1.8]">My work spans API platforms, secure healthcare integrations, full-stack applications, and AI-powered tools. I bring the same curiosity to product strategy as I do to distributed systems—and I believe great technology should be useful, elegant, and built to last.</p><p className="mt-5 text-muted text-lg leading-[1.8]">Outside engineering, my background includes competitive college basketball. It shaped how I think about teamwork, practice, and showing up when the work gets difficult.</p><div className="flex flex-wrap gap-2 mt-9">{['Java / Spring Boot','Python','TypeScript','React','Next.js','PostgreSQL','Supabase','Docker','Kubernetes','Azure','AI workflows'].map(t=><span className="tag" key={t}>{t}</span>)}</div></div></div></section>
 <section id="contact" className="shell py-24 md:py-36 scroll-mt-24"><p className="smallcaps text-blue mb-3">04 / The next conversation</p><h2 className="text-[clamp(4rem,10vw,9rem)] tracking-[-.09em] leading-[.95]">Let's build<br/><span className="text-blue">something great.</span></h2><p className="text-lg text-muted leading-relaxed mt-9 max-w-[680px]">Have a challenging engineering problem, a thoughtful product idea, or a role worth talking about? I'd love to hear it.</p><div className="flex flex-wrap gap-4 mt-10"><a className="contactlink" href="mailto:hello@rmesadieu.com"><Mail size={18}/> Email me <ArrowUpRight size={16}/></a><a className="contactlink secondary" href="https://www.linkedin.com/in/rodolph-mesadieu" target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> LinkedIn <ArrowUpRight size={16}/></a><a className="contactlink secondary" href="https://github.com/rmesa19" target="_blank" rel="noopener noreferrer"><Github size={18}/> GitHub <ArrowUpRight size={16}/></a></div></section>
 </main><footer className="border-t border-line"><div className="shell py-7 flex flex-wrap justify-between gap-4 items-center"><Wordmark/><span className="text-sm text-muted">© {new Date().getFullYear()} Rodolph Mesadieu. Made with intention.</span><a href="#intro" className="flex items-center gap-2 text-sm hover:text-blue">Back to top <ArrowLeft className="rotate-90" size={16}/></a></div></footer>
 <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-3 items-center">{sections.map(s=><a key={s.id} title={s.label} aria-label={s.label} href={`#${s.id}`} className={`w-2.5 h-2.5 rounded-full transition-all ${active===s.id?'bg-blue scale-125':'bg-[#b4b4b0] dark:bg-[#555] hover:bg-blue'}`}/>)}</div>
 {selected&&<DetailModal project={selected} onClose={()=>setSelected(null)}/>}
 </div>
}
function Stat({big,small}:{big:string;small:string}){return <div><p className="text-4xl md:text-5xl tracking-[-.07em] text-blue">{big}</p><p className="text-muted text-sm mt-2">{small}</p></div>}

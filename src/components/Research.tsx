import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RESEARCH_PUBLICATION } from '../data/portfolioData';
import { BookOpen, ExternalLink, Cpu, Radio, ShieldCheck, CheckCircle, Award, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Research: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(titleRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo(contentRef.current, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-28 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center overflow-hidden border-t border-white/5 bg-gradient-to-b from-[#080808] via-[#100305] to-[#080808]"
    >
      {/* Deep crimson ambient lighting */}
      <div className="red-halo" style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.22, filter: 'blur(100px)' }} aria-hidden="true" />

      {/* Section Title */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-16 z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="glass-chip-red text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full text-white flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-white" />
            {RESEARCH_PUBLICATION.badge}
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase text-white">
          {RESEARCH_PUBLICATION.heading}
        </h2>
        <div className="w-24 h-1.5 bg-[#e50924] mt-3 rounded-full shadow-[0_0_15px_#e50924]" />
      </div>

      {/* Main Research Card Container */}
      <div ref={contentRef} className="relative w-full max-w-6xl z-10">
        <div className="glass rounded-3xl p-6 sm:p-10 md:p-14 border border-[#e50924]/40 shadow-2xl shadow-red-950/40 relative overflow-hidden">
          {/* IEEE Distinction Watermark Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#006699]/20 border border-[#006699]/50 flex items-center justify-center text-[#3399cc] font-black text-sm tracking-wider">
                IEEE
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#e50924] font-bold">
                  Peer-Reviewed Publication
                </span>
                <p className="text-xs sm:text-sm text-gray-400 font-medium">
                  {RESEARCH_PUBLICATION.conference}
                </p>
              </div>
            </div>

            {/* Configurable Paper Link Button */}
            <a
              href={RESEARCH_PUBLICATION.publicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-red inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white uppercase tracking-wider transition-all hover:scale-105 shadow-[0_0_20px_rgba(229,9,36,0.4)]"
            >
              <span>View IEEE Publication</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Paper Title & Abstract */}
          <div className="mb-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-snug mb-4">
              {RESEARCH_PUBLICATION.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-5xl">
              {RESEARCH_PUBLICATION.summary}
            </p>
          </div>

          {/* Research Architecture & Dataflow Diagram */}
          <div className="mb-12">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e50924] mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> ADOS Edge Anomaly Filtering Dataflow Architecture:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {RESEARCH_PUBLICATION.architecturePhases.map((phase, idx) => (
                <div
                  key={idx}
                  className="glass bg-white/[0.02] p-5 rounded-2xl border border-white/5 relative flex flex-col justify-between group hover:border-[#e50924]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-6 h-6 rounded-lg bg-red-600/20 text-[#e50924] font-mono text-xs font-black flex items-center justify-center border border-[#e50924]/30">
                        0{idx + 1}
                      </span>
                      {idx === 0 && <Cpu className="w-4 h-4 text-gray-400" />}
                      {idx === 1 && <BarChart3 className="w-4 h-4 text-[#e50924]" />}
                      {idx === 2 && <ShieldCheck className="w-4 h-4 text-amber-400" />}
                      {idx === 3 && <Radio className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <h5 className="font-bold text-sm text-white mb-1.5">{phase.title}</h5>
                    <p className="text-xs text-gray-400 leading-relaxed">{phase.desc}</p>
                  </div>

                  <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-[#e50924] rounded-full" style={{ width: `${(idx + 1) * 25}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empirical Highlights Grid */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e50924] mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Validated Research Highlights &amp; Empirical Results:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {RESEARCH_PUBLICATION.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="glass bg-[#140608]/40 p-4 rounded-2xl border border-[#e50924]/20 flex items-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-[#e50924] shrink-0 mt-2 shadow-[0_0_8px_#e50924]" />
                  <span className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


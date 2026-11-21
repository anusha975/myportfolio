import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2, Globe, Cpu, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>(EXPERIENCES[0].id);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo(
          '.exp-card',
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeExperience = EXPERIENCES.find((e) => e.id === activeTab) || EXPERIENCES[0];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-28 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Background red atmospheric glow */}
      <div className="red-halo" style={{ top: '20%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.15 }} aria-hidden="true" />

      {/* Section Title */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-16 z-10">
        <span className="text-[#e50924] font-bold uppercase text-xs sm:text-sm md:text-base tracking-[0.25em] mb-2 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#e50924]" />
          Industrial Work &amp; Research
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase text-white">
          PROFESSIONAL EXPERIENCE.
        </h2>
        <div className="w-20 h-1.5 bg-[#e50924] mt-3 rounded-full shadow-[0_0_12px_#e50924]" />
      </div>

      <div className="relative w-full max-w-6xl z-10">
        {/* Interactive Experience Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          {EXPERIENCES.map((exp) => {
            const isSelected = activeTab === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`relative px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 ${
                  isSelected
                    ? 'glass-red text-white scale-105 shadow-[0_0_20px_rgba(229,9,36,0.35)]'
                    : 'glass text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Cpu className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#e50924]'}`} />
                <span>{exp.company.split(' ')[0]} {exp.company.includes('MAAD') ? 'IoT' : 'Research'}</span>
                {exp.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {exp.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Experience Display Card */}
        <div className="exp-card glass rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10 relative overflow-hidden transition-all duration-300 shadow-2xl">
          {/* Subtle decorative circuit watermark */}
          <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5">
            <Cpu className="w-64 h-64 text-[#e50924]" />
          </div>

          <div className="relative z-10">
            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="glass-chip-red text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full text-white">
                    {activeExperience.role}
                  </span>
                  {activeExperience.recognition && (
                    <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      {activeExperience.recognition}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                  {activeExperience.company}
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5 bg-white/[0.04] px-3.5 py-1.5 rounded-xl border border-white/5">
                  <Calendar className="w-4 h-4 text-[#e50924]" />
                  {activeExperience.duration}
                </span>
                {activeExperience.location && (
                  <span className="flex items-center gap-1.5 bg-white/[0.04] px-3.5 py-1.5 rounded-xl border border-white/5">
                    <MapPin className="w-4 h-4 text-[#e50924]" />
                    {activeExperience.location}
                  </span>
                )}
              </div>
            </div>

            {/* Middle Section: Image (if available) + Description */}
            <div className={`mb-8 flex flex-col ${activeExperience.image ? 'lg:flex-row' : ''} gap-6 items-start`}>
              {activeExperience.image && (
                <div className="relative group shrink-0 w-full sm:w-64 md:w-72 rounded-2xl overflow-hidden border border-[#e50924]/40 shadow-2xl shadow-red-950/40 bg-black/60">
                  <div className="aspect-[4/5] w-full overflow-hidden relative">
                    <img
                      src={activeExperience.image}
                      alt={activeExperience.imageAlt || activeExperience.company}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-black/20 to-transparent opacity-90" />
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#e50924] animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#e50924] font-bold">
                          MAAD IoT Solutions (India)
                        </span>
                      </div>
                      <span className="text-white text-xs sm:text-sm font-extrabold uppercase block leading-tight">
                        Chidimilla Anusha
                      </span>
                      <span className="text-[11px] text-gray-300 font-medium block">
                        IoT Firmware &amp; Cloud Engineer &amp; Project Lead
                      </span>
                      <span className="text-[10px] text-amber-300 font-semibold block mt-1">
                        Collab: Green Guard AI Solutions (USA)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 space-y-4">
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  {activeExperience.description}
                </p>

                {/* Key Responsibilities */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e50924] mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Core Technical Responsibilities &amp; Contributions:
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeExperience.responsibilities.map((resp, idx) => (
                      <div
                        key={idx}
                        className="glass bg-white/[0.02] hover:bg-white/[0.04] p-3.5 rounded-2xl border border-white/5 flex items-start gap-3 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#e50924] shrink-0 mt-1.5 shadow-[0_0_8px_#e50924]" />
                        <span className="text-xs sm:text-sm text-gray-200 leading-normal">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Context Banner */}
            {activeExperience.additionalContext && (
              <div className="glass-chip bg-[#e50924]/10 border border-[#e50924]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#e50924] shrink-0" />
                  <p className="text-xs sm:text-sm font-semibold text-gray-200">
                    <strong className="text-white">Strategic Scope:</strong> {activeExperience.additionalContext}
                  </p>
                </div>
                {activeExperience.id === 'symbiosis-research' && (
                  <a
                    href="#research"
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-white uppercase tracking-wider underline underline-offset-4 shrink-0"
                  >
                    View IEEE Publication <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


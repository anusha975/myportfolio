import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SoftwareStrip } from './SoftwareStrip';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, Terminal, Brain, Cloud, Binary, Sparkles, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo(
          '.matrix-item',
          { y: 20, opacity: 0, x: -6 },
          { y: 0, opacity: 1, x: 0, duration: 0.35, stagger: 0.02, ease: 'power2.out' },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'programming':
        return <Terminal className="w-4 h-4" />;
      case 'embedded-iot':
        return <Cpu className="w-4 h-4" />;
      case 'ai-ml':
        return <Brain className="w-4 h-4" />;
      case 'cloud-tools':
        return <Cloud className="w-4 h-4" />;
      case 'cs-fundamentals':
        return <Binary className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const displayedCategories =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-28 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Background halo */}
      <div className="red-halo" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.15 }} aria-hidden="true" />

      {/* Section Title */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-14 z-10">
        <span className="text-[#e50924] font-bold uppercase text-xs sm:text-sm md:text-base tracking-[0.25em] mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#e50924]" />
          Core Competencies &amp; Toolkit
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase text-white">
          TECHNICAL SKILLS.
        </h2>
        <div className="w-20 h-1.5 bg-[#e50924] mt-3 rounded-full shadow-[0_0_12px_#e50924]" />
      </div>

      {/* Interactive Category Tabs */}
      <div className="relative w-full max-w-6xl z-10 mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'glass-red text-white shadow-[0_0_15px_rgba(229,9,36,0.4)] scale-105'
              : 'glass text-gray-400 hover:text-white'
          }`}
        >
          All Domains ({SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)})
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'glass-red text-white shadow-[0_0_15px_rgba(229,9,36,0.4)] scale-105'
                : 'glass text-gray-400 hover:text-white'
            }`}
          >
            {getCategoryIcon(cat.id)}
            <span>{cat.name}</span>
            <span className="text-[10px] opacity-75">({cat.skills.length})</span>
          </button>
        ))}
      </div>

      {/* Category Blocks & Skills Matrix */}
      <div className="relative w-full max-w-6xl z-10 space-y-12">
        {displayedCategories.map((category) => (
          <div key={category.id} className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-600/15 border border-[#e50924]/30 text-[#e50924]">
                  {getCategoryIcon(category.id)}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-400">{category.description}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-gray-500 hidden sm:inline">
                {category.skills.length} Capabilities
              </span>
            </div>

            {/* Grid of skill cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`matrix-item glass p-4 sm:p-5 rounded-2xl flex flex-col justify-between gap-2.5 transition-all duration-300 hover:border-[#e50924]/40 hover:-translate-y-0.5 group ${
                    skill.highlight ? 'border-red-600/30 bg-red-950/15 shadow-[0_0_15px_rgba(229,9,36,0.08)]' : 'border-white/5 bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        skill.highlight ? 'bg-[#e50924] shadow-[0_0_8px_#e50924]' : 'bg-gray-500'
                      }`} />
                      <h4 className="font-extrabold text-sm sm:text-base text-white group-hover:text-red-400 transition-colors leading-snug">
                        {skill.name}
                      </h4>
                    </div>
                    {skill.highlight && (
                      <span className="shrink-0 text-[10px] font-mono uppercase tracking-widest text-[#e50924] bg-red-600/10 px-2 py-0.5 rounded-full border border-red-600/20">
                        Featured
                      </span>
                    )}
                  </div>

                  {skill.level && (
                    <p className="text-xs text-gray-400 font-medium pl-4 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {skill.level}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Software & marquee tech stack strip */}
      <SoftwareStrip />
    </section>
  );
};

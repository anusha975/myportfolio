import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EDUCATION } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo(
          '.edu-card',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power3.out' },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-24 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Section Title */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-16 z-10">
        <span className="text-[#e50924] font-bold uppercase text-xs sm:text-sm md:text-base tracking-[0.25em] mb-2 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#e50924]" />
          Academic Foundations
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase text-white">
          EDUCATION.
        </h2>
        <div className="w-20 h-1.5 bg-[#e50924] mt-3 rounded-full shadow-[0_0_12px_#e50924]" />
      </div>

      <div className="relative w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {EDUCATION.map((edu, idx) => (
          <div
            key={idx}
            className="edu-card glass glass-hover p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-[#e50924]/40"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="glass-chip-red text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white">
                  {idx === 0 ? 'Undergraduate Degree' : 'Intermediate Education'}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-[#e50924]" />
                  {edu.period}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight group-hover:text-red-400 transition-colors mb-2">
                {edu.institution}
              </h3>
              <p className="text-sm font-semibold text-[#e50924] mb-3">
                {edu.degree}
              </p>
              <p className="flex items-center gap-1.5 text-xs font-mono text-gray-400 mb-4">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                {edu.location}
              </p>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                {edu.description}
              </p>
            </div>

            {edu.highlights && (
              <div className="pt-4 border-t border-white/5 space-y-2">
                {edu.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e50924] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};


import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ACHIEVEMENTS, CERTIFICATIONS } from '../data/portfolioData';
import { Award, CheckCircle2, Shield, Sparkles, Terminal, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Achievements: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo(
          '.honor-card',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-28 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Background glowing halo */}
      <div className="red-halo" style={{ top: '35%', right: '20%', opacity: 0.12 }} aria-hidden="true" />

      {/* Section Title */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-16 z-10">
        <span className="text-[#e50924] font-bold uppercase text-xs sm:text-sm md:text-base tracking-[0.25em] mb-2 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#e50924]" />
          Honors &amp; Credentials
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase text-white">
          ACHIEVEMENTS &amp; CERTIFICATIONS.
        </h2>
        <div className="w-20 h-1.5 bg-[#e50924] mt-3 rounded-full shadow-[0_0_12px_#e50924]" />
      </div>

      <div className="relative w-full max-w-6xl z-10 space-y-16">
        {/* Major Achievements Showcase */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-[#e50924]" />
            <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">
              Key Engineering Honors
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ACHIEVEMENTS.map((item) => (
              <div
                key={item.id}
                className="honor-card glass glass-hover p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-[#e50924]/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="glass-chip-red text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white">
                      {item.badgeText}
                    </span>
                    <span className="text-xs font-mono text-gray-500">{item.year}</span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-red-400 transition-colors uppercase tracking-tight mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs font-semibold text-[#e50924] mb-3">
                    {item.organization}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#e50924]" />
                  <span>Verified Technical Recognition</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Certifications Grid */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-[#e50924]" />
            <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">
              Professional Certifications
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="honor-card glass p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-[#e50924]/30 hover:bg-white/[0.03] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white"
                      style={{
                        backgroundColor: `${cert.badgeColor || '#e50924'}22`,
                        border: `1px solid ${cert.badgeColor || '#e50924'}55`,
                      }}
                    >
                      <Terminal className="w-4 h-4" style={{ color: cert.badgeColor || '#e50924' }} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                      {cert.issuer}
                    </span>
                  </div>

                  <h5 className="font-bold text-sm sm:text-base text-white group-hover:text-red-400 transition-colors leading-snug mb-1">
                    {cert.title}
                  </h5>
                  <p className="text-xs text-gray-400">{cert.type}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Certified
                  </span>
                  <Code className="w-3.5 h-3.5 text-gray-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


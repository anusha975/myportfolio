import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE, ABOUT } from '../data/portfolioData';
import { Sparkles, Calendar, ArrowRight, Cpu, Radio, Database, Brain, Network, Bot, Award, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Fb = 26;
const Ib = 70;
const Lb = 0.38;
const Rb = 9e-4;

const clamp = (val: number, max: number) => Math.max(-max, Math.min(max, val));

export const HangingPhoto: React.FC = () => {
  const rigRef = useRef<HTMLDivElement>(null);
  const swingRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rig = rigRef.current;
    const swing = swingRef.current;
    if (!rig || !swing) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    let angle = 0;
    let angularVel = 0;
    let roll = 0;
    let targetAngle = 0;
    let isDragging = false;
    let activePointerId = -1;
    let prevPointerX = 0;
    let lastTime = performance.now();
    let isIntersecting = true;
    let animId = 0;

    const getPivot = () => {
      const rect = rig.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + 8 };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max((now - lastTime) / 1000, 0.008);
      const vx = (e.clientX - prevPointerX) / dt;
      prevPointerX = e.clientX;
      lastTime = now;

      if (isDragging && e.pointerId === activePointerId) {
        const pivot = getPivot();
        targetAngle = clamp(Math.atan2(-(e.clientX - pivot.x), Math.max(e.clientY - pivot.y, 60)), Lb);
        return;
      }

      if (prefersReducedMotion || isCoarse || !isIntersecting) return;
      const rect = rig.getBoundingClientRect();
      const dist =
        Math.abs(e.clientX - (rect.left + rect.width / 2)) +
        Math.max(0, Math.abs(e.clientY - (rect.top + rect.height / 2)) - rect.height / 2);
      const influence = Math.max(0, 1 - dist / 900);
      angularVel += clamp(-vx * Rb * influence, 0.25);
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      activePointerId = e.pointerId;
      swing.setPointerCapture?.(e.pointerId);
      swing.style.cursor = 'grabbing';
      prevPointerX = e.clientX;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerId === activePointerId) {
        isDragging = false;
        activePointerId = -1;
        targetAngle = 0;
        swing.style.cursor = '';
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { rootMargin: '200px' }
    );
    observer.observe(rig);

    let prevFrameTime = performance.now();
    const tick = (now: number) => {
      animId = requestAnimationFrame(tick);
      const dt = Math.min((now - prevFrameTime) / 1000, 0.05);
      prevFrameTime = now;
      if (!isIntersecting && !isDragging) return;

      const stiffness = isDragging ? Ib : Fb;
      const target = isDragging ? targetAngle : 0;
      angularVel += -stiffness * (angle - target) * dt;
      angularVel *= Math.exp(-3.2 * dt);
      angle += angularVel * dt;
      if (Math.abs(angle) > Lb) {
        angle = Math.sign(angle) * Lb;
        angularVel *= -0.3;
      }
      roll += (angularVel * 0.6 - roll) * (1 - Math.exp(-6 * dt));
      const deg = (angle * 180) / Math.PI;
      swing.style.transform = `rotateZ(${deg}deg) rotateY(${clamp(roll, 0.4) * 30}deg)`;
      if (shadowRef.current) {
        shadowRef.current.style.transform = `translateX(${-deg * 2.2}px) rotateZ(${deg * 0.8}deg)`;
      }
    };

    animId = requestAnimationFrame(tick);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    swing.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      swing.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  return (
    <div ref={rigRef} className="hang-rig" data-no-ripple={true}>
      <span className="hang-nail" aria-hidden="true" />
      <div ref={shadowRef} className="hang-shadow" aria-hidden="true" />
      <div ref={swingRef} className="hang-swing">
        <svg className="hang-strings" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="50" y1="0" x2="12" y2="100" />
          <line x1="50" y1="0" x2="88" y2="100" />
        </svg>
        <div className="hang-frame glow-frame">
          <span className="hang-ring hang-ring-l" aria-hidden="true" />
          <span className="hang-ring hang-ring-r" aria-hidden="true" />
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black/40 ring-1 ring-white/15">
            <img
              src={ABOUT.portrait}
              alt={ABOUT.portraitAlt}
              draggable={false}
              className="w-full h-full object-cover object-top transition-all duration-700 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="hang-glare" aria-hidden="true" />
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span className="text-white text-base md:text-lg font-black uppercase tracking-wider block">
                {SITE.name}
              </span>
              <span className="text-[#e50924] text-xs uppercase font-bold tracking-widest">
                {ABOUT.portraitCaption}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

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
        .fromTo(headRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo(bioRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .fromTo(
          photoCardRef.current,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getJourneyIcon = (step: string) => {
    switch (step) {
      case 'IoT':
        return <Cpu className="w-5 h-5" />;
      case 'Sensors':
        return <Radio className="w-5 h-5" />;
      case 'Data':
        return <Database className="w-5 h-5" />;
      case 'Edge AI':
        return <Network className="w-5 h-5" />;
      case 'Machine Learning':
        return <Brain className="w-5 h-5" />;
      case 'Generative AI':
        return <Bot className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-28 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Title */}
        <div ref={headRef} className="flex flex-col items-center text-center mb-16">
          <span className="text-[#e50924] font-bold uppercase text-xs sm:text-sm md:text-base tracking-[0.25em] mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#e50924]" />
            {ABOUT.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase text-white">
            {ABOUT.heading}
          </h2>
          <div className="w-20 h-1.5 bg-[#e50924] mt-3 rounded-full shadow-[0_0_12px_#e50924]" />
        </div>

        {/* Content Layout: Bio + Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Bio Narrative */}
          <div ref={bioRef} className="lg:col-span-7 flex flex-col gap-6">
            <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col gap-5 text-gray-300 leading-relaxed text-sm sm:text-base">
                {ABOUT.paragraphs.map((text, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'text-white text-base sm:text-xl font-medium leading-relaxed border-l-2 border-[#e50924] pl-4'
                        : 'text-gray-300'
                    }
                  >
                    {text}
                  </p>
                ))}
              </div>

              {/* Status badges */}
              <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-white/10">
                <span className="glass-chip-red text-xs font-bold px-3 py-1.5 rounded-full text-white">
                  KITS Warangal (2023–2027)
                </span>
                <span className="glass-chip text-xs font-bold px-3 py-1.5 rounded-full text-white">
                  MAAD IoT Solutions Engineer
                </span>
                <span className="glass-chip text-xs font-bold px-3 py-1.5 rounded-full text-white">
                  IEEE Published Author
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Hanging Portrait Card */}
          <div className="lg:col-span-5 flex justify-center relative lg:sticky lg:top-28">
            <div ref={photoCardRef} data-photo-reveal={true} className="flex flex-col items-center pointer-events-auto">
              <HangingPhoto />
            </div>
          </div>
        </div>

        {/* Visual Journey: IoT → Sensors → Data → Edge AI → Machine Learning → Generative AI */}
        <div className="mb-20">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#e50924] font-bold">
              Engineering Evolution
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
              THE TECHNICAL JOURNEY
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
              From physical silicon and sensory hardware to edge inference and generative intelligence.
            </p>
          </div>

          {/* Interactive Flowchart Breadcrumbs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {ABOUT.visualJourney.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 relative ${
                    isSelected
                      ? 'glass-red scale-105 shadow-[0_0_25px_rgba(229,9,36,0.35)]'
                      : 'glass hover:border-[#e50924]/40 hover:bg-white/[0.04]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-red-500/10 text-[#e50924]'}`}>
                        {getJourneyIcon(step.step)}
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 font-bold">0{idx + 1}</span>
                    </div>
                    <h4 className="font-black text-sm sm:text-base text-white uppercase tracking-tight mb-1">
                      {step.step}
                    </h4>
                    <p className={`text-[11px] font-semibold leading-tight ${isSelected ? 'text-gray-100' : 'text-gray-400'}`}>
                      {step.title}
                    </p>
                  </div>

                  <p className="text-[11px] text-gray-300 mt-3 pt-2 border-t border-white/10 line-clamp-3">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visually Appealing Timeline: 2023, 2025, 2026, 2026 */}
        <div>
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#e50924] font-bold">
              Milestones
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
              CAREER &amp; RESEARCH TIMELINE
            </h3>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center vertical glowing line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#e50924] via-[#e50924]/50 to-transparent transform -translate-x-1/2" />

            <div className="space-y-8 md:space-y-12">
              {ABOUT.timeline.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    } gap-6 md:gap-12 pl-10 md:pl-0`}
                  >
                    {/* Glowing Timeline Node */}
                    <div className="absolute left-4 md:left-1/2 top-4 w-6 h-6 rounded-full bg-[#080808] border-2 border-[#e50924] shadow-[0_0_12px_#e50924] transform -translate-x-1/2 flex items-center justify-center z-10">
                      <span className="w-2 h-2 rounded-full bg-[#e50924]" />
                    </div>

                    {/* Timeline Content Card */}
                    <div className="w-full md:w-1/2">
                      <div className="glass glass-hover p-6 rounded-3xl border border-white/10 hover:border-[#e50924]/40 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="glass-chip-red text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full text-white">
                            {item.year}
                          </span>
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight mb-2">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

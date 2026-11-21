import React from 'react';
import { SITE } from '../data/portfolioData';
import { Mail, Linkedin, Github, Download, Code2, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 76;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, Math.max(0, elementTop - navOffset));
      if (window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <footer className="w-full text-white pt-16 pb-12 px-6 md:px-12 lg:px-20 border-t border-white/5 bg-[#060608] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[160px] bg-red-600/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        {/* Top Row: Identity & Action Pills */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 pb-10 border-b border-white/10">
          {/* Identity & Mission */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2 max-w-lg">
            <a
              href="#hero"
              className="text-2xl sm:text-3xl font-black tracking-tight uppercase flex items-center group"
            >
              <span className="text-[#e50924] drop-shadow-[0_0_12px_rgba(229,9,36,0.8)]">
                {SITE.firstName.charAt(0)}
              </span>
              <span>{SITE.firstName.slice(1)}</span>
              <span className="text-gray-400 ml-2 font-semibold">{SITE.lastName}</span>
              <span className="text-[#e50924] font-black group-hover:scale-125 transition-transform">.</span>
            </a>
            <span className="text-xs text-[#e50924] font-mono tracking-widest uppercase font-bold">
              {SITE.role}
            </span>
            <p className="text-xs text-gray-400 leading-relaxed mt-1">
              Building intelligent systems at the intersection of embedded hardware, Edge AI, and Generative AI.
            </p>
          </div>

          {/* Social & Download Action Pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="glass-chip flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-200 hover:text-white transition-all hover:scale-105"
            >
              <Mail className="w-3.5 h-3.5 text-[#e50924]" />
              <span>Email</span>
            </a>

            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-chip flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-200 hover:text-white transition-all hover:scale-105"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>

            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-chip flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-200 hover:text-white transition-all hover:scale-105"
            >
              <Github className="w-3.5 h-3.5 text-white" />
              <span>GitHub</span>
            </a>

            <a
              href={SITE.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-chip flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-200 hover:text-white transition-all hover:scale-105"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>LeetCode</span>
            </a>

            <a
              href={SITE.resumePdfUrl}
              download="Chidimilla_Anusha_Resume.pdf"
              className="glass-red flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all hover:scale-105 shadow-[0_0_16px_rgba(229,9,36,0.35)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>

        {/* Middle Row: Navigation Links & Professional Status */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-6 font-semibold uppercase tracking-wider">
            <a href="#hero" onClick={(e) => handleFooterNav(e, '#hero')} className="hover:text-red-400 transition-colors">Home</a>
            <a href="#about" onClick={(e) => handleFooterNav(e, '#about')} className="hover:text-red-400 transition-colors">About</a>
            <a href="#experience" onClick={(e) => handleFooterNav(e, '#experience')} className="hover:text-red-400 transition-colors">Experience</a>
            <a href="#skills" onClick={(e) => handleFooterNav(e, '#skills')} className="hover:text-red-400 transition-colors">Skills</a>
            <a href="#projects" onClick={(e) => handleFooterNav(e, '#projects')} className="hover:text-red-400 transition-colors">Projects</a>
            <a href="#research" onClick={(e) => handleFooterNav(e, '#research')} className="hover:text-red-400 transition-colors">Research</a>
            <a href="#achievements" onClick={(e) => handleFooterNav(e, '#achievements')} className="hover:text-red-400 transition-colors">Achievements</a>
            <a href="#contact" onClick={(e) => handleFooterNav(e, '#contact')} className="hover:text-red-400 transition-colors">Contact</a>
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[11px]">
            <a
              href={`mailto:${SITE.email}`}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {SITE.email}
            </a>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">Warangal, Telangana</span>
            <span className="text-gray-600">•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="glass-chip flex items-center gap-1 px-2.5 py-1 rounded-full text-gray-300 hover:text-white transition-colors"
              title="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3 text-[#e50924]" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Engine Attribution */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            &copy; 2026 Chidimilla Anusha | AI &amp; AIoT Engineer.
          </div>
          <div className="text-[11px] text-gray-500">
            Engineered with Three.js, React, Tailwind CSS &amp; GSAP.
          </div>
        </div>
      </div>
    </footer>
  );
};

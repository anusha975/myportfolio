import React, { useState, useEffect } from 'react';
import { SITE } from '../data/portfolioData';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section spy
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-3 md:px-6 pt-3">
      <div
        className={`glass max-w-7xl mx-auto rounded-2xl px-5 md:px-7 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-2.5 !bg-[#0c0c10]/90 shadow-2xl shadow-red-950/20 border-[#e50924]/20' : 'py-3.5'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="text-white text-base sm:text-xl font-black tracking-tight uppercase group flex items-center shrink-0"
        >
          <span className="text-[#e50924] drop-shadow-[0_0_12px_rgba(229,9,36,0.8)]">
            {SITE.firstName.charAt(0)}
          </span>
          <span className="group-hover:text-red-400 transition-colors duration-300">
            {SITE.firstName.slice(1)}
          </span>
          <span className="text-gray-300 ml-1.5 font-bold tracking-tight">
            {SITE.lastName}
          </span>
          <span className="text-[#e50924] font-black text-xl ml-0.5">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 py-1 ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#e50924] transition-all duration-300 ease-out shadow-[0_0_8px_#e50924] ${
                    isActive ? 'w-full' : 'w-0 hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* CTA & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="glass-red hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden glass-chip rounded-xl p-2 text-gray-200 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-3 top-20 glass rounded-3xl p-6 border border-[#e50924]/30 shadow-2xl backdrop-blur-2xl bg-[#09090d]/95 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-3 rounded-2xl text-sm font-bold uppercase tracking-wider flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#e50924]/20 text-white border border-[#e50924]/40'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#e50924] shadow-[0_0_8px_#e50924]" />}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="glass-red mt-2 w-full py-3 rounded-2xl text-center text-white text-xs font-bold uppercase tracking-wider"
            >
              Let's Connect →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

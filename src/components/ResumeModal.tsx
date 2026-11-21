import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, CheckCircle2, Award, Briefcase, GraduationCap, Cpu, Code2 } from 'lucide-react';
import { SITE, ABOUT, EXPERIENCES, EDUCATION, RESEARCH_PUBLICATION, ACHIEVEMENTS, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Dialog Container */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Resume of Chidimilla Anusha"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="glass glass-strong relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[#e50924]/40 shadow-2xl shadow-red-950/60 my-auto"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0c0c10]/90 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#e50924] animate-pulse" />
                <h3 className="text-lg font-black tracking-tight uppercase text-white">
                  Curriculum Vitae Preview
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="glass-chip flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-gray-200 hover:text-white transition-colors"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-red-500" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>
                <a
                  href={SITE.resumePdfUrl}
                  download="Chidimilla_Anusha_Resume.pdf"
                  className="glass-red flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="glass-chip rounded-full p-2 text-gray-400 hover:text-white transition-colors ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content Body */}
            <div className="overflow-y-auto p-6 md:p-10 space-y-8 bg-[#09090d]/80 text-gray-200 print:text-black print:bg-white">
              {/* Header Profile */}
              <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
                    {SITE.name}
                  </h1>
                  <p className="text-sm md:text-base font-bold text-[#e50924] tracking-widest uppercase mt-1">
                    {SITE.role}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 max-w-xl">
                    Specialisation: {SITE.specialisation}
                  </p>
                </div>
                <div className="text-xs text-gray-400 space-y-1 md:text-right font-mono">
                  <p>Email: {SITE.email}</p>
                  <p>GitHub: {SITE.github}</p>
                  <p>LinkedIn: {SITE.linkedin}</p>
                  <p>Status: {SITE.status}</p>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e50924] mb-2 flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Professional Profile
                </h4>
                <p className="text-sm leading-relaxed text-gray-300">
                  {ABOUT.paragraphs[0]} {ABOUT.paragraphs[1]}
                </p>
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e50924] mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Professional Experience
                </h4>
                <div className="space-y-6">
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.id} className="glass p-5 rounded-2xl border-white/5 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="font-bold text-white text-base">{exp.role}</h5>
                        <span className="text-xs font-mono text-[#e50924]">{exp.duration}</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-400">{exp.company} • {exp.location}</p>
                      <p className="text-xs text-gray-300">{exp.description}</p>
                      <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 pt-1">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                      {exp.recognition && (
                        <div className="pt-2 text-xs font-bold text-red-400 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5" /> Recognition: {exp.recognition}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Research */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e50924] mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> IEEE Research Publication
                </h4>
                <div className="glass p-5 rounded-2xl border-white/5 space-y-2">
                  <h5 className="font-bold text-white text-sm sm:text-base">
                    {RESEARCH_PUBLICATION.title}
                  </h5>
                  <p className="text-xs font-mono text-red-400">
                    {RESEARCH_PUBLICATION.conference}
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {RESEARCH_PUBLICATION.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="glass-chip text-[11px] px-2.5 py-1 rounded-full text-white">
                      ~25% LoRa Transmission Reduced
                    </span>
                    <span className="glass-chip text-[11px] px-2.5 py-1 rounded-full text-white">
                      1,000+ Sensor Readings Evaluated
                    </span>
                    <span className="glass-chip text-[11px] px-2.5 py-1 rounded-full text-white">
                      Edge AI on ESP32
                    </span>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e50924] mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Education
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="glass p-4 rounded-2xl border-white/5 space-y-1">
                      <h5 className="font-bold text-white text-sm">{edu.institution}</h5>
                      <p className="text-xs text-[#e50924] font-semibold">{edu.degree}</p>
                      <p className="text-xs text-gray-400 font-mono">{edu.period} • {edu.location}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e50924] mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" /> Key Honors
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {ACHIEVEMENTS.map((ach) => (
                      <li key={ach.id} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e50924] shrink-0 mt-0.5" />
                        <span><strong>{ach.title}</strong> — {ach.organization}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e50924] mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Certifications
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {CERTIFICATIONS.map((cert) => (
                      <li key={cert.id} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e50924] shrink-0 mt-1.5" />
                        <span><strong>{cert.title}</strong> ({cert.issuer})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, Cpu, Sparkles, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigate: (direction: 1 | -1) => void;
  onInquire?: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNavigate,
  onInquire,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = project !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="glass glass-strong relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[#e50924]/40 shadow-2xl shadow-red-950/60 my-auto"
          >
            {/* Top Navigation & Controls */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0c0c10]/95 px-5 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="glass-chip-red shrink-0 rounded-full px-3 py-1 text-xs font-bold text-white">
                  {project.category}
                </span>
                <h3 className="truncate text-base sm:text-lg font-bold text-white">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate(-1)}
                  aria-label="Previous project"
                  className="glass-chip rounded-full p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(1)}
                  aria-label="Next project"
                  className="glass-chip rounded-full p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="glass-chip rounded-full p-2 text-gray-400 hover:text-white transition-colors ml-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Project Body */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-7 bg-[#09090d]/90">
              {/* Media Preview Banner */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={project.poster}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-transparent to-black/30" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#e50924] font-bold">
                      {project.category}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black uppercase text-white drop-shadow-md">
                      {project.title}
                    </h4>
                  </div>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-red inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.researchPublication && (
                    <a
                      href="#research"
                      onClick={onClose}
                      className="glass-chip-red inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{project.researchPublication} Paper</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Subtitle / Overview */}
              <div>
                <p className="text-sm sm:text-base font-semibold text-gray-200 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Problem Statement & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass p-5 rounded-2xl border-white/5 space-y-2 bg-red-950/10">
                  <h5 className="text-xs font-black uppercase tracking-[0.2em] text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#e50924]" /> Problem Statement
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="glass p-5 rounded-2xl border-white/5 space-y-2 bg-emerald-950/10">
                  <h5 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Engineering Solution
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* My Contribution */}
              <div className="glass p-5 rounded-2xl border border-white/10 space-y-2">
                <h5 className="text-xs font-black uppercase tracking-[0.2em] text-[#e50924] flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#e50924]" /> My Specific Contribution
                </h5>
                {Array.isArray(project.myContribution) ? (
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-200">
                    {project.myContribution.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {project.myContribution}
                  </p>
                )}
              </div>

              {/* Key Innovation */}
              <div className="glass p-5 rounded-2xl border border-[#e50924]/30 space-y-2 bg-[#120406]/60">
                <h5 className="text-xs font-black uppercase tracking-[0.2em] text-[#e50924] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#e50924]" /> Key Technical Innovation
                </h5>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                  {project.keyInnovation}
                </p>
              </div>

              {/* Technologies Used */}
              <div>
                <h5 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Technologies &amp; Architecture:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="glass-chip px-3 py-1.5 rounded-full text-xs font-bold text-gray-200 hover:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-red inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white uppercase tracking-wider hover:scale-105 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>Explore Repository</span>
                    </a>
                  ) : (
                    <span className="text-xs text-gray-500 font-mono">
                      Industrial / Research IP (Repository Confidential)
                    </span>
                  )}
                </div>

                {onInquire && (
                  <button
                    type="button"
                    onClick={() => onInquire(project)}
                    className="glass px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all"
                  >
                    Inquire About This Project →
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


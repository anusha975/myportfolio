import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VenomButton } from './VenomButton';
import { SITE, CONTACT_INFO } from '../data/portfolioData';
import { Mail, Code2, Github, Linkedin, Download, Send, CheckCircle2, AlertCircle, Copy, Check, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  onOpenResume?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

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
        .fromTo(cardRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email format (e.g., name@domain.com).';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }

    setStatus('success');
    // Open user's default email client with prefilled details
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    const mailto = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-28 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Ambient Red Glow */}
      <div className="red-halo" style={{ top: '35%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.16 }} aria-hidden="true" />

      {/* Section Title */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-16 z-10">
        <span className="text-[#e50924] font-bold uppercase text-xs sm:text-sm md:text-base tracking-[0.25em] mb-2 flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#e50924]" />
          Direct Inquiries &amp; Transmissions
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase text-white">
          {CONTACT_INFO.heading}
        </h2>
        <div className="w-20 h-1.5 bg-[#e50924] mt-3 rounded-full shadow-[0_0_12px_#e50924]" />
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mt-4 font-normal">
          {CONTACT_INFO.description}
        </p>
      </div>

      <div ref={cardRef} className="relative w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 4 Premium Contact Cards + Resume Download */}
        <div className="lg:col-span-5 space-y-4">
          {/* CARD 1: EMAIL */}
          <div className="glass p-6 rounded-3xl border border-white/10 hover:border-[#e50924]/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-2xl bg-red-600/15 border border-[#e50924]/30 flex items-center justify-center text-[#e50924]">
                <Mail className="w-5 h-5" />
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="glass-chip flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-gray-300 hover:text-white"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
              EMAIL
            </span>
            <a
              href={`mailto:${SITE.email}`}
              className="text-base sm:text-lg font-bold text-white hover:text-red-400 transition-colors break-all block mb-4"
            >
              {SITE.email}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="glass-chip inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors w-full justify-center sm:w-auto"
            >
              <span>Send Me an Email</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#e50924]" />
            </a>
          </div>

          {/* CARD 2: LEETCODE / PROBLEM SOLVING */}
          <div className="glass p-6 rounded-3xl border border-white/10 hover:border-[#e50924]/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-sm">
                LC
              </span>
              <span className="glass-chip text-[11px] px-3 py-1 rounded-full text-emerald-400 font-bold">
                500+ Solved
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
              DATA STRUCTURES &amp; ALGORITHMS
            </span>
            <p className="text-base sm:text-lg font-bold text-white hover:text-amber-400 transition-colors block mb-4 font-mono">
              leetcode.com/u/chidimilla
            </p>
            <a
              href={SITE.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-chip inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors w-full justify-center sm:w-auto"
            >
              <span>Explore LeetCode Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>

          {/* 2-Column row for LinkedIn & GitHub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CARD 3: LINKEDIN */}
            <div className="glass p-5 rounded-3xl border border-white/10 hover:border-[#e50924]/40 transition-all flex flex-col justify-between group">
              <div>
                <Linkedin className="w-6 h-6 text-[#0A66C2] mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
                  LINKEDIN
                </span>
                <p className="text-xs font-bold text-white truncate mb-4">
                  chidimilla-anusha
                </p>
              </div>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors text-center justify-center"
              >
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-[#0A66C2]" />
              </a>
            </div>

            {/* CARD 4: GITHUB */}
            <div className="glass p-5 rounded-3xl border border-white/10 hover:border-[#e50924]/40 transition-all flex flex-col justify-between group">
              <div>
                <Github className="w-6 h-6 text-white mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
                  GITHUB
                </span>
                <p className="text-xs font-bold text-white truncate mb-4">
                  github.com/anusha975
                </p>
              </div>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors text-center justify-center"
              >
                <span>Explore My Projects</span>
                <ArrowUpRight className="w-3 h-3 text-[#e50924]" />
              </a>
            </div>
          </div>

          {/* DOWNLOAD RESUME CARD / ACTION */}
          <div className="glass p-5 rounded-3xl border border-[#e50924]/30 bg-red-950/15 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-[#e50924]/20 text-[#e50924]">
                <Download className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Curriculum Vitae
                </h4>
                <p className="text-xs text-gray-400">PDF formatted engineering resume</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={SITE.resumePdfUrl}
                download="Chidimilla_Anusha_Resume.pdf"
                className="glass-red inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-wider hover:scale-105 transition-transform"
              >
                <span>Download</span>
              </a>
              <button
                type="button"
                onClick={onOpenResume}
                className="glass-chip px-3 py-2 rounded-full text-xs font-bold text-gray-300 hover:text-white"
                title="Preview Resume"
              >
                Preview
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Modern Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight mb-2">
              Send a Transmission
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-6 leading-relaxed">
              Fill out the message parameters below to initiate a pre-filled direct email transmission to <strong>{SITE.email}</strong>.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-gray-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Dr. Jane Smith"
                    className="w-full bg-[#121217] border border-white/10 focus:border-[#e50924] rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-gray-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="e.g. jane@example.com"
                    className="w-full bg-[#121217] border border-white/10 focus:border-[#e50924] rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-widest text-gray-300 mb-1.5">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: '' });
                  }}
                  placeholder="e.g. AIoT Engineering Opportunity / Project Collaboration"
                  className="w-full bg-[#121217] border border-white/10 focus:border-[#e50924] rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                />
                {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-gray-300 mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  placeholder="Please describe your project, proposal, or inquiry details (min. 10 characters)..."
                  className="w-full bg-[#121217] border border-white/10 focus:border-[#e50924] rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors resize-none"
                />
                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
              </div>

              {/* Feedback messages */}
              {status === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Mail Client Triggered:</strong>
                    A prefilled draft has been generated for <strong>{SITE.email}</strong>. You can dispatch it directly from your email client to connect!
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3.5 rounded-2xl bg-red-950/20 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>Please check and correct the highlighted fields above before sending.</span>
                </div>
              )}

              <div className="pt-2">
                <VenomButton variant="primary" type="submit" className="w-full sm:w-auto">
                  DISPATCH MESSAGE
                </VenomButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

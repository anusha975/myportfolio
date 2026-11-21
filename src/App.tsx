import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Research } from './components/Research';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { GlitchLoader } from './components/GlitchLoader';
import { ParticleField } from './components/ParticleField';
import { SparkCursor } from './components/SparkCursor';
import { PORTFOLIO_PROJECTS, SITE } from './data/portfolioData';
import type { Project } from './data/portfolioData';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function App() {
  useEffect(() => {
    document.title = SITE.pageTitle;
  }, []);

  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handlePreloaderComplete = () => {
    setLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
  };

  const handleNavigateProject = (direction: 1 | -1) => {
    if (!selectedProject) return;
    const idx = PORTFOLIO_PROJECTS.findIndex((p) => p.id === selectedProject.id);
    if (idx === -1) return;
    const nextIdx = (idx + direction + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
    setSelectedProject(PORTFOLIO_PROJECTS[nextIdx]);
  };

  const handleInquire = () => {
    setIsProjectModalOpen(false);
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative isolate min-h-screen text-gray-100 flex flex-col font-sans selection:bg-[#e50924] selection:text-white bg-[#080808]">
      {/* 3D WebGL Starfield with forward scroll travel and click shockwaves */}
      <ParticleField />

      {/* Ambient colour behind the glass: red glow orbs */}
      <div className="ambient" aria-hidden="true">
        <i className="o1" />
        <i className="o3" />
      </div>

      {/* Interactive 2D spark & lightning cursor */}
      <SparkCursor />

      {/* Progressive glitch countdown loader */}
      {loading && <GlitchLoader onComplete={handlePreloaderComplete} />}

      {/* Dynamic Navbar with blur on scroll */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main className="relative z-10 w-full flex-1">
        <Hero onOpenResume={() => setIsResumeModalOpen(true)} />
        <Stats />
        <About />
        <Experience />
        <Skills />
        <Projects onSelectProject={handleSelectProject} />
        <Research />
        <Achievements />
        <Education />
        <Contact onOpenResume={() => setIsResumeModalOpen(true)} />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={isProjectModalOpen ? selectedProject : null}
        onClose={handleCloseProjectModal}
        onNavigate={handleNavigateProject}
        onInquire={handleInquire}
      />

      {/* Interactive Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

export default App;

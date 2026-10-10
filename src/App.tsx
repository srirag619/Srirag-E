/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { initialProjects } from './data/projectsData';
import { Project } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Tours360Section } from './components/Tours360Section';
import { CinematicsSection } from './components/CinematicsSection';
import { CompareSection } from './components/CompareSection';
import { WorksGallery } from './components/WorksGallery';
import { StudioSection } from './components/StudioSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { PanoramaViewer } from './components/PanoramaViewer';

export default function App() {
  const [projects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [fullscreen360Project, setFullscreen360Project] = useState<Project | null>(null);

  const scrollToWorks = () => {
    const el = document.getElementById('works');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToInquire = () => {
    const el = document.getElementById('inquire');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 selection:bg-white selection:text-black">
      {/* Floating Glassmorphism Navbar */}
      <Navbar onOpenCommission={scrollToInquire} />

      {/* Hero Section */}
      <Hero
        onExploreWorks={scrollToWorks}
        onOpen360Full={() => setFullscreen360Project(projects.find(p => p.mediaType === '360') || null)}
      />

      {/* Curated Works Gallery (Bento-Box Grid) */}
      <WorksGallery
        projects={projects}
        onSelectProject={(p) => setSelectedProject(p)}
        onOpenPanorama={(p) => setFullscreen360Project(p)}
      />

      {/* Interactive 360° VR Tours Showcase Section */}
      <Tours360Section
        projects={projects}
        onOpenProjectModal={(p) => setSelectedProject(p)}
      />

      {/* Cinematic Films & Drone Flythroughs Section */}
      <CinematicsSection
        projects={projects}
        onOpenProjectModal={(p) => setSelectedProject(p)}
      />

      {/* Clay Model vs Final Render Compare Slider Section */}
      <CompareSection />

      {/* Studio Philosophy & Pipeline Section */}
      <StudioSection />

      {/* Contact & Commission Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Detail Project Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenPanoramaFullscreen={(p) => {
          setSelectedProject(null);
          setFullscreen360Project(p);
        }}
      />

      {/* Dedicated Immersive Fullscreen 360 Modal with #modal-360 sizing */}
      {fullscreen360Project && (
        <PanoramaViewer
          isModal
          initialScene={fullscreen360Project.panoramaSceneId || 'penthouse'}
          customImageUrl={fullscreen360Project.panoramaUrl}
          hotspots={fullscreen360Project.hotspots}
          title={fullscreen360Project.title}
          subtitle={fullscreen360Project.subtitle}
          onClose={() => setFullscreen360Project(null)}
        />
      )}
    </div>
  );
}

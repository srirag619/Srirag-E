/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { AddProjectModal } from './components/AddProjectModal';
import { PanoramaViewer } from './components/PanoramaViewer';

const STORAGE_KEY = 'aura_viz_projects_v1';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved projects:', e);
    }
    return initialProjects;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [fullscreen360Project, setFullscreen360Project] = useState<Project | null>(null);

  // Sync projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.warn('LocalStorage save failed (quota exceeded):', e);
    }
  }, [projects]);

  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleOpen360Full = (project: Project) => {
    setFullscreen360Project(project);
  };

  const scrollToWorks = () => {
    const el = document.getElementById('works');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToInquire = () => {
    const el = document.getElementById('inquire');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090a0d] text-zinc-100 selection:bg-amber-400 selection:text-black">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenCommission={scrollToInquire}
      />

      {/* Hero Section */}
      <Hero
        onExploreWorks={scrollToWorks}
        onOpen360Full={() => setFullscreen360Project(projects.find(p => p.mediaType === '360') || null)}
      />

      {/* Curated Works Gallery */}
      <WorksGallery
        projects={projects}
        onSelectProject={(p) => setSelectedProject(p)}
        onOpenPanorama={(p) => setFullscreen360Project(p)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Interactive 360° VR Tours Showcase Section */}
      <Tours360Section
        projects={projects}
        onOpenProjectModal={(p) => setSelectedProject(p)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
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

      {/* Add / Test Custom Work Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
      />

      {/* Dedicated Immersive Fullscreen 360 Modal */}
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

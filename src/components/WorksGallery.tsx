import React, { useState, useMemo } from 'react';
import { Project } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';

interface WorksGalleryProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenPanorama: (project: Project) => void;
}

export const WorksGallery: React.FC<WorksGalleryProps> = ({
  projects,
  onSelectProject,
  onOpenPanorama
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    if (activeFilter === '360') return projects.filter((p) => p.mediaType === '360');
    if (activeFilter === 'video') return projects.filter((p) => p.mediaType === 'video');
    if (activeFilter === 'comparison') return projects.filter((p) => p.mediaType === 'comparison');
    if (activeFilter === 'interior') return projects.filter((p) => p.category === 'interior');
    if (activeFilter === 'exterior') return projects.filter((p) => p.category === 'exterior');
    return projects;
  }, [projects, activeFilter]);

  const filterTabs = [
    { id: 'all', label: 'All Works', count: projects.length },
    {
      id: '360',
      label: '360° Tours',
      count: projects.filter((p) => p.mediaType === '360').length
    },
    {
      id: 'video',
      label: 'Films',
      count: projects.filter((p) => p.mediaType === 'video').length
    },
    {
      id: 'comparison',
      label: 'Clay Breakdowns',
      count: projects.filter((p) => p.mediaType === 'comparison').length
    },
    {
      id: 'interior',
      label: 'Interiors',
      count: projects.filter((p) => p.category === 'interior').length
    },
    {
      id: 'exterior',
      label: 'Exteriors',
      count: projects.filter((p) => p.category === 'exterior').length
    }
  ];

  return (
    <section id="works" className="py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium mb-3">
              Selected 3D & Spatial Works
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display">
              Curated Portfolio
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl leading-relaxed">
              High-fidelity architectural CGI stills, cinematic film choreography, and immersive 360° virtual spaces.
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-400">
            <span>{filteredProjects.length} Selected Projects</span>
          </div>
        </div>

        {/* Floating Glassmorphism Filter Bar */}
        <div className="flex items-center gap-2 p-1.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full overflow-x-auto mb-12 w-fit max-w-full">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono ${
                    isActive ? 'text-black/60 font-semibold' : 'text-zinc-400'
                  }`}
                >
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Bento-Box Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, index) => {
            // Asymmetric Bento sizing: index 0 and 3 are prominent wide cards
            const isWide = index === 0 || index === 3;
            const spanClass = isWide
              ? 'lg:col-span-8'
              : index === 1 || index === 2
              ? 'lg:col-span-4'
              : 'lg:col-span-6';

            return (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => onSelectProject(project)}
                onOpenPanorama={onOpenPanorama}
                className={spanClass}
              />
            );
          })}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center border border-white/10 rounded-3xl p-8 bg-black/40 backdrop-blur-xl">
            <p className="text-zinc-400 text-sm">No projects matching this filter category.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-4 px-5 py-2 bg-white/10 hover:bg-white/20 text-xs font-medium text-white rounded-full transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

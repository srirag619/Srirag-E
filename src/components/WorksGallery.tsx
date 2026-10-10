import React, { useState, useMemo } from 'react';
import { Project, MediaType, Category } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { Compass, Film, Layers, Image as ImageIcon, SlidersHorizontal } from 'lucide-react';

interface WorksGalleryProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenPanorama: (project: Project) => void;
  onOpenAddModal: () => void;
}

export const WorksGallery: React.FC<WorksGalleryProps> = ({
  projects,
  onSelectProject,
  onOpenPanorama,
  onOpenAddModal
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
      label: '360° Virtual Tours',
      count: projects.filter((p) => p.mediaType === '360').length
    },
    {
      id: 'video',
      label: 'Cinematic Films',
      count: projects.filter((p) => p.mediaType === 'video').length
    },
    {
      id: 'comparison',
      label: 'Clay Comparisons',
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
    <section id="works" className="py-20 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium mb-2">
              Selected CGI & Interactive Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Curated Architectural Works
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              Spanning ultra-luxury residential penthouses, cultural museums, and masterplan developments. Every piece combines physically based lighting and precision digital construction.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>Showing {filteredProjects.length} Works</span>
          </div>
        </div>

        {/* Filter Controls (Segmented Bar as permitted by Section 1.A) */}
        <div className="flex items-center gap-1.5 p-1 bg-[#111216] border border-zinc-800 rounded-xl overflow-x-auto mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-400 text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono ${
                    isActive ? 'text-black/70 font-semibold' : 'text-zinc-400'
                  }`}
                >
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => onSelectProject(project)}
              onOpenPanorama={onOpenPanorama}
            />
          ))}
        </div>

        {/* Empty state if filter has no projects */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center border border-dashed border-zinc-800 rounded-2xl p-8 bg-[#0e1015]">
            <p className="text-zinc-400 text-sm">No projects matching this filter category.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-3 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white rounded-lg transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Layers, ArrowUpRight } from 'lucide-react';
import { Project } from '../types/portfolio';
import { PanoramaViewer } from './PanoramaViewer';

interface Tours360SectionProps {
  projects: Project[];
  onOpenProjectModal: (project: Project) => void;
}

export const Tours360Section: React.FC<Tours360SectionProps> = ({
  projects,
  onOpenProjectModal
}) => {
  const panoramaProjects = projects.filter((p) => p.mediaType === '360');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    panoramaProjects[0]?.id || 'project-360-penthouse'
  );

  const activeProject =
    panoramaProjects.find((p) => p.id === selectedProjectId) || panoramaProjects[0];

  return (
    <section id="tours360" className="py-24 border-b border-white/10 bg-[#07080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-mono font-medium mb-2">
              <Compass className="w-4 h-4" />
              <span>Interactive Spatial Virtual Reality</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              360° Virtual Tours
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              High-resolution equirectangular virtual environments. Explore spatial volumes, daylight trajectories, and material finishes directly inside your browser.
            </p>
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            <span>4K Equirectangular · Spherical Projection</span>
          </div>
        </div>

        {/* Scene Selection Ribbon */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6">
          {panoramaProjects.map((p) => {
            const isSelected = p.id === activeProject?.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`p-2.5 rounded-2xl border flex items-center gap-3 shrink-0 transition-all text-left ${
                  isSelected
                    ? 'bg-white/10 border-white/30 text-white shadow-xl'
                    : 'bg-[#0f1117]/80 border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-tight">{p.title}</div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{p.location}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured 360 Viewer Canvas */}
        {activeProject && (
          <div className="relative">
            <PanoramaViewer
              key={activeProject.id}
              initialScene={activeProject.panoramaSceneId || 'penthouse'}
              customImageUrl={activeProject.panoramaUrl}
              hotspots={activeProject.hotspots}
              title={activeProject.title}
              subtitle={activeProject.subtitle}
            />

            {/* Bottom Project Metadata Drawer Strip */}
            <div className="mt-4 p-5 bg-[#0e1015]/80 backdrop-blur-xl border border-white/10 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Client / Studio</span>
                <span className="text-white font-semibold">{activeProject.client}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Engine & Projection</span>
                <span className="text-white font-semibold">{activeProject.metadata.engine}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Lighting Environment</span>
                <span className="text-zinc-300 truncate block">{activeProject.metadata.lighting}</span>
              </div>
              <div className="flex items-center justify-end">
                <button
                  onClick={() => onOpenProjectModal(activeProject)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

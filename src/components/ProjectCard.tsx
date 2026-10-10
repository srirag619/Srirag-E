import React from 'react';
import { Compass, Film, Layers, Image as ImageIcon, ArrowUpRight } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onOpenPanorama?: (project: Project) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  onOpenPanorama,
  className = ''
}) => {
  const getMediaKicker = () => {
    switch (project.mediaType) {
      case '360':
        return { label: '360° Virtual Tour', icon: Compass, color: 'text-amber-400' };
      case 'video':
        return { label: 'Cinematic Film', icon: Film, color: 'text-sky-400' };
      case 'comparison':
        return { label: 'Clay vs Render', icon: Layers, color: 'text-emerald-400' };
      default:
        return { label: 'Architectural Still', icon: ImageIcon, color: 'text-zinc-400' };
    }
  };

  const kicker = getMediaKicker();
  const Icon = kicker.icon;

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col bg-[#0c0d12]/80 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Visual Media Container with smooth zoom */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
        <img
          src={project.coverImage}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Measured Scrim Gradient for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-black/30 pointer-events-none" />

        {/* Media Type Floating Pill (Top Left) */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 text-[11px] font-mono font-medium text-zinc-300">
          <Icon className={`w-3.5 h-3.5 ${kicker.color}`} />
          <span>{kicker.label}</span>
        </div>

        {/* Quick Launch Button for 360 */}
        {project.mediaType === '360' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenPanorama) onOpenPanorama(project);
              else onClick();
            }}
            className="absolute bottom-4 right-4 px-3.5 py-1.5 bg-white hover:bg-zinc-200 text-black text-xs font-semibold rounded-full shadow-lg flex items-center gap-1.5 transition-transform group-hover:scale-105"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Launch 360°</span>
          </button>
        )}

        {project.mediaType === 'video' && (
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-xl border border-white/10 text-white text-[11px] font-mono rounded-full flex items-center gap-1">
            <span>{project.videoDuration || '02:00'}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata Header */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 font-mono">
            <span>{project.location}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{project.year}</span>
          </div>

          {/* Primary Title */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight font-display group-hover:text-amber-400 transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
          </div>

          <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Footer Technical Metadata */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <span className="truncate max-w-[200px]">
            {project.metadata.engine}
          </span>
          <span className="text-zinc-500">
            {project.client}
          </span>
        </div>
      </div>
    </div>
  );
};

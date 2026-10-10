import React, { useState } from 'react';
import { Film, Play, Clock, ArrowUpRight } from 'lucide-react';
import { Project } from '../types/portfolio';
import { VideoPlayer } from './VideoPlayer';

interface CinematicsSectionProps {
  projects: Project[];
  onOpenProjectModal: (project: Project) => void;
}

export const CinematicsSection: React.FC<CinematicsSectionProps> = ({
  projects,
  onOpenProjectModal
}) => {
  const videoProjects = projects.filter((p) => p.mediaType === 'video');
  const [activeVideoId, setActiveVideoId] = useState<string>(
    videoProjects[0]?.id || 'project-video-villa'
  );

  const activeProject =
    videoProjects.find((p) => p.id === activeVideoId) || videoProjects[0];

  if (!activeProject) return null;

  return (
    <section id="cinematics" className="py-24 border-b border-white/10 bg-[#07080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-sky-400 font-mono font-medium mb-2">
              <Film className="w-4 h-4" />
              <span>Cinematics & Motion</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Architectural Films
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              Choreographed drone trajectories, daylight transitions, and atmospheric camera moves rendered in real-time Unreal Engine 5.
            </p>
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            <span>DCI 4K · 2.39:1 Anamorphic · DaVinci ACES</span>
          </div>
        </div>

        {/* Video Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Viewport (Span 8) */}
          <div className="lg:col-span-8 space-y-4">
            <VideoPlayer
              key={activeProject.id}
              src={activeProject.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
              poster={activeProject.coverImage}
              title={activeProject.title}
              quality={activeProject.videoQuality}
              timestamps={activeProject.videoTimestamps}
              className="aspect-video w-full rounded-3xl shadow-2xl border border-white/10"
            />

            {/* Video Meta Info */}
            <div className="p-5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight font-display">
                  {activeProject.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                  {activeProject.location} · {activeProject.client}
                </p>
              </div>

              <button
                onClick={() => onOpenProjectModal(activeProject)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full border border-white/10 transition-colors whitespace-nowrap flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Project Breakdown</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Film Reel Selector (Span 4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase text-zinc-400 font-semibold tracking-wider px-1">
              Selected Films ({videoProjects.length})
            </h4>

            <div className="space-y-3">
              {videoProjects.map((v) => {
                const isSelected = v.id === activeProject.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setActiveVideoId(v.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white/10 border-white/30 shadow-xl'
                        : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex gap-3.5">
                      <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                        <img
                          src={v.coverImage}
                          alt={v.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-5 h-5 text-white fill-current" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[10px] text-sky-400 font-mono font-medium">
                          <Clock className="w-3 h-3" />
                          <span>{v.videoDuration || '02:00'}</span>
                        </div>
                        <h5 className="text-xs font-bold text-white truncate mt-1">
                          {v.title}
                        </h5>
                        <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                          {v.client}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import {
  X,
  Share2,
  Check,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { Project } from '../types/portfolio';
import { PanoramaViewer } from './PanoramaViewer';
import { VideoPlayer } from './VideoPlayer';
import { CompareSlider } from './CompareSlider';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenPanoramaFullscreen?: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenPanoramaFullscreen
}) => {
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl bg-[#0a0b0f]/95 border border-white/10 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="p-5 md:px-7 md:py-5 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <span>{project.location}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
              <span aria-hidden="true">·</span>
              <span className="text-white font-medium">{project.client}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1 font-display">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 md:p-7 space-y-7">
          {/* Main Media Showcase Container */}
          <div className="w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
            {project.mediaType === '360' && (
              <div className="relative w-full min-h-[60vh]">
                <PanoramaViewer
                  initialScene={project.panoramaSceneId || 'penthouse'}
                  customImageUrl={project.panoramaUrl}
                  hotspots={project.hotspots}
                  title={project.title}
                  subtitle={project.subtitle}
                />
              </div>
            )}

            {project.mediaType === 'video' && (
              <VideoPlayer
                src={project.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                poster={project.coverImage}
                title={project.title}
                quality={project.videoQuality}
                timestamps={project.videoTimestamps}
                className="aspect-video w-full"
              />
            )}

            {project.mediaType === 'comparison' && (
              <CompareSlider
                beforeImage={project.clayImage || project.coverImage}
                afterImage={project.renderImage || project.coverImage}
                beforeLabel="RAW CLAY & AMBIENT OCCLUSION"
                afterLabel="FINAL MULTI-PASS RENDER"
                className="aspect-[16/9] w-full"
              />
            )}

            {project.mediaType === 'image' && (
              <div className="space-y-4">
                <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
                  <img
                    src={
                      project.galleryImages?.[selectedGalleryIdx] ||
                      project.coverImage
                    }
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {project.galleryImages && project.galleryImages.length > 1 && (
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl overflow-x-auto">
                    {project.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedGalleryIdx(idx)}
                        className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                          selectedGalleryIdx === idx
                            ? 'border-white ring-2 ring-white/20'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
                  Concept & Architectural Intent
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight mt-1 font-display">
                  {project.subtitle}
                </h3>
                <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.hotspots && project.hotspots.length > 0 && (
                <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-xs font-mono uppercase text-zinc-400 font-semibold mb-3">
                    Spatial Annotations ({project.hotspots.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.hotspots.map((hs) => (
                      <div key={hs.id} className="p-3 bg-black/40 rounded-xl border border-white/5">
                        <div className="text-[10px] font-mono text-amber-400 font-semibold mb-0.5">
                          {hs.category || 'Focus Area'}
                        </div>
                        <div className="text-xs font-bold text-white">{hs.title}</div>
                        <div className="text-[11px] text-zinc-400 mt-1">{hs.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Technical Specifications Panel */}
            <div className="space-y-4">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4 font-mono text-xs">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>Technical Render Pass Data</span>
                </h4>

                <div className="space-y-3">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">RENDER ENGINE</span>
                    <span className="text-white font-medium">{project.metadata.engine}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[10px]">CAMERA SPECIFICATIONS</span>
                    <span className="text-white font-medium">
                      {project.metadata.focalLength} · {project.metadata.aperture} · ISO {project.metadata.iso}
                    </span>
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[10px]">LIGHTING ENVIRONMENT</span>
                    <span className="text-zinc-300">{project.metadata.lighting}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 block text-[10px]">SOFTWARE PIPELINE</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {project.metadata.software.map((sw, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-white/10 text-zinc-200 rounded-md text-[10px]"
                        >
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-zinc-500 block text-[10px]">LEAD ARCHITECT / CLIENT</span>
                    <span className="text-white font-medium">
                      {project.architect || project.client}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Compass, Film, Layers, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#060709] border-t border-zinc-800/80 py-12 text-zinc-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-zinc-900">
          <div>
            <div className="text-base font-extrabold text-white tracking-tight font-display mb-1">
              AURA // ARCHVIZ
            </div>
            <p className="text-xs text-zinc-400 max-w-sm font-sans">
              High-end architectural visualization, real-time cinematics, and interactive 360° virtual reality.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <a href="#works" className="hover:text-white transition-colors">
              Selected Works
            </a>
            <a href="#tours360" className="hover:text-white transition-colors">
              360° Virtual Tours
            </a>
            <a href="#cinematics" className="hover:text-white transition-colors">
              Cinematic Films
            </a>
            <a href="#studio" className="hover:text-white transition-colors">
              Studio Pipeline
            </a>
            <a href="#inquire" className="hover:text-white transition-colors">
              Inquire
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors border border-zinc-800"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[11px]">Back to Top</span>
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()} AURA VIZ STUDIO. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Corona 11</span>
            <span>·</span>
            <span>Unreal Engine 5.4</span>
            <span>·</span>
            <span>Three.js WebGL 360</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

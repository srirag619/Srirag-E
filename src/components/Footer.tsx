import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050608] border-t border-white/10 py-12 text-zinc-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/5">
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
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-full transition-colors border border-white/10"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[11px]">Back to Top</span>
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} AURA VIZ. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Pannellum 360 & WebGL</span>
            <span>·</span>
            <span>Unreal Engine 5.4</span>
            <span>·</span>
            <span>Corona 11</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

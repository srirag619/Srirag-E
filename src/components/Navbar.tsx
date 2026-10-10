import React from 'react';
import { Plus } from 'lucide-react';

interface NavbarProps {
  onOpenAddModal: () => void;
  onOpenCommission: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddModal,
  onOpenCommission
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#090a0d]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a
          href="#"
          className="text-lg md:text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors font-display"
        >
          AURA // ARCHVIZ
        </a>

        {/* Zone 2: 4–5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-zinc-400 font-mono">
          <a
            href="#works"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Works
          </a>
          <a
            href="#tours360"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            360° Virtual
          </a>
          <a
            href="#cinematics"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Cinematics
          </a>
          <a
            href="#studio"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Studio
          </a>
          <a
            href="#inquire"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Inquire
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors whitespace-nowrap"
            title="Upload and inspect your own 360, video or render files"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Add / Test Work</span>
          </button>

          <button
            onClick={onOpenCommission}
            className="px-4 py-2 text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-all whitespace-nowrap shadow-sm hover:scale-[1.02]"
          >
            Commission Studio
          </button>
        </div>
      </div>
    </header>
  );
};

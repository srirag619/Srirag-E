import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenCommission: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommission }) => {
  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between gap-6 md:gap-10 px-6 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-all">
        {/* Brand Wordmark */}
        <a
          href="#"
          className="text-sm font-bold tracking-tight text-white whitespace-nowrap hover:text-amber-400 transition-colors font-display"
        >
          AURA // ARCHVIZ
        </a>

        {/* Floating Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-zinc-300">
          <a href="#works" className="hover:text-white transition-colors">
            Works
          </a>
          <a href="#tours360" className="hover:text-white transition-colors">
            360° Tours
          </a>
          <a href="#cinematics" className="hover:text-white transition-colors">
            Films
          </a>
          <a href="#studio" className="hover:text-white transition-colors">
            Studio
          </a>
          <a href="#inquire" className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        {/* Primary CTA pill */}
        <button
          onClick={onOpenCommission}
          className="px-4 py-1.5 text-xs font-semibold text-black bg-white hover:bg-zinc-200 rounded-full transition-all flex items-center gap-1.5 shadow-sm hover:scale-[1.03]"
        >
          <span>Get in Touch</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};

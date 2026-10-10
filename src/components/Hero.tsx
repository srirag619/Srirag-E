import React from 'react';
import { Compass, Film, ArrowDown, ChevronRight, Eye } from 'lucide-react';
import { PanoramaViewer } from './PanoramaViewer';

interface HeroProps {
  onExploreWorks: () => void;
  onOpen360Full: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreWorks,
  onOpen360Full
}) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero: Left Typography / Right Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column (Span 6): Typographic Impact */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Natural Editorial Title Kicker */}
              <div className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
                Architectural CGI · Real-Time UE5 · 360° Spatial VR
              </div>

              {/* Display Headline with balanced wrap */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display text-balance">
                Giving unbuilt architecture tangible presence.
              </h1>

              {/* Lead Copy */}
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
                We craft hyper-realistic CGI stills, cinematic film flythroughs, and interactive 360° virtual tours for visionary architects, interior designers, and luxury property developers.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreWorks}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-amber-400/20 flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>Explore Works</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#tours360"
                className="px-5 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider rounded-xl border border-zinc-800 transition-colors flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>360° Tours</span>
              </a>
            </div>

            {/* Subtle Editorial Descriptor */}
            <div className="pt-4 border-t border-zinc-850 flex items-center gap-6 text-xs text-zinc-400 font-mono">
              <span>Corona 11</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span>Unreal Engine 5.4</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span>V-Ray 6</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span>3ds Max</span>
            </div>
          </div>

          {/* Right Column (Span 7): Live Interactive 360 Panorama Viewport */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[450px] sm:h-[500px] lg:h-[540px] rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl">
              <PanoramaViewer
                initialScene="penthouse"
                title="The Horizon Penthouse"
                subtitle="Live In-Viewport 360° Tour · Drag to Explore"
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
              <span>Interactive 360° Viewport (Drag, Pinch & Zoom in real-time)</span>
              <a href="#tours360" className="text-amber-400 hover:underline flex items-center gap-1">
                <span>View Full Virtual Gallery</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Full-Width Quantitative Rigor Row (Below the Split as mandated by Section 2.B) */}
        <div className="mt-16 pt-10 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
              270+
            </div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
              High-Res Stills Produced
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
              45+
            </div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
              360° Interactive Tours
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
              4K UHD
            </div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
              Cinematic Film Master
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
              12
            </div>
            <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
              Global Architect Studios
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

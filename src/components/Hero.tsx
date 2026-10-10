import React from 'react';
import { Compass, Film, ArrowDown, ChevronRight, ArrowUpRight } from 'lucide-react';
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
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero: Left Typography / Right Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          {/* Left Column (Span 5): Typographic Impact */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Natural Editorial Title Kicker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
                <span>3D Artist & Architectural Visualizer</span>
              </div>

              {/* Display Headline with balanced wrap */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.06] font-display text-balance">
                Shaping light, space, and materiality.
              </h1>

              {/* Lead Copy */}
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
                CGI stills, cinematic film direction, and interactive 360° virtual tours for world-renowned architecture practices and luxury developers.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreWorks}
                className="px-6 py-3.5 bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider rounded-full transition-all shadow-xl hover:shadow-white/10 flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>View Portfolio</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#tours360"
                className="px-5 py-3.5 bg-black/40 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider rounded-full border border-white/10 transition-colors flex items-center gap-2 backdrop-blur-md"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>360° Tours</span>
              </a>
            </div>

            {/* Pipeline Tags */}
            <div className="pt-4 border-t border-white/5 flex items-center gap-4 text-xs text-zinc-500 font-mono">
              <span>Corona 11</span>
              <span>·</span>
              <span>Unreal Engine 5.4</span>
              <span>·</span>
              <span>V-Ray 6</span>
              <span>·</span>
              <span>Three.js</span>
            </div>
          </div>

          {/* Right Column (Span 7): Live Interactive 360 Panorama Viewport */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[460px] sm:h-[500px] lg:h-[540px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <PanoramaViewer
                customImageUrl={`${import.meta.env.BASE_URL || '/'}Market.jpg`.replace(/\/\//g, '/')}
                title="Market 360° Experience"
                subtitle="Live In-Viewport 360° Tour · Drag to Explore"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 font-mono px-2">
              <span>Interactive 360° Spatial Tour</span>
              <a href="#tours360" className="text-zinc-300 hover:text-white flex items-center gap-1 transition-colors">
                <span>View in 360° Section</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Full-Width Quantitative Metrics */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums">
              270+
            </div>
            <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-mono">
              CGI Stills Produced
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums">
              45+
            </div>
            <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-mono">
              360° Virtual Environments
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums">
              4K UHD
            </div>
            <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-mono">
              Film Master Resolution
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums">
              12
            </div>
            <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-mono">
              Partner Architecture Studios
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

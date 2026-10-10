import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { CompareSlider } from './CompareSlider';
import { createArchvizCanvas } from '../utils/archvizRenderGen';

export const CompareSection: React.FC = () => {
  const [activeCompareScene, setActiveCompareScene] = useState<'villa' | 'interior' | 'museum'>('villa');

  const scenes = {
    villa: {
      title: 'Villa Solaria Cantilever & Pool',
      location: 'Mallorca, Spain',
      description: 'Observe the raw polygon flow on the cantilevered concrete slab compared against the final water caustics, sky irradiance, and interior warm glow.',
      clay: createArchvizCanvas('villa', 'clay'),
      render: createArchvizCanvas('villa', 'render')
    },
    interior: {
      title: 'Nordic Oak & Concrete Pavilion',
      location: 'Bergen, Norway',
      description: 'Comparison showing geometric chamfer bevels, fabric displacement on low-profile lounge sofas, and subtle volumetric sunbeam scattering.',
      clay: createArchvizCanvas('interior', 'clay'),
      render: createArchvizCanvas('interior', 'render')
    },
    museum: {
      title: 'Kyoto Contemporary Art Museum',
      location: 'Kyoto, Japan',
      description: 'Double-curved parametric bronze panels: evaluating seam tolerance and ambient occlusion shadowing prior to physical anisotropic shader compilation.',
      clay: createArchvizCanvas('museum', 'clay'),
      render: createArchvizCanvas('museum', 'render')
    }
  };

  const current = scenes[activeCompareScene];

  return (
    <section className="py-24 border-b border-white/10 bg-[#07080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-mono font-medium mb-2">
              <Layers className="w-4 h-4" />
              <span>Pipeline & Shader Breakdown</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Clay Geometry vs. Final CGI
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              Drag the central divider to inspect polygonal bevels, ambient occlusion contact shadows, and physical shader depth.
            </p>
          </div>

          {/* Scene selector */}
          <div className="flex items-center gap-1.5 p-1.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full">
            {(['villa', 'interior', 'museum'] as const).map((sc) => (
              <button
                key={sc}
                onClick={() => setActiveCompareScene(sc)}
                className={`px-4 py-1.5 text-xs font-mono rounded-full transition-all capitalize ${
                  activeCompareScene === sc
                    ? 'bg-white text-black font-semibold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {sc}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Compare Slider Container */}
        <div className="w-full">
          <CompareSlider
            beforeImage={current.clay}
            afterImage={current.render}
            beforeLabel="RAW CLAY // AMBIENT OCCLUSION"
            afterLabel="CORONA 11 // MULTI-PASS"
            className="aspect-[16/9] w-full max-h-[640px] rounded-3xl border border-white/10"
          />

          {/* Description strip below */}
          <div className="mt-4 p-5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-white tracking-wide font-display text-sm">{current.title}</span>
              <span className="text-zinc-500 font-mono ml-2">({current.location})</span>
              <p className="text-zinc-400 text-xs mt-1">{current.description}</p>
            </div>
            <div className="text-[11px] font-mono text-zinc-400 whitespace-nowrap">
              Drag divider to inspect geometry
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Cpu, Camera, Lightbulb, MonitorCheck, ShieldCheck, Award } from 'lucide-react';

export const StudioSection: React.FC = () => {
  const softwareStack = [
    { name: 'Corona Renderer 11', role: 'Physically Based Interior & Exterior Stills' },
    { name: 'Unreal Engine 5.4', role: 'Real-Time Lumen Cinematics & Nanite Meshes' },
    { name: '3ds Max 2025', role: 'Parametric Hard-Surface & Architectural Modeling' },
    { name: 'V-Ray 6', role: 'Complex Multi-Pass Light Baking' },
    { name: 'Three.js & WebGL', role: 'In-Browser 360° Spatial Tour Deployment' },
    { name: 'DaVinci Resolve Studio', role: 'ACES Color Science & Anamorphic Film Mastering' },
    { name: 'Marvelous Designer', role: 'Realistic Soft Fabric & Drape Simulations' },
    { name: 'Forest Pack Pro', role: 'Biophilic Vegetation & Eco-System Scattering' }
  ];

  const trustedArchitects = [
    'Foster + Partners',
    'Kengo Kuma & Associates',
    'Snøhetta',
    'Studio MK27',
    'SANAA Architects',
    'Herzog & de Meuron',
    'Zaha Hadid Architects',
    'BIG (Bjarke Ingels Group)'
  ];

  return (
    <section id="studio" className="py-20 border-b border-zinc-800/80 bg-[#090a0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid: Left Studio Story, Right Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Philosophy & Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
              Studio Methodology & Craft
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              Where architectural discipline meets cinematic fidelity.
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Founded by trained architects and 3D visual artists, AURA VIZ bridges the divide between conceptual drawing and tangible human experience. We do not just place textures on polygonal blocks; we study sun angles at specific latitudes, simulate physical micro-surface roughness, and choreograph camera sightlines.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Whether preparing an international competition submission, courting luxury residential buyers, or launching a masterplan, our visuals communicate scale, emotion, and architectural intent without compromise.
            </p>

            {/* Core Pillars */}
            <div className="pt-4 space-y-3">
              <div className="p-4 bg-[#0e1015] border border-zinc-800 rounded-xl">
                <div className="text-xs font-bold text-white mb-1">01. Latitudinal Sun & Atmospheric Accuracy</div>
                <p className="text-[11px] text-zinc-400">
                  Calibrated HDRI domes synced to geographical coordinates, solar elevation, and real-world turbidity.
                </p>
              </div>

              <div className="p-4 bg-[#0e1015] border border-zinc-800 rounded-xl">
                <div className="text-xs font-bold text-white mb-1">02. Spatial 360° WebGL Integration</div>
                <p className="text-[11px] text-zinc-400">
                  Direct browser-based virtual tours with interactive architectural callouts and zero app installation.
                </p>
              </div>

              <div className="p-4 bg-[#0e1015] border border-zinc-800 rounded-xl">
                <div className="text-xs font-bold text-white mb-1">03. Cinema-Grade Anamorphic Lenses</div>
                <p className="text-[11px] text-zinc-400">
                  Optical characteristics emulating Cooke and ARRI Master Primes with natural chromatic behavior.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Software Pipeline & Trusted Collaborators */}
          <div className="lg:col-span-7 space-y-10">
            {/* Pipeline Stack */}
            <div>
              <div className="text-xs uppercase tracking-widest text-zinc-400 font-mono font-medium mb-4">
                Dedicated Software Pipeline
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {softwareStack.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#0e1015] border border-zinc-800 rounded-xl flex flex-col justify-between"
                  >
                    <div className="text-xs font-bold text-white tracking-wide font-mono">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      {item.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trusted Architecture Studios */}
            <div className="pt-6 border-t border-zinc-800/80">
              <div className="text-xs uppercase tracking-widest text-zinc-400 font-mono font-medium mb-4">
                Collaborating Architecture Practices
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {trustedArchitects.map((arch, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#0e1015] border border-zinc-850 rounded-lg text-center flex items-center justify-center min-h-[56px]"
                  >
                    <span className="text-xs font-medium text-zinc-300 font-display">
                      {arch}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

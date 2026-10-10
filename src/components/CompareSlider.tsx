import React, { useState, useRef, useCallback } from 'react';
import { Layers, Sparkles } from 'lucide-react';

interface CompareSliderProps {
  beforeImage: string; // Clay / AO
  afterImage: string; // Final Render
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const CompareSlider: React.FC<CompareSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'RAW CLAY / AO PASS',
  afterLabel = 'FINAL MULTI-PASS RENDER',
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative select-none overflow-hidden rounded-xl border border-zinc-800 bg-black cursor-ew-resize group shadow-2xl ${className}`}
    >
      {/* Background Layer: Final CGI Render (Right / Bottom) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="w-full h-full object-cover block pointer-events-none"
      />

      {/* Foreground Layer: Clay / AO Pass (Clipped to sliderPosition) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
          style={{
            width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
            height: '100%'
          }}
        />
      </div>

      {/* Vertical Hairline Divider */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-0.5 h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)]" />

        {/* Circular Drag Handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-2xl border border-zinc-200 transition-transform group-hover:scale-110">
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] font-bold">◀</span>
            <span className="text-[10px] font-bold">▶</span>
          </div>
        </div>
      </div>

      {/* Labels on opposite sides */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="px-2.5 py-1 bg-black/75 backdrop-blur-md rounded border border-zinc-700/80 flex items-center gap-1.5 text-[11px] font-mono font-medium text-zinc-300">
          <Layers className="w-3 h-3 text-zinc-400" />
          <span>{beforeLabel}</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <div className="px-2.5 py-1 bg-black/75 backdrop-blur-md rounded border border-zinc-700/80 flex items-center gap-1.5 text-[11px] font-mono font-medium text-amber-400">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{afterLabel}</span>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-[10px] text-zinc-400 font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        Drag slider to compare geometry vs render
      </div>
    </div>
  );
};

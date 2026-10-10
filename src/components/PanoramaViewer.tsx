import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Info,
  MapPin,
  Upload,
  Compass,
  Layers,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Hotspot } from '../types/portfolio';
import { generateArchitecturalPanorama } from '../utils/procedural360';

interface PanoramaViewerProps {
  initialScene?: 'penthouse' | 'pavilion' | 'nordic' | 'atrium' | 'custom';
  customImageUrl?: string;
  hotspots?: Hotspot[];
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  isModal?: boolean;
}

const DEFAULT_HOTSPOTS: Hotspot[] = [
  {
    id: 'hs-def-1',
    title: 'Floor-to-Ceiling Structural Glazing',
    description: 'Triple-glazed low-iron solar control curtain wall with motorized concealment blinds.',
    yaw: 20,
    pitch: 5,
    category: 'Glazing'
  },
  {
    id: 'hs-def-2',
    title: 'Travertine Monolith Island',
    description: 'Honed Navona travertine stone block with flush architectural cabinetry.',
    yaw: -85,
    pitch: -15,
    category: 'Material'
  },
  {
    id: 'hs-def-3',
    title: 'Recessed Flos Architecture',
    description: 'Continuous 48V magnetic track system with micro-spotlights and ambient diffusers.',
    yaw: -5,
    pitch: 45,
    category: 'Lighting'
  }
];

export const PanoramaViewer: React.FC<PanoramaViewerProps> = ({
  initialScene = 'penthouse',
  customImageUrl,
  hotspots: initialHotspots,
  title = 'Horizon Penthouse Virtual Tour',
  subtitle = 'Interactive 360° Equirectangular Spatial Environment',
  onClose,
  isModal = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  
  // Three.js instances in refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Interaction state refs
  const isUserInteractingRef = useRef<boolean>(false);
  const onPointerDownMouseXRef = useRef<number>(0);
  const onPointerDownMouseYRef = useRef<number>(0);
  const onPointerDownLonRef = useRef<number>(0);
  const onPointerDownLatRef = useRef<number>(0);
  const lonRef = useRef<number>(0);
  const latRef = useRef<number>(0);
  const phiRef = useRef<number>(0);
  const thetaRef = useRef<number>(0);
  const targetLonRef = useRef<number>(0);
  const targetLatRef = useRef<number>(0);

  // React states
  const [currentScene, setCurrentScene] = useState<'penthouse' | 'pavilion' | 'nordic' | 'atrium' | 'custom'>(
    customImageUrl ? 'custom' : initialScene
  );
  const [activeTextureUrl, setActiveTextureUrl] = useState<string>('');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [fov, setFov] = useState<number>(75);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [customFileLoaded, setCustomFileLoaded] = useState<string | null>(customImageUrl || null);
  const [showControlsGuide, setShowControlsGuide] = useState<boolean>(true);

  // Memoize hotspots to prevent recreation on every render
  const hotspots = useMemo(() => {
    return initialHotspots && initialHotspots.length > 0 ? initialHotspots : DEFAULT_HOTSPOTS;
  }, [initialHotspots]);

  // Direct DOM references for 3D hotspots to avoid calling setState on requestAnimationFrame
  const hotspotElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const hotspotsRef = useRef(hotspots);
  hotspotsRef.current = hotspots;

  const showHotspotsRef = useRef(showHotspots);
  showHotspotsRef.current = showHotspots;

  // Resolve texture based on currentScene
  useEffect(() => {
    setIsLoading(true);
    let url = '';
    if (customFileLoaded) {
      url = customFileLoaded;
    } else if (currentScene === 'custom' && customImageUrl) {
      url = customImageUrl;
    } else {
      url = generateArchitecturalPanorama(
        currentScene === 'custom' ? 'penthouse' : currentScene
      );
    }
    setActiveTextureUrl(url);
  }, [currentScene, customFileLoaded, customImageUrl]);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      fov,
      container.clientWidth / container.clientHeight,
      1,
      1100
    );
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // Geometry & inverted sphere
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // invert the sphere so normals point inward

    // Default neutral material until texture loads
    const material = new THREE.MeshBasicMaterial({ color: 0x111216 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    sphereMeshRef.current = mesh;

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Update texture when activeTextureUrl changes
  useEffect(() => {
    if (!activeTextureUrl || !sphereMeshRef.current) return;
    const loader = new THREE.TextureLoader();

    loader.load(
      activeTextureUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        if (sphereMeshRef.current) {
          const mat = sphereMeshRef.current.material as THREE.MeshBasicMaterial;
          mat.map = texture;
          mat.needsUpdate = true;
        }
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error('Texture load error, falling back to procedural:', err);
        const fallbackUrl = generateArchitecturalPanorama('penthouse');
        loader.load(fallbackUrl, (fallbackTex) => {
          fallbackTex.colorSpace = THREE.SRGBColorSpace;
          if (sphereMeshRef.current) {
            const mat = sphereMeshRef.current.material as THREE.MeshBasicMaterial;
            mat.map = fallbackTex;
            mat.needsUpdate = true;
          }
        });
        setIsLoading(false);
      }
    );
  }, [activeTextureUrl]);

  // Main Render & Animation Loop
  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  useEffect(() => {
    const renderLoop = () => {
      animFrameIdRef.current = requestAnimationFrame(renderLoop);

      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      const scene = sceneRef.current;
      const container = canvasContainerRef.current;

      if (!camera || !renderer || !scene || !container) return;

      // Auto rotation drift when not dragging
      if (autoRotateRef.current && !isUserInteractingRef.current) {
        targetLonRef.current += 0.08;
      }

      // Smooth interpolation (damping)
      lonRef.current += (targetLonRef.current - lonRef.current) * 0.1;
      latRef.current += (targetLatRef.current - latRef.current) * 0.1;

      // Clamp latitude to avoid pole flipping
      latRef.current = Math.max(-85, Math.min(85, latRef.current));

      phiRef.current = THREE.MathUtils.degToRad(90 - latRef.current);
      thetaRef.current = THREE.MathUtils.degToRad(lonRef.current);

      const x = 500 * Math.sin(phiRef.current) * Math.cos(thetaRef.current);
      const y = 500 * Math.cos(phiRef.current);
      const z = 500 * Math.sin(phiRef.current) * Math.sin(thetaRef.current);

      camera.lookAt(x, y, z);
      renderer.render(scene, camera);

      // Project 3D Hotspots to 2D Screen Space directly via DOM elements (no React setState)
      if (showHotspotsRef.current && hotspotsRef.current.length > 0) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        const camDir = new THREE.Vector3();
        camera.getWorldDirection(camDir);

        for (const hs of hotspotsRef.current) {
          const el = hotspotElementsRef.current.get(hs.id);
          if (!el) continue;

          const hPhi = THREE.MathUtils.degToRad(90 - hs.pitch);
          const hTheta = THREE.MathUtils.degToRad(hs.yaw);
          const hsVec = new THREE.Vector3(
            500 * Math.sin(hPhi) * Math.cos(hTheta),
            500 * Math.cos(hPhi),
            500 * Math.sin(hPhi) * Math.sin(hTheta)
          );

          // Test if point is in front of camera
          const dir = new THREE.Vector3().subVectors(hsVec, camera.position).normalize();
          const dot = dir.dot(camDir);

          hsVec.project(camera);

          const isVisible = dot > 0.4 && hsVec.z < 1;
          if (isVisible) {
            const screenX = ((hsVec.x + 1) * width) / 2;
            const screenY = ((-hsVec.y + 1) * height) / 2;
            el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%)`;
            el.style.display = 'block';
          } else {
            el.style.display = 'none';
          }
        }
      } else {
        hotspotElementsRef.current.forEach((el) => {
          el.style.display = 'none';
        });
      }
    };

    renderLoop();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // Pointer Interaction Handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isUserInteractingRef.current = true;
    setShowControlsGuide(false);
    onPointerDownMouseXRef.current = e.clientX;
    onPointerDownMouseYRef.current = e.clientY;
    onPointerDownLonRef.current = targetLonRef.current;
    onPointerDownLatRef.current = targetLatRef.current;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isUserInteractingRef.current) return;
    const factor = 0.15;
    targetLonRef.current =
      (onPointerDownMouseXRef.current - e.clientX) * factor + onPointerDownLonRef.current;
    targetLatRef.current =
      (e.clientY - onPointerDownMouseYRef.current) * factor + onPointerDownLatRef.current;
  }, []);

  const handlePointerUp = useCallback(() => {
    isUserInteractingRef.current = false;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setFov((prev) => {
      const next = Math.max(30, Math.min(100, prev + e.deltaY * 0.05));
      if (cameraRef.current) {
        cameraRef.current.fov = next;
        cameraRef.current.updateProjectionMatrix();
      }
      return next;
    });
  }, []);

  const adjustFov = (delta: number) => {
    setFov((prev) => {
      const next = Math.max(30, Math.min(100, prev + delta));
      if (cameraRef.current) {
        cameraRef.current.fov = next;
        cameraRef.current.updateProjectionMatrix();
      }
      return next;
    });
  };

  const handleResetView = () => {
    targetLonRef.current = 0;
    targetLatRef.current = 0;
    setFov(75);
    if (cameraRef.current) {
      cameraRef.current.fov = 75;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Focus camera on hotspot
  const focusHotspot = (hs: Hotspot) => {
    targetLonRef.current = hs.yaw;
    targetLatRef.current = hs.pitch;
    setActiveHotspot(hs);
  };

  // User custom 360 file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomFileLoaded(event.target.result as string);
          setCurrentScene('custom');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-[#07080a] select-none overflow-hidden group ${
        isModal
          ? 'fixed inset-0 z-50 flex flex-col h-screen'
          : 'h-[640px] md:h-[740px] rounded-2xl border border-zinc-800/80 shadow-2xl'
      }`}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={canvasContainerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#090a0d]/80 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none z-30 transition-opacity duration-300">
          <div className="w-10 h-10 border-2 border-zinc-700 border-t-amber-400 rounded-full animate-spin mb-3" />
          <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
            Calibrating 360° Spherical Environment...
          </p>
        </div>
      )}

      {/* Top HUD Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-start justify-between pointer-events-none z-20">
        <div className="bg-[#111216]/90 backdrop-blur-md border border-zinc-800/90 rounded-xl p-3 md:p-4 max-w-md pointer-events-auto shadow-xl">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wider uppercase mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive 360° Spatial Tour</span>
          </div>
          <h2 className="text-base md:text-lg font-bold text-white tracking-tight">{title}</h2>
          <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{subtitle}</p>

          {/* Preset Scene Selector Tabs */}
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-zinc-800/80 overflow-x-auto pb-0.5">
            <button
              onClick={() => {
                setCustomFileLoaded(null);
                setCurrentScene('penthouse');
              }}
              className={`px-2.5 py-1 text-xs rounded-md transition-all whitespace-nowrap ${
                currentScene === 'penthouse' && !customFileLoaded
                  ? 'bg-amber-400 text-black font-semibold shadow-sm'
                  : 'bg-zinc-800/70 text-zinc-300 hover:text-white hover:bg-zinc-700/60'
              }`}
            >
              Penthouse Salon
            </button>
            <button
              onClick={() => {
                setCustomFileLoaded(null);
                setCurrentScene('pavilion');
              }}
              className={`px-2.5 py-1 text-xs rounded-md transition-all whitespace-nowrap ${
                currentScene === 'pavilion' && !customFileLoaded
                  ? 'bg-amber-400 text-black font-semibold shadow-sm'
                  : 'bg-zinc-800/70 text-zinc-300 hover:text-white hover:bg-zinc-700/60'
              }`}
            >
              Concrete Pavilion
            </button>
            <button
              onClick={() => {
                setCustomFileLoaded(null);
                setCurrentScene('nordic');
              }}
              className={`px-2.5 py-1 text-xs rounded-md transition-all whitespace-nowrap ${
                currentScene === 'nordic' && !customFileLoaded
                  ? 'bg-amber-400 text-black font-semibold shadow-sm'
                  : 'bg-zinc-800/70 text-zinc-300 hover:text-white hover:bg-zinc-700/60'
              }`}
            >
              Nordic Fjord Villa
            </button>
            <button
              onClick={() => {
                setCustomFileLoaded(null);
                setCurrentScene('atrium');
              }}
              className={`px-2.5 py-1 text-xs rounded-md transition-all whitespace-nowrap ${
                currentScene === 'atrium' && !customFileLoaded
                  ? 'bg-amber-400 text-black font-semibold shadow-sm'
                  : 'bg-zinc-800/70 text-zinc-300 hover:text-white hover:bg-zinc-700/60'
              }`}
            >
              Zen Atrium
            </button>
          </div>
        </div>

        {/* Action Buttons Top-Right */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Custom Upload 360 Button */}
          <label className="flex items-center gap-1.5 px-3 py-2 bg-[#111216]/90 hover:bg-zinc-800 text-xs font-medium text-zinc-200 hover:text-white rounded-lg border border-zinc-800 backdrop-blur-md cursor-pointer transition-colors shadow-lg">
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Upload 360 Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 bg-[#111216]/90 hover:bg-zinc-800 text-zinc-200 hover:text-white rounded-lg border border-zinc-800 backdrop-blur-md transition-colors shadow-lg"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close if in modal */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2.5 bg-[#111216]/90 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 rounded-lg border border-zinc-800 backdrop-blur-md transition-colors shadow-lg"
              title="Close 360 Viewer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Spatial Hotspot Markers on Canvas */}
      {showHotspots &&
        hotspots.map((hotspot) => {
          const isActive = activeHotspot?.id === hotspot.id;

          return (
            <div
              key={hotspot.id}
              ref={(el) => {
                if (el) hotspotElementsRef.current.set(hotspot.id, el);
                else hotspotElementsRef.current.delete(hotspot.id);
              }}
              style={{
                display: 'none',
                pointerEvents: 'auto'
              }}
              className="absolute z-10 cursor-pointer group/pin"
              onClick={() => focusHotspot(hotspot)}
            >
              {/* Outer Pulse */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`absolute w-8 h-8 rounded-full border border-amber-400/80 transition-all ${
                    isActive ? 'scale-125 bg-amber-400/20' : 'group-hover/pin:scale-125 bg-black/40'
                  }`}
                />
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-transform ${
                    isActive ? 'bg-amber-400 ring-2 ring-white' : 'bg-white group-hover/pin:scale-110'
                  }`}
                />
              </div>

              {/* Tooltip Pill */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 -top-9 px-2.5 py-1 rounded bg-[#111216]/95 border border-zinc-700/80 shadow-xl text-[11px] font-medium text-white whitespace-nowrap transition-all pointer-events-none ${
                  isActive
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 group-hover/pin:opacity-100 group-hover/pin:scale-100'
                }`}
              >
                <span>{hotspot.title}</span>
              </div>
            </div>
          );
        })}

      {/* Active Hotspot Detail Card (Bottom Left) */}
      {activeHotspot && (
        <div className="absolute bottom-20 left-4 md:left-6 max-w-sm bg-[#111216]/95 backdrop-blur-xl border border-amber-400/40 rounded-xl p-4 shadow-2xl z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
              {activeHotspot.category || 'Architectural Specification'}
            </span>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-zinc-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
          <h3 className="text-sm font-bold text-white">{activeHotspot.title}</h3>
          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
            {activeHotspot.description}
          </p>
        </div>
      )}

      {/* Guide hint for first time user */}
      {showControlsGuide && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 bg-black/75 backdrop-blur-md border border-zinc-700/70 px-4 py-2.5 rounded-full text-xs text-zinc-300 flex items-center gap-2 animate-pulse">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>Click & Drag to Look 360° · Scroll to Zoom</span>
        </div>
      )}

      {/* Bottom Floating Control Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 p-1.5 bg-[#111216]/90 backdrop-blur-md border border-zinc-800 rounded-xl flex items-center gap-1 z-20 shadow-2xl">
        {/* Auto Rotate Toggle */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-lg transition-colors text-xs flex items-center gap-1.5 ${
            autoRotate
              ? 'bg-amber-400 text-black font-semibold'
              : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
          }`}
          title={autoRotate ? 'Pause Auto-Spin' : 'Start Auto-Spin'}
        >
          {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{autoRotate ? 'Auto Orbit' : 'Orbit'}</span>
        </button>

        <div className="w-[1px] h-5 bg-zinc-800 mx-0.5" />

        {/* Hotspots visibility toggle */}
        <button
          onClick={() => setShowHotspots(!showHotspots)}
          className={`p-2 rounded-lg transition-colors text-xs flex items-center gap-1.5 ${
            showHotspots
              ? 'text-amber-400 bg-zinc-800'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
          title="Toggle Architectural Hotspots"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Hotspots ({hotspots.length})</span>
        </button>

        <div className="w-[1px] h-5 bg-zinc-800 mx-0.5" />

        {/* Zoom Controls */}
        <button
          onClick={() => adjustFov(-5)}
          className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <span className="text-[10px] text-zinc-400 font-mono w-9 text-center">
          {Math.round(fov)}°
        </span>

        <button
          onClick={() => adjustFov(5)}
          className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-5 bg-zinc-800 mx-0.5" />

        {/* Reset Camera Center */}
        <button
          onClick={handleResetView}
          className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          title="Reset View Orientation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { X, Maximize2, Minimize2 } from 'lucide-react';
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
  title = 'The Horizon Penthouse',
  subtitle = 'Interactive 360° Equirectangular Spatial Environment',
  onClose,
  isModal = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const pannellumContainerRef = useRef<HTMLDivElement>(null);
  const pannellumViewerRef = useRef<any>(null);

  // Three.js instances in refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Inertia & Physics Momentum Tracking (Renderstuff-grade smooth glide)
  const isUserInteractingRef = useRef<boolean>(false);
  const lastPointerXRef = useRef<number>(0);
  const lastPointerYRef = useRef<number>(0);
  const lastPointerTimeRef = useRef<number>(0);
  const velocityXRef = useRef<number>(0);
  const velocityYRef = useRef<number>(0);

  // Spherical Coordinates
  const lonRef = useRef<number>(0);
  const latRef = useRef<number>(0);

  // Field of View (Strictly restricted zoom: 50° to 85° to prevent fisheye ball distortion)
  const fovRef = useRef<number>(70);
  const targetFovRef = useRef<number>(70);

  // States
  const [currentScene, setCurrentScene] = useState<'penthouse' | 'pavilion' | 'nordic' | 'atrium'>(
    initialScene === 'custom' ? 'penthouse' : initialScene
  );
  const [activeTextureUrl, setActiveTextureUrl] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [usingPannellum, setUsingPannellum] = useState<boolean>(false);

  // Memoize hotspots
  const hotspots = useMemo(() => {
    return initialHotspots && initialHotspots.length > 0 ? initialHotspots : DEFAULT_HOTSPOTS;
  }, [initialHotspots]);

  // Resolve texture based on currentScene
  useEffect(() => {
    const url = customImageUrl || generateArchitecturalPanorama(currentScene);
    setActiveTextureUrl(url);
  }, [currentScene, customImageUrl]);

  // 1. Pannellum Viewer Initialization (with showControls: false, autoLoad: true, restricted FOV & pitch, smooth friction)
  useEffect(() => {
    const hasPannellum = typeof (window as any).pannellum !== 'undefined';
    const pannellumDiv = pannellumContainerRef.current;

    if (hasPannellum && pannellumDiv && activeTextureUrl) {
      setUsingPannellum(true);

      // Clean up previous viewer
      if (pannellumViewerRef.current) {
        try {
          pannellumViewerRef.current.destroy();
        } catch (e) {
          // ignore cleanup errors
        }
      }

      pannellumDiv.replaceChildren();

      try {
        const viewer = (window as any).pannellum.viewer(pannellumDiv, {
          type: 'equirectangular',
          panorama: activeTextureUrl,
          // Feature 4: Auto-load instantly without clicking a play button
          autoLoad: true,
          // Feature 1: Hide all controls, compasses, and UI buttons
          showControls: false,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          compass: false,
          // Feature 2: Inertia and momentum glide
          friction: 0.15,
          autoRotate: -1,
          autoRotateInactivityDelay: 3000,
          // Feature 3: Restrict Zoom & Pitch (cannot zoom out to a tiny distorted ball)
          hfov: 70,
          minHfov: 50, // max zoom in
          maxHfov: 85, // max zoom out (prevents room distortion into tiny ball)
          minPitch: -45, // restrict looking straight down
          maxPitch: 50, // restrict looking straight up
          yaw: 0,
          pitch: 0,
          crossOrigin: 'anonymous'
        });

        pannellumViewerRef.current = viewer;
        return;
      } catch (err) {
        console.warn('Pannellum init error, falling back to Three.js WebGL:', err);
        setUsingPannellum(false);
      }
    } else {
      setUsingPannellum(false);
    }
  }, [activeTextureUrl]);

  // 2. High-Performance Three.js WebGL Engine (Buttery-smooth inertia & physical momentum)
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || Math.round(window.innerHeight * 0.6);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Restricted FOV: 70° default
    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1100);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.SphereGeometry(500, 64, 40);
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({ color: 0x14151b });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    sphereMeshRef.current = mesh;

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || Math.round(window.innerHeight * 0.6);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
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

  // Texture loading for Three.js
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
          mat.color.setHex(0xffffff);
          mat.needsUpdate = true;
        }
      },
      undefined,
      (err) => {
        console.error('Texture load fallback:', err);
      }
    );
  }, [activeTextureUrl]);

  // Three.js Render Loop with Renderstuff-grade Inertia & Smooth Momentum
  useEffect(() => {
    const renderLoop = () => {
      animFrameIdRef.current = requestAnimationFrame(renderLoop);

      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      const scene = sceneRef.current;

      if (!camera || !renderer || !scene) return;

      // Inertia Physics: apply velocity when user has released pointer
      if (!isUserInteractingRef.current) {
        lonRef.current -= velocityXRef.current;
        latRef.current += velocityYRef.current;

        // Friction / Momentum damping: smoothly glide to stop
        velocityXRef.current *= 0.94;
        velocityYRef.current *= 0.94;

        // Subtle gentle drift once momentum subsides
        if (Math.abs(velocityXRef.current) < 0.005) {
          lonRef.current += 0.035;
        }
      }

      // Feature 3: Strict Pitch limits (cannot look unnaturally past ceiling or straight into floor)
      latRef.current = Math.max(-45, Math.min(50, latRef.current));

      // Feature 3: Smooth FOV Zoom Interpolation with restricted limits (50° to 85°)
      targetFovRef.current = Math.max(50, Math.min(85, targetFovRef.current));
      fovRef.current += (targetFovRef.current - fovRef.current) * 0.12;
      camera.fov = fovRef.current;
      camera.updateProjectionMatrix();

      // Convert Spherical to Cartesian LookAt vector
      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current);

      const x = 500 * Math.sin(phi) * Math.cos(theta);
      const y = 500 * Math.cos(phi);
      const z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(x, y, z);
      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // Pointer Event Handlers with Momentum Tracking
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isUserInteractingRef.current = true;
    lastPointerXRef.current = e.clientX;
    lastPointerYRef.current = e.clientY;
    lastPointerTimeRef.current = performance.now();
    velocityXRef.current = 0;
    velocityYRef.current = 0;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isUserInteractingRef.current) return;

    const now = performance.now();
    const dt = Math.max(1, now - lastPointerTimeRef.current);
    const deltaX = e.clientX - lastPointerXRef.current;
    const deltaY = e.clientY - lastPointerYRef.current;

    // Direct movement
    lonRef.current -= deltaX * 0.12;
    latRef.current += deltaY * 0.12;

    // Track instantaneous momentum velocity for glide-to-stop physics
    const vx = (deltaX / dt) * 16 * 0.12;
    const vy = (deltaY / dt) * 16 * 0.12;
    velocityXRef.current = velocityXRef.current * 0.3 + vx * 0.7;
    velocityYRef.current = velocityYRef.current * 0.3 + vy * 0.7;

    lastPointerXRef.current = e.clientX;
    lastPointerYRef.current = e.clientY;
    lastPointerTimeRef.current = now;
  }, []);

  const handlePointerUp = useCallback(() => {
    isUserInteractingRef.current = false;
  }, []);

  // Restricted Zoom on Mouse Wheel (50° min - 85° max)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    targetFovRef.current = Math.max(50, Math.min(85, targetFovRef.current + e.deltaY * 0.04));
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div
      id="modal-360"
      ref={containerRef}
      style={{ minHeight: '60vh', width: '100%' }}
      className={`relative select-none overflow-hidden bg-[#050608] group ${
        isModal
          ? 'fixed inset-0 z-50 flex flex-col h-screen min-h-screen'
          : 'min-h-[60vh] h-[640px] md:h-[720px] rounded-3xl border border-white/10 shadow-2xl'
      }`}
    >
      {/* Pannellum Viewport (Hidden controls, autoLoad: true, restricted FOV) */}
      <div
        ref={pannellumContainerRef}
        className={`w-full h-full min-h-[60vh] ${usingPannellum ? 'block' : 'hidden'}`}
        style={{ minHeight: '60vh', width: '100%' }}
      />

      {/* Three.js Canvas Container (Renderstuff momentum glide engine) */}
      <div
        ref={canvasContainerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        className={`w-full h-full min-h-[60vh] cursor-grab active:cursor-grabbing touch-none ${
          usingPannellum ? 'hidden' : 'block'
        }`}
        style={{ minHeight: '60vh', width: '100%' }}
      />

      {/* Subtle Top-Left Minimalist Title (Clean, non-intrusive) */}
      <div className="absolute top-5 left-5 pointer-events-none z-20 flex flex-col gap-1">
        <div className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-[11px] font-mono font-medium text-white/90 w-fit">
          <span>{title}</span>
        </div>
      </div>

      {/* Top-Right Close Button (Only if displayed in Modal) */}
      {onClose && (
        <div className="absolute top-5 right-5 pointer-events-auto z-20">
          <button
            onClick={onClose}
            className="p-3 bg-black/60 hover:bg-white/20 text-white rounded-full border border-white/10 backdrop-blur-xl transition-colors shadow-2xl"
            title="Close 360 Viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Subtle Fullscreen Affordance (Corner only, zero clutter) */}
      {!isModal && (
        <div className="absolute top-5 right-5 pointer-events-auto z-20">
          <button
            onClick={toggleFullscreen}
            className="p-3 bg-black/40 hover:bg-black/70 text-white/70 hover:text-white rounded-full border border-white/10 backdrop-blur-xl transition-colors shadow-lg"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Clean Scene Selector Pills (Only for demo procedural scenes when no custom image is specified) */}
      {!customImageUrl && (
        <div className="absolute bottom-5 left-5 pointer-events-auto z-20 flex items-center gap-1.5 p-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full">
          {[
            { id: 'penthouse', label: 'Penthouse' },
            { id: 'pavilion', label: 'Pavilion' },
            { id: 'nordic', label: 'Fjord Villa' },
            { id: 'atrium', label: 'Atrium' }
          ].map((sc) => (
            <button
              key={sc.id}
              onClick={() => setCurrentScene(sc.id as any)}
              className={`px-3 py-1 text-[11px] font-medium rounded-full transition-all ${
                currentScene === sc.id
                  ? 'bg-white text-black font-semibold shadow'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

import { Project } from '../types/portfolio';
import { createArchvizCanvas } from '../utils/archvizRenderGen';

// Helper to safely get precomputed images or generate lazily
export const initialProjects: Project[] = [
  {
    id: 'project-360-penthouse',
    title: 'The Horizon Penthouse',
    subtitle: 'High-Rise Architectural Spatial Walkthrough',
    year: 2026,
    client: 'Foster + Partners / Private Client',
    location: 'Manhattan, New York',
    category: 'interior',
    mediaType: '360',
    coverImage: createArchvizCanvas('penthouse', 'render'),
    panoramaSceneId: 'penthouse',
    hotspots: [
      {
        id: 'hs-1',
        title: 'Floor-to-Ceiling Structural Glazing',
        description: 'Triple-laminated low-iron acoustic glass curtain wall framing 270° panoramic sunset skyline.',
        yaw: 15,
        pitch: 2,
        category: 'Facade'
      },
      {
        id: 'hs-2',
        title: 'Bespoke Travertine Kitchen Island',
        description: 'Single-block Roman silver travertine with integrated flush induction cooktop and burnished brass accents.',
        yaw: -80,
        pitch: -18,
        category: 'Materiality'
      },
      {
        id: 'hs-3',
        title: 'Linear Architectural Downlighting',
        description: 'Recessed trimless micro-flute channels calibrated to 2700K warm twilight spectrum with Lutron controls.',
        yaw: 0,
        pitch: 55,
        category: 'Lighting'
      },
      {
        id: 'hs-4',
        title: 'Italian Linen Modular Lounge',
        description: 'Low-profile seating module positioned to maximize sightlines toward the harbor and city spires.',
        yaw: -130,
        pitch: -25,
        category: 'Furniture'
      }
    ],
    description: 'An expansive 5,800 sq ft penthouse overlooking the Manhattan skyline. Created as an interactive 360° virtual environment allowing prospective buyers to experience daylight shifts, material textures, and spatial flow prior to construction.',
    architect: 'Studio K Architectes',
    featured: true,
    metadata: {
      engine: 'Corona Renderer 11',
      focalLength: '360° Spherical Equirectangular',
      aperture: 'f/8.0 (Equirectangular Equidistant)',
      iso: '100',
      lighting: 'Custom Dusk HDRI (8K) + 2700K IES Luminaire Profiles',
      software: ['3ds Max', 'Corona 11', 'Photoshop CC', 'Three.js']
    }
  },
  {
    id: 'project-video-villa',
    title: 'Villa Solaria: Cinematic Flythrough',
    subtitle: 'Drone Masterplan & Interior Motion Study',
    year: 2025,
    client: 'Kengo Kuma & Associates',
    location: 'Mallorca, Spain',
    category: 'exterior',
    mediaType: 'video',
    coverImage: createArchvizCanvas('villa', 'render'),
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // fallback safe mp4
    videoDuration: '02:14',
    videoQuality: '4K UHD · 60 FPS · DCI-P3',
    videoTimestamps: [
      { time: 0, label: '00:00 — Cliffside Drone Approach' },
      { time: 25, label: '00:25 — Infinity Pool Cantilever' },
      { time: 55, label: '00:55 — Glazed Living Pavilion' },
      { time: 90, label: '01:30 — Twilight Lighting Transition' }
    ],
    description: 'A 2-minute architectural film detailing the relationship between brutalist board-formed concrete and the rugged Mediterranean coastline. The camera explores the seamless transition between the outdoor infinity water surface and the subterranean wine cellar.',
    architect: 'Kengo Kuma & Associates',
    featured: true,
    metadata: {
      engine: 'Unreal Engine 5.4 (Lumen & Nanite)',
      focalLength: '24mm & 50mm Anamorphic Prime',
      aperture: 'T2.0',
      iso: '320',
      lighting: 'Dynamic Sun & Sky System + Volumetric Rayleigh Scattering',
      software: ['Unreal Engine 5.4', 'DaVinci Resolve Studio', 'Blender', 'Substance 3D']
    }
  },
  {
    id: 'project-compare-monolith',
    title: 'The Monolith Residence',
    subtitle: 'Clay Model vs Photorealistic Final Render',
    year: 2026,
    client: 'Studio MK27',
    location: 'Trancoso, Brazil',
    category: 'exterior',
    mediaType: 'comparison',
    coverImage: createArchvizCanvas('villa', 'render'),
    clayImage: createArchvizCanvas('villa', 'clay'),
    renderImage: createArchvizCanvas('villa', 'render'),
    description: 'An interactive breakdown comparing the raw subdivision surface model and Ambient Occlusion pass against the final multi-pass CGI render. Highlights our geometric fidelity, bevel micro-details, and realistic physical material response.',
    architect: 'Studio MK27',
    featured: true,
    metadata: {
      engine: 'V-Ray 6 for 3ds Max',
      focalLength: '28mm Shift Lens',
      aperture: 'f/5.6',
      iso: '100',
      lighting: 'Physical Sun + Sky + Custom Glazing Specular Passes',
      software: ['3ds Max', 'V-Ray 6', 'Marvelous Designer', 'Photoshop']
    }
  },
  {
    id: 'project-360-pavilion',
    title: 'The Brutalist Concrete Pavilion',
    subtitle: '360° Monolithic Exhibition Space',
    year: 2025,
    client: 'Fondation d’Art Moderne',
    location: 'Basel, Switzerland',
    category: 'exterior',
    mediaType: '360',
    coverImage: createArchvizCanvas('pavilion', 'render'),
    panoramaSceneId: 'pavilion',
    hotspots: [
      {
        id: 'hs-pav-1',
        title: 'Coffered Concrete Cantilever',
        description: 'Post-tensioned architectural concrete grid providing deep thermal shading and dramatic shadow play.',
        yaw: -30,
        pitch: 40,
        category: 'Structure'
      },
      {
        id: 'hs-pav-2',
        title: 'Shallow Reflecting Water Basin',
        description: 'Basalt-lined reflecting pool echoing sky luminance and natural breeze surface ripples.',
        yaw: 40,
        pitch: -30,
        category: 'Landscape'
      },
      {
        id: 'hs-pav-3',
        title: 'Textured Board-Formed Concrete Column',
        description: 'Rough-sawn Douglas fir board textures imprinted onto high-performance white cement.',
        yaw: -95,
        pitch: -5,
        category: 'Material'
      }
    ],
    description: 'A monolithic museum pavilion designed around natural light and tranquil water reflection. Explore the 360° environment to witness the interplay between heavy mass and morning atmospheric illumination.',
    architect: 'Herzog & de Meuron',
    featured: false,
    metadata: {
      engine: 'Corona Renderer 11',
      focalLength: '360° Spherical Equirectangular',
      aperture: 'f/11',
      iso: '50',
      lighting: 'Peter Guthrie 1044 Clear Sky HDRI',
      software: ['3ds Max', 'Corona 11', 'Forest Pack Pro']
    }
  },
  {
    id: 'project-still-nordic',
    title: 'Nordic Oak & Concrete Pavilion',
    subtitle: 'Interior Stills & Material Tactility Study',
    year: 2026,
    client: 'Snøhetta',
    location: 'Bergen, Norway',
    category: 'interior',
    mediaType: 'image',
    coverImage: createArchvizCanvas('interior', 'render'),
    galleryImages: [
      createArchvizCanvas('interior', 'render'),
      createArchvizCanvas('interior', 'clay')
    ],
    description: 'A study in quiet luxury and Nordic light. Floor-to-ceiling glass reveals the native pine forest while cast architectural concrete walls hold the radiant morning sunbeams.',
    architect: 'Snøhetta',
    featured: false,
    metadata: {
      engine: 'Corona Renderer 11',
      focalLength: '35mm Prime',
      aperture: 'f/2.8',
      iso: '200',
      lighting: 'Overcast Forest HDRI + Warm Interior Sun Ray Caustics',
      software: ['3ds Max', 'Corona 11', 'Corona Lister', 'Lightroom']
    }
  },
  {
    id: 'project-still-museum',
    title: 'Kyoto Contemporary Art Museum',
    subtitle: 'Parametric Bronze Facade & Water Basin',
    year: 2025,
    client: 'SANAA Architects',
    location: 'Kyoto, Japan',
    category: 'exterior',
    mediaType: 'image',
    coverImage: createArchvizCanvas('museum', 'render'),
    galleryImages: [
      createArchvizCanvas('museum', 'render'),
      createArchvizCanvas('museum', 'clay')
    ],
    description: 'A landmark cultural museum featuring double-curved parametric bronze alloy panels reflecting the morning mist. Micro-details include custom silicone sealant seams, rainwater weep holes, and anti-reflective museum glazing.',
    architect: 'SANAA',
    featured: false,
    metadata: {
      engine: 'V-Ray 6',
      focalLength: '24mm PC-E Tilt Shift',
      aperture: 'f/8.0',
      iso: '100',
      lighting: 'Early Morning Fog Overcast Dome Light',
      software: ['Rhino / Grasshopper', '3ds Max', 'V-Ray 6', 'Photoshop']
    }
  },
  {
    id: 'project-360-nordic',
    title: 'The Fjord Glass Villa',
    subtitle: '360° Sunset Horizon Immersion',
    year: 2026,
    client: 'Todd Saunders Architecture',
    location: 'Hardangerfjord, Norway',
    category: 'interior',
    mediaType: '360',
    coverImage: createArchvizCanvas('interior', 'render'),
    panoramaSceneId: 'nordic',
    hotspots: [
      {
        id: 'hs-nor-1',
        title: 'Suspended Focus Fireplace',
        description: 'Matte black steel ergonomic hearth revolving 360° toward the fjord sunset.',
        yaw: 75,
        pitch: -15,
        category: 'Feature'
      },
      {
        id: 'hs-nor-2',
        title: 'Acoustic White Oak Ceiling Slats',
        description: 'FSC-certified solid oak micro-ribs backed with sound-absorbing recycled felt.',
        yaw: 0,
        pitch: 45,
        category: 'Acoustics'
      }
    ],
    description: 'Cantilevered over the Hardangerfjord, this residential project immerses the viewer in the amber hues of the arctic sunset. Experience the spatial warmth of natural timber against the raw fjord backdrop.',
    architect: 'Saunders Architecture',
    featured: false,
    metadata: {
      engine: 'Unreal Engine 5.4 / Path Tracer',
      focalLength: '360° Full Dome',
      aperture: 'f/4.0',
      iso: '400',
      lighting: 'Golden Hour Atmospheric Sun & Sky + Fireplace Emissive',
      software: ['Unreal Engine 5.4', 'SpeedTree', 'Quixel Megascans']
    }
  },
  {
    id: 'project-video-desert',
    title: 'The Canyon Rammed Earth Sanctuary',
    subtitle: 'Twilight Light Study & Animation',
    year: 2025,
    client: 'Rick Joy Architects',
    location: 'Sedona, Arizona',
    category: 'exterior',
    mediaType: 'video',
    coverImage: createArchvizCanvas('desert', 'render'),
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    videoDuration: '01:45',
    videoQuality: '4K Cinema · 24 FPS',
    videoTimestamps: [
      { time: 0, label: '00:00 — Canyon Shadows Arrival' },
      { time: 30, label: '00:30 — Rammed Earth Wall Texture' },
      { time: 65, label: '01:05 — Sunken Fire Lounge Twilight' }
    ],
    description: 'An architectural documentary film focusing on how rammed earth walls absorb the intense desert heat and radiate warmth during chilly desert nights.',
    architect: 'Studio Rick Joy',
    featured: false,
    metadata: {
      engine: 'Corona Renderer 11',
      focalLength: '50mm Anamorphic',
      aperture: 'T1.8',
      iso: '800',
      lighting: 'Twilight Sky HDRI + Live Fire Simulation Emissive',
      software: ['3ds Max', 'Corona 11', 'Phoenix FD', 'Premiere Pro']
    }
  }
];

import { Project } from '../types/portfolio';

// Base URL handling for Vite GitHub Pages deployment (/Srirag-E/ or ./)
const BASE = import.meta.env.BASE_URL || '/';
const cleanBase = BASE.endsWith('/') ? BASE : `${BASE}/`;

export const initialProjects: Project[] = [
  {
    id: 'market-360-experience',
    title: 'Market 360° Experience',
    subtitle: 'Interactive 360° Panorama Spatial Environment',
    year: 2026,
    client: 'Architectural Visualization Showcase',
    location: 'Market Plaza',
    category: 'exterior',
    mediaType: '360',
    coverImage: `${cleanBase}Market.jpg`,
    panoramaUrl: `${cleanBase}Market.jpg`,
    panoramaSceneId: 'custom',
    hotspots: [
      {
        id: 'hs-m-1',
        title: 'Market Central Pavilion',
        description: 'Atmospheric natural lighting and detailed architectural space.',
        yaw: 0,
        pitch: 0,
        category: 'Architecture'
      }
    ],
    description: 'Immersive 360° panoramic architectural visualization of Market. Navigate seamlessly in 360 degrees with smooth inertia, restricted field of view, and unconstrained spatial immersion.',
    architect: 'ArchViz Studio',
    featured: true,
    metadata: {
      engine: 'Corona Renderer & Three.js WebGL',
      focalLength: '360° Spherical Equirectangular',
      aperture: 'f/8.0 Equirectangular',
      iso: '100',
      lighting: 'Photometric Environmental Sky & Daylight',
      software: ['3ds Max', 'Corona', 'Photoshop', 'Three.js']
    }
  },
  {
    id: 'night-terrace-still',
    title: 'Night Terrace',
    subtitle: 'Photorealistic Architectural Evening Still',
    year: 2026,
    client: 'Architectural Visualization Showcase',
    location: 'Terrace Suite',
    category: 'exterior',
    mediaType: 'image',
    coverImage: `${cleanBase}24_night_down_terrace_shot.0224.jpeg`,
    galleryImages: [
      `${cleanBase}24_night_down_terrace_shot.0224.jpeg`
    ],
    description: 'Cinematic architectural night render overlooking the illuminated terrace with balanced ambient lighting and material realism.',
    architect: 'ArchViz Studio',
    featured: true,
    metadata: {
      engine: 'High-Fidelity Physically Based Render',
      focalLength: '24mm Architectural Prime',
      aperture: 'f/4.0',
      iso: '200',
      lighting: 'Night Ambient Sky + Warm Architectural Accent Luminaire Profiles',
      software: ['3ds Max', 'Corona / V-Ray', 'Photoshop']
    }
  }
];

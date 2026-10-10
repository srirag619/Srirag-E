export type MediaType = 'image' | 'video' | '360' | 'comparison';

export type Category = 'all' | '360' | 'video' | 'interior' | 'exterior';

export interface Hotspot {
  id: string;
  title: string;
  description: string;
  yaw: number; // horizontal angle in degrees (-180 to 180)
  pitch: number; // vertical angle in degrees (-90 to 90)
  category?: string;
}

export interface CameraMetadata {
  engine: string; // e.g. Corona 11, Unreal Engine 5.4, V-Ray 6
  focalLength: string; // e.g. 24mm Tilt-Shift
  aperture: string; // e.g. f/4.0
  iso: string; // e.g. 100
  lighting: string; // e.g. Overcast Skylight + 3000K Interior Accents
  software: string[]; // e.g. ['3ds Max', 'Corona', 'Photoshop']
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  client: string;
  location: string;
  category: 'interior' | 'exterior';
  mediaType: MediaType;
  coverImage: string;
  
  // For standard image/gallery
  galleryImages?: string[];
  
  // For Video
  videoUrl?: string;
  videoDuration?: string;
  videoAspect?: string;
  videoQuality?: string;
  videoTimestamps?: { time: number; label: string }[];
  
  // For 360 Panorama
  panoramaUrl?: string;
  panoramaSceneId?: 'penthouse' | 'pavilion' | 'nordic' | 'atrium' | 'custom';
  hotspots?: Hotspot[];
  
  // For Comparison (Clay / Final Render)
  clayImage?: string;
  renderImage?: string;
  
  description: string;
  architect?: string;
  featured?: boolean;
  metadata: CameraMetadata;
}

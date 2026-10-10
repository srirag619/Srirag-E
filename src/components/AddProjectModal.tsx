import React, { useState } from 'react';
import {
  X,
  Upload,
  Compass,
  Film,
  Layers,
  Image as ImageIcon,
  Check,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { Project, MediaType } from '../types/portfolio';
import { generateArchitecturalPanorama } from '../utils/procedural360';
import { createArchvizCanvas } from '../utils/archvizRenderGen';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Project) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject
}) => {
  const [mediaType, setMediaType] = useState<MediaType>('360');
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [client, setClient] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [year, setYear] = useState<number>(2026);
  const [engine, setEngine] = useState<string>('Corona Renderer 11');
  const [focalLength, setFocalLength] = useState<string>('24mm Tilt-Shift');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<'interior' | 'exterior'>('interior');

  // Media inputs
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [panoramaUrl, setPanoramaUrl] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [clayImageUrl, setClayImageUrl] = useState<string>('');

  if (!isOpen) return null;

  // File upload handlers converting to base64 Data URL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setter(evt.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fallbackCover = coverImageUrl || createArchvizCanvas('penthouse', 'render');
    const newProject: Project = {
      id: `custom-project-${Date.now()}`,
      title: title || 'Custom Architectural Showcase',
      subtitle: subtitle || 'Modern Spatial Study',
      year: year || 2026,
      client: client || 'Private Commission',
      location: location || 'Tokyo, Japan',
      category: category,
      mediaType: mediaType,
      coverImage: fallbackCover,
      description:
        description ||
        'Custom architectural visualization project uploaded directly by the artist for spatial inspection.',
      metadata: {
        engine: engine || 'Corona Renderer 11',
        focalLength: focalLength || '24mm Prime',
        aperture: 'f/4.0',
        iso: '100',
        lighting: 'Custom HDRI Skylight + Physical Interior Luminaires',
        software: ['3ds Max', 'Corona 11', 'Photoshop']
      }
    };

    if (mediaType === '360') {
      newProject.panoramaUrl = panoramaUrl || fallbackCover;
      newProject.panoramaSceneId = 'custom';
      newProject.hotspots = [
        {
          id: 'hs-cust-1',
          title: 'Primary Architectural View',
          description: 'Key spatial axis looking across the open-plan floorplate.',
          yaw: 0,
          pitch: 0,
          category: 'Focus'
        }
      ];
    } else if (mediaType === 'video') {
      newProject.videoUrl =
        videoUrl ||
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      newProject.videoDuration = '02:00';
      newProject.videoQuality = '4K UHD · 60 FPS';
    } else if (mediaType === 'comparison') {
      newProject.clayImage = clayImageUrl || createArchvizCanvas('villa', 'clay');
      newProject.renderImage = fallbackCover;
    } else {
      newProject.galleryImages = [fallbackCover];
    }

    onAddProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0e1015] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl my-auto">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-[#121318] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-semibold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Add / Showcase Your Own ArchViz Work</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
              Upload Images, Videos, or 360° Panoramas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Media Type Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
              Select Showcase Media Format
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { type: '360', label: '360° VR Tour', icon: Compass },
                { type: 'video', label: 'Video Film', icon: Film },
                { type: 'image', label: 'Still Render', icon: ImageIcon },
                { type: 'comparison', label: 'Clay Compare', icon: Layers }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = mediaType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setMediaType(item.type as MediaType)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-lg'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Media File Upload / URL input */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <label className="block text-xs font-mono uppercase text-amber-400 font-semibold">
              {mediaType === '360' && 'Upload Equirectangular 360° Image (JPG / PNG)'}
              {mediaType === 'video' && 'Video Source (File Upload or MP4 / WebM URL)'}
              {mediaType === 'image' && 'High-Resolution Still Render'}
              {mediaType === 'comparison' && 'Render & Clay Model Images'}
            </label>

            {/* 360 Panorama Inputs */}
            {mediaType === '360' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-zinc-700 hover:border-amber-400 rounded-xl bg-zinc-900/80 cursor-pointer transition-colors group">
                    <Upload className="w-6 h-6 text-zinc-400 group-hover:text-amber-400 mb-1" />
                    <span className="text-xs text-zinc-300 font-medium">Browse 360 Image File</span>
                    <span className="text-[10px] text-zinc-500 mt-0.5">Equirectangular 2:1 ratio recommended</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleFileUpload(e, setPanoramaUrl);
                        handleFileUpload(e, setCoverImageUrl);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
                {panoramaUrl && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                    <Check className="w-3.5 h-3.5" />
                    <span>360 Panorama asset loaded and ready to inspect!</span>
                  </div>
                )}
              </div>
            )}

            {/* Video Inputs */}
            {mediaType === 'video' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Video Stream URL</label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://example.com/archviz-reel.mp4"
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white rounded-lg cursor-pointer flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Or Select Local MP4 Video File</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, setVideoUrl)}
                      className="hidden"
                    />
                  </label>
                  {videoUrl && <span className="text-xs text-emerald-400">✓ Video attached</span>}
                </div>
              </div>
            )}

            {/* Clay Comparison Inputs */}
            {mediaType === 'comparison' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Final CGI Render</label>
                  <label className="p-3 border border-dashed border-zinc-700 hover:border-amber-400 rounded-lg bg-zinc-900 block text-center cursor-pointer text-xs text-zinc-300">
                    <Upload className="w-4 h-4 mx-auto mb-1 text-zinc-400" />
                    Upload Color Render
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, setCoverImageUrl)}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Raw Clay / AO Pass</label>
                  <label className="p-3 border border-dashed border-zinc-700 hover:border-amber-400 rounded-lg bg-zinc-900 block text-center cursor-pointer text-xs text-zinc-300">
                    <Upload className="w-4 h-4 mx-auto mb-1 text-zinc-400" />
                    Upload Clay Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, setClayImageUrl)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Still Render File Input */}
            {mediaType === 'image' && (
              <div>
                <label className="p-4 border-2 border-dashed border-zinc-700 hover:border-amber-400 rounded-xl bg-zinc-900/80 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                  <Upload className="w-6 h-6 text-zinc-400 group-hover:text-amber-400 mb-1" />
                  <span className="text-xs text-zinc-300 font-medium">Browse High-Res Render (PNG/JPG)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setCoverImageUrl)}
                    className="hidden"
                  />
                </label>
                {coverImageUrl && <span className="text-xs text-emerald-400 block mt-2">✓ Render loaded</span>}
              </div>
            )}
          </div>

          {/* Project Details Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Project Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Kyoto Pavilions"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Subtitle / Scope
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Masterplan & Interior Walkthrough"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Client / Architecture Studio
              </label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Foster + Partners"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Zurich, Switzerland"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Primary Render Engine
              </label>
              <select
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Corona Renderer 11">Corona Renderer 11</option>
                <option value="Unreal Engine 5.4 (Lumen)">Unreal Engine 5.4 (Lumen)</option>
                <option value="V-Ray 6">V-Ray 6</option>
                <option value="Blender Cycles">Blender Cycles</option>
                <option value="Octane Render">Octane Render</option>
                <option value="D5 Render">D5 Render</option>
                <option value="Lumion 2024">Lumion 2024</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'interior' | 'exterior')}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="interior">Interior Visualization</option>
                <option value="exterior">Exterior & Masterplan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
              Project Description / Design Narrative
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the architectural concept, materiality, lighting condition, and project goals..."
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Check className="w-4 h-4" />
              <span>Publish to Portfolio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

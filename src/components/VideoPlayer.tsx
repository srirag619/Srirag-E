import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Film,
  Bookmark
} from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  duration?: string;
  quality?: string;
  timestamps?: { time: number; label: string }[];
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title = 'Cinematic Flythrough',
  quality = '4K UHD · 60 FPS',
  timestamps = [],
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true); // start muted for autoplay compliance
  const [volume, setVolume] = useState<number>(0.8);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(true);

  // Sync video time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setTotalDuration(video.duration || 134);
    const handleEnded = () => {
      if (!isLooping) setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isLooping]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const jumpToTimestamp = (timeSec: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeSec;
      setCurrentTime(timeSec);
      if (!isPlaying) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      if (vol > 0 && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const cycleSpeed = () => {
    const speeds = [0.5, 1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setPlaybackRate(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative rounded-xl overflow-hidden bg-black border border-zinc-800 group ${className}`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={isLooping}
        muted={isMuted}
        playsInline
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer block"
      />

      {/* Top Overlay Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-zinc-800 rounded-lg text-xs">
          <Film className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-white tracking-wide">{title}</span>
          <span className="text-zinc-500">·</span>
          <span className="font-mono text-zinc-400">{quality}</span>
        </div>
      </div>

      {/* Big Center Play Button Overlay when paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-200 z-10 shadow-2xl group/play"
          title="Play Flythrough"
        >
          <Play className="w-7 h-7 translate-x-0.5 fill-current" />
        </button>
      )}

      {/* Timeline Chapter Markers / Camera Bookmarks */}
      {timestamps.length > 0 && (
        <div className="absolute bottom-16 left-4 right-4 flex items-center gap-2 overflow-x-auto pb-1 z-10 pointer-events-auto">
          {timestamps.map((ts, idx) => (
            <button
              key={idx}
              onClick={() => jumpToTimestamp(ts.time)}
              className="px-2.5 py-1 bg-black/80 hover:bg-zinc-800/90 backdrop-blur-md rounded border border-zinc-700/80 text-[11px] text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shadow"
            >
              <Bookmark className="w-3 h-3 text-amber-400" />
              <span>{ts.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Custom Bottom Architectural Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-200 z-20 ${
          isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Scrub Bar */}
        <div className="relative mb-3 group/scrub flex items-center">
          <input
            type="range"
            min={0}
            max={totalDuration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-zinc-700/80 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
          />
          {/* Progress fill visual */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-amber-400 rounded-l pointer-events-none"
            style={{ width: `${progressPercent}%`, height: '6px' }}
          />
        </div>

        {/* Lower Control Row */}
        <div className="flex items-center justify-between gap-4 text-xs">
          {/* Left Controls: Play/Pause, Rewind, Time */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="text-white hover:text-amber-400 transition-colors p-1"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  setCurrentTime(0);
                }
              }}
              className="text-zinc-400 hover:text-white transition-colors p-1"
              title="Restart from beginning"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Timecode */}
            <div className="font-mono text-zinc-400 text-[11px] tabular-nums">
              <span className="text-white">{formatTime(currentTime)}</span> / {formatTime(totalDuration)}
            </div>
          </div>

          {/* Right Controls: Volume, Speed, Loop, Fullscreen */}
          <div className="flex items-center gap-3">
            {/* Volume */}
            <div className="flex items-center gap-1.5 group/vol">
              <button
                onClick={toggleMute}
                className="text-zinc-400 hover:text-white transition-colors p-1"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-14 h-1 bg-zinc-700 rounded-lg appearance-none accent-amber-400 cursor-pointer hidden group-hover/vol:block"
              />
            </div>

            {/* Speed */}
            <button
              onClick={cycleSpeed}
              className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] font-mono text-zinc-300 font-semibold transition-colors"
              title="Cycle playback speed"
            >
              {playbackRate}x
            </button>

            {/* Loop Toggle */}
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                isLooping ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40' : 'text-zinc-400 hover:text-white'
              }`}
              title="Toggle Loop"
            >
              Loop
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="text-zinc-400 hover:text-white transition-colors p-1"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Mic, Video, Aperture, Loader2 } from 'lucide-react';

const MODE_NAMES = ['NEBULA CLOUD', 'QUANTUM TORUS', 'CYBER LATTICE', 'WARP VORTEX'];

export function HeaderHUD({
  simMode,
  audioActive,
  onToggleAudio,
  cameraActive,
  isCameraLoading,
  onToggleCamera,
  onCaptureSnapshot
}) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCountText = isMobile ? '65K NODES' : '120K NODES';

  return (
    <header className="absolute top-0 left-0 w-full p-4 md:p-6 z-20 flex flex-row justify-between items-start pointer-events-none">
      {/* Left Branding & Stats */}
      <div className="flex flex-col gap-2 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="relative w-2 h-2">
            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20" />
            <div className="absolute inset-0 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </div>
          <h1 className="text-xs md:text-sm font-medium tracking-tight uppercase text-white/90">
            Aether<span className="opacity-40">.OS</span>
          </h1>
        </div>

        <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-[10px] font-mono text-sci-dim tracking-wider">
          <span className="text-white/70 transition-colors duration-500 uppercase">
            {MODE_NAMES[simMode] || 'NEBULA CLOUD'}
          </span>
          <span className="hidden xs:inline w-px h-2 bg-white/10" />
          <span className="opacity-60">{particleCountText}</span>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex gap-2 pointer-events-auto">
        {/* Audio Mic Button */}
        <button
          onClick={onToggleAudio}
          className={`sci-panel w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-md hover:bg-white/5 hover:border-white/20 transition-all group ${
            audioActive ? 'bg-white/10 border-white/20' : ''
          }`}
          aria-label="Microphone Audio Input"
          title="Toggle Microphone Audio Reactivity"
        >
          <Mic
            className={`w-3.5 h-3.5 transition-colors ${
              audioActive ? 'text-emerald-400' : 'text-white/60 group-hover:text-white'
            }`}
          />
        </button>

        {/* Camera Video Button */}
        <button
          onClick={onToggleCamera}
          className="sci-panel w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-md hover:bg-white/5 hover:border-white/20 transition-all group relative overflow-hidden"
          aria-label="Camera Hand Tracking"
          title="Toggle AI Hand Gesture Camera Tracking"
        >
          {isCameraLoading ? (
            <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin z-10 relative" />
          ) : (
            <Video
              className={`w-3.5 h-3.5 transition-colors z-10 relative ${
                cameraActive ? 'text-emerald-400' : 'text-white/60 group-hover:text-white'
              }`}
            />
          )}
          <div
            className={`absolute inset-0 bg-emerald-500/10 transition-opacity ${
              cameraActive ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </button>

        {/* Snapshot Rec Button */}
        <button
          onClick={onCaptureSnapshot}
          className="sci-panel w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-md hover:bg-white/5 hover:border-white/20 transition-all group"
          aria-label="Capture PNG Snapshot"
          title="Capture High-Res PNG Snapshot"
        >
          <Aperture className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
        </button>
      </div>
    </header>
  );
}

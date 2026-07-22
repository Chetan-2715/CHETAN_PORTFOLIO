import React from 'react';
import { Cpu } from 'lucide-react';

const MODES = [
  { id: 0, label: 'Nebula', num: '01' },
  { id: 1, label: 'Torus', num: '02' },
  { id: 2, label: 'Lattice', num: '03' },
  { id: 3, label: 'Vortex', num: '04' },
];

export function ControlPanel({
  simMode,
  onSetMode,
  colorPalette,
  onCycleColor,
  trackingActive
}) {
  return (
    <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none p-4 md:p-6 flex flex-col md:flex-row justify-between items-end gap-4">
      {/* Left: Mode Selector Panel */}
      <div className="sci-panel p-3 rounded-xl pointer-events-auto w-full md:w-64 max-w-[300px] backdrop-blur-xl border border-white/5">
        <div className="flex justify-between items-center mb-3 px-1">
          <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3 text-white/40" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/50">
              Simulation
            </span>
          </div>

          {/* Gesture Tracking Badge */}
          <div
            className={`transition-opacity duration-300 flex items-center gap-1.5 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 ${
              trackingActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-mono text-emerald-400 tracking-tight">
              TRACKING
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {MODES.map((m) => {
            const isActive = simMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onSetMode(m.id)}
                className={`group relative flex items-center justify-between px-2.5 py-2 rounded-lg transition-all border border-transparent hover:border-white/10 text-left ${
                  isActive
                    ? 'bg-white/10 border-white/10'
                    : 'bg-transparent hover:bg-white/5'
                }`}
              >
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                  }`}
                >
                  {m.label}
                </span>
                <span
                  className={`text-[9px] font-mono ${
                    isActive ? 'text-white/50' : 'text-white/20'
                  }`}
                >
                  {m.num}
                </span>
                {isActive && (
                  <div className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Palette Switcher & Credits */}
      <div className="flex flex-row md:flex-col items-center md:items-end gap-3 pointer-events-auto">
        {/* Palette Buttons */}
        <div className="sci-panel p-1.5 rounded-full flex md:flex-col flex-row gap-2">
          <button
            onClick={() => onCycleColor(0)}
            aria-label="Indigo Teal Palette"
            className={`w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 ring-1 ring-white/10 hover:scale-110 transition-transform duration-300 ${
              colorPalette === 0 ? 'ring-2 ring-white' : ''
            }`}
          />
          <button
            onClick={() => onCycleColor(1)}
            aria-label="Pink Blue Palette"
            className={`w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-600 ring-1 ring-white/10 hover:scale-110 transition-transform duration-300 ${
              colorPalette === 1 ? 'ring-2 ring-white' : ''
            }`}
          />
          <button
            onClick={() => onCycleColor(2)}
            aria-label="Orange Rose Palette"
            className={`w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-rose-600 ring-1 ring-white/10 hover:scale-110 transition-transform duration-300 ${
              colorPalette === 2 ? 'ring-2 ring-white' : ''
            }`}
          />
        </div>

        <div className="hidden md:block text-[9px] font-mono text-right text-white/20 leading-tight">
          <p>INTERACTION ENGINE V2.0</p>
          <p className="mt-0.5">SAYANTAN BARIK</p>
        </div>
      </div>
    </div>
  );
}

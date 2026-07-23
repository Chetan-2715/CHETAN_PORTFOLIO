import React from 'react';

const PALETTES = [
  { id: 0, bg: 'from-[#818cf8] to-[#2dd4bf]', name: 'Indigo / Teal' },
  { id: 1, bg: 'from-[#f472b6] to-[#60a5fa]', name: 'Pink / Blue' },
  { id: 2, bg: 'from-[#fb923c] to-[#e11d48]', name: 'Orange / Rose' },
];

export function ControlPanel({ colorPalette, onSetColorPalette }) {
  return (
    <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 pointer-events-auto">
      {/* Vertical Palette Switcher Container */}
      <div className="sci-panel p-2 rounded-full flex flex-col gap-3 backdrop-blur-xl border border-white/10 shadow-2xl">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            onClick={() => onSetColorPalette(p.id)}
            aria-label={p.name}
            title={p.name}
            className={`w-7 h-7 rounded-full bg-gradient-to-br ${p.bg} ring-1 ring-white/10 hover:scale-110 transition-transform duration-300 relative ${
              colorPalette === p.id ? 'ring-2 ring-white scale-105' : 'opacity-80 hover:opacity-100'
            }`}
          >
            {colorPalette === p.id && (
              <span className="absolute inset-0 rounded-full border border-white animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

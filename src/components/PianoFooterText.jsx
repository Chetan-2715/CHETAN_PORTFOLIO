import React, { useState } from 'react';

const LETTERS = ['C', 'H', 'E', 'T', 'A', 'N'];

export function PianoFooterText() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative w-full pt-16 pb-0 flex flex-col items-center justify-end overflow-hidden select-none pointer-events-auto leading-none">
      
      {/* Giant CHETAN Typography (strictly z-0 below the z-10 strip) */}
      <div className="relative z-0 flex items-center justify-center gap-1 sm:gap-3 md:gap-6 lg:gap-8 pb-0 mb-0 leading-none">
        {LETTERS.map((letter, idx) => {
          const isHovered = hoveredIndex === idx;

          return (
            <span
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative z-0 inline-block font-mono font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] cursor-pointer leading-none transition-all duration-300 ease-out ${
                isHovered
                  ? 'text-white/40 -translate-y-2.5 scale-[1.015]'
                  : 'text-white/10 translate-y-0 scale-100'
              }`}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* 75-80% Opacity Overlay Strip Covering Lower Half of Name (strictly z-10 on top) */}
      <div className="absolute bottom-0 inset-x-0 z-10 h-14 sm:h-18 md:h-22 bg-[#030305]/80 backdrop-blur-md border-t border-white/10 flex items-center justify-center px-6">
        {/* Centered Copyright Notice */}
        <div className="text-xs sm:text-sm font-mono text-white/60 tracking-wide text-center">
          © 2026 Chetan Shabadi. All Rights Reserved.
        </div>
      </div>

    </div>
  );
}

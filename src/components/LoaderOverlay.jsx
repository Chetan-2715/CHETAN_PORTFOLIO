import React, { useState, useEffect } from 'react';

export function LoaderOverlay() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 800);
    const removeTimer = setTimeout(() => setVisible(false), 1800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#030305] flex flex-col items-center justify-center transition-opacity duration-1000 pointer-events-none ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative w-12 h-12 mb-6">
        <div className="loader-ring" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">
          Loading Assets
        </div>
        <div className="w-24 h-px bg-white/10 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-white/40 animate-slide" />
        </div>
      </div>
    </div>
  );
}

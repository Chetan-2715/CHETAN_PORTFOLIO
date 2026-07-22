import React from 'react';
import { ArrowRight } from 'lucide-react';

export function HeroSection({ onViewPortfolio, onContactMe }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 pb-2 leading-[1.1]">
          Design your vision with<br className="hidden md:block" /> creative excellence
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl font-medium leading-relaxed tracking-tight">
          Crafting digital experiences that merge art and technology. From{' '}
          <br className="hidden md:block" />
          branding to web development, I build it all.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pointer-events-auto">
          {/* Portfolio Button */}
          <button
            onClick={onViewPortfolio}
            className="group relative px-6 py-3.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-white/5 transition-all duration-300 flex items-center gap-2.5 overflow-hidden shadow-lg shadow-black/20"
          >
            <span className="text-sm font-medium text-white/90">View Portfolio</span>
            <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </button>

          {/* Contact Button */}
          <button
            onClick={onContactMe}
            className="px-8 py-3.5 rounded-full border border-orange-500/40 text-white/80 hover:text-white hover:bg-orange-500/5 hover:border-orange-500/70 transition-all duration-300 text-sm font-medium shadow-[0_0_15px_-5px_rgba(249,115,22,0.15)] hover:shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)]"
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
}

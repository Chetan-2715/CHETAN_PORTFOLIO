import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Instagram, Phone } from 'lucide-react';

const FULL_SUBHEAD =
  'Specializing in Machine Learning, Deep Learning, and Computer Vision to engineer next-generation AI solutions.';

export function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index <= FULL_SUBHEAD.length) {
          setTypedText(FULL_SUBHEAD.slice(0, index));
          index++;
        } else {
          setIsDone(true);
          clearInterval(interval);
        }
      }, 25);

      return () => clearInterval(interval);
    }, 400);

    return () => clearTimeout(startTimeout);
  }, []);

  return (
    <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto pt-16">
        
        {/* BIG PROMINENT NAME */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/50 pb-1 leading-none">
          Chetan Shabadi
        </h1>

        {/* ROLE SUBTITLE */}
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full sci-panel text-xs sm:text-sm font-mono text-cyan-400 tracking-wider border border-cyan-500/20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          AInDS Engineer
        </div>

        {/* TAGLINE */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl font-medium tracking-tight leading-snug">
          Building intelligent systems with generative & predictive AI
        </p>

        {/* SUBHEAD TYPEWRITER ANIMATION */}
        <p className="mt-4 text-xs sm:text-sm md:text-base text-white/60 max-w-2xl font-mono leading-relaxed tracking-tight min-h-[3.5rem] sm:min-h-[2.5rem]">
          {typedText}
          <span
            className={`inline-block w-2 h-3.5 sm:h-4 ml-1 bg-cyan-400 align-middle ${
              isDone ? 'animate-pulse' : 'animate-ping'
            }`}
          />
        </p>

        {/* SOCIAL & CONTACT BUTTONS */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto pointer-events-auto">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/chetan-shabadi-b2088031b/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2.5 shadow-lg shadow-black/20"
          >
            <Linkedin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-medium text-white/90 group-hover:text-white">LinkedIn</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Chetan-2715"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2.5 shadow-lg shadow-black/20"
          >
            <Github className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-medium text-white/90 group-hover:text-white">GitHub</span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/chetan_270105"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2.5 shadow-lg shadow-black/20"
          >
            <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-medium text-white/90 group-hover:text-white">Instagram</span>
          </a>

          {/* Phone Number */}
          <a
            href="tel:9511757256"
            className="group relative px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all duration-300 flex items-center gap-2.5 shadow-lg shadow-black/20"
          >
            <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-medium text-white/90 group-hover:text-white">+91 95117 57256</span>
          </a>
        </div>
      </div>
    </section>
  );
}

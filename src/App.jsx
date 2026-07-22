import React, { useState, useEffect } from 'react';
import { CanvasContainer } from './components/CanvasContainer';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ControlPanel } from './components/ControlPanel';

export function App() {
  const [colorPalette, setColorPalette] = useState(0);
  const [uiLoaded, setUiLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setUiLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#030305] text-white selection:bg-white/20 antialiased font-sans">
      {/* Sci-Fi Visual Overlays */}
      <div className="scanlines" />
      <div className="vignette" />

      {/* WebGL Particle Canvas Engine (Fixed Background) */}
      <CanvasContainer colorPalette={colorPalette} />

      {/* Dynamic Morphing Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main
        className={`transition-opacity duration-700 ${
          uiLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />

        {/* Floating Color Palette Switcher */}
        <ControlPanel
          colorPalette={colorPalette}
          onSetColorPalette={setColorPalette}
        />
      </main>
    </div>
  );
}

export default App;

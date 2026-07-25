import React, { useState, useEffect } from 'react';
import { CanvasContainer } from './components/CanvasContainer';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { IntroSplash } from './components/IntroSplash';

export function App() {
  const [colorPalette, setColorPalette] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [uiLoaded, setUiLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setUiLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#030305] text-white selection:bg-white/20 antialiased font-sans">
      {/* Intro Hello Splash Screen */}
      {showIntro && <IntroSplash onFinish={() => setShowIntro(false)} />}

      {/* Sci-Fi Visual Overlays */}
      <div className="scanlines" />
      <div className="vignette" />

      {/* WebGL Particle Canvas Engine (Fixed Background) */}
      <CanvasContainer colorPalette={colorPalette} />

      {/* Dynamic Morphing Navbar (Hidden during intro splash) */}
      {!showIntro && <Navbar />}

      {/* Main Sections */}
      <main
        className={`transition-opacity duration-700 ${
          uiLoaded && !showIntro ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <HeroSection
          colorPalette={colorPalette}
          onSetColorPalette={setColorPalette}
        />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;

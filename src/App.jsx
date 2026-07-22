import React, { useState, useRef } from 'react';
import { useAudioAnalyzer } from './hooks/useAudioAnalyzer';
import { useHandTracking } from './hooks/useHandTracking';
import { CanvasContainer } from './components/CanvasContainer';
import { HeaderHUD } from './components/HeaderHUD';
import { HeroSection } from './components/HeroSection';
import { ControlPanel } from './components/ControlPanel';
import { LoaderOverlay } from './components/LoaderOverlay';

export function App() {
  const [simMode, setSimMode] = useState(0);
  const [colorPalette, setColorPalette] = useState(0);
  const canvasElRef = useRef(null);

  const { audioActive, toggleAudio, getAudioLevel } = useAudioAnalyzer();
  const { cameraActive, isCameraLoading, trackingActive, toggleCamera, handsDataRef } =
    useHandTracking();

  const handleCaptureSnapshot = () => {
    if (!canvasElRef.current) return;
    const link = document.createElement('a');
    link.download = `aether-os-${Date.now()}.png`;
    link.href = canvasElRef.current.toDataURL('image/png');
    link.click();
  };

  const handleViewPortfolio = () => {
    // Cycle mode or smooth scroll action
    setSimMode((prev) => (prev + 1) % 4);
  };

  const handleContactMe = () => {
    window.location.href = 'mailto:sayantan.barik@example.com?subject=Aether.OS%20Portfolio%20Inquiry';
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030305] text-white selection:bg-white/20 antialiased font-sans">
      {/* Preloader */}
      <LoaderOverlay />

      {/* Sci-Fi Ambient Visual Overlays */}
      <div className="scanlines" />
      <div className="vignette" />

      {/* WebGL Particle Canvas Engine */}
      <CanvasContainer
        simMode={simMode}
        colorPalette={colorPalette}
        getAudioLevel={getAudioLevel}
        handsDataRef={handsDataRef}
        onCanvasReady={(el) => {
          canvasElRef.current = el;
        }}
      />

      {/* Header HUD */}
      <HeaderHUD
        simMode={simMode}
        audioActive={audioActive}
        onToggleAudio={toggleAudio}
        cameraActive={cameraActive}
        isCameraLoading={isCameraLoading}
        onToggleCamera={toggleCamera}
        onCaptureSnapshot={handleCaptureSnapshot}
      />

      {/* Hero Content Overlay */}
      <HeroSection
        onViewPortfolio={handleViewPortfolio}
        onContactMe={handleContactMe}
      />

      {/* Bottom HUD Controls */}
      <ControlPanel
        simMode={simMode}
        onSetMode={setSimMode}
        colorPalette={colorPalette}
        onCycleColor={setColorPalette}
        trackingActive={trackingActive}
      />
    </div>
  );
}

export default App;

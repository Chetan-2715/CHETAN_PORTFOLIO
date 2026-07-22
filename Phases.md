# Development Phases & Roadmap

This document breaks down the conversion and expansion of Aether.OS into manageable, verifiable phases.

---

## Phase 1: Planning & Project Foundation Setup
- [x] Analyze original `index.html` structure and interactive WebGL logic.
- [x] Create core documentation suite (`PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, `Design.md`, `Memory.md`).
- [ ] Initialize Vite + React project structure in the workspace.
- [ ] Configure Tailwind CSS, PostCSS, and font imports (`Inter`, `JetBrains Mono`).
- [ ] Install required NPM packages (`three`, `lucide-react`, `@mediapipe/hands`, `@mediapipe/camera_utils`).

---

## Phase 2: WebGL Engine & Shader Component Migration
- [ ] Create `src/components/CanvasContainer.jsx`.
- [ ] Migrate Three.js scene, camera setup, and responsive window resize handlers.
- [ ] Port custom GLSL vertex shader (Sphere, Torus, Lattice, Vortex geometries with Simplex Noise).
- [ ] Port custom GLSL fragment shader (spatial color interpolation & radial point glow).
- [ ] Configure `EffectComposer` pipeline (`RenderPass`, `UnrealBloomPass`, custom chromatic aberration `ShaderPass`).
- [ ] Implement smooth mode switching lerp uniforms (`window.setMode`).

---

## Phase 3: Hardware Integrations & Custom Hooks
- [ ] Create `src/hooks/useAudioAnalyzer.js` for microphone stream capture and Web Audio API FFT analysis.
- [ ] Create `src/hooks/useHandTracking.js` wrapping MediaPipe Hands and video frame processing loop.
- [ ] Wire audio FFT levels into shader uniform `uAudio`.
- [ ] Wire hand landmarks into shader uniforms `uHandLeft` and `uHandRight` (with attraction/repulsion forces).
- [ ] Wire fallback mouse position tracking when camera is inactive.

---

## Phase 4: Sci-Fi HUD Components & Hero Overlay
- [ ] Create `src/components/HeaderHUD.jsx` with Aether.OS logo, node counter, active mode indicator, and action buttons (mic, cam, capture).
- [ ] Create `src/components/HeroSection.jsx` with hero typography, gradient background text, and interactive CTA buttons.
- [ ] Create `src/components/ControlPanel.jsx` with 4 simulation mode buttons, color palette switcher, and gesture tracking status badge.
- [ ] Create `src/components/LoaderOverlay.jsx` with cybernetic ring loader and fade transition.

---

## Phase 5: Responsive Verification & Polish
- [ ] Audit layout responsiveness across desktop (`1920px`, `1440px`), tablet (`768px`), and mobile (`380px` `xs`).
- [ ] Verify particle count adjustments on mobile devices.
- [ ] Test canvas snapshot download feature (`btn-rec`).
- [ ] Verify production build with `npm run build`.
- [ ] Update `Memory.md` to reflect completion of all phases.

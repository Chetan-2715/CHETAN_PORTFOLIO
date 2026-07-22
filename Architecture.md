# Architecture Document

## 1. System High-Level Architecture
Aether.OS is structured as a single-page React application leveraging WebGL hardware acceleration, browser APIs (MediaPipe, Web Audio, MediaDevices), and a reactive state management flow.

```
                  +-----------------------------------+
                  |             App.jsx               |
                  |     (Global State & Context)      |
                  +-----------------+-----------------+
                                    |
     +-------------------+----------+----------+-------------------+
     |                   |                     |                   |
     v                   v                     v                   v
+----+---------+   +-----+--------+   +--------+-----+   +---------+----+
|  HeaderHUD   |   | HeroSection  |   | ControlPanel |   | LoaderOverlay|
| (Controls UI)|   | (CTA / Text) |   | (Mode/Colors)|   | (Preloader)  |
+--------------+   +--------------+   +--------------+   +--------------+
         |                                     |
         v                                     v
+------------------+                 +--------------------+
|  useAudio        |                 |  useHandTracking   |
| (Web Audio API)  |                 | (MediaPipe Hands)  |
+--------+---------+                 +---------+----------+
         |                                     |
         +-------------------+-----------------+
                             |
                             v
                 +-----------+------------+
                 |    CanvasContainer     |
                 |  Three.js WebGL Engine |
                 |  - 120k Particles GLSL |
                 |  - Post-FX Composer    |
                 +------------------------+
```

---

## 2. Technical Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | React 18+ & Vite | Fast module bundling, HMR, modular JSX components |
| **3D & Graphics** | Three.js (`three`) | WebGL renderer, Perspective Camera, BufferGeometry, ShaderMaterial |
| **Post-Processing** | `three/addons/postprocessing` | `EffectComposer`, `RenderPass`, `UnrealBloomPass`, custom `ShaderPass` |
| **Shaders** | Custom GLSL Shaders | Vertex shader for mode morphing & noise; Fragment shader for radial glow & gradient |
| **Computer Vision** | `@mediapipe/hands` | Real-time dual hand landmark detection & gesture tracking |
| **Camera Utilities**| `@mediapipe/camera_utils` | Webcam video frame loop dispatcher |
| **Icons & UI** | `lucide-react` | Clean vector iconography (mic, video, aperture, cpu, arrow-right) |
| **Styling** | Tailwind CSS v3 | Utility-first responsive layout, glassmorphism backdrop blurs, sci-fi tokens |

---

## 3. Directory & Folder Structure

```
d:/PORTFOLIO/
├── index.html                   # Original HTML preserved for reference
├── PRD.md                       # Project Requirements Document
├── Architecture.md              # System Architecture & Directory Specification
├── Rules.md                     # Engineering Rules & AI Boundaries
├── Phases.md                    # Multi-Phase Execution Plan
├── Design.md                    # Visual Identity & Token Specifications
├── Memory.md                    # Active Context & Development Ledger
├── package.json                 # Node dependencies & project scripts
├── vite.config.js               # Vite build configuration
├── tailwind.config.js           # Tailwind design tokens & font extensions
├── postcss.config.js            # PostCSS configuration
├── public/                      # Static assets & icons
└── src/
    ├── main.jsx                 # React root mounting entry point
    ├── App.jsx                  # Main layout container & state coordinator
    ├── index.css                # Global CSS, utilities, glassmorphism, keyframes
    ├── components/
    │   ├── CanvasContainer.jsx  # WebGL Canvas & Three.js particle renderer
    │   ├── HeaderHUD.jsx        # Top HUD bar (Branding, Stats, Mic/Cam/Rec)
    │   ├── HeroSection.jsx      # Center portfolio hero overlay & CTA buttons
    │   ├── ControlPanel.jsx     # Bottom HUD (Modes, Colors, Gesture status)
    │   └── LoaderOverlay.jsx    # Preloading cyber ring animation
    └── hooks/
        ├── useAudioAnalyzer.js  # Web Audio API hook for microphone FFT
        └── useHandTracking.js   # MediaPipe Hands AI tracking hook
```

---

## 4. Component & Data Flow Details

1. **State Management**:
   - `simMode` (0: Nebula, 1: Torus, 2: Lattice, 3: Vortex) passed down to `CanvasContainer` as uniform target.
   - `colorPalette` (0: Indigo/Teal, 1: Pink/Blue, 2: Orange/Rose) smooth lerp transitions in fragment shader.
   - `audioActive` boolean & `audioLevel` float (0.0 to 1.0) calculated via FFT.
   - `cameraActive` boolean & `handCoordinates` vector targets fed to GLSL uniform `uHandLeft` and `uHandRight`.

2. **Canvas Rendering Pipeline**:
   - Single `requestAnimationFrame` loop driven by `THREE.Clock`.
   - Dynamic mobile viewport detection adjusting camera Z distance (`40` mobile, `28` desktop) and particle count (`65,000` vs `120,000`).
   - Postprocessing composer rendering bloom and film grain pass sequentially.

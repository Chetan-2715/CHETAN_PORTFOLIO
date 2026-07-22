# Project Requirements Document (PRD)

## 1. Executive Summary
**Aether.OS** is a futuristic, immersive portfolio web application featuring a high-performance WebGL particle universe (65,000 to 120,000 interactive nodes), real-time camera AI hand-gesture tracking (via MediaPipe), Web Audio API microphone frequency reactivity, post-processing bloom and chromatic aberration effects, and sci-fi HUD glassmorphism UI overlay. The application presents personal branding, creative vision, and interactive simulation modes with seamless mobile-to-desktop responsiveness.

---

## 2. Product Objectives & Target Audience
- **Target Audience**: Tech recruiters, engineering hiring managers, creative directors, tech enthusiasts, and WebGL/3D design aficionados.
- **Key Objective**: Deliver an unforgettable, high-tech interactive experience ("WOW" factor) showcasing mastery over modern web technologies (React, Three.js, GLSL Shaders, AI Gesture Recognition, Web Audio).
- **Core Value Proposition**: Blends art and interactive technology into a smooth, high-FPS browser experience without performance degradation across mobile and desktop devices.

---

## 3. Key Feature Specifications

### 3.1 WebGL Holographic Particle Universe (Core Engine)
- **Particle Count**: Dynamic density selection (65,000 on mobile devices `<768px`, 120,000 on desktop devices).
- **4 Geometric Modes**:
  1. **Nebula Cloud** (Mode 01): Fluid 3D spherical particle cloud with simplex noise deformation.
  2. **Quantum Torus** (Mode 02): Rotating dual-torus particle formation.
  3. **Cyber Lattice** (Mode 03): 3D grid matrix lattice with noise wave propagation.
  4. **Warp Vortex** (Mode 04): Spiral swirling vortex with dynamic height displacement.
- **Color Palettes**:
  - Palette 1: Cyber Indigo (`#818cf8`) & Teal (`#2dd4bf`)
  - Palette 2: Neon Pink (`#f472b6`) & Electric Blue (`#60a5fa`)
  - Palette 3: Flare Orange (`#fb923c`) & Rose (`#e11d48`)
- **Post-Processing Shader Pipeline**:
  - `RenderPass` for base scene.
  - `UnrealBloomPass` for dreamy particle luminescence.
  - Custom `ShaderPass` for edge chromatic aberration and film grain noise.

### 3.2 AI Hand Gesture Tracking (MediaPipe Hands)
- **Camera Integration**: Live webcam feed processing via `@mediapipe/hands` and `@mediapipe/camera_utils`.
- **Dual Hand Support**: Real-time tracking of left and right hands mapped to Three.js world coordinates.
- **Gesture Actions**:
  - **Pinch (Index + Thumb)**: Attracts particles toward hand position with pulling force.
  - **Open Hand**: Displaces and pushes particles away with repulsive force.
- **Status Indicator**: Real-time "TRACKING" HUD badge showing camera status.

### 3.3 Audio Reactivity (Web Audio API)
- **Microphone Stream**: Captures ambient audio via `navigator.mediaDevices.getUserMedia`.
- **Real-Time FFT Analyzer**: Analyzes frequency spectrum to drive particle size scaling and expansion velocity.
- **Visual Feedback**: HUD microphone button highlights green during active listening.

### 3.4 Interactive Sci-Fi HUD & Hero Overlay
- **Branding Header**: Aether.OS title, active mode status, particle node count, live status indicator.
- **Action Control Buttons**: Microphone toggle, Camera toggle, and Canvas snapshot recorder (PNG capture download).
- **Hero Typography**: Gradient hero heading ("Design your vision with creative excellence"), subheadline, "View Portfolio" CTA with shimmer glow effect, and "Contact Me" CTA button.
- **Control Panel**: 4-mode switcher, color palette selector, interaction engine stats, scanline & vignette post-effects.

---

## 4. Technical Non-Functional Requirements
- **FPS Target**: 60 FPS on desktop, 30-60 FPS on mobile.
- **Responsiveness**: 100% fluid response down to 380px viewports (`xs`).
- **Bundle & Load Time**: Sub-2s initial render, progressive assets loading screen.
- **Accessibility & Cross-Browser**: Fallback to mouse movement if camera/mic permissions are denied; cross-browser support (Chrome, Firefox, Edge, Safari).

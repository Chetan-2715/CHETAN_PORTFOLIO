# Rules & AI Engineering Guardrails

## 1. Development & Code Hygiene Rules

### DO:
- Maintain complete code fidelity when converting vanilla HTML/JS logic into React hooks and components.
- Use explicit cleanup functions inside `useEffect` for event listeners (`resize`, `mousemove`), WebGL render loops (`cancelAnimationFrame`), Web Audio streams (`track.stop()`), and MediaPipe webcam loops (`camera.stop()`).
- Keep components modular and single-responsibility (`HeaderHUD`, `HeroSection`, `ControlPanel`, `CanvasContainer`).
- Ensure 100% responsive support across mobile (`<768px`), tablet, and desktop viewports.
- Preserve the exact visual aesthetics, particle positions, GLSL math formulas, and postprocessing bloom parameters from `index.html`.

### DON'T:
- DO NOT overwrite or delete the original `index.html` file.
- DO NOT inject placeholder dummy text or incomplete stub functions (e.g. `// TODO: implement this later`).
- DO NOT introduce heavy, unnecessary UI framework dependencies (e.g. MUI, Bootstrap). Use clean Tailwind CSS + Vanilla CSS utilities.
- DO NOT perform layout thrashing or synchronous blocking calls inside the 60 FPS animation loop.
- DO NOT alter function signatures without updating all invocation sites across the application.

---

## 2. Error Handling & Fallback Protocols
1. **Camera Permission Denied**:
   - If webcam access is rejected by the user or unsupported by the device, catch the exception gracefully, reset `cameraActive` state, display a temporary toast notification ("Camera access denied. Falling back to mouse interaction."), and seamlessly fall back to mouse position tracking.
2. **Microphone Permission Denied**:
   - If audio input access is denied, revert mic button UI state without throwing unhandled exceptions.
3. **WebGL Context Loss**:
   - Attach `webglcontextlost` and `webglcontextrestored` event listeners to the canvas element to recover gracefully.

---

## 3. Performance & Memory Management Rules
- **Memory Leaks**: Dispose of geometries, materials, textures, shader uniforms, and render targets when unmounting `CanvasContainer`.
- **DPI Optimization**: Limit `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` to prevent overheating high-DPI displays.
- **Particle Count Scaling**: Enforce dynamic mobile check `window.innerWidth < 768` to set 65,000 particles on mobile and 120,000 on desktop.

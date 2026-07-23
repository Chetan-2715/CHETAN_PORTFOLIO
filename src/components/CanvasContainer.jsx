import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

// Exact vibrant palettes from original index.html
const PALETTES = [
  { c1: new THREE.Color('#818cf8'), c2: new THREE.Color('#2dd4bf') }, // Indigo / Teal
  { c1: new THREE.Color('#f472b6'), c2: new THREE.Color('#60a5fa') }, // Pink / Blue
  { c1: new THREE.Color('#fb923c'), c2: new THREE.Color('#e11d48') }, // Orange / Rose
];

export function CanvasContainer({ colorPalette, onCanvasReady }) {
  const containerRef = useRef(null);
  const colorPaletteRef = useRef(colorPalette);

  useEffect(() => {
    colorPaletteRef.current = colorPalette;
  }, [colorPalette]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 65000 : 120000;
    let cameraZ = isMobile ? 40 : 28;
    const bgColor = 0x030305;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false,
      depth: true,
      preserveDrawingBuffer: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.CineonToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    if (onCanvasReady) {
      onCanvasReady(renderer.domElement);
    }

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(bgColor, 0.015);
    scene.background = new THREE.Color(bgColor);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.z = cameraZ;

    // Post-processing
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0.1;
    bloomPass.strength = 1.0;
    bloomPass.radius = 0.8;

    const outputShader = {
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uRGBShift: { value: 0.002 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform float uRGBShift;
        varying vec2 vUv;
        
        float random(vec2 p) {
          return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv;
          float dist = distance(uv, vec2(0.5));
          vec2 offset = (uv - 0.5) * dist * uRGBShift;
          
          float r = texture2D(tDiffuse, uv + offset).r;
          float g = texture2D(tDiffuse, uv).g;
          float b = texture2D(tDiffuse, uv - offset).b;
          
          vec3 color = vec3(r, g, b);
          float noise = (random(uv + uTime) - 0.5) * 0.04;
          color += noise;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    };

    const finalPass = new ShaderPass(outputShader);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composer.addPass(finalPass);

    // Particle Shader with Section-Locked Plateaus & Smooth Transitions
    const particleVertexShader = `
      uniform float uTime;
      uniform float uIntro;
      uniform float uScrollProgress;
      uniform float uIsDesktop;
      uniform vec3 uMouse;
      
      attribute vec3 aRandom;
      attribute float aIndex;
      attribute vec3 aInfoPos;
      attribute vec3 aCodePos;

      varying vec3 vColor;
      varying float vAlpha;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }

      vec3 getPosVortex(float idx) {
        float r = (idx / ${particleCount}.0) * 18.0;
        float ang = r * 3.0;
        float h = (aRandom.x - 0.5) * 8.0 * (1.0 - r/20.0);
        return vec3(r * cos(ang), r * sin(ang), h);
      }

      void main() {
        float t = uTime * 0.15;
        vec3 pVortex = getPosVortex(aIndex);
        vec3 pInfo = aInfoPos;
        vec3 pCode = aCodePos;

        // Animate Vortex Rotation
        float va = t * 1.0 - length(pVortex.xy)*0.2;
        float vc = cos(va); float vs = sin(va);
        pVortex.xy = mat2(vc, -vs, vs, vc) * pVortex.xy;

        // Section-Locked Shape Morphing:
        // uScrollProgress:
        // 0.0 (Hero): Vortex
        // 1.0 (About): Info-Icon
        // 2.0 (Skills): Code Brackets </>
        // 3.0 (Projects & Contact): Vortex
        vec3 targetShape;
        if (uScrollProgress <= 1.0) {
          float p = clamp(uScrollProgress, 0.0, 1.0);
          targetShape = mix(pVortex, pInfo, p);
        } else if (uScrollProgress <= 2.0) {
          float p = clamp(uScrollProgress - 1.0, 0.0, 1.0);
          targetShape = mix(pInfo, pCode, p);
        } else {
          float p = clamp(uScrollProgress - 2.0, 0.0, 1.0);
          targetShape = mix(pCode, pVortex, p);
        }

        // Fluid Simplex Noise
        vec3 noiseBase = vec3(
          snoise(vec3(aIndex*0.01, t*0.2, 0.0)),
          snoise(vec3(aIndex*0.01, 0.0, t*0.2)),
          snoise(vec3(0.0, aIndex*0.01, t*0.2))
        );

        targetShape += noiseBase * 1.8;

        // Intro Circle Blast (On initial page load)
        float circleAngle = aIndex * 0.1;
        float circleRadius = 1.5 + aRandom.x * 2.5;
        vec3 pCircle = vec3(
          circleRadius * cos(circleAngle),
          circleRadius * sin(circleAngle),
          (aRandom.z - 0.5) * 1.5
        );

        vec3 blastDir = normalize(pCircle + vec3((aRandom.xy - 0.5) * 2.0, (aRandom.z - 0.5)));
        float blastDist = pow(uIntro, 1.8) * (50.0 + aRandom.y * 70.0);
        vec3 pExploded = pCircle + blastDir * blastDist;

        float blastProgress = smoothstep(0.1, 0.7, uIntro);
        float mainMix = smoothstep(0.5, 1.0, uIntro);

        vec3 currentPos = mix(pCircle, pExploded, blastProgress);
        vec3 pos = mix(currentPos, targetShape, mainMix);

        // DYNAMIC X-SHIFT: Shift left for About (1.0) and Skills (2.0), return to CENTER for Projects (3.0) & Contact
        float xShiftProgress = 0.0;
        if (uScrollProgress <= 1.0) {
          xShiftProgress = clamp(uScrollProgress, 0.0, 1.0);
        } else if (uScrollProgress <= 2.0) {
          xShiftProgress = 1.0;
        } else if (uScrollProgress <= 3.0) {
          xShiftProgress = 1.0 - clamp(uScrollProgress - 2.0, 0.0, 1.0);
        } else {
          xShiftProgress = 0.0;
        }

        float desktopShift = -12.5 * xShiftProgress * uIsDesktop;
        float mobileShift = -4.0 * xShiftProgress * (1.0 - uIsDesktop);
        pos.x += desktopShift + mobileShift;

        // Dynamic Proximity Mouse Interaction (Computed AFTER position shift, 5.0 unit threshold)
        float d = distance(pos.xy, uMouse.xy);
        float influence = smoothstep(5.0, 0.0, d);
        vec3 dir = pos - uMouse;
        if (length(dir) > 0.001) {
          pos += normalize(dir) * influence * 3.5;
        }

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        
        float blastSizeBoost = sin(uIntro * 3.14159) * 4.0 * (1.0 - mainMix);
        gl_PointSize = (1.5 + aRandom.y * 2.0 + blastSizeBoost) * (30.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
        
        float depthFade = smoothstep(60.0, 10.0, -mvPosition.z);

        // DULL PARTICLE BRIGHTNESS IN PROJECTS & CONTACT SECTIONS (>= 2.5)
        float dimFactor = 1.0 - smoothstep(2.2, 2.8, uScrollProgress) * 0.70;

        vAlpha = depthFade * (0.25 + aRandom.z * 0.65) * dimFactor;
        vColor = pos;
      }
    `;

    const particleFragmentShader = `
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        if (dist > 0.5) discard;
        
        float glow = 1.0 - smoothstep(0.0, 0.5, dist);
        glow = pow(glow, 1.5);

        vec3 col = mix(uColor1, uColor2, smoothstep(-20.0, 20.0, vColor.x + vColor.y));
        gl_FragColor = vec4(col, vAlpha * glow);
      }
    `;

    // Geometry & Attributes Generation
    const geometry = new THREE.BufferGeometry();
    const indices = new Float32Array(particleCount);
    const randoms = new Float32Array(particleCount * 3);
    const infoPositions = new Float32Array(particleCount * 3);
    const codePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      indices[i] = i;
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();

      // 1. Compute Info-Icon Target Geometry (Speech Bubble + 'i' symbol)
      let ix = 0, iy = 0, iz = (Math.random() - 0.5) * 1.5;
      const typeInfo = Math.random();

      if (typeInfo < 0.65) {
        let angle = Math.random() * Math.PI * 2;
        if (angle > 3.65 && angle < 4.25) {
          angle = Math.random() < 0.5 ? 3.65 : 4.25;
        }
        const R = 11.5 + (Math.random() - 0.5) * 0.8;
        ix = R * Math.cos(angle);
        iy = R * Math.sin(angle);
        if (Math.random() < 0.15) {
          const t = Math.random();
          ix = -8.0 - t * 4.5 + (Math.random() - 0.5) * 0.8;
          iy = -8.0 - t * 4.5 + (Math.random() - 0.5) * 0.8;
        }
      } else if (typeInfo < 0.75) {
        const t = Math.random();
        ix = -7.5 - t * 5.2 + (Math.random() - 0.5) * 0.6;
        iy = -7.5 - t * 3.5 + (Math.random() - 0.5) * 0.6;
      } else if (typeInfo < 0.83) {
        const rDot = Math.sqrt(Math.random()) * 1.3;
        const aDot = Math.random() * Math.PI * 2;
        ix = rDot * Math.cos(aDot);
        iy = 5.2 + rDot * Math.sin(aDot);
      } else {
        const stemWidth = (Math.random() - 0.5) * 1.8;
        const stemHeight = -4.5 + Math.random() * 6.5;
        ix = stemWidth;
        iy = stemHeight;
      }

      infoPositions[i * 3] = ix;
      infoPositions[i * 3 + 1] = iy;
      infoPositions[i * 3 + 2] = iz;

      // 2. Compute Code Brackets </> Target Geometry for Skills Section
      let cx = 0, cy = 0, cz = (Math.random() - 0.5) * 1.5;
      const typeCode = Math.random();

      if (typeCode < 0.35) {
        const t = Math.random();
        if (Math.random() < 0.5) {
          cx = -7.5 + t * 5.5 + (Math.random() - 0.5) * 0.6;
          cy = 0.0 + t * 6.5 + (Math.random() - 0.5) * 0.6;
        } else {
          cx = -7.5 + t * 5.5 + (Math.random() - 0.5) * 0.6;
          cy = 0.0 - t * 6.5 + (Math.random() - 0.5) * 0.6;
        }
      } else if (typeCode < 0.65) {
        const t = Math.random();
        cx = -1.8 + t * 3.6 + (Math.random() - 0.5) * 0.6;
        cy = -8.0 + t * 16.0 + (Math.random() - 0.5) * 0.6;
      } else {
        const t = Math.random();
        if (Math.random() < 0.5) {
          cx = 7.5 - t * 5.5 + (Math.random() - 0.5) * 0.6;
          cy = 0.0 + t * 6.5 + (Math.random() - 0.5) * 0.6;
        } else {
          cx = 7.5 - t * 5.5 + (Math.random() - 0.5) * 0.6;
          cy = 0.0 - t * 6.5 + (Math.random() - 0.5) * 0.6;
        }
      }

      codePositions[i * 3] = cx;
      codePositions[i * 3 + 1] = cy;
      codePositions[i * 3 + 2] = cz;
    }

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(particleCount * 3).fill(0), 3)
    );
    geometry.setAttribute('aInfoPos', new THREE.BufferAttribute(infoPositions, 3));
    geometry.setAttribute('aCodePos', new THREE.BufferAttribute(codePositions, 3));
    geometry.setAttribute('aIndex', new THREE.BufferAttribute(indices, 1));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

    const initialIdx = colorPaletteRef.current || 0;
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntro: { value: 0 },
        uScrollProgress: { value: 0 },
        uIsDesktop: { value: window.innerWidth >= 1024 ? 1.0 : 0.0 },
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
        uColor1: { value: PALETTES[initialIdx].c1.clone() },
        uColor2: { value: PALETTES[initialIdx].c2.clone() },
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse Tracking
    const mousePos = new THREE.Vector3(0, 0, 0);
    const mouseTarget = new THREE.Vector3(0, 0, 0);

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseTarget.set(x * 25, y * 18, 0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      cameraZ = window.innerWidth < 768 ? 40 : 28;
      material.uniforms.uIsDesktop.value = window.innerWidth >= 1024 ? 1.0 : 0.0;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with Exact Section Element Bounding Rect Calculations
    let animationFrameId;
    let time = 0;
    let introTimer = 0;
    let currentScrollProgress = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      time += delta;
      introTimer += delta;

      // 1-second intro progress
      const uIntroVal = Math.min(introTimer / 1.0, 1.0);
      material.uniforms.uIntro.value = uIntroVal;

      // Precise Section Progress Math
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      const aboutEl = document.getElementById('about');
      const skillsEl = document.getElementById('skills');
      const projectsEl = document.getElementById('projects');

      let targetScroll = 0.0;

      if (aboutEl && skillsEl && projectsEl) {
        const aboutTop = aboutEl.offsetTop;
        const skillsTop = skillsEl.offsetTop;
        const projectsTop = projectsEl.offsetTop;

        // Trigger transition when section heading enters the upper middle of screen
        const triggerPoint = scrollY + vh * 0.45;

        if (triggerPoint < aboutTop) {
          // Hero Section -> 0.0 (Vortex)
          targetScroll = 0.0;
        } else if (triggerPoint < skillsTop) {
          // About Section -> 1.0 (Info Icon)
          const dist = triggerPoint - aboutTop;
          const range = skillsTop - aboutTop;
          // Smooth transition during first 40% of scroll distance, then plateau at 1.0!
          const transitionProgress = Math.min(dist / (range * 0.45), 1.0);
          targetScroll = transitionProgress; // 0.0 -> 1.0
        } else if (triggerPoint < projectsTop) {
          // Skills Section -> 2.0 (Code Brackets </>)
          const dist = triggerPoint - skillsTop;
          const range = projectsTop - skillsTop;
          // Smooth transition during first 40% of scroll distance, then plateau at 2.0!
          const transitionProgress = Math.min(dist / (range * 0.45), 1.0);
          targetScroll = 1.0 + transitionProgress; // 1.0 -> 2.0
        } else {
          // Projects & Contact Sections -> 3.0 (Vortex & Centered)
          const dist = triggerPoint - projectsTop;
          const transitionProgress = Math.min(dist / (vh * 0.45), 1.0);
          targetScroll = 2.0 + transitionProgress; // 2.0 -> 3.0
        }
      }

      currentScrollProgress += (targetScroll - currentScrollProgress) * 0.08;
      material.uniforms.uScrollProgress.value = currentScrollProgress;

      material.uniforms.uTime.value = time;
      finalPass.uniforms.uTime.value = time;

      // Mouse Lerping
      mousePos.lerp(mouseTarget, 0.08);
      material.uniforms.uMouse.value.copy(mousePos);

      // Color Palette Lerping
      const activeIdx = colorPaletteRef.current || 0;
      const targetC1 = PALETTES[activeIdx]?.c1 || PALETTES[0].c1;
      const targetC2 = PALETTES[activeIdx]?.c2 || PALETTES[0].c2;
      material.uniforms.uColor1.value.lerp(targetC1, 0.05);
      material.uniforms.uColor2.value.lerp(targetC2, 0.05);

      // Subtle Camera Sway
      const zTarget = cameraZ + Math.sin(time * 0.5) * 2;
      camera.position.z += (zTarget - camera.position.z) * 0.02;
      camera.position.x = Math.sin(time * 0.2) * 2;
      camera.position.y = Math.cos(time * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      composer.render();
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []); // Mount ONCE!

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

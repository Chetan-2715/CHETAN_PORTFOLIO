import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const PALETTES = [
  { c1: new THREE.Color('#818cf8'), c2: new THREE.Color('#2dd4bf') }, // Indigo / Teal
  { c1: new THREE.Color('#f472b6'), c2: new THREE.Color('#60a5fa') }, // Pink / Blue
  { c1: new THREE.Color('#fb923c'), c2: new THREE.Color('#e11d48') }, // Orange / Rose
];

export function CanvasContainer({
  simMode,
  colorPalette,
  getAudioLevel,
  handsDataRef,
  onCanvasReady
}) {
  const containerRef = useRef(null);

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
      preserveDrawingBuffer: true, // For PNG capture
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

    // Particle Shaders
    const particleVertexShader = `
      uniform float uTime;
      uniform float uMode;
      uniform vec3 uHandLeft;
      uniform vec3 uHandRight;
      uniform float uHandLeftState;
      uniform float uHandRightState;
      uniform float uAudio;
      
      attribute vec3 aRandom;
      attribute float aIndex;

      varying vec3 vColor;
      varying float vAlpha;
      varying float vDist;

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

      vec3 getPosSphere(float idx) {
        float phi = acos( -1.0 + ( 2.0 * idx ) / ${particleCount}.0 );
        float theta = sqrt( ${particleCount}.0 * 3.1415926 ) * phi;
        float r = 12.0 + aRandom.x * 2.0;
        return vec3(r * sin(phi) * cos(theta), r * sin(phi) * sin(theta), r * cos(phi));
      }

      vec3 getPosTorus(float idx) {
        float t = idx * 0.1;
        float r = 10.0 + aRandom.y * 3.0;
        float tube = 3.0 + aRandom.x * 2.0;
        float angle = (idx / ${particleCount}.0) * 6.28 * 15.0;
        return vec3(
          (r + tube * cos(angle)) * cos(t),
          (r + tube * cos(angle)) * sin(t),
          tube * sin(angle)
        );
      }

      vec3 getPosLattice(float idx) {
        float size = 25.0;
        float step = pow(${particleCount}.0, 1.0/3.0);
        float x = mod(idx, step);
        float y = mod(floor(idx/step), step);
        float z = floor(idx/(step*step));
        return (vec3(x, y, z) / step - 0.5) * size;
      }

      vec3 getPosVortex(float idx) {
        float r = (idx / ${particleCount}.0) * 18.0;
        float ang = r * 3.0;
        float h = (aRandom.x - 0.5) * 8.0 * (1.0 - r/20.0);
        return vec3(r * cos(ang), r * sin(ang), h);
      }

      void main() {
        float t = uTime * 0.15;
        vec3 pos = vec3(0.0);
        float m = uMode;

        vec3 pSphere = getPosSphere(aIndex);
        vec3 pTorus = getPosTorus(aIndex);
        vec3 pLattice = getPosLattice(aIndex);
        vec3 pVortex = getPosVortex(aIndex);

        vec3 noiseBase = vec3(
          snoise(vec3(aIndex*0.01, t*0.2, 0.0)),
          snoise(vec3(aIndex*0.01, 0.0, t*0.2)),
          snoise(vec3(0.0, aIndex*0.01, t*0.2))
        );

        pSphere += noiseBase * 4.0;
        pTorus += noiseBase * 2.0;
        pLattice += noiseBase * 1.5;
        pVortex += noiseBase * 2.0;

        float c = cos(t*0.3); float s = sin(t*0.3);
        pTorus.xy = mat2(c, -s, s, c) * pTorus.xy;
        pTorus.xz = mat2(c, -s, s, c) * pTorus.xz;

        float va = t * 1.0 - length(pVortex.xy)*0.2;
        float vc = cos(va); float vs = sin(va);
        pVortex.xy = mat2(vc, -vs, vs, vc) * pVortex.xy;

        if(m <= 0.0) pos = pSphere;
        else if(m <= 1.0) pos = mix(pSphere, pTorus, m);
        else if(m <= 2.0) pos = mix(pTorus, pLattice, m - 1.0);
        else if(m <= 3.0) pos = mix(pLattice, pVortex, m - 2.0);
        else pos = pVortex;

        pos *= (1.0 + uAudio * 0.4);

        if (uHandLeft.x > -90.0) {
          float d = distance(pos, uHandLeft);
          float influence = smoothstep(12.0, 0.0, d);
          if (uHandLeftState < 0.0) {
            pos = mix(pos, uHandLeft, influence * 0.3);
          } else {
            pos += normalize(pos - uHandLeft) * influence * 8.0;
          }
        }
        
        if (uHandRight.x < 90.0) {
          float d = distance(pos, uHandRight);
          float influence = smoothstep(12.0, 0.0, d);
          if (uHandRightState < 0.0) {
            pos = mix(pos, uHandRight, influence * 0.3);
          } else {
            pos += normalize(pos - uHandRight) * influence * 8.0;
          }
        }

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (1.5 + aRandom.y * 2.0 + uAudio * 5.0) * (30.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
        
        vDist = length(pos);
        float depthFade = smoothstep(60.0, 10.0, -mvPosition.z);
        vAlpha = depthFade * (0.2 + aRandom.z * 0.6);
        vColor = pos;
      }
    `;

    const particleFragmentShader = `
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec3 vColor;
      varying float vAlpha;
      varying float vDist;

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

    // Geometry & Attributes
    const geometry = new THREE.BufferGeometry();
    const indices = new Float32Array(particleCount);
    const randoms = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      indices[i] = i;
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();
    }

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(particleCount * 3).fill(0), 3)
    );
    geometry.setAttribute('aIndex', new THREE.BufferAttribute(indices, 1));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMode: { value: 0 },
        uHandLeft: { value: new THREE.Vector3(-100, 0, 0) },
        uHandRight: { value: new THREE.Vector3(100, 0, 0) },
        uHandLeftState: { value: 0 },
        uHandRightState: { value: 0 },
        uAudio: { value: 0 },
        uColor1: { value: PALETTES[0].c1.clone() },
        uColor2: { value: PALETTES[0].c2.clone() },
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse fallback tracking
    const handLeftPos = new THREE.Vector3(-100, 0, 0);
    const handRightPos = new THREE.Vector3(100, 0, 0);
    const mouseTargetRight = new THREE.Vector3(100, 0, 0);

    const handleMouseMove = (e) => {
      if (handsDataRef?.current?.active) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseTargetRight.set(x * 30, y * 20, 0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      cameraZ = window.innerWidth < 768 ? 40 : 28;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let time = 0;
    let currentMode = simMode;

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      time += delta;

      // Audio update
      if (getAudioLevel) {
        material.uniforms.uAudio.value = getAudioLevel();
      }

      // Smooth Mode Transition
      if (Math.abs(currentMode - simMode) > 0.001) {
        currentMode += (simMode - currentMode) * 0.05;
      } else {
        currentMode = simMode;
      }
      material.uniforms.uMode.value = currentMode;

      material.uniforms.uTime.value = time;
      finalPass.uniforms.uTime.value = time;

      // Hand Data / Mouse Lerping
      const lerpFactor = 0.1;
      const hands = handsDataRef?.current;

      if (hands && hands.active) {
        handLeftPos.lerp(
          new THREE.Vector3(hands.left.x, hands.left.y, hands.left.z),
          lerpFactor
        );
        handRightPos.lerp(
          new THREE.Vector3(hands.right.x, hands.right.y, hands.right.z),
          lerpFactor
        );
        material.uniforms.uHandLeftState.value = hands.left.state;
        material.uniforms.uHandRightState.value = hands.right.state;
      } else {
        handRightPos.lerp(mouseTargetRight, lerpFactor);
        handLeftPos.set(-100, 0, 0);
        material.uniforms.uHandLeftState.value = 0;
        material.uniforms.uHandRightState.value = 0;
      }

      material.uniforms.uHandLeft.value.copy(handLeftPos);
      material.uniforms.uHandRight.value.copy(handRightPos);

      // Color Palette Lerping
      const targetC1 = PALETTES[colorPalette]?.c1 || PALETTES[0].c1;
      const targetC2 = PALETTES[colorPalette]?.c2 || PALETTES[0].c2;
      material.uniforms.uColor1.value.lerp(targetC1, 0.05);
      material.uniforms.uColor2.value.lerp(targetC2, 0.05);

      // Subtle Camera Sway if no hand tracking
      if (!hands || !hands.active) {
        const zTarget = cameraZ + Math.sin(time * 0.5) * 2;
        camera.position.z += (zTarget - camera.position.z) * 0.02;
        camera.position.x = Math.sin(time * 0.2) * 2;
        camera.position.y = Math.cos(time * 0.15) * 2;
        camera.lookAt(0, 0, 0);
      }

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
  }, [simMode, colorPalette, getAudioLevel, handsDataRef, onCanvasReady]);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}

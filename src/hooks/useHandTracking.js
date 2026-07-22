import { useState, useRef, useCallback, useEffect } from 'react';

export function useHandTracking() {
  const [cameraActive, setCameraActive] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [trackingActive, setTrackingActive] = useState(false);

  const videoRef = useRef(null);
  const cameraInstRef = useRef(null);
  const handsInstRef = useRef(null);

  // Targets for 3D coordinate interpolations
  const handsDataRef = useRef({
    active: false,
    left: { x: -100, y: 0, z: 0, state: 0 },
    right: { x: 100, y: 0, z: 0, state: 0 },
  });

  const toggleCamera = useCallback(async () => {
    if (cameraActive) {
      // Stop tracking
      if (cameraInstRef.current) {
        await cameraInstRef.current.stop();
      }
      setCameraActive(false);
      setTrackingActive(false);
      handsDataRef.current.active = false;
      return;
    }

    setIsCameraLoading(true);

    try {
      // Dynamic loads or global check
      const Hands = window.Hands;
      const Camera = window.Camera;

      if (!Hands || !Camera) {
        // If script CDN not present on window, dynamically load MediaPipe CDN scripts
        await loadMediaPipeScripts();
      }

      const hands = new window.Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results) => {
        if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
          handsDataRef.current.active = false;
          handsDataRef.current.left.x = -100;
          handsDataRef.current.right.x = 100;
          setTrackingActive(false);
        } else {
          handsDataRef.current.active = true;
          setTrackingActive(true);

          for (let i = 0; i < results.multiHandLandmarks.length; i++) {
            const landmarks = results.multiHandLandmarks[i];
            const handedness = results.multiHandedness[i]?.label || (i === 0 ? 'Right' : 'Left');

            // Translate 0..1 to world units
            const x = (0.5 - landmarks[9].x) * 50;
            const y = (0.5 - landmarks[9].y) * 35;
            const z = -landmarks[9].z * 30;

            // Detect Pinch (Thumb tip: 4, Index tip: 8)
            const thumb = landmarks[4];
            const index = landmarks[8];
            const pinchDist = Math.sqrt(
              Math.pow(thumb.x - index.x, 2) + Math.pow(thumb.y - index.y, 2)
            );

            const state = pinchDist < 0.05 ? -1.0 : 1.0; // -1 for pinch/pull, 1 for open/push

            if (handedness === 'Right') {
              handsDataRef.current.right = { x, y, z, state };
            } else {
              handsDataRef.current.left = { x, y, z, state };
            }
          }
        }
      });

      handsInstRef.current = hands;

      if (!videoRef.current) {
        const v = document.createElement('video');
        v.playsInline = true;
        v.style.position = 'fixed';
        v.style.top = '0';
        v.style.left = '0';
        v.style.width = '1px';
        v.style.height = '1px';
        v.style.opacity = '0';
        v.style.pointerEvents = 'none';
        document.body.appendChild(v);
        videoRef.current = v;
      }

      const cam = new window.Camera(videoRef.current, {
        onFrame: async () => {
          if (handsInstRef.current && videoRef.current) {
            await handsInstRef.current.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480,
      });

      cameraInstRef.current = cam;
      await cam.start();

      setCameraActive(true);
    } catch (err) {
      console.error('Camera Init Error:', err);
      alert('Could not access camera for gesture tracking. Please check permissions.');
    } finally {
      setIsCameraLoading(false);
    }
  }, [cameraActive]);

  useEffect(() => {
    return () => {
      if (cameraInstRef.current) {
        cameraInstRef.current.stop();
      }
      if (videoRef.current && videoRef.current.parentNode) {
        videoRef.current.parentNode.removeChild(videoRef.current);
      }
    };
  }, []);

  return {
    cameraActive,
    isCameraLoading,
    trackingActive,
    toggleCamera,
    handsDataRef,
  };
}

async function loadMediaPipeScripts() {
  const scripts = [
    'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
    'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js',
    'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js',
    'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js',
  ];

  for (const src of scripts) {
    if (!document.querySelector(`script[src="${src}"]`)) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.crossOrigin = 'anonymous';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
  }
}

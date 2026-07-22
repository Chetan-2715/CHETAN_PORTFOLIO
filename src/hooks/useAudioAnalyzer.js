import { useState, useRef, useCallback, useEffect } from 'react';

export function useAudioAnalyzer() {
  const [audioActive, setAudioActive] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const audioLevelRef = useRef(0);

  const toggleAudio = useCallback(async () => {
    if (audioContextRef.current) {
      // Toggle suspension if already setup
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
        setAudioActive(true);
      } else if (audioContextRef.current.state === 'running') {
        await audioContextRef.current.suspend();
        setAudioActive(false);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;

      source.connect(analyser);
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      setAudioActive(true);
    } catch (e) {
      console.error('Audio stream access denied or failed:', e);
      setAudioActive(false);
    }
  }, []);

  const getAudioLevel = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return 0;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
    const avg = sum / dataArrayRef.current.length;
    const targetLevel = avg / 255;
    // Smooth lerp
    audioLevelRef.current += (targetLevel - audioLevelRef.current) * 0.1;
    return audioLevelRef.current;
  }, []);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { audioActive, toggleAudio, getAudioLevel };
}

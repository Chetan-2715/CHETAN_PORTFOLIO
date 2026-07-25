import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppleChetanEffect } from './ui/apple-chetan-effect';

export function IntroSplash({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFlying, setIsFlying] = useState(false);

  const startFlight = () => {
    if (isFlying) return;
    setIsFlying(true);

    // After flight transition (800ms), reveal landing page
    setTimeout(() => {
      setIsVisible(false);
    }, 800);
  };

  useEffect(() => {
    // Fallback safety timer
    const timer = setTimeout(() => {
      startFlight();
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFlying ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#030305] flex flex-col items-center justify-center select-none pointer-events-auto px-6 overflow-hidden"
        >
          {/* Subtle Ambient Background Glow */}
          <motion.div
            animate={{ opacity: isFlying ? 0 : 1 }}
            className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
          />

          {/* Chetan Calligraphic Stroke Animation Component */}
          <motion.div
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={
              isFlying
                ? {
                    x: - (window.innerWidth * 0.36),
                    y: - (window.innerHeight * 0.42),
                    scale: 0.22,
                  }
                : { x: 0, y: 0, scale: 1 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center justify-center"
          >
            <AppleChetanEffect
              speed={1.0}
              onAnimationComplete={startFlight}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

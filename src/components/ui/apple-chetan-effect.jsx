"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const initialProps = {
  pathLength: 0,
  opacity: 0,
};

const animateProps = {
  pathLength: 1,
  opacity: 1,
};

export function AppleChetanEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}) {
  const calc = (x) => x * speed;

  return (
    <motion.svg
      className={cn(
        "h-32 sm:h-44 md:h-56 lg:h-64 text-cyan-400 drop-shadow-[0_0_45px_rgba(34,211,238,0.9)]",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="12"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>chetan.</title>

      {/* C */}
      <motion.path
        d="M 110 85 C 90 55, 35 55, 30 110 C 25 165, 90 175, 115 145"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeInOut",
          opacity: { duration: 0.2 },
        }}
      />

      {/* h */}
      <motion.path
        d="M 130 45 L 130 165 M 130 115 C 145 85, 185 85, 185 125 L 185 165"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(0.5),
          opacity: { duration: 0.3, delay: calc(0.5) },
        }}
      />

      {/* e */}
      <motion.path
        d="M 205 130 L 255 130 C 255 90, 205 90, 205 130 C 205 170, 255 170, 260 145"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.7),
          ease: "easeInOut",
          delay: calc(1.2),
          opacity: { duration: 0.3, delay: calc(1.2) },
        }}
      />

      {/* t */}
      <motion.path
        d="M 285 60 L 285 165 C 285 175, 295 170, 300 160 M 270 100 L 305 100"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeInOut",
          delay: calc(1.8),
          opacity: { duration: 0.2, delay: calc(1.8) },
        }}
      />

      {/* a */}
      <motion.path
        d="M 355 110 C 320 110, 320 165, 355 165 C 375 165, 375 120, 355 110 M 375 110 L 375 165"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(2.3),
          opacity: { duration: 0.3, delay: calc(2.3) },
        }}
      />

      {/* n */}
      <motion.path
        d="M 395 110 L 395 165 M 395 125 C 410 95, 445 95, 445 125 L 445 165"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.7),
          ease: "easeInOut",
          delay: calc(3.0),
          opacity: { duration: 0.3, delay: calc(3.0) },
        }}
      />

      {/* dot . */}
      <motion.path
        className="stroke-cyan-400 fill-cyan-400"
        d="M 475 160 A 7 7 0 1 1 475 159.9 Z"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.3),
          ease: "easeOut",
          delay: calc(3.6),
          opacity: { duration: 0.2, delay: calc(3.6) },
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

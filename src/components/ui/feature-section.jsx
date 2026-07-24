import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

export function FeatureSteps({
  features,
  className,
}) {
  const [currentFeature, setCurrentFeature] = useState(0)

  return (
    <div className={cn("w-full py-2", className)}>
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          
          {/* Left Side: Compact Project Strips (Hover-driven) */}
          <div className="order-2 md:order-1 flex flex-col gap-3 sm:gap-3.5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => setCurrentFeature(index)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent",
                  index === currentFeature
                    ? "bg-white/[0.08] border-cyan-500/40 backdrop-blur-xl shadow-[0_0_25px_rgba(34,211,238,0.18)] -translate-y-0.5"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/20 opacity-60 hover:opacity-100"
                )}
              >
                {/* Step Number Badge */}
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 transition-all duration-300",
                    index === currentFeature
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold scale-105 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                      : "bg-white/5 border-white/10 text-white/50"
                  )}
                >
                  <span className="text-xs sm:text-sm font-mono font-bold">0{index + 1}</span>
                </div>

                {/* Title & Tech Stack Pills (No Description) */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate mb-1.5">
                    {feature.title || feature.step}
                  </h3>

                  {/* Tech Stack Pills */}
                  {feature.tech && (
                    <div className="flex flex-wrap gap-1.5">
                      {feature.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-cyan-300/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Animated 3D Card Image Frame (Swaps image on hover) */}
          <div
            className={cn(
              "order-1 md:order-2 relative h-[260px] sm:h-[340px] md:h-[400px] lg:h-[440px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-black/40"
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-3xl overflow-hidden"
                      initial={{ y: 50, opacity: 0, scale: 0.96 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -50, opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-cover transition-transform transform duration-700 hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent" />
                      
                      {/* Overlay Project Title & Tech Badge */}
                      <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#030305]/85 backdrop-blur-md border border-white/10 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white font-mono truncate">
                            {feature.title}
                          </span>
                          <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 shrink-0 ml-2">
                            {feature.step}
                          </span>
                        </div>
                        {feature.tech && (
                          <div className="flex flex-wrap gap-1.5">
                            {feature.tech.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-white/80"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}

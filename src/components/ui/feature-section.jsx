import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

export function FeatureSteps({
  features,
  className,
}) {
  const [currentFeature, setCurrentFeature] = useState(0)

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Side: Project Names & Explanations List (Hover-driven) */}
          <div className="order-2 md:order-1 space-y-4 md:space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => setCurrentFeature(index)}
                className={cn(
                  "flex items-start gap-4 md:gap-5 p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent",
                  index === currentFeature
                    ? "bg-white/[0.08] border-cyan-500/40 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.18)] -translate-y-1"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/20 opacity-60 hover:opacity-100"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center border shrink-0 transition-all duration-300",
                    index === currentFeature
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold scale-105 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                      : "bg-white/5 border-white/10 text-white/50"
                  )}
                >
                  <span className="text-xs md:text-sm font-mono font-bold">0{index + 1}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                      {feature.step}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed font-normal">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Animated 3D Card Image Frame (Swaps image on hover) */}
          <div
            className={cn(
              "order-1 md:order-2 relative h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-black/40"
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-3xl overflow-hidden"
                      initial={{ y: 60, opacity: 0, scale: 0.95 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -60, opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-cover transition-transform transform duration-700 hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent" />
                      
                      {/* Overlay Project Title Badge */}
                      <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#030305]/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                        <span className="text-sm font-bold text-white font-mono">
                          {feature.title}
                        </span>
                        <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                          {feature.step}
                        </span>
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

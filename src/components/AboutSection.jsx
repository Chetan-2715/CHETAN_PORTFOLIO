import React from 'react';
import { Brain, Cpu, Sparkles, Code2 } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const HIGHLIGHTS = [
  {
    icon: Brain,
    title: 'Deep Learning',
    color: 'text-purple-400',
    description:
      'Designing and fine-tuning deep neural networks, transformers, and autonomous LLM agent systems.',
  },
  {
    icon: Cpu,
    title: 'Computer Vision',
    color: 'text-cyan-400',
    description:
      'Processing spatial visual data using state-of-the-art vision models, object detection, and tracking.',
  },
  {
    icon: Sparkles,
    title: 'Machine Learning',
    color: 'text-emerald-400',
    description:
      'Building robust predictive models, feature engineering pipelines, and intelligent data systems.',
  },
  {
    icon: Code2,
    title: 'Full Stack',
    color: 'text-pink-400',
    description:
      'Developing scalable, responsive web applications seamlessly integrated with AI backends.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 min-h-screen py-24 px-6 flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Left 1/4th (25%) Reserved Space for 3D Particle Info Icon on Desktop */}
        <div className="hidden lg:block lg:w-1/4 pointer-events-none" />

        {/* Right 3/4ths (75%) Content Container */}
        <div className="w-full lg:w-3/4">
          
          {/* Section Heading matching screenshot design */}
          <div className="flex flex-col items-center sm:items-start mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              About Me
            </h2>
            {/* Cyan to Purple Gradient Line */}
            <div className="w-32 sm:w-40 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
          </div>

          {/* Main About Panel with Glowing Effect */}
          <div className="relative rounded-3xl p-0.5">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
            />

            <div className="sci-panel p-6 sm:p-10 md:p-12 rounded-[calc(1.5rem-1px)] backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden bg-[#030305]/90">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Bio Introduction */}
              <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed mb-8 font-normal">
                Aspiring <span className="text-white font-semibold">AI and Data Science Engineer</span> with hands-on experience in building <span className="text-cyan-400 font-semibold">Agentic AI systems</span>, Large Language Models (<span className="text-purple-400 font-semibold">LLMs</span>), and end-to-end <span className="text-pink-400 font-semibold">full-stack web applications</span>. Passionate about solving complex problems by integrating cutting-edge machine learning algorithms with seamless software architecture.
              </p>

              {/* Interactive Animated Cards Grid with Glowing Effect */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                {HIGHLIGHTS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group relative rounded-2xl p-0.5 transition-all duration-500 ease-out hover:-translate-y-1.5 cursor-pointer"
                    >
                      <GlowingEffect
                        spread={35}
                        glow={true}
                        disabled={false}
                        proximity={50}
                        inactiveZone={0.01}
                        borderWidth={2}
                      />

                      <div className="relative p-6 rounded-[calc(1rem-1px)] bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden h-full group-hover:bg-white/[0.08] transition-colors">
                        {/* Subtle Card Background Glow Effect */}
                        <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all duration-500 pointer-events-none" />

                        <div className="flex items-center gap-3.5 mb-3">
                          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                            <Icon className={`w-6 h-6 ${item.color}`} />
                          </div>
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-normal group-hover:text-white/80 transition-colors">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

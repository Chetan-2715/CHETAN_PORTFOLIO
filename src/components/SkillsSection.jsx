import React from 'react';
import { Code, Cpu, Globe, Database } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const SKILLS = [
  {
    category: 'Languages & Core',
    icon: Code,
    color: 'text-purple-400',
    skills: ['Python', 'Java', 'SQL', 'DSA', 'OOP', 'TypeScript'],
  },
  {
    category: 'AI & Machine Learning',
    icon: Cpu,
    color: 'text-cyan-400',
    skills: ['LLMs', 'NLP', 'Prompt Engineering', 'Agentic Workflows', 'PyTorch', 'TensorFlow', 'Computer Vision', 'LangChain', 'RAG'],
  },
  {
    category: 'Web Development',
    icon: Globe,
    color: 'text-pink-400',
    skills: ['React', 'Node.js', 'FastAPI', 'HTML/CSS', 'Tailwind CSS', 'REST APIs', 'Next.js'],
  },
  {
    category: 'Databases & Tools',
    icon: Database,
    color: 'text-emerald-400',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'VS Code', 'Git', 'Vercel', 'Google Cloud'],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 min-h-screen py-24 px-6 flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Left 1/4th (25%) Reserved Space for 3D Particle Code Brackets </> on Desktop */}
        <div className="hidden lg:block lg:w-1/4 pointer-events-none" />

        {/* Right 3/4ths (75%) Content Container */}
        <div className="w-full lg:w-3/4">
          
          {/* Section Heading */}
          <div className="flex flex-col items-center sm:items-start mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Skills & Expertise
            </h2>
            {/* Cyan to Purple Gradient Line */}
            <div className="w-32 sm:w-40 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
          </div>

          {/* Cards Stacked One Below Another with Glowing Effect */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {SKILLS.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl p-0.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 cursor-pointer"
                >
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />

                  <div className="relative sci-panel p-5 sm:p-7 rounded-[calc(1rem-1px)] backdrop-blur-xl border border-white/10 overflow-hidden bg-[#030305]/90">
                    {/* Subtle Background Glow */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all duration-500 pointer-events-none" />

                    <div className="flex items-center gap-3 mb-3.5">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-md">
                        <Icon className={`w-5 h-5 ${cat.color}`} />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {cat.category}
                      </h3>
                    </div>

                    {/* Skill Badges with Micro Flyover Animations */}
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(34,211,238,0.25)] transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

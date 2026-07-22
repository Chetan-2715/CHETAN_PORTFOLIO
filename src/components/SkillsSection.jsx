import React from 'react';
import { Terminal, Code, Cpu, Layers } from 'lucide-react';

const SKILLS = [
  {
    category: 'AI & Machine Learning',
    icon: Cpu,
    color: 'text-cyan-400',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'OpenCV', 'Hugging Face', 'Transformers', 'Keras'],
  },
  {
    category: 'Programming Languages',
    icon: Code,
    color: 'text-purple-400',
    skills: ['Python', 'C++', 'SQL', 'JavaScript', 'HTML5/CSS3'],
  },
  {
    category: 'Data & Libraries',
    icon: Layers,
    color: 'text-emerald-400',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SciPy'],
  },
  {
    category: 'Tools & Deployment',
    icon: Terminal,
    color: 'text-pink-400',
    skills: ['Git / GitHub', 'Docker', 'FastAPI', 'Vite / React', 'Jupyter', 'Linux'],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 min-h-screen py-24 px-6 flex items-center justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8 justify-center sm:justify-start">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            02 // Skills & Technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="sci-panel p-6 sm:p-8 rounded-3xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon className={`w-6 h-6 ${cat.color}`} />
                  <h3 className="text-xl font-bold text-white">{cat.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

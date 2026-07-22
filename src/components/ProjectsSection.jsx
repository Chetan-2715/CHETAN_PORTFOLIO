import React from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Generative AI & Neural Vision Engine',
    description: 'Real-time computer vision and generative deep learning pipeline for spatial video synthesis and object detection.',
    tags: ['PyTorch', 'OpenCV', 'Generative AI', 'Python'],
    github: 'https://github.com/Chetan-2715',
  },
  {
    title: 'Predictive Analytics & Data Science Pipeline',
    description: 'High-throughput end-to-end data processing system deploying predictive machine learning algorithms on multidimensional data.',
    tags: ['Scikit-Learn', 'Pandas', 'FastAPI', 'MLOps'],
    github: 'https://github.com/Chetan-2715',
  },
  {
    title: 'Deep Learning Model Optimization Engine',
    description: 'Custom neural network quantization and pruning framework optimizing model latency for edge deployment.',
    tags: ['Deep Learning', 'TensorFlow', 'C++', 'Python'],
    github: 'https://github.com/Chetan-2715',
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 min-h-screen py-24 px-6 flex items-center justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8 justify-center sm:justify-start">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            03 // Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              className="sci-panel p-6 sm:p-8 rounded-3xl backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
                    aria-label="View Project GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-3">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {proj.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-[10px] font-mono text-cyan-400 border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

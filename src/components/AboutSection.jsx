import React from 'react';
import { Cpu, Brain, Database, ShieldCheck } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 min-h-screen py-24 px-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8 justify-center sm:justify-start">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            01 // About Me
          </h2>
        </div>

        {/* Card Container */}
        <div className="sci-panel p-8 sm:p-12 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
            Engineering Next-Gen Artificial Intelligence & Data Systems
          </h3>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 font-normal">
            I am <span className="text-white font-semibold">Chetan Shabadi</span>, an <span className="text-cyan-400 font-medium">Artificial Intelligence & Data Science (AInDS) Engineer</span> dedicated to building intelligent, autonomous systems. My focus lies at the intersection of deep neural networks, computer vision, generative AI, and scalable machine learning pipelines.
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
              <Brain className="w-6 h-6 text-purple-400 mb-3" />
              <h4 className="text-white font-semibold mb-1">Deep Learning</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Designing and fine-tuning neural network architectures for complex pattern recognition.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
              <Cpu className="w-6 h-6 text-cyan-400 mb-3" />
              <h4 className="text-white font-semibold mb-1">Computer Vision</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Processing spatial visual data using state-of-the-art vision models and object detection.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
              <Database className="w-6 h-6 text-emerald-400 mb-3" />
              <h4 className="text-white font-semibold mb-1">Predictive Analytics</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Extracting high-value actionable insights from unstructured multi-dimensional datasets.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
              <ShieldCheck className="w-6 h-6 text-pink-400 mb-3" />
              <h4 className="text-white font-semibold mb-1">MLOps & Pipelines</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Deploying robust, reproducible machine learning models to production environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

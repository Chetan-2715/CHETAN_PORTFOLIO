import React from 'react';
import { FeatureSteps } from './ui/feature-section';

const PORTFOLIO_PROJECTS = [
  {
    step: 'Project 01',
    title: 'Generative AI & Neural Vision Engine',
    content:
      'End-to-end multi-agent orchestration framework utilizing LLMs, vision transformers, and autonomous decision pipelines for enterprise workflow automation.',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
  },
  {
    step: 'Project 02',
    title: 'Predictive Analytics & Data Science Pipeline',
    content:
      'Scalable machine learning analytics engine performing feature extraction, real-time data streaming, and predictive modeling with high accuracy metrics.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
  },
  {
    step: 'Project 03',
    title: 'Deep Learning Model Optimization Engine',
    content:
      'High-performance neural network optimization tool reducing LLM inference latency and memory footprint using quantization, pruning, and custom CUDA kernels.',
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 min-h-screen py-24 px-6 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Heading */}
        <div className="flex flex-col items-center sm:items-start mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Featured Projects
          </h2>
          {/* Cyan to Purple Gradient Line */}
          <div className="w-32 sm:w-40 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
        </div>

        {/* FeatureSteps Interactive Component Showcase */}
        <FeatureSteps
          features={PORTFOLIO_PROJECTS}
          title="Featured Projects"
          autoPlayInterval={4500}
        />
      </div>
    </section>
  );
}

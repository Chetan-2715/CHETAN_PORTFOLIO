import React from 'react';
import { FeatureSteps } from './ui/feature-section';

const PORTFOLIO_PROJECTS = [
  {
    step: 'Project 01',
    title: 'The Council of Fit (Agentic AI System)',
    tech: ['Python', 'CrewAI', 'Gemini API'],
    content:
      'Architected an autonomous, multi-agent coaching system using CrewAI to orchestrate complex prompt workflows. Integrated Google Gemini models to dynamically generate personalized workout routines and dietary recommendations based on specific user data.',
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2000&auto=format&fit=crop',
  },
  {
    step: 'Project 02',
    title: 'AI Script Transliteration',
    tech: ['Python', 'Gemini API', 'Prompt Engineering', 'NLP'],
    content:
      'Engineered an AI-powered NLP tool that accurately converts Kannada lyrics written phonetically in Marathi script directly into native Kannada text using advanced prompt engineering.',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop',
  },
  {
    step: 'Project 03',
    title: 'Sudoku Samurai – Interactive Sudoku Solver',
    tech: ['React.js', 'FastAPI', 'Python', 'JavaScript'],
    content:
      'Engineered a high-performance solving engine using backtracking algorithms for dynamic grid sizes (up to 9x9), featuring a responsive React frontend with an interactive step-by-step Guided Mode.',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
  },
  {
    step: 'Project 04',
    title: 'Medi-Scribe (AI Prescription Analyzer)',
    tech: ['Python', 'OCR', 'AI Models'],
    content:
      'Built an AI-powered medical application utilizing computer vision and OCR models to automatically analyze, extract, and digitize handwritten medical prescriptions.',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop',
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
        <FeatureSteps features={PORTFOLIO_PROJECTS} />
      </div>
    </section>
  );
}

import React from 'react';
import { Linkedin, Github, Instagram, Phone, Mail } from 'lucide-react';
import { PianoFooterText } from './PianoFooterText';

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 min-h-screen pt-24 pb-0 px-6 flex flex-col items-center justify-between">
      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            04 // Contact & Connect
          </h2>
        </div>

        <div className="sci-panel p-8 sm:p-14 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden mb-12">
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Let’s Build Something Intelligent Together
          </h3>

          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-normal">
            Whether you have a machine learning project, AI engineering opportunity, or data science inquiry, feel free to get in touch!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {/* Phone Button */}
            <a
              href="tel:9511757256"
              className="px-6 py-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-white font-medium text-sm flex items-center gap-2.5 transition-all shadow-lg"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+91 95117 57256</span>
            </a>

            {/* Email Button */}
            <a
              href="mailto:shabadi.chetan27@gmail.com"
              className="px-6 py-3.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-white font-medium text-sm flex items-center gap-2.5 transition-all shadow-lg"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>shabadi.chetan27@gmail.com</span>
            </a>
          </div>

          {/* Social Links Footer Bar */}
          <div className="flex items-center justify-center gap-4 pt-8 border-t border-white/10">
            <a
              href="https://www.linkedin.com/in/chetan-shabadi-b2088031b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-cyan-400 hover:scale-110 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a
              href="https://github.com/Chetan-2715"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-purple-400 hover:scale-110 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://www.instagram.com/chetan_270105"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-pink-400 hover:scale-110 transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Strip across lower half of CHETAN */}
      <PianoFooterText />
    </section>
  );
}

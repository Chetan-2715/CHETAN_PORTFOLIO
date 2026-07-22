import React, { useState, useEffect, useRef } from 'react';

const NAV_ITEMS = ['about', 'skills', 'projects', 'contact'];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navRefs = useRef({});

  // Recalculate sliding underline position whenever activeSection or navbar scroll state changes
  useEffect(() => {
    const activeEl = navRefs.current[activeSection];
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection, isScrolled]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial position calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center">
      <nav
        className={`pointer-events-auto flex items-center justify-between overflow-hidden ${
          isScrolled
            ? 'w-[90%] max-w-lg mt-3 px-6 py-2.5 rounded-full sci-panel backdrop-blur-xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.8)]'
            : 'w-full max-w-none mt-0 px-6 sm:px-12 md:px-16 py-4 rounded-none bg-black/40 backdrop-blur-md border-b border-white/10 shadow-none'
        }`}
        style={{
          transitionProperty:
            'width, max-width, margin-top, padding, border-radius, background-color, border-color, box-shadow',
          transitionDuration: '700ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Brand Logo: chetan */}
        <button
          onClick={() => scrollToSection('hero')}
          className="font-mono text-sm font-semibold tracking-wider text-left transition-colors duration-300 group"
        >
          <span className="text-white group-hover:text-cyan-400 transition-colors">
            chetan
          </span>
          <span className="text-cyan-400 font-bold">.</span>
        </button>

        {/* Nav Links Container with Smooth Sliding Underline */}
        <div className="relative flex items-center gap-5 sm:gap-8 text-xs sm:text-sm font-medium py-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item;
            return (
              <button
                key={item}
                ref={(el) => (navRefs.current[item] = el)}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-colors duration-300 py-1 ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item}
              </button>
            );
          })}

          {/* Smooth Gliding Underline Indicator */}
          <div
            className="absolute bottom-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
        </div>
      </nav>
    </header>
  );
}
